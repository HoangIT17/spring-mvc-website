package vn.hoangit.foodflow.controller.shipper;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import vn.hoangit.foodflow.domain.Order;
import vn.hoangit.foodflow.domain.User;
import vn.hoangit.foodflow.service.OrderService;
import vn.hoangit.foodflow.service.UserService;

@Controller
public class EarningsController {

    private final OrderService orderService;
    private final UserService userService;

    public EarningsController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @GetMapping("/shipper/earnings")
    public String viewEarnings(Model model, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Long id = (Long) (session != null ? session.getAttribute("id") : null);
        if (id == null) return "redirect:/login";
        User shipper = userService.getUserById(id);

        List<Order> completed = orderService.fetchOrdersByShipperAndStatus(shipper, "COMPLETE");
        double total = 0;
        for (Order o : completed) total += o.getTotalPrice();

        model.addAttribute("orders", completed);
        model.addAttribute("total", total);
        return "shipper/earnings/show";
    }
}


