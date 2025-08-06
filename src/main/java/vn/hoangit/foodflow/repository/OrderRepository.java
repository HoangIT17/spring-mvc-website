package vn.hoangit.foodflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.hoangit.foodflow.domain.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
