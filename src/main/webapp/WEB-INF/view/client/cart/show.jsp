<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
                <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Shopping Cart - FoodFlow</title>

                <!-- Google Web Fonts -->
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap"
                    rel="stylesheet">

                <!-- Icon Font Stylesheet -->
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

                <!-- Libraries Stylesheet -->
                <link href="/client/lib/lightbox/css/lightbox.min.css" rel="stylesheet">
                <link href="/client/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">

                <!-- Template Stylesheet -->
                <link href="/client/css/bootstrap.min.css" rel="stylesheet">
                <link href="/client/css/style.css" rel="stylesheet">
                
                <!-- Custom Stylesheets -->
                <link rel="stylesheet" href="/client/css/homepage.css">
                <link rel="stylesheet" href="/client/css/homepage-new.css">
                <link rel="stylesheet" href="/client/css/homepage-mobile.css">
                <link rel="stylesheet" href="/client/css/advanced-modal.css">
                <link rel="stylesheet" href="/client/css/user-dropdown.css">
                <link rel="stylesheet" href="/client/css/chat-popup.css">

            </head>

            <body>

                <!-- Navigation -->
                <jsp:include page="../layout/nav.jsp" />

                <!-- Sidebar -->
                <jsp:include page="../layout/sidebar.jsp" />

                <!-- Cart Page Start -->
                <div class="container-fluid py-3 mt-2">
                    <div class="container">
                        <div class="row g-4">
                            <div class="col-12">
                                <nav aria-label="breadcrumb" class="mb-3">
                                    <ol class="breadcrumb bg-light px-3 py-2 rounded">
                                        <li class="breadcrumb-item"><a href="/" class="text-decoration-none text-warning">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                                    </ol>
                                </nav>
                            </div>
                            <div class="col-12">
                                <!-- Cart Header -->
                                <div class="cart-header mb-4">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <button class="btn btn-link text-warning me-3" onclick="window.history.back()">
                                                <i class="fas fa-arrow-left fs-5"></i>
                                            </button>
                                            <h2 class="fw-bold mb-0">Your Shopping Cart</h2>
                                        </div>
                                        <div class="cart-actions">
                                            <span class="badge bg-warning text-dark fs-6">${cartDetails.size()} items</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <!-- Cart Items -->
                                    <div class="col-lg-8">
                                        <div class="cart-items-container">
                                            <c:choose>
                                                <c:when test="${empty cartDetails}">
                                                    <!-- Empty Cart State -->
                                                    <div class="empty-cart-state text-center py-5">
                                                        <div class="empty-cart-icon mb-4">
                                                            <i class="fas fa-shopping-cart text-muted" style="font-size: 4rem;"></i>
                                                        </div>
                                                        <h4 class="text-muted mb-3">Your cart is empty</h4>
                                                        <p class="text-muted mb-4">Add your favorite dishes to the cart</p>
                                                        <button class="btn btn-warning px-4" onclick="window.location.href='/'">
                                                            <i class="fas fa-utensils me-2"></i>Explore Food
                                                        </button>
                                                    </div>
                                                </c:when>
                                                <c:otherwise>
                                                    <!-- Cart Table Header -->
                                                    <div class="cart-table-header mb-3 bg-light rounded-3 p-3">
                                                        <div class="row align-items-center fw-bold text-dark">
                                                            <div class="col-md-5">Product</div>
                                                            <div class="col-md-3 text-center">Quantity</div>
                                                            <div class="col-md-2 text-center">Total</div>
                                                            <div class="col-md-2 text-center">Action</div>
                                                        </div>
                                                    </div>
                                                    
                                                    <!-- Cart Items List -->
                                                    <c:forEach var="cartDetail" items="${cartDetails}" varStatus="status">
                                                        <div class="cart-item-card mb-3 bg-white rounded-3 shadow-sm p-4">
                                                            <div class="row align-items-center">
                                                                <!-- Product Image -->
                                                                <div class="col-md-2 col-2">
                                                                    <div class="cart-item-image">
                                                                        <img src="/images/product/${cartDetail.product.image}" 
                                                                            class="img-fluid rounded-3" 
                                                                            style="width: 80px; height: 80px; object-fit: cover;" 
                                                                            alt="${cartDetail.product.name}">
                                                                    </div>
                                                                </div>
                                                                
                                                                <!-- Product Name & Price -->
                                                                <div class="col-md-3 col-4">
                                                                    <div class="cart-item-info">
                                                                        <h6 class="cart-item-name mb-1 fw-bold">
                                                                            <a href="/product/${cartDetail.product.id}" 
                                                                               class="text-decoration-none text-dark">
                                                                                ${cartDetail.product.name}
                                                                            </a>
                                                                        </h6>
                                                                        <div class="cart-item-price">
                                                                            <span class="text-warning fw-bold">
                                                                                <fmt:formatNumber type="number" value="${cartDetail.price}"/> đ
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <!-- Quantity Controls -->
                                                                <div class="col-md-3 col-3">
                                                                    <div class="quantity-controls d-flex justify-content-center">
                                                                        <div class="input-group" style="width: 120px;">
                                                                            <button class="btn btn-outline-warning btn-minus" type="button" 
                                                                                style="height: 38px; width: 38px; border-radius: 6px 0 0 6px; border-right: none; display: flex; align-items: center; justify-content: center;">
                                                                                <i class="fas fa-minus" style="font-size: 12px;"></i>
                                                                            </button>
                                                                            <input type="text" class="form-control text-center border-warning" 
                                                                                value="${cartDetail.quantity}"
                                                                                data-cart-detail-id="${cartDetail.id}"
                                                                                data-cart-detail-price="${cartDetail.price}"
                                                                                data-cart-detail-index="${status.index}"
                                                                                style="font-weight: 600; height: 38px; border-radius: 0; border-left: none; border-right: none; text-align: center; line-height: 38px; padding: 0; width: 44px;">
                                                                            <button class="btn btn-outline-warning btn-plus" type="button" 
                                                                                style="height: 38px; width: 38px; border-radius: 0 6px 6px 0; border-left: none; display: flex; align-items: center; justify-content: center;">
                                                                                <i class="fas fa-plus" style="font-size: 12px;"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                                <!-- Total Price -->
                                                                <div class="col-md-2 col-2">
                                                                    <div class="cart-item-total text-center">
                                                                        <span class="fw-bold text-warning fs-6" data-cart-detail-id="${cartDetail.id}">
                                                                            <fmt:formatNumber type="number" value="${cartDetail.price * cartDetail.quantity}"/> đ
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                
                                                                <!-- Delete Action -->
                                                                <div class="col-md-2 col-1">
                                                                    <div class="cart-item-actions text-center">
                                                                        <form method="post" action="/delete-cart-product/${cartDetail.id}" class="d-inline">
                                                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                                                            <button class="btn btn-outline-danger btn-sm" type="submit" title="Remove item">
                                                                                <i class="fas fa-trash"></i>
                                                                            </button>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </c:forEach>
                                                </c:otherwise>
                                            </c:choose>
                                        </div>
                                    </div>
                                    <!-- Cart Summary -->
                                    <div class="col-lg-4">
                                        <div class="cart-summary-container">
                                            <c:if test="${not empty cartDetails}">
                                                <!-- Delivery Info -->
                                                <div class="delivery-info-card mb-4 bg-white rounded-3 shadow-sm p-4">
                                                    <h6 class="fw-bold mb-3">
                                                        <i class="fas fa-map-marker-alt text-warning me-2"></i>Delivery Information
                                                    </h6>
                                                    <div class="delivery-address">
                                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                                            <div class="d-flex align-items-center">
                                                                <div class="delivery-status-dot bg-success rounded-circle me-2" style="width: 8px; height: 8px;"></div>
                                                                <span class="fw-bold">Standard Delivery</span>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex justify-content-between text-muted">
                                                            <span><i class="fas fa-clock me-1"></i>20-30 minutes</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Order Summary -->
                                                <div class="order-summary-card bg-white rounded-3 shadow-sm p-4">
                                                    <h6 class="fw-bold mb-3">
                                                        <i class="fas fa-receipt text-warning me-2"></i>Order Summary
                                                    </h6>
                                                    <div class="summary-details">
                                                        <div class="d-flex justify-content-between mb-3">
                                                            <span>Subtotal (${cartDetails.size()} items)</span>
                                                            <span data-cart-total-price="${totalPrice}">
                                                                <fmt:formatNumber type="number" value="${totalPrice}"/> đ
                                                            </span>
                                                        </div>
                                                        <div class="d-flex justify-content-between mb-3">
                                                            <span>Shipping fee</span>
                                                            <span>0 đ</span>
                                                        </div>
                                                        <hr>
                                                        <div class="d-flex justify-content-between fw-bold text-warning fs-5">
                                                            <span>Total</span>
                                                            <span data-cart-total-price="${totalPrice}">
                                                                <fmt:formatNumber type="number" value="${totalPrice}"/> đ
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div class="checkout-actions mt-4">
                                                        <form:form action="/confirm-checkout" method="post" modelAttribute="cart">
                                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                                            <div style="display: none;">
                                                                <c:forEach var="cartDetail" items="${cart.cartDetails}" varStatus="status">
                                                                    <div class="mb-3">
                                                                        <div class="form-group">
                                                                            <form:input type="text" class="form-control"  
                                                                                value="${cartDetail.id}" 
                                                                                path="cartDetails[${status.index}].id"/>
                                                                        </div>
                                                                        <div class="form-group">
                                                                            <form:input type="text" class="form-control"  
                                                                                id="cartDetails${status.index}.quantity"
                                                                                value="${cartDetail.quantity}" 
                                                                                path="cartDetails[${status.index}].quantity"/>
                                                                        </div>       
                                                                    </div>
                                                                </c:forEach>
                                                            </div>
                                                            <button type="submit" class="btn btn-warning w-100 fw-bold mb-3">
                                                                <i class="fas fa-credit-card me-2"></i>Proceed to Checkout
                                                            </button>
                                                        </form:form>
                                                        <!-- <button class="btn btn-outline-warning w-100" onclick="window.location.href='/'">
                                                            <i class="fas fa-plus me-2"></i>Add More Items
                                                        </button> -->
                                                    </div>
                                                </div>
                                            </c:if>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Cart Page End -->

                <jsp:include page="../layout/footer.jsp" />

                <!-- JavaScript Libraries -->
                    <link href="/client/lib/lightbox/css/lightbox.min.css" rel="stylesheet">
                    <link href="/client/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">

                    <link rel="stylesheet" href="/client/css/homepage.css">
                    <link rel="stylesheet" href="/client/css/homepage-new.css">
                    <link rel="stylesheet" href="/client/css/homepage-mobile.css">
                    <link rel="stylesheet" href="/client/css/advanced-modal.css">
                    <link rel="stylesheet" href="/client/css/user-dropdown.css">
                    <link rel="stylesheet" href="/client/css/chat-popup.css">
                    <!-- Customized Bootstrap Stylesheet -->
                    <link href="/client/css/bootstrap.min.css" rel="stylesheet">

                <!-- Custom CSS for Cart Page -->
                <style>
                    .cart-header {
                        background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
                        padding: 1.5rem;
                        border-radius: 15px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    }
                    
                    .cart-item-card {
                        border: 1px solid #e9ecef;
                        transition: all 0.3s ease;
                    }
                    
                    .cart-item-card:hover {
                        box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
                        transform: translateY(-2px);
                    }
                    
                    .cart-item-image img {
                        border-radius: 10px;
                        transition: transform 0.3s ease;
                    }
                    
                    .cart-item-card:hover .cart-item-image img {
                        transform: scale(1.05);
                    }
                    
                    .delivery-info-card, .order-summary-card {
                        border: 1px solid #e9ecef;
                        transition: all 0.3s ease;
                    }
                    
                    .delivery-info-card:hover, .order-summary-card:hover {
                        box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
                        transform: translateY(-2px);
                    }
                    
                    .quantity-controls .btn:hover {
                        background-color: #ffc107;
                        color: white;
                        border-color: #ffc107;
                    }
                    
                    .btn-warning:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4) !important;
                    }
                    
                    .empty-cart-state {
                        background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
                        border-radius: 15px;
                        border: 2px dashed #dee2e6;
                    }
                    
                    .form-control:focus {
                        border-color: #ffc107;
                        box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
                    }
                </style>

                <!-- Cart JavaScript -->
                <script>
                    $(document).ready(function() {
                        // Handle quantity buttons
                        $('.btn-plus').click(function() {
                            var input = $(this).siblings('input[type="text"]');
                            var currentValue = parseInt(input.val());
                            var cartDetailId = input.data('cart-detail-id');
                            var cartDetailPrice = input.data('cart-detail-price');
                            var cartDetailIndex = input.data('cart-detail-index');
                            
                            var newValue = currentValue + 1;
                            input.val(newValue);
                            
                            // Update hidden form field
                            $('#cartDetails' + cartDetailIndex + '\\.quantity').val(newValue);
                            
                            // Update total for this item
                            var newTotal = cartDetailPrice * newValue;
                            $('span[data-cart-detail-id="' + cartDetailId + '"]').html(
                                newTotal.toLocaleString() + ' đ'
                            );
                            
                            updateCartTotals();
                        });
                        
                        $('.btn-minus').click(function() {
                            var input = $(this).siblings('input[type="text"]');
                            var currentValue = parseInt(input.val());
                            var cartDetailId = input.data('cart-detail-id');
                            var cartDetailPrice = input.data('cart-detail-price');
                            var cartDetailIndex = input.data('cart-detail-index');
                            
                            if (currentValue > 1) {
                                var newValue = currentValue - 1;
                                input.val(newValue);
                                
                                // Update hidden form field
                                $('#cartDetails' + cartDetailIndex + '\\.quantity').val(newValue);
                                
                                // Update total for this item
                                var newTotal = cartDetailPrice * newValue;
                                $('span[data-cart-detail-id="' + cartDetailId + '"]').html(
                                    newTotal.toLocaleString() + ' đ'
                                );
                                
                                updateCartTotals();
                            }
                        });
                        
                        function updateCartTotals() {
                            var totalPrice = 0;
                            $('span[data-cart-detail-id]').each(function() {
                                var itemTotal = parseFloat($(this).text().replace(/[^\d]/g, ''));
                                totalPrice += itemTotal;
                            });
                            
                            $('span[data-cart-total-price]').html(totalPrice.toLocaleString() + ' đ');
                        }
                    });
                </script>
            </body>
            </html>