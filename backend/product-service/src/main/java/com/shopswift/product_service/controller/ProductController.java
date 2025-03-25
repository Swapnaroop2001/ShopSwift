package com.shopswift.product_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shopswift.product_service.exception.NotFoundException;
import com.shopswift.product_service.exception.UnauthorizedException;
import com.shopswift.product_service.model.Category;
import com.shopswift.product_service.model.Product;
import com.shopswift.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<Product> addProduct(
            @RequestPart("product") String productJson,
            @RequestPart(value = "image", required = false) List<MultipartFile> images,
            @RequestHeader("X-User-ID") String userId) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Product product = objectMapper.readValue(productJson, Product.class);
            product.setSellerId(userId);
            System.out.println("Images received: " + (images == null ? "null" : images.size())); // Debug
            Product savedProduct = productService.addProduct(product, images);
            return ResponseEntity.ok(savedProduct);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String order) {
        List<Product> products = productService.getAllProductsSorted(sortBy, order);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Product>> getProductsBySellerId(@PathVariable String sellerId) {
        List<Product> products = productService.getProductsBySellerId(sellerId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(
            @PathVariable String category,
            @RequestParam(required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String order) {
        try {
            Category categoryEnum = Category.valueOf(category.toUpperCase());
            List<Product> products = productService.getProductsByCategorySorted(categoryEnum, sortBy, order);
            return ResponseEntity.ok(products);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") String productJson,
            @RequestPart(value = "image", required = false) List<MultipartFile> newImages) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Product updatedProduct = objectMapper.readValue(productJson, Product.class);
            Product updated = productService.updateProduct(id, updatedProduct, newImages);
            return ResponseEntity.ok(updated);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam String q,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String order) {
        List<Product> products = productService.searchProducts(q, minPrice, maxPrice, sortBy, order);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> getProductsByPriceRangeAndCategory(
            @RequestParam double minPrice,
            @RequestParam double maxPrice,
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String order) {
        List<Product> products;
        if (category != null && !category.isEmpty()) {
            try {
                Category categoryEnum = Category.valueOf(category.toUpperCase());
                products = productService.getProductsByPriceRangeAndCategory(minPrice, maxPrice, categoryEnum, sortBy,
                        order);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(null);
            }
        } else {
            products = productService.getProductsByPriceRange(minPrice, maxPrice, sortBy, order);
        }
        return ResponseEntity.ok(products);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id, @RequestHeader("X-User-ID") String userId) {
        try {
            productService.deleteProduct(id, userId);
            return ResponseEntity.noContent().build();
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(403).body(null);
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    
    @DeleteMapping("/{id}/images/{imageKey}")
    public ResponseEntity<Product> deleteProductImage(
            @PathVariable Long id,
            @PathVariable String imageKey,
            @RequestHeader("X-User-ID") String userId) {
        try {
            Product updatedProduct = productService.deleteImage(id, imageKey, userId);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}