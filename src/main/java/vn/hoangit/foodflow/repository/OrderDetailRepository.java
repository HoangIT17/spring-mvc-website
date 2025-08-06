package vn.hoangit.foodflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.hoangit.foodflow.domain.OrderDetail;



@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    
    // Define any custom query methods if needed
    // For example, to find order details by order ID:
    // List<OrderDetail> findByOrderId(Long orderId);
    
}
