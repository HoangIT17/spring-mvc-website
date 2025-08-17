
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recommended Products - FoodFlow</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="/client/css/homepage.css">
    <link rel="stylesheet" href="/client/css/homepage-new.css">
    <link rel="stylesheet" href="/client/css/homepage-mobile.css">
</head>
<body>
    <!-- Navigation -->
    <jsp:include page="../layout/nav.jsp" />
    <!-- Sidebar -->
    <jsp:include page="../layout/sidebar.jsp" />
    <!-- Main Content -->
    <div class="main-content">
        <div class="container-fluid py-4 bg-light">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item"><a href="/" class="text-decoration-none text-warning">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Recommended Products</li>
                            </ol>
                        </nav>
                        <h1 class="mt-2 mb-0 fw-bold text-dark">
                            <i class="fas fa-heart me-2 text-danger"></i>Recommended Products for You
                        </h1>
                        <p class="text-muted mb-0">Based on your order history</p>
                    </div>
                    <div class="col-lg-4 text-end">
                        <a href="/products" class="btn btn-outline-warning">
                            <i class="fas fa-arrow-left me-2"></i>Back to Products
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid py-3">
            <div class="container">
                <div class="row g-4">
                    <c:choose>
                        <c:when test="${empty recommendedProducts}">
                            <div class="col-12">
                                <div class="alert alert-info text-center py-5">
                                    <i class="fas fa-heart-broken fa-3x mb-3 text-muted"></i>
                                    <h4 class="mb-2">No recommended products!</h4>
                                    <p class="mb-4">You have no order history or no suitable products found.</p>
                                    <a href="/products" class="btn btn-warning">
                                        <i class="fas fa-utensils me-2"></i>View all products
                                    </a>
                                </div>
                            </div>
                        </c:when>
                        <c:otherwise>
                            <c:forEach var="product" items="${recommendedProducts}">
                                <div class="col-md-6 col-lg-4 col-xl-3 d-flex">
                                    <div class="card h-100 shadow-sm border-0 w-100">
                                        <img src="/images/product/${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                                        <div class="card-body d-flex flex-column">
                                            <h5 class="card-title mb-2 fw-bold">
                                                <a href="/product/${product.id}" class="text-dark text-decoration-none">
                                                    ${product.name}
                                                </a>
                                            </h5>
                                            <p class="card-text text-muted mb-2 flex-fill">${product.detailDesc}</p>
                                            <div class="d-flex align-items-center justify-content-between mt-auto">
                                                <div class="price-section">
                                                    <span class="fw-bold text-danger" style="font-size: 18px;">
                                                        <fmt:formatNumber type="number" value="${product.price}" pattern="#.###" /> đ
                                                    </span>
                                                </div>
                                                <a href="/product/${product.id}" class="btn btn-warning rounded-pill px-3 py-2">
                                                    <i class="fas fa-eye me-1"></i>View details
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </c:forEach>
                        </c:otherwise>
                    </c:choose>
                </div>
            </div>
        </div>
        <!-- Footer -->
        <jsp:include page="../layout/footer.jsp" />
    </div>
    <!-- Bootstrap JS -->
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
                    <!-- JavaScript Libraries -->
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
                    <script src="/client/lib/easing/easing.min.js"></script>
                    <script src="/client/lib/waypoints/waypoints.min.js"></script>
                    <script src="/client/lib/lightbox/js/lightbox.min.js"></script>
                    <script src="/client/lib/owlcarousel/owl.carousel.min.js"></script>
</body>
</html>
