package vn.hoangit.foodflow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import vn.hoangit.foodflow.domain.Cart;
import vn.hoangit.foodflow.domain.CartDetail;
import vn.hoangit.foodflow.domain.Order;
import vn.hoangit.foodflow.domain.OrderDetail;
import vn.hoangit.foodflow.domain.Product;
import vn.hoangit.foodflow.domain.User;
import vn.hoangit.foodflow.repository.CartDetailRepository;
import vn.hoangit.foodflow.repository.CartRepository;
import vn.hoangit.foodflow.repository.OrderDetailRepository;
import vn.hoangit.foodflow.repository.OrderRepository;
import vn.hoangit.foodflow.repository.ProductRepository;


@Service
public class ProductService {
    
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final CartDetailRepository cartDetailRepository;
    private final UserService userService;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final OrderService orderService;

    public ProductService(ProductRepository productRepository, 
        CartRepository cartRepository, 
        CartDetailRepository cartDetailRepository,
        UserService userService,
        OrderRepository orderRepository,
        OrderDetailRepository orderDetailRepository,
            OrderService orderService) {
                this.productRepository = productRepository;
                this.cartRepository = cartRepository;
                this.cartDetailRepository = cartDetailRepository;
                this.userService = userService;
                this.orderRepository = orderRepository;
                this.orderDetailRepository = orderDetailRepository;
                this.orderService = orderService;
    }
    
    // Recommend sản phẩm cùng loại dựa trên lịch sử đặt hàng
    public List<Product> recommendProductsForUser(User user) {
        List<String> categories = this.orderService.getUserPurchasedCategories(user);
        // Lấy sản phẩm user đã mua
        List<Order> orders = orderService.fetchOrderByUser(user);
        java.util.Set<Long> purchasedProductIds = new java.util.HashSet<>();
        for (Order order : orders) {
            for (OrderDetail detail : order.getOrderDetails()) {
                purchasedProductIds.add(detail.getProduct().getId());
            }
        }
        List<Product> recommended = new java.util.ArrayList<>();
        for (String category : categories) {
            List<Product> products = productRepository.findByCategoriesContainingIgnoreCase(category);
            for (Product p : products) {
                if (!purchasedProductIds.contains(p.getId())) {
                    recommended.add(p);
                }
            }
        }
        // Trả về tối đa 10 sản phẩm gợi ý
        return recommended.stream().limit(10).toList();
    }

    public Product createProduct(Product product) {
        return this.productRepository.save(product);
    }

    public List<Product> fetchProducts() {
        return this.productRepository.findAll();
    }

    public List<Product> getAllProducts() {
        return this.productRepository.findAll();
    }

    public List<Product> findByCategory(String category) {
        // Convert formatted category name back to original format for database search
        String originalCategory = convertToOriginalCategory(category);
        return this.productRepository.findByCategoriesContainingIgnoreCase(originalCategory);
    }

    private String convertToOriginalCategory(String formattedCategory) {
        if (formattedCategory == null || formattedCategory.isEmpty()) {
            return "";
        }
        
        // Convert back to original format
        switch (formattedCategory.toLowerCase()) {
            case "burger & chicken":
                return "BURGER_CHICKEN";
            case "hot food":
                return "HOT_FOOD";
            case "fast food":
                return "FAST_FOOD";
            default:
                // Convert to uppercase and replace spaces with underscores
                return formattedCategory.toUpperCase().replace(" ", "_");
        }
    }

    public List<Product> searchProducts(String keyword) {
        return this.productRepository.findByNameContainingIgnoreCaseOrDetailDescContainingIgnoreCase(keyword, keyword);
    }

    public List<String> getAllCategories() {
        List<String> rawCategories = this.productRepository.findDistinctCategories();
        return rawCategories.stream()
            .map(this::formatCategoryName)
            .distinct()
            .collect(java.util.stream.Collectors.toList());
    }
    
    public long getProductCountByCategory(String category) {
        return this.productRepository.countByCategoriesContainingIgnoreCase(category);
    }
    
    public java.util.Map<String, Long> getCategoryProductCounts() {
        java.util.Map<String, Long> counts = new java.util.HashMap<>();
        
        // Count for each main category
        counts.put("pizzaCount", getProductCountByCategory("PIZZA"));
        counts.put("burgerChickenCount", getProductCountByCategory("BURGER_CHICKEN"));
        counts.put("noodleCount", getProductCountByCategory("NOODLE"));
        counts.put("drinkCount", getProductCountByCategory("DRINK"));
        counts.put("riceCount", getProductCountByCategory("RICE"));
        
        return counts;
    }

    private String formatCategoryName(String category) {
        if (category == null || category.isEmpty()) {
            return "Other";
        }
        
        // Replace underscores with spaces and capitalize each word
        String formatted = category.replace("_", " ")
            .toLowerCase();
        
        // Capitalize first letter of each word
        String[] words = formatted.split(" ");
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            if (i > 0) result.append(" ");
            if (!words[i].isEmpty()) {
                result.append(words[i].substring(0, 1).toUpperCase())
                .append(words[i].substring(1));
            }
        }
        formatted = result.toString();
        
        // Special cases for better formatting
        switch (formatted.toLowerCase()) {
            case "burger chicken":
                return "Burger & Chicken";
            case "hot food":
                return "Hot Food";
            case "fast food":
                return "Fast Food";
            default:
                return formatted;
        }
    }

    public Optional<Product> fetchProductById(long id) {
            return this.productRepository.findById(id);
        }

    public void deleteProduct(long id) {
        this.productRepository.deleteById(id);
    }

    public void handleAddProductToCart(String email, long productId, HttpSession session, long quantity) {
        
        User user = this.userService.getUserByEmail(email);
        if (user != null) {
            // check if user have cart -- if not, add new it
            Cart cart = this.cartRepository.findByUser(user);
            if (cart == null) {
                // create new cart for user
                Cart otherCart = new Cart();
                otherCart.setUser(user);
                otherCart.setSum(0);
                cart = this.cartRepository.save(otherCart);
            }
            // save cart_details to the database
            //find product by id
            Optional<Product> productOptional = this.productRepository.findById(productId);

            if (productOptional.isPresent()) {
                Product realProduct = productOptional.get();
                
                // check if cart already has this product
                CartDetail oldDetail = this.cartDetailRepository.findByCartAndProduct(cart, realProduct);

                if (oldDetail == null) {
                    // Add new product to cart with specified quantity
                    CartDetail cartDetail = new CartDetail();
                    cartDetail.setCart(cart);
                    cartDetail.setProduct(realProduct);
                    cartDetail.setPrice(realProduct.getPrice());
                    cartDetail.setQuantity((int) quantity);
                    this.cartDetailRepository.save(cartDetail);

                    //update cart sum (add the quantity amount)
                    int sum = cart.getSum() + (int) quantity;
                    cart.setSum(sum);
                    this.cartRepository.save(cart);
                    session.setAttribute("sum", sum);
                }
                else {
                    // Product already exists, increase quantity by specified amount
                    oldDetail.setQuantity(oldDetail.getQuantity() + (int) quantity);
                    this.cartDetailRepository.save(oldDetail);
                    
                    //update cart sum (add the quantity amount)
                    int sum = cart.getSum() + (int) quantity;
                    cart.setSum(sum);
                    this.cartRepository.save(cart);
                    session.setAttribute("sum", sum);
                }
                
            }          
        }       
    }

    public Cart fetchByUser(User user) {
        return this.cartRepository.findByUser(user);
    }

    public void handleRemoveCartDetail(long cartDetailId, HttpSession session) {
        Optional<CartDetail> cartDetailOptional = this.cartDetailRepository.findById(cartDetailId);
        if (cartDetailOptional.isPresent()) {
            CartDetail cartDetail = cartDetailOptional.get();
            Cart currentCart = cartDetail.getCart();
            int quantityToRemove = (int) cartDetail.getQuantity();
            
            // Xóa cart detail
            this.cartDetailRepository.deleteById(cartDetailId);
            
            // Kiểm tra và cập nhật cart
            int newSum = currentCart.getSum() - quantityToRemove;
            if (newSum > 0) {
                // Update cart sum - trừ đi số lượng của sản phẩm bị xóa
                currentCart.setSum(newSum);
                this.cartRepository.save(currentCart);
                session.setAttribute("sum", newSum);
            } else {
                // Sum = 0 hoặc âm, xóa cart
                this.cartRepository.delete(currentCart);
                session.setAttribute("sum", 0);
            }
        }
    }

    public void handleUpdateCartBeforeCheckout(List<CartDetail> cartDetails) {
        for (CartDetail cartDetail : cartDetails) {
            Optional<CartDetail> cartDetailOptional = this.cartDetailRepository.findById(cartDetail.getId());

            if (cartDetailOptional.isPresent()) {
                CartDetail currentCartDetail = cartDetailOptional.get();
                currentCartDetail.setQuantity(cartDetail.getQuantity());
                this.cartDetailRepository.save(currentCartDetail);
            }
        }
    }

    public Order handlePlaceOrder(
        User user, HttpSession session, 
        String receiverName, String receiverAddress, String receiverPhone) {
            //create order details
            // step1: get cart of user
            Cart cart = this.cartRepository.findByUser(user);
            if (cart != null) {
                List<CartDetail> cartDetails = cart.getCartDetails();

                if (cartDetails!=null){
                     //create new order
                    Order order = new Order();
                    order.setUser(user);
                    order.setReceiverName(receiverName);
                    order.setReceiverAddress(receiverAddress);
                    order.setReceiverPhone(receiverPhone);  
                    order.setStatus("PENDING");
                    
                    double sum = 0;
                    
                    for (CartDetail cartDetail : cartDetails) {
                        sum += cartDetail.getPrice() * cartDetail.getQuantity();
                    }
                    order.setTotalPrice(sum);
                    order = this.orderRepository.save(order);

                    // create order detail
                    for (CartDetail cartDetail : cartDetails) {
                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.setOrder(order);
                    orderDetail.setProduct(cartDetail.getProduct());
                    orderDetail.setPrice(cartDetail.getPrice());
                    orderDetail.setQuantity(cartDetail.getQuantity());
                    
                    this.orderDetailRepository.save(orderDetail);
                }
                // step2: delete cart details and cart
                for (CartDetail cartDetail : cartDetails) {
                    this.cartDetailRepository.deleteById(cartDetail.getId());
                }

                this.cartRepository.deleteById(cart.getId());

                // step3: update session sum
                session.setAttribute("sum", 0);
                return order;
            }
        }
        return null;
    }
}