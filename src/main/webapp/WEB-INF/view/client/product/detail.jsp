<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>   
    <%@page contentType="text/html" pageEncoding="UTF-8" %>
        <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
            
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="utf-8">
                <title>${product.name} - Food Flow</title>
                <meta content="width=device-width, initial-scale=1.0" name="viewport">
                <meta content="" name="keywords">
                <meta content="" name="description">

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

                <link rel="stylesheet" href="/client/css/homepage.css">
                <link rel="stylesheet" href="/client/css/homepage-new.css">
                <link rel="stylesheet" href="/client/css/homepage-mobile.css">
                <link rel="stylesheet" href="/client/css/advanced-modal.css">
                <link rel="stylesheet" href="/client/css/user-dropdown.css">
                <link rel="stylesheet" href="/client/css/chat-popup.css">
                <!-- Customized Bootstrap Stylesheet -->
                <link href="/client/css/bootstrap.min.css" rel="stylesheet">

            </head>

            <body>

                <!-- Navigation -->
                <jsp:include page="../layout/nav.jsp" />

                <!-- Sidebar -->
                <jsp:include page="../layout/sidebar.jsp" />

                <!-- Single Product Start -->
                <div class="container-fluid py-3 mt-2">
                    <div class="container">
                        <div class="row g-4">
                            <div class="col-12">
                                <nav aria-label="breadcrumb" class="mb-3">
                                    <ol class="breadcrumb bg-light px-3 py-2 rounded">
                                        <li class="breadcrumb-item"><a href="/" class="text-decoration-none">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Product Details</li>
                                    </ol>
                                </nav>
                            </div>
                            <div class="col-lg-8 col-xl-9">
                                <div class="row g-4">
                                    <div class="col-lg-5">
                                        <div class="product-image-container border-0 rounded-3 shadow-sm p-3 bg-white">
                                            <div class="position-relative">
                                                <img src="/images/product/${product.image}" 
                                                    class="img-fluid rounded-3 w-100"
                                                    alt="${product.name}" 
                                                    style="height: 400px; object-fit: cover; transition: transform 0.3s ease;">
                                                <div class="image-overlay position-absolute top-0 start-0 w-100 h-100 rounded-3" 
                                                    style="background: linear-gradient(45deg, rgba(255,193,7,0.1), rgba(255,107,53,0.1)); opacity: 0; transition: opacity 0.3s ease;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-7">
                                        <div class="product-info bg-white rounded-3 shadow-sm p-4">
                                            <h2 class="fw-bold mb-3 text-dark" style="font-size: 2rem;">${product.name}</h2>
                                            
                                            <div class="product-category mb-3">
                                                <span class="badge text-white px-3 py-2 rounded-pill shadow-sm" 
                                                    style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffc107 100%) !important; font-size: 0.9rem; border: none;">
                                                    <i class="fas fa-tag me-2"></i>${product.categories}
                                                </span>
                                            </div>
                                            
                                            <div class="price-section mb-4">
                                                <h3 class="price-display fw-bold mb-0" 
                                                    style="color: #ff6b35; font-size: 2.2rem; font-family: 'Raleway', sans-serif;">
                                                    <fmt:formatNumber type="number" value="${product.price}" pattern="#,###" /> 
                                                    <span style="font-size: 1.5rem;">đ</span>
                                                </h3>
                                            </div>
                                            
                                            <div class="rating-section d-flex align-items-center mb-3">
                                                <div class="stars me-3">
                                                    <i class="fas fa-star text-warning"></i>
                                                    <i class="fas fa-star text-warning"></i>
                                                    <i class="fas fa-star text-warning"></i>
                                                    <i class="fas fa-star text-warning"></i>
                                                    <i class="fas fa-star text-muted"></i>
                                                </div>
                                            </div>
                                            
                                            <div class="product-description mb-2">
                                                <p class="text-muted mb-2" style="line-height: 1.8; font-size: 1.1rem;">
                                                    ${product.detailDesc}
                                                </p>
                                            </div>
                                            
                                            <div class="quantity-cart-section">
                                                <div class="quantity-selector mb-3 d-flex align-items-center">
                                                    <label class="form-label fw-bold text-dark mb-0 me-3">Quantity:</label>
                                                    <div class="input-group" style="width: 120px;">
                                                        <button class="btn btn-outline-warning btn-minus" type="button" 
                                                            style="height: 38px; width: 38px; border-radius: 6px 0 0 6px; border-right: none; display: flex; align-items: center; justify-content: center;">
                                                            <i class="fas fa-minus" style="font-size: 12px;"></i>
                                                        </button>
                                                        <input type="text" class="form-control text-center border-warning" 
                                                            value="1" id="quantity" name="quantity" 
                                                            style="font-weight: 600; height: 38px; border-radius: 0; border-left: none; border-right: none; text-align: center; line-height: 38px; padding: 0; width: 44px;">
                                                        <button class="btn btn-outline-warning btn-plus" type="button" 
                                                            style="height: 38px; width: 38px; border-radius: 0 6px 6px 0; border-left: none; display: flex; align-items: center; justify-content: center;">
                                                            <i class="fas fa-plus" style="font-size: 12px;"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <form method="post" action="/add-product-to-cart/${product.id}">
                                                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                                    <input type="hidden" name="quantity" id="hiddenQuantity" value="1"/>
                                                    <button type="submit" class="btn btn-warning rounded-pill px-5 py-3 fw-bold text-white shadow-lg" 
                                                            style="font-size: 1.1rem; background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffc107 100%); border: none; transition: all 0.3s ease;">
                                                        <i class="fas fa-shopping-cart me-2"></i> Add to Cart
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-xl-3">
                                <div class="row g-4 fruite">
                                    <div class="col-lg-12">

                                        <div class="mb-4">
                                            <h4>Categories</h4>
                                            <ul class="list-unstyled fruite-categorie">
                                                <li>
                                                    <div class="d-flex justify-content-between fruite-name">
                                                        <a href="#" class="d-flex align-items-center"><i class="fas fa-pizza-slice me-2" style="width: 16px; text-align: center;"></i>Pizza</a>
                                                        <span>(12)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="d-flex justify-content-between fruite-name">
                                                        <a href="#" class="d-flex align-items-center"><i class="fas fa-hamburger me-2" style="width: 16px; text-align: center;"></i>Burgers & Chicken</a>
                                                        <span>(8)</span>
                                                    </div>
                                                </li>
                    
                                                <li>
                                                    <div class="d-flex justify-content-between fruite-name">
                                                        <a href="#" class="d-flex align-items-center"><i class="fas fa-fish me-2" style="width: 16px; text-align: center;"></i>Noodles</a>
                                                        <span>(6)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="d-flex justify-content-between fruite-name">
                                                        <a href="#" class="d-flex align-items-center"><i class="fas fa-coffee me-2" style="width: 16px; text-align: center;"></i>Drinks</a>
                                                        <span>(20)</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="d-flex justify-content-between fruite-name">
                                                        <a href="#" class="d-flex align-items-center"><i class="fas fa-utensils me-2" style="width: 16px; text-align: center;"></i>Rice</a>
                                                        <span>(15)</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <!-- Related Products Section -->
                                        <div class="mb-4">
                                            <h4 class="mb-3">Related Products</h4>
                                            <div class="related-products d-flex flex-column">
                                                <!-- Product 1: Grilled Chicken Rice -->
                                                <div class="card mb-3 border-0 shadow-sm flex-fill">
                                                    <div class="card-body p-2 h-100 d-flex">
                                                        <div class="row g-2 align-items-center w-100">
                                                            <div class="col-4 d-flex align-items-center">
                                                                <img src="/client/img/ComGaNuong.png" 
                                                                        class="img-fluid rounded" 
                                                                        alt="Grilled Chicken Rice" 
                                                                        style="width: 70px; height: 70px; object-fit: cover;">
                                                            </div>
                                                            <div class="col-8 d-flex flex-column justify-content-center">
                                                                <h6 class="card-title mb-1" style="font-size: 0.9rem; line-height: 1.2;">
                                                                    <a href="#" class="text-decoration-none text-dark">Grilled Chicken Rice</a>
                                                                </h6>
                                                                <div class="rating mb-1">
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-secondary" style="font-size: 0.7rem;"></i>
                                                                </div>
                                                                <p class="text-primary fw-bold mb-0" style="font-size: 0.9rem;">115,000 đ</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Product 2: Carbonara Pasta -->
                                                <div class="card mb-3 border-0 shadow-sm flex-fill">
                                                    <div class="card-body p-2 h-100 d-flex">
                                                        <div class="row g-2 align-items-center w-100">
                                                            <div class="col-4 d-flex align-items-center">
                                                                <img src="/client/img/MyYCaborana.png" 
                                                                    class="img-fluid rounded" 
                                                                    alt="Carbonara Pasta" 
                                                                    style="width: 70px; height: 70px; object-fit: cover;">
                                                            </div>
                                                            <div class="col-8 d-flex flex-column justify-content-center">
                                                                <h6 class="card-title mb-1" style="font-size: 0.9rem; line-height: 1.2;">
                                                                    <a href="#" class="text-decoration-none text-dark">Carbonara Pasta</a>
                                                                </h6>
                                                                <div class="rating mb-1">
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                </div>
                                                                <p class="text-primary fw-bold mb-0" style="font-size: 0.9rem;">120,000 đ</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Product 3: Vietnamese Iced Coffee -->
                                                <div class="card mb-3 border-0 shadow-sm flex-fill">
                                                    <div class="card-body p-2 h-100 d-flex">
                                                        <div class="row g-2 align-items-center w-100">
                                                            <div class="col-4 d-flex align-items-center">
                                                                <img src="/client/img/CafeDenDa.png" 
                                                                        class="img-fluid rounded" 
                                                                        alt="Vietnamese Iced Coffee" 
                                                                        style="width: 70px; height: 70px; object-fit: cover;">
                                                            </div>
                                                            <div class="col-8 d-flex flex-column justify-content-center">
                                                                <h6 class="card-title mb-1" style="font-size: 0.9rem; line-height: 1.2;">
                                                                    <a href="#" class="text-decoration-none text-dark">Vietnamese Iced Coffee</a>
                                                                </h6>
                                                                <div class="rating mb-1">
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-secondary" style="font-size: 0.7rem;"></i>
                                                                </div>
                                                                <p class="text-primary fw-bold mb-0" style="font-size: 0.9rem;">100,000 đ</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Product 4: Thai Green Curry -->
                                                <div class="card mb-3 border-0 shadow-sm flex-fill">
                                                    <div class="card-body p-2 h-100 d-flex">
                                                        <div class="row g-2 align-items-center w-100">
                                                            <div class="col-4 d-flex align-items-center">
                                                                <img src="/client/img/MiCaySamYang.png" 
                                                                    class="img-fluid rounded" 
                                                                    alt="Thai Green Curry" 
                                                                    style="width: 70px; height: 70px; object-fit: cover;">
                                                            </div>
                                                            <div class="col-8 d-flex flex-column justify-content-center">
                                                                <h6 class="card-title mb-1" style="font-size: 0.9rem; line-height: 1.2;">
                                                                    <a href="#" class="text-decoration-none text-dark">Thai Green Curry</a>
                                                                </h6>
                                                                <div class="rating mb-1">
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                    <i class="fa fa-star text-warning" style="font-size: 0.7rem;"></i>
                                                                </div>
                                                                <p class="text-primary fw-bold mb-0" style="font-size: 0.9rem;">122,000 đ</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- Single Product End -->

                <!-- Food Modal -->
                

                <jsp:include page="../layout/footer.jsp" />


                <!-- Back to Top -->
                <a href="#" class="btn btn-primary border-3 border-primary rounded-circle back-to-top"><i
                        class="fa fa-arrow-up"></i></a>


                <!-- JavaScript Libraries -->
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
                <script src="/client/lib/easing/easing.min.js"></script>
                <script src="/client/lib/waypoints/waypoints.min.js"></script>
                <script src="/client/lib/lightbox/js/lightbox.min.js"></script>
                <script src="/client/lib/owlcarousel/owl.carousel.min.js"></script>

                <!-- Template Javascript -->
                <script src="/client/js/main.js"></script>
                
                <!-- Custom CSS for Product Detail Page -->
                <style>
                    .product-image-container:hover .image-overlay {
                        opacity: 1 !important;
                    }
                    
                    .product-image-container:hover img {
                        transform: scale(1.05);
                    }
                    
                    .btn-warning:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4) !important;
                    }
                    
                    .quantity-selector .btn:hover {
                        background-color: #ffc107;
                        color: white;
                        border-color: #ffc107;
                    }
                    
                    .price-display {
                        text-shadow: 0 2px 4px rgba(255, 107, 53, 0.3);
                    }
                    
                    .product-info {
                        border-left: 4px solid #ffc107;
                        transition: all 0.3s ease;
                    }
                    
                    .product-info:hover {
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
                        transform: translateY(-2px);
                    }
                    
                    .stars i {
                        font-size: 1.2rem;
                        margin-right: 0.2rem;
                    }
                    
                    .breadcrumb {
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    
                    .breadcrumb a {
                        color: #ff6b35;
                        font-weight: 500;
                    }
                    
                    .breadcrumb a:hover {
                        color: #f7931e;
                    }
                    
                    .badge {
                        box-shadow: 0 3px 10px rgba(255, 107, 53, 0.3);
                    }
                    
                    .form-control:focus {
                        border-color: #ffc107;
                        box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
                    }
                </style>
                
                <script>
                    $(document).ready(function() {
                        // Handle quantity buttons in product detail page
                        $('.btn-plus').click(function() {
                            var quantity = parseInt($('#quantity').val());
                            $('#quantity').val(quantity + 1);
                            $('#hiddenQuantity').val(quantity + 1);
                        });
                        
                        $('.btn-minus').click(function() {
                            var quantity = parseInt($('#quantity').val());
                            if (quantity > 1) {
                                $('#quantity').val(quantity - 1);
                                $('#hiddenQuantity').val(quantity - 1);
                            }
                        });
                        
                        // Update hidden field when quantity input changes
                        $('#quantity').on('input', function() {
                            var quantity = parseInt($(this).val());
                            if (quantity < 1) {
                                quantity = 1;
                                $(this).val(1);
                            }
                            $('#hiddenQuantity').val(quantity);
                        });

                        // Handle modal quantity buttons
                        $('#increaseModalQty').click(function() {
                            var quantity = parseInt($('#modalQuantity').text());
                            $('#modalQuantity').text(quantity + 1);
                            $('#modalHiddenQuantity').val(quantity + 1);
                        });
                        
                        $('#decreaseModalQty').click(function() {
                            var quantity = parseInt($('#modalQuantity').text());
                            if (quantity > 1) {
                                $('#modalQuantity').text(quantity - 1);
                                $('#modalHiddenQuantity').val(quantity - 1);
                            }
                        });

                        // Sync modal quantity with main quantity when modal opens
                        $('#foodModal').on('show.bs.modal', function() {
                            var mainQuantity = $('#quantity').val();
                            $('#modalQuantity').text(mainQuantity);
                            $('#modalHiddenQuantity').val(mainQuantity);
                        });
                    });
                </script>
            </body>

            </html>