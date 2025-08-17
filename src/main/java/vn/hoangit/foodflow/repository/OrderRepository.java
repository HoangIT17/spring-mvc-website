package vn.hoangit.foodflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.hoangit.foodflow.domain.Order;
import vn.hoangit.foodflow.domain.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
    List<Order> findByStatus(String status);
    long countByStatus(String status);

    List<Order> findByShipperAndStatus(User shipper, String status);
}
