package vn.hoangit.foodflow.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import vn.hoangit.foodflow.domain.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByCategoriesContainingIgnoreCase(String category);
    
    List<Product> findByNameContainingIgnoreCaseOrDetailDescContainingIgnoreCase(String name, String description);
    
    @Query("SELECT DISTINCT p.categories FROM Product p")
    List<String> findDistinctCategories();
    
    long countByCategoriesContainingIgnoreCase(String category);

    Page<Product> findAll(Pageable pageable);
}
