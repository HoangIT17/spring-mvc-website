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

    public ProductService(ProductRepository productRepository, 
        CartRepository cartRepository, 
        CartDetailRepository cartDetailRepository,
        UserService userService,
        OrderRepository orderRepository,
        OrderDetailRepository orderDetailRepository) {
            this.productRepository = productRepository;
            this.cartRepository = cartRepository;
            this.cartDetailRepository = cartDetailRepository;
            this.userService = userService;
            this.orderRepository = orderRepository;
            this.orderDetailRepository = orderDetailRepository;
    }

    public Product createProduct(Product product) {
        return this.productRepository.save(product);
    }

    public List<Product> fetchProducts() {
        return this.productRepository.findAll();
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

    public void handlePlaceOrder(
        User user, HttpSession session, 
        String receiverName, String receiverAddress, String receiverPhone) {
            //create new order
            Order order = new Order();
            order.setUser(user);
            order.setReceiverName(receiverName);
            order.setReceiverAddress(receiverAddress);
            order.setReceiverPhone(receiverPhone);  
            order = this.orderRepository.save(order);

            //create order details
            // step1: get cart of user
            Cart cart = this.cartRepository.findByUser(user);
            if (cart != null) {
                List<CartDetail> cartDetails = cart.getCartDetails();
                if (cartDetails!=null){
                    for (CartDetail cartDetail : cartDetails) {
                    // create order detail
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
            }
        }
    }
}