<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FoodFlow - Food Delivery Platform</title>
    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap"
        rel="stylesheet">
    <!-- Libraries Stylesheet -->
    <link href="/client/lib/lightbox/css/lightbox.min.css" rel="stylesheet">
    <link href="/client/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Custom CSS -->
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

    <!-- Main Content -->
    <div class="main-content">
        <!-- Banner Section -->
        <jsp:include page="../layout/banner.jsp" />

        <!-- Popular Categories Section -->
        <jsp:include page="../layout/categories.jsp" />

        <!-- Fruits Shop Start-->
        <div class="container-fluid fruite py-3">
            <div class="container py-3">
                <div class="tab-class text-center">
                    <div class="row g-4">
                        <div class="col-lg-4 text-start">
                            <h2 class="section-title">Featured dishes</h2>
                            <p class="section-subtitle">Highest rated dishes</p>
                        </div>
                        <div class="col-lg-8 text-end">
                            <ul class="nav nav-pills d-inline-flex text-center mb-5">
                                <li class="nav-item">
                                    <a class="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill"
                                        href="#tab-1">
                                        <a href="Product.html" class="btn btn-outline-warning">View all dishes</a>
                                        <!-- <span class="text-dark" style="width: 130px;">All Products</span> -->
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="tab-content">
                        <div id="tab-1" class="tab-pane fade show p-0 active">
                            <div class="row g-4">
                                <div class="col-lg-12">
                                    <div class="row g-4 d-flex align-items-stretch">
                                        <c:forEach var="product" items="${products}" varStatus="status">
                                            <div class="col-md-6 col-lg-4 col-xl-3 d-flex">
                                                <div class="rounded position-relative fruite-item shadow-sm border-0 w-100 d-flex flex-column" style="transition: transform 0.3s ease;">
                                                    <div class="fruite-img position-relative">
                                                        <a href="/product/${product.id}">
                                                            <img src="/images/product/${product.image}"
                                                                class="img-fluid w-100 rounded-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                                                        </a>
                                                        
                                                        <!-- Save Badge -->
                                                        <c:choose>
                                                            <c:when test="${status.index % 3 == 0}">
                                                                <div class="bg-danger text-white px-2 py-1 rounded position-absolute" style="top: 10px; left: 10px; font-size: 12px; font-weight: bold;">
                                                                    Save 15%
                                                                </div>
                                                            </c:when>
                                                            <c:when test="${status.index % 3 == 1}">
                                                                <div class="bg-success text-white px-2 py-1 rounded position-absolute" style="top: 10px; left: 10px; font-size: 12px; font-weight: bold;">
                                                                    Save 10%
                                                                </div>
                                                            </c:when>
                                                        </c:choose>

                                                        <!-- Heart Icon -->
                                                        <div class="position-absolute" style="top: 10px; right: 10px;">
                                                            <button class="btn btn-light rounded-circle p-2 shadow-sm border-0 heart-btn" style="width: 40px; height: 40px;">
                                                                <i class="far fa-heart text-muted"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="p-3 bg-white rounded-bottom flex-fill d-flex flex-column">
                                                        <h5 class="mb-2" style="font-size: 16px; font-weight: 600; line-height: 1.4;">
                                                            <a href="/product/${product.id}" class="text-dark text-decoration-none">
                                                                ${product.name}
                                                            </a>
                                                        </h5>
                                                        
                                                        <p class="text-muted mb-2 flex-fill" style="font-size: 13px; line-height: 1.3;">
                                                            ${product.detailDesc}
                                                        </p>
                                                        
                                                        <!-- Rating -->
                                                        <jsp:include page="../layout/rating.jsp" />
                                                        
                                                        <div class="d-flex align-items-center justify-content-between mt-auto">
                                                            <!-- Price Section -->
                                                            <div class="price-section">
                                                                <div class="price-badge">
                                                                    <span class="price-amount">
                                                                        <fmt:formatNumber type="number" value="${product.price}" pattern="#,###" />
                                                                    </span>
                                                                    <span class="currency">đ</span>
                                                                </div>
                                                            </div>
                                                            
                                                            <!-- Add to Cart Button -->
                                                            <div>
                                                                <c:choose>
                                                                    <c:when test="${not empty pageContext.request.userPrincipal}">
                                                                        <form action="/add-product-to-cart/${product.id}" method="post" class="d-inline">
                                                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                                                                            <button class="btn btn-warning rounded-pill px-4 py-2" style="font-size: 13px; font-weight: 600; min-width: 120px;">
                                                                                <i class="fas fa-cart-plus me-2"></i>Add to Cart
                                                                            </button>
                                                                        </form>
                                                                    </c:when>
                                                                    <c:otherwise>
                                                                        <button class="btn btn-warning rounded-pill px-4 py-2" style="font-size: 13px; font-weight: 600; min-width: 120px;" 
                                                                                onclick="showLoginRequired()">
                                                                            <i class="fas fa-cart-plus me-2"></i>Add to Cart
                                                                        </button>
                                                                    </c:otherwise>
                                                                </c:choose>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </c:forEach>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fruits Shop End-->


        <!-- Why Choose Us Section -->
        <!-- <section class="why-choose-us">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="section-title">Why choose FoodFlow?</h2>
                    <p class="section-subtitle">We are committed to delivering the best experience</p>
                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <h5>Fast delivery</h5>
                            <p>Delivery within 30 minutes or it's free</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h5>Food safety</h5>
                            <p>All partners are strictly quality checked</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-credit-card"></i>
                            </div>
                            <h5>Multiple payments</h5>
                            <p>Support many convenient payment methods</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="feature-card">
                            <div class="feature-icon">
                                <i class="fas fa-headset"></i>
                            </div>
                            <h5>24/7 support</h5>
                            <p>Customer service team always ready to help</p>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

    <!-- Food Modal -->
    <div class="modal fade" id="foodModal" tabindex="-1" aria-labelledby="modalFoodName" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img id="modalFoodImage" src="" alt="" class="w-100 rounded mb-3">
                            <!-- Product Description moved below image -->
                            <div class="product-description">
                                <h6 class="fw-bold text-warning mb-2">Product description</h6>
                                <p id="modalFoodDescription" class="text-muted mb-3" style="line-height: 1.6;">
                                    Dishes are prepared from the freshest ingredients, ensuring quality and food safety.
                                    With exclusive recipes and modern cooking techniques, each dish brings distinctive
                                    flavors and excellent culinary experience for diners.
                                </p>
                                <div class="product-features">
                                    <small class="text-muted d-block mb-1"><i
                                            class="fas fa-check-circle text-success me-2"></i>Fresh ingredients</small>
                                    <small class="text-muted d-block mb-1"><i
                                            class="fas fa-check-circle text-success me-2"></i>Made to order</small>
                                    <small class="text-muted d-block"><i
                                            class="fas fa-check-circle text-success me-2"></i>Hygienic and safe</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h3 id="modalFoodName" class="fw-bold mb-3"></h3>
                            <div class="rating mb-3">
                                <div class="stars" id="modalStars"></div>
                                <span id="modalRating" class="ms-2 text-muted"></span>
                            </div>
                            <div class="price-section mb-4">
                                <span class="price fw-bold fs-4" id="modalPrice"></span>
                            </div>

                            <!-- Special Notes Section -->
                            <div class="special-notes mb-4">
                                <h6 class="fw-bold mb-3">Special notes:</h6>
                                <div class="notes-options">
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="checkbox" id="noteSpicy">
                                        <label class="form-check-label" for="noteSpicy">Less sugar</label>
                                    </div>
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="checkbox" id="noteNoOnion">
                                        <label class="form-check-label" for="noteNoOnion">Extra ice</label>
                                    </div>
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="checkbox" id="noteHot">
                                        <label class="form-check-label" for="noteHot">No onions</label>
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox" id="noteExtraSpice">
                                        <label class="form-check-label" for="noteExtraSpice">Less salt</label>
                                    </div>
                                </div>
                                <textarea class="form-control" rows="2" placeholder="Other notes..."
                                    id="customNotes"></textarea>
                            </div>

                            <div class="quantity-section mb-4">
                                <label class="form-label">Quantity:</label>
                                <div class="quantity-controls">
                                    <button class="btn btn-outline-warning" id="decreaseQty">-</button>
                                    <span class="quantity" id="modalQuantity">1</span>
                                    <button class="btn btn-outline-warning" id="increaseQty">+</button>
                                </div>
                            </div>
                            <button class="btn btn-warning w-100 fw-bold" id="addToCartBtn">
                                <i class="fas fa-cart-plus me-2"></i>Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Login Required Modal -->
    <div class="modal fade" id="loginRequiredModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content login-required-modal">
                <div class="modal-body text-center p-4">
                    <div class="login-icon mb-3">
                        <i class="fas fa-lock text-warning" style="font-size: 3rem;"></i>
                    </div>
                    <h4 class="fw-bold mb-2">Login Required</h4>
                    <p class="text-muted mb-4">Please login to add products to your cart!</p>
                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-outline-secondary" data-bs-dismiss="modal">Later</button>
                        <a href="/login" class="btn btn-warning">
                            <i class="fas fa-sign-in-alt me-1"></i>Login Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="successToast" class="toast" role="alert">
            <div class="toast-header">
                <i class="fas fa-check-circle text-success me-2"></i>
                <strong class="me-auto">Success</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body" id="toastMessage">
                Added to cart!
            </div>
        </div>
    </div>

    <!-- Simple Bootstrap Footer -->
    <jsp:include page="../layout/footer.jsp" />

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- JavaScript Libraries -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="/client/lib/easing/easing.min.js"></script>
    <script src="/client/lib/waypoints/waypoints.min.js"></script>
    <script src="/client/lib/lightbox/js/lightbox.min.js"></script>
    <script src="/client/lib/owlcarousel/owl.carousel.min.js"></script>

    <!-- Template Javascript -->
    <script src="/client/js/main.js"></script>
    <!-- Custom JS -->
    <script src="/client/homepage.js"></script>
    <script src="/client/chat-popup.js"></script>

    <!-- Custom CSS for Product Cards -->
    <style>
        .fruite-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }

        .heart-btn {
            transition: all 0.3s ease;
        }

        .heart-btn:hover {
            background-color: #ff6b6b !important;
            transform: scale(1.1);
        }

        .heart-btn:hover i {
            color: white !important;
        }

        .heart-btn.active {
            background-color: #ff6b6b !important;
        }

        .heart-btn.active i {
            color: white !important;
        }

        .rating-stars {
            letter-spacing: 1px;
        }

        .price-section {
            position: relative;
        }

        .price-badge {
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffc107 100%);
            padding: 6px 12px;
            border-radius: 20px;
            box-shadow: 0 3px 12px rgba(255, 107, 53, 0.3);
            display: inline-block;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .price-badge:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 18px rgba(255, 107, 53, 0.4);
        }

        .price-badge::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }

        .price-badge:hover::before {
            left: 100%;
        }

        .price-amount {
            color: white;
            font-weight: 700;
            font-size: 16px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
            font-family: 'Raleway', sans-serif;
        }

        .currency {
            color: white;
            font-weight: 600;
            font-size: 14px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
            margin-left: 2px;
        }

        .price {
            font-family: 'Raleway', sans-serif;
        }

        .btn-warning {
            transition: all 0.3s ease;
        }

        .btn-warning:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(255, 193, 7, 0.4);
        }
    </style>

    <!-- Heart Button Toggle Script -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Heart button toggle
            document.querySelectorAll('.heart-btn').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const icon = this.querySelector('i');
                    if (icon.classList.contains('far')) {
                        icon.classList.remove('far', 'text-muted');
                        icon.classList.add('fas', 'text-white');
                        this.classList.add('active');
                    } else {
                        icon.classList.remove('fas', 'text-white');
                        icon.classList.add('far', 'text-muted');
                        this.classList.remove('active');
                    }
                });
            });
        });

        // Show login required modal
        function showLoginRequired() {
            var loginModal = new bootstrap.Modal(document.getElementById('loginRequiredModal'));
            loginModal.show();
        }
    </script>
</body>

</html>