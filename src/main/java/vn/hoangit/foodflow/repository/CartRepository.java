package vn.hoangit.foodflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.hoangit.foodflow.domain.Cart;
import vn.hoangit.foodflow.domain.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    
    Cart findByUser(User user);
    
}
