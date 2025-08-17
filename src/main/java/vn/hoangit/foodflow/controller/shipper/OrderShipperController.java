package vn.hoangit.foodflow.controller.shipper;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpServletRequest;
import vn.hoangit.foodflow.domain.Order;
import vn.hoangit.foodflow.domain.User;
import vn.hoangit.foodflow.service.OrderService;
import vn.hoangit.foodflow.service.UserService;

@Controller
public class OrderShipperController {

    private final OrderService orderService;
    private final UserService userService;

    public OrderShipperController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @Value("${google.maps.api.key:}")
    private String googleMapsApiKey;

    @GetMapping("/shipper")
    public String shipperHome(Model model) {
        long pending = orderService.countOrdersByStatus("PENDING");
        long shipping = orderService.countOrdersByStatus("SHIPPING");
        long complete = orderService.countOrdersByStatus("COMPLETE");
        long cancelled = orderService.countOrdersByStatus("CANCELLED");
        model.addAttribute("pending", pending);
        model.addAttribute("shipping", shipping);
        model.addAttribute("complete", complete);
        model.addAttribute("cancelled", cancelled);
        return "shipper/homepage/show";
    }

    @GetMapping("/shipper/orders/available")
    public String listAvailableOrders(Model model) {
        List<Order> orders = orderService.fetchOrdersByStatus("PENDING");
        model.addAttribute("orders", orders);
        return "shipper/orders/available";
    }

    @GetMapping("/shipper/orders/accepted")
    public String listAcceptedOrders(Model model) {
        List<Order> orders = orderService.fetchOrdersByStatus("SHIPPING");
        model.addAttribute("orders", orders);
        return "shipper/orders/accepted";
    }

    @GetMapping("/shipper/orders/completed")
    public String listCompletedOrders(Model model) {
        List<Order> orders = orderService.fetchOrdersByStatus("COMPLETE");
        model.addAttribute("orders", orders);
        return "shipper/orders/completed";
    }

    @GetMapping("/shipper/orders/cancelled")
    public String listCancelledOrders(Model model) {
        List<Order> orders = orderService.fetchOrdersByStatus("CANCELLED");
        model.addAttribute("orders", orders);
        return "shipper/orders/cancelled";
    }

    @GetMapping("/shipper/orders/{id}")
    public String viewOrder(Model model, @PathVariable long id) {
        Order order = orderService.fetchOrderById(id).orElse(null);
        model.addAttribute("order", order);
        return "shipper/orders/detail";
    }

    @PostMapping("/shipper/orders/{id}/accept")
    public String acceptOrder(@PathVariable long id, HttpServletRequest request) {
        Order order = orderService.fetchOrderById(id).orElse(null);
        if (order != null && "PENDING".equals(order.getStatus())) {
            // Move order into SHIPPING state upon shipper acceptance
            order.setStatus("SHIPPING");
            // assign shipper from session
            Long userId = (Long) request.getSession(false).getAttribute("id");
            if (userId != null) {
                User shipper = userService.getUserById(userId);
                order.setShipper(shipper);
            }
            orderService.updateOrder(order);
        }
        return "redirect:/shipper/orders/accepted";
    }

    @PostMapping("/shipper/orders/{id}/complete")
    public String completeOrder(@PathVariable long id) {
        Order order = orderService.fetchOrderById(id).orElse(null);
        if (order != null && "SHIPPING".equals(order.getStatus())) {
            order.setStatus("COMPLETE");
            orderService.updateOrder(order);
        }
        return "redirect:/shipper/orders/accepted";
    }

    @PostMapping("/shipper/orders/{id}/cancel")
    public String cancelOrder(@PathVariable long id) {
        Order order = orderService.fetchOrderById(id).orElse(null);
        if (order != null && ("PENDING".equals(order.getStatus()) || "SHIPPING".equals(order.getStatus()))) {
            order.setStatus("CANCELLED");
            orderService.updateOrder(order);
        }
        return "redirect:/shipper/orders/accepted";
    }

    @GetMapping("/shipper/orders/{id}/route")
    public String viewRoute(@PathVariable long id, Model model, jakarta.servlet.http.HttpServletRequest request) {
        Order order = orderService.fetchOrderById(id).orElse(null);
        model.addAttribute("order", order);
        // Current shipper location from profile
        Long userId = (Long) request.getSession(false).getAttribute("id");
        User shipper = userId != null ? userService.getUserById(userId) : null;
        if (shipper != null) {
            model.addAttribute("shipperLatitude", shipper.getLatitude());
            model.addAttribute("shipperLongitude", shipper.getLongitude());
        }
        model.addAttribute("gmapKey", googleMapsApiKey);
        return "shipper/map/route";
    }
}


