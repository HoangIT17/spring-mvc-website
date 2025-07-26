package vn.hoidanit.laptopshop.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProductController{

    @GetMapping("/admin/product")
    public String getDashboard() {
        // Logic to retrieve dashboard data can be added here
        return "admin/product/showProduct"; // This should return the view name for the dashboard
    }
}
