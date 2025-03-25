package com.shopswift.product_service.repository;

import com.shopswift.product_service.model.Category;
import com.shopswift.product_service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // ✅ Find products by seller ID - Retrieves all products listed by a specific seller
    List<Product> findBySellerId(String sellerId);

    // ✅ Find products by category - Retrieves products based on a specific category
    List<Product> findByCategory(Category category);

    // ✅ Find products by category with sorting - Retrieves products based on a specific category, with sorting options
    List<Product> findByCategory(Category category, Sort sort);

    // ✅ Search products by keyword and price range - Searches products based on a keyword in the name or description and filters by price range
    @Query("SELECT p FROM Product p WHERE (LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> searchProductsByPriceRangeAndKeyword(@Param("keyword") String keyword,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Sort sort);

    // ✅ Search products by keyword - Searches products based on a keyword in the name or description
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@Param("keyword") String keyword, Sort sort);

    // ✅ Filter products by price range - Retrieves products within a specified price range
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);

    // ✅ Filter products by price range with sorting - Retrieves products within a specified price range with sorting options
    List<Product> findByPriceBetween(double minPrice, double maxPrice, Sort sort);

    // ✅ Filter products by price range and category with sorting - Retrieves products within a specified price range and category, with sorting options
    List<Product> findByPriceBetweenAndCategory(double minPrice, double maxPrice, Category category, Sort sort);

    // ✅ Find products by category and price range with sorting - Retrieves products based on category and a specified price range, with sorting options
    List<Product> findByCategoryAndPriceBetween(Category category, double minPrice, double maxPrice, Sort sort);
}
