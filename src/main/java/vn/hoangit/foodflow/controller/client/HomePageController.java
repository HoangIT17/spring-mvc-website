package vn.hoangit.foodflow.controller.client;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import vn.hoangit.foodflow.domain.Order;
import vn.hoangit.foodflow.domain.Product;
import vn.hoangit.foodflow.domain.User;
import vn.hoangit.foodflow.domain.dto.RegisterDTO;
import vn.hoangit.foodflow.service.OrderService;
import vn.hoangit.foodflow.service.ProductService;
import vn.hoangit.foodflow.service.UserService;

@Controller
public class HomePageController {

    private final ProductService productService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final OrderService orderService;

    public HomePageController(ProductService productService,
        UserService userService, PasswordEncoder passwordEncoder, 
        OrderService orderService) {
        this.productService = productService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.orderService = orderService;
    }   
    
    @GetMapping("/")
    public String getHomePage(Model model) {
        List<Product> products = this.productService.fetchProducts();
        model.addAttribute("products", products);
        
        // Add category product counts
        java.util.Map<String, Long> categoryCounts = this.productService.getCategoryProductCounts();
        model.addAttribute("pizzaCount", categoryCounts.get("pizzaCount"));
        model.addAttribute("burgerChickenCount", categoryCounts.get("burgerChickenCount"));
        model.addAttribute("noodleCount", categoryCounts.get("noodleCount"));
        model.addAttribute("drinkCount", categoryCounts.get("drinkCount"));
        model.addAttribute("riceCount", categoryCounts.get("riceCount"));
        
        return "client/homepage/show";
    }

    @GetMapping("/register")
    public String getRegisterPage(Model model) {
        model.addAttribute("registerUser", new RegisterDTO());
        return "client/auth/register";
    }

    @PostMapping("/register")
    public String handleRegister(@ModelAttribute("registerUser") @Valid RegisterDTO registerDTO,
        BindingResult bindingResult) {
        
        // Validate the product
        if (bindingResult.hasErrors()) {
            return "client/auth/register";
        }

        List<FieldError> errors = bindingResult.getFieldErrors();
        for (FieldError error : errors ) {
            System.out.println (">>>>" + error.getField() + " - " 
                + error.getDefaultMessage());
        }
            
        User user = this.userService.registerDTOtoUser(registerDTO);

        String hashPassword = this.passwordEncoder.encode(user.getPassword());

        user.setPassword(hashPassword);
        user.setRole(this.userService.getRoleByName("USER"));
        // save
        this.userService.handleSaveUser(user);
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String getLoginPage(Model model) {
        // model.addAttribute("loginUser", new LoginDTO());
        return "client/auth/login";
    }

    @GetMapping("/access-deny")
    public String getDenyPage(Model model) {
        // model.addAttribute("loginUser", new LoginDTO());
        return "client/auth/deny";
    }

    @GetMapping("/order-history")
    public String getOrderHistoryPage(Model model, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("id") == null) {
            model.addAttribute("orders", null);
            return "client/cart/order-history";
        }
        long id = (long) session.getAttribute("id");
        User currentUser = new User();
        currentUser.setId(id);

        List<Order> orders = this.orderService.fetchOrderByUser(currentUser);
        model.addAttribute("orders", orders);

        return "client/cart/order-history";
    }
}