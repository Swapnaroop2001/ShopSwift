package com.shopswift.product_service.service;

import com.shopswift.product_service.exception.UnauthorizedException;
import com.shopswift.product_service.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import com.shopswift.product_service.model.Category;
import com.shopswift.product_service.model.Product;
import com.shopswift.product_service.repository.ProductRepository;

import software.amazon.awssdk.services.s3.S3Client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private S3Client s3Client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    // ✅ Add product with images
    public Product addProduct(Product product, List<MultipartFile> images) throws IOException {
        // Upload images to S3 and get URLs
        List<String> imageUrls = imageUploadService.uploadImages(images);
        product.setPhotoUrls(imageUrls); // Set the S3 URLs in the product entity

        // Save to PostgreSQL (photoUrls will be stored in the product_photos table)
        return productRepository.save(product);
    }

    // ✅ Get all products with sorting (newest first or price)
    public List<Product> getAllProductsSorted(String sortBy, String order) {
        Sort.Direction direction = order.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        return productRepository.findAll(Sort.by(direction, sortBy));
    }

    // ✅ Get product by ID
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // ✅ Get products by seller ID
    public List<Product> getProductsBySellerId(String sellerId) {
        return productRepository.findBySellerId(sellerId);
    }

    // ✅ Get products by category with sorting
    public List<Product> getProductsByCategorySorted(Category category, String sortBy, String order) {
        Sort.Direction direction = order.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        return productRepository.findByCategory(category, Sort.by(direction, sortBy));
    }

    // ✅ Update an existing product with optional new images
    public Product updateProduct(Long id, Product updatedProduct, List<MultipartFile> newImages) throws IOException {
        return productRepository.findById(id).map(existingProduct -> {
            // Update basic fields
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setDescription(updatedProduct.getDescription());

            // Handle new images if provided
            if (newImages != null) {
                try {
                    if (newImages.isEmpty()) {
                        // Clear photoUrls and delete old images from S3
                        List<String> oldImageUrls = existingProduct.getPhotoUrls();
                        if (oldImageUrls != null) {
                            for (String oldUrl : oldImageUrls) {
                                String key = oldUrl.replace("https://" + bucketName + ".s3.amazonaws.com/", "");
                                s3Client.deleteObject(
                                        DeleteObjectRequest.builder().bucket(bucketName).key(key).build());
                            }
                        }
                        existingProduct.setPhotoUrls(new ArrayList<>());
                    } else {
                        // Replace with new images and delete old ones from S3
                        List<String> newImageUrls = imageUploadService.uploadImages(newImages);
                        List<String> oldImageUrls = existingProduct.getPhotoUrls();
                        if (oldImageUrls != null) {
                            for (String oldUrl : oldImageUrls) {
                                String key = oldUrl.replace("https://" + bucketName + ".s3.amazonaws.com/", "");
                                s3Client.deleteObject(
                                        DeleteObjectRequest.builder().bucket(bucketName).key(key).build());
                            }
                        }
                        existingProduct.setPhotoUrls(new ArrayList<>(newImageUrls));
                    }
                } catch (IOException e) {
                    throw new RuntimeException("Failed to upload new images or delete old ones", e);
                }
            }

            // Save updated product
            return productRepository.save(existingProduct);
        }).orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    // ✅ Delete a product by ID (only by the seller)
    public boolean deleteProduct(Long id, String userId) {
        Optional<Product> productOpt = productRepository.findById(id);

        if (productOpt.isPresent()) {
            Product product = productOpt.get();

            if (!product.getSellerId().equals(userId)) {
                throw new UnauthorizedException("You can only delete your own products!");
            }

            productRepository.deleteById(id);
            return true;
        }

        throw new NotFoundException("Product not found!");
    }

    // ✅ Search products by keyword
    public List<Product> searchProducts(String keyword, Double minPrice, Double maxPrice, String sortBy, String order) {
        if (sortBy == null || sortBy.isEmpty()) {
            sortBy = "createdAt";
        }
        Sort.Direction direction = "asc".equalsIgnoreCase(order) ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, sortBy);

        if (minPrice != null && maxPrice != null) {
            return productRepository.searchProductsByPriceRangeAndKeyword(keyword, minPrice, maxPrice, sort);
        } else {
            return productRepository.searchProducts(keyword, sort);
        }
    }

    // ✅ Get products in a specific price range
    public List<Product> filterByPrice(Double minPrice, Double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    // ✅ Get products by price range with sorting
    public List<Product> getProductsByPriceRange(double minPrice, double maxPrice, String sortBy, String order) {
        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        return productRepository.findByPriceBetween(minPrice, maxPrice, sort);
    }

    // ✅ Get products by price range and category with sorting
    public List<Product> getProductsByPriceRangeAndCategory(double minPrice, double maxPrice, Category category,
            String sortBy, String order) {
        Sort.Direction direction = order.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, sortBy);

        if (category == null) {
            return productRepository.findByPriceBetween(minPrice, maxPrice, sort);
        } else {
            return productRepository.findByPriceBetweenAndCategory(minPrice, maxPrice, category, sort);
        }
    }

    public Product deleteImage(Long id, String imageKey, String userId) {
        return productRepository.findById(id).map(existingProduct -> {
            if (!existingProduct.getSellerId().equals(userId)) {
                throw new RuntimeException("Unauthorized: User does not own this product");
            }
            
            List<String> currentImageUrls = existingProduct.getPhotoUrls();
            if (currentImageUrls != null && !currentImageUrls.isEmpty()) {
                String fullUrl = "https://" + bucketName + ".s3.amazonaws.com/" + imageKey;
                if (currentImageUrls.contains(fullUrl)) {
                    // Remove from photoUrls
                    currentImageUrls.remove(fullUrl);
                    existingProduct.setPhotoUrls(new ArrayList<>(currentImageUrls)); // New list for JPA
                    
                    // Delete from S3
                    s3Client.deleteObject(DeleteObjectRequest.builder()
                            .bucket(bucketName)
                            .key(imageKey)
                            .build());
                }
            }
            return productRepository.save(existingProduct);
        }).orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }
}