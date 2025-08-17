package vn.hoangit.foodflow.controller.client;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import vn.hoangit.foodflow.domain.Cart;
import vn.hoangit.foodflow.domain.CartDetail;
import vn.hoangit.foodflow.domain.Product;
import vn.hoangit.foodflow.domain.User;
import vn.hoangit.foodflow.service.ProductService;


@Controller
public class ItemController {

    private final ProductService productService;
    private final vn.hoangit.foodflow.service.UserService userService;

    public ItemController(ProductService productService, vn.hoangit.foodflow.service.UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    @GetMapping("/product/{id}")
    public String getProductPage(Model model, @PathVariable long id) {
        Product product = this.productService.fetchProductById(id).get();
        model.addAttribute("product", product);
        model.addAttribute("id", id);
        return "client/product/detail";
    }

    @PostMapping("/add-product-to-cart/{id}")
    public String addProductToCart(@PathVariable long id, HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        // Logic to add product to cart
        long productId = id; 
        String email = session.getAttribute("email").toString();
        
        // Get quantity from form
        long quantity;
        try {
            quantity = Long.parseLong(request.getParameter("quantity"));
            if (quantity < 1) quantity = 1;
        } catch (NumberFormatException e) {
            quantity = 1;
        }
        
        this.productService.handleAddProductToCart(email, productId, session, quantity);

        return "redirect:/"; // Redirect to home page after adding product
    }

    @GetMapping("/cart")
    public String getCartPage(Model model, HttpServletRequest request) {
        User currentUser = new User();
        HttpSession session = request.getSession(false);
        long id = (long) session.getAttribute("id");
        currentUser.setId(id);

        Cart cart = this.productService.fetchByUser(currentUser);

        List<CartDetail> cartDetails = cart == null ? new ArrayList<CartDetail>() :  cart.getCartDetails();

        double totalPrice = 0;
        for (CartDetail cartDetail : cartDetails) {
            totalPrice += cartDetail.getPrice() * cartDetail.getQuantity();
        }

        model.addAttribute("cartDetails", cartDetails);
        model.addAttribute("totalPrice", totalPrice);

        model.addAttribute("cart", cart);

        return "client/cart/show";
    }

    @PostMapping("/delete-cart-product/{id}")
    public String deleteCartProduct(@PathVariable long id, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        long cartDetailId = id;
        
        this.productService.handleRemoveCartDetail(cartDetailId, session);
        
        return "redirect:/cart";
    }

    @GetMapping("/checkout")
    public String showCheckoutPage(Model model, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        long id = (long) session.getAttribute("id");
        User currentUser = new User();
        currentUser.setId(id);

        Cart cart = this.productService.fetchByUser(currentUser);
        List<CartDetail> cartDetails = cart == null ? new ArrayList<CartDetail>() : cart.getCartDetails();

        double totalPrice = 0;
        for (CartDetail cartDetail : cartDetails) {
            totalPrice += cartDetail.getPrice() * cartDetail.getQuantity();
        }

        model.addAttribute("cartDetails", cartDetails);
        model.addAttribute("totalPrice", totalPrice);

        // Lấy thông tin user chi tiết từ UserService
        vn.hoangit.foodflow.domain.User user = userService.getUserById(id);
        if (user == null) {
            user = new vn.hoangit.foodflow.domain.User();
            user.setId(id);
        }
        model.addAttribute("user", user);

        return "client/cart/checkout";
    }

    @PostMapping("/confirm-checkout")
    public String getCheckoutPage(@ModelAttribute("cart") Cart cart) {
        List<CartDetail> cartDetails = cart == null ? new ArrayList<>() : cart.getCartDetails();
        this.productService.handleUpdateCartBeforeCheckout(cartDetails);
        return "redirect:/checkout";
    }

    @PostMapping("/place-order")
    public String handlePlaceOrder(
        Model model,
        HttpServletRequest request,
        @RequestParam("receiverName") String receiverName,
        @RequestParam("receiverAddress") String receiverAddress,
        @RequestParam("receiverPhone") String receiverPhone){
        
        User currentUser = new User();
        HttpSession session = request.getSession(false);
        long id = (long) session.getAttribute("id");
        currentUser.setId(id);

        vn.hoangit.foodflow.domain.Order order = this.productService.handlePlaceOrder(currentUser, session, receiverName, receiverAddress, receiverPhone);
        model.addAttribute("order", order);

        return "client/cart/thank";
    }

    @PostMapping("/add-product-from-view-detail")
    public String handleAddProductFromViewDetail(
        @RequestParam("id") long id,
        @RequestParam("quantity") long quantity,
        HttpServletRequest request) {
        
        HttpSession session = request.getSession(false);
        String email = session.getAttribute("email").toString();

        this.productService.handleAddProductToCart(email, id, session, quantity);
        
        return "redirect:/"; // Redirect to home page after adding product
    }

    @GetMapping("/products")
    public String showProductsPage(
        @RequestParam(value = "category", required = false) String category,
        @RequestParam(value = "keyword", required = false) String keyword,
        Model model) {
        
        List<Product> products;
        
        if (category != null && !category.isEmpty()) {
            // Filter by category
            products = this.productService.findByCategory(category);
            model.addAttribute("selectedCategory", category);
        } else if (keyword != null && !keyword.isEmpty()) {
            // Search by keyword
            products = this.productService.searchProducts(keyword);
            model.addAttribute("searchKeyword", keyword);
        } else {
            // Show all products
            products = this.productService.getAllProducts();
        }
        
        model.addAttribute("products", products);
        model.addAttribute("categories", this.productService.getAllCategories());
        
        return "client/product/show";
    }

    @GetMapping("/search-products")
    public String searchProducts(
        @RequestParam("keyword") String keyword,
        Model model) {
        
        List<Product> products = this.productService.searchProducts(keyword);
        model.addAttribute("products", products);
        model.addAttribute("searchKeyword", keyword);
        model.addAttribute("categories", this.productService.getAllCategories());
        
        return "client/product/show";
    }

    @GetMapping("/recommended-products")
    public String showRecommendedProducts(Model model, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("id") == null) {
            // Chưa đăng nhập, chuyển hướng sang trang đăng nhập
            return "redirect:/login";
        }
        long id = (long) session.getAttribute("id");
        User currentUser = new User();
        currentUser.setId(id);
        List<Product> recommendedProducts = this.productService.recommendProductsForUser(currentUser);
        model.addAttribute("recommendedProducts", recommendedProducts);
        return "client/product/recommended";
    }
}