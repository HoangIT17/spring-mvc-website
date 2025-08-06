<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
        <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Checkout - FoodFloww</title>

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

                <!-- Checkout Start -->
                <div class="container-fluid py-3 mt-2">
                    <div class="container">
                        <div class="row g-4">
                            <div class="col-12">
                                <nav aria-label="breadcrumb" class="mb-3">
                                    <ol class="breadcrumb bg-light px-3 py-2 rounded">
                                        <li class="breadcrumb-item"><a href="/" class="text-decoration-none text-warning">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                                    </ol>
                                </nav>
                            </div>
                            <div class="col-12">
                                <!-- Checkout Header -->
                                <div class="cart-header mb-4">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <button class="btn btn-link text-warning me-3" onclick="window.location.href='/cart'">
                                                <i class="fas fa-arrow-left fs-5"></i>
                                            </button>
                                            <h2 class="fw-bold mb-0">Checkout</h2>
                                        </div>
                                        <div class="cart-actions">
                                            <span class="badge bg-warning text-dark fs-6">${cartDetails.size()} items</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Product Information Section -->
                        <div class="row mb-5">
                            <div class="col-12">
                                <!-- Cart Table Header -->
                                <div class="cart-table-header mb-3 bg-light rounded-3 p-3">
                                    <div class="row align-items-center fw-bold text-dark">
                                        <div class="col-md-5">Product</div>
                                        <div class="col-md-2 text-center">Price</div>
                                        <div class="col-md-2 text-center">Quantity</div>
                                        <div class="col-md-3 text-center">Total</div>
                                    </div>
                                </div>
                                
                                <!-- Product Items List -->
                                <c:forEach var="cartDetail" items="${cartDetails}" varStatus="status">
                                    <div class="cart-item-card mb-3 bg-white rounded-3 shadow-sm p-4">
                                        <div class="row align-items-center">
                                            <!-- Product Image -->
                                            <div class="col-md-2 col-3">
                                                <div class="cart-item-image">
                                                    <img src="/images/product/${cartDetail.product.image}" 
                                                        class="img-fluid rounded-3" 
                                                        style="width: 80px; height: 80px; object-fit: cover;" 
                                                        alt="${cartDetail.product.name}">
                                                </div>
                                            </div>
                                            
                                            <!-- Product Name -->
                                            <div class="col-md-3 col-5">
                                                <div class="cart-item-info">
                                                    <h6 class="cart-item-name mb-0 fw-bold">
                                                        ${cartDetail.product.name}
                                                    </h6>
                                                </div>
                                            </div>
                                            
                                            <!-- Price -->
                                            <div class="col-md-2 col-4">
                                                <div class="text-center">
                                                    <span class="text-warning fw-bold">
                                                        <fmt:formatNumber type="number" value="${cartDetail.price}"/> đ
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <!-- Quantity -->
                                            <div class="col-md-2 col-4">
                                                <div class="text-center">
                                                    <span class="fw-bold badge bg-light text-dark px-3 py-2">
                                                        ${cartDetail.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <!-- Total Price -->
                                            <div class="col-md-3 col-4">
                                                <div class="text-center">
                                                    <span class="fw-bold text-warning fs-6">
                                                        <fmt:formatNumber type="number" value="${cartDetail.price * cartDetail.quantity}"/> đ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </c:forEach>
                            </div>
                        </div>

                        <c:if test="${not empty cartDetails}">
                        <form:form action="/place-order" method="post" modelAttribute="cart">
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                            <div class="row g-4">
                                <!-- Left Side - Customer Information -->
                                <div class="col-lg-8 d-flex">
                                    <div class="delivery-info-card bg-white rounded-3 shadow-sm p-4 w-100 d-flex flex-column">
                                        <h6 class="fw-bold mb-4">
                                            <i class="fas fa-user text-warning me-2"></i>Customer Information
                                        </h6>
                                        
                                        <div class="row g-3 flex-grow-1">
                                            <div class="col-12">
                                                <label class="form-label fw-bold">Full Name</label>
                                                <input type="text" class="form-control border-warning" name="receiverName" placeholder="Enter your full name" required>
                                            </div>
                                            
                                            <div class="col-12">
                                                <label class="form-label fw-bold">Delivery Address</label>
                                                <input type="text" class="form-control border-warning" name="receiverAddress" placeholder="Enter your address" required>
                                            </div>
                                            
                                            <div class="col-12">
                                                <label class="form-label fw-bold">Phone Number</label>
                                                <input type="tel" class="form-control border-warning" name="receiverPhone" placeholder="Enter your phone number" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Right Side - Payment Summary -->
                                <div class="col-lg-4 d-flex">
                                    <div class="order-summary-card bg-white rounded-3 shadow-sm p-4 w-100 d-flex flex-column">
                                        <h6 class="fw-bold mb-3">
                                            <i class="fas fa-receipt text-warning me-2"></i>Order Summary
                                        </h6>
                                        
                                        <div class="summary-details flex-grow-1">
                                            <div class="d-flex justify-content-between mb-3">
                                                <span>Subtotal (${cartDetails.size()} items)</span>
                                                <span><fmt:formatNumber type="number" value="${totalPrice}"/> đ</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-3">
                                                <span>Shipping fee</span>
                                                <span>0 đ</span>
                                            </div>
                                            <div class="d-flex justify-content-between mb-3">
                                                <span>Payment method</span>
                                                <span class="text-muted">Cash on Delivery</span>
                                            </div>
                                            <hr>
                                            <div class="d-flex justify-content-between fw-bold text-warning fs-5 mb-4">
                                                <span>Total</span>
                                                <span><fmt:formatNumber type="number" value="${totalPrice}"/> đ</span>
                                            </div>
                                        </div>

                                        <div class="checkout-actions mt-auto">
                                            <button type="submit" class="btn btn-warning w-100 fw-bold mb-3">
                                                <i class="fas fa-credit-card me-2"></i>Place Order
                                            </button>
                                            <a href="/cart" class="btn btn-outline-warning w-100">
                                                <i class="fas fa-arrow-left me-2"></i>Back to Cart
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form:form>
                        </c:if>
                    </div>
                </div>
                <!-- Checkout End -->

                <jsp:include page="../layout/footer.jsp" />

                <!-- JavaScript Libraries -->
                <script src="/client/lib/jquery/jquery.min.js"></script>
                <script src="/client/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
                <script src="/client/lib/lightbox/js/lightbox.min.js"></script>
                <script src="/client/lib/owlcarousel/owl.carousel.min.js"></script>
                <script src="/client/js/main.js"></script>

                <!-- Custom CSS for Checkout Page -->
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
                    
                    .delivery-info-card, .order-summary-card {
                        border: 1px solid #e9ecef;
                        transition: all 0.3s ease;
                    }
                    
                    .delivery-info-card:hover, .order-summary-card:hover {
                        box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
                        transform: translateY(-2px);
                    }
                    
                    .btn-warning:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(255, 193, 7, 0.4) !important;
                    }
                    
                    .form-control:focus {
                        border-color: #ffc107;
                        box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
                    }
                    
                    .cart-table-header {
                        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%) !important;
                    }
                </style>
            </body>
            </html>