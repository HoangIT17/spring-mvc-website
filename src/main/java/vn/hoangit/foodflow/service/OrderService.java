package vn.hoangit.foodflow.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import vn.hoangit.foodflow.domain.Order;
import vn.hoangit.foodflow.domain.OrderDetail;
import vn.hoangit.foodflow.domain.User;
import vn.hoangit.foodflow.repository.OrderDetailRepository;
import vn.hoangit.foodflow.repository.OrderRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;

    public OrderService(OrderRepository orderRepository, OrderDetailRepository orderDetailRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        
    }

    public List<Order> fetchAllOrders() {
        return this.orderRepository.findAll();
    }

    public Optional<Order> fetchOrderById(long id) {
        return this.orderRepository.findById(id);
    }

    public void deleteOrderById(long id) {
        //delete order details 
        Optional<Order> orderOptional = this.fetchOrderById(id);
        if (orderOptional.isPresent()){
            Order order = orderOptional.get();
            List<OrderDetail> orderDetails = order.getOrderDetails();
            for (OrderDetail orderDetail : orderDetails) {
                this.orderDetailRepository.deleteById(orderDetail.getId());
            }
        }
        this.orderRepository.deleteById(id);
    }
    public void updateOrder(Order order) {
        Optional<Order> orderOptional = this.fetchOrderById(order.getId());
        if (orderOptional.isPresent()) {
            Order currentOrder = orderOptional.get();
            currentOrder.setStatus(order.getStatus());
            currentOrder.setShipper(order.getShipper());
            this.orderRepository.save(currentOrder);
        }
    }

    public List<Order> fetchOrderByUser(User user) {
        return this.orderRepository.findByUser(user);
    }

    public List<Order> fetchOrdersByStatus(String status) {
        return this.orderRepository.findByStatus(status);
    }

    public long countOrdersByStatus(String status) {
        return this.orderRepository.countByStatus(status);
    }

    public List<Order> fetchOrdersByShipperAndStatus(User shipper, String status) {
        return this.orderRepository.findByShipperAndStatus(shipper, status);
    }

    // Recommend: lấy các category user đã từng mua 
    public List<String> getUserPurchasedCategories(User user) {
        List<Order> orders = orderRepository.findByUser(user);
        Set<String> categories = new HashSet<>();
        for (Order order : orders) {
            for (OrderDetail detail : order.getOrderDetails()) {
                categories.add(detail.getProduct().getCategories());
            }
        }
        return new ArrayList<>(categories);
    }
}