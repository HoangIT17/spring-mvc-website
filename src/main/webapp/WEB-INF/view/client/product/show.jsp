<%@page contentType="text/html" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Products - FoodFlow</title>

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
        <link rel="stylesheet" href="/client/css/searchproduct.css">
      </head>

      <body>
        <!-- Navigation -->
        <jsp:include page="../layout/nav.jsp" />

        <!-- Sidebar -->
        <jsp:include page="../layout/sidebar.jsp" />

        <!-- Main Content -->
        <div class="main-content">
          <!-- Page Header -->
          <div class="container-fluid py-4 bg-light">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-8">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                      <li class="breadcrumb-item"><a href="/" class="text-decoration-none text-warning">Home</a></li>
                      <li class="breadcrumb-item active" aria-current="page">Products</li>
                    </ol>
                  </nav>

                  <c:if test="${not empty searchKeyword}">
                    <h1 class="mt-2 mb-0 fw-bold text-dark">
                      <i class="fas fa-search me-2 text-warning"></i>Search Results for "${searchKeyword}"
                    </h1>
                    <p class="text-muted mb-0">Found ${products.size()} product(s)</p>
                  </c:if>

                  <c:if test="${not empty selectedCategory}">
                    <h1 class="mt-2 mb-0 fw-bold text-dark">
                      <i class="fas fa-tag me-2 text-warning"></i><span
                        id="formattedCategoryName">${selectedCategory}</span> Products
                    </h1>
                    <p class="text-muted mb-0">Found ${products.size()} product(s)</p>
                  </c:if>

                  <c:if test="${empty searchKeyword and empty selectedCategory}">
                    <h1 class="mt-2 mb-0 fw-bold text-dark">
                      <i class="fas fa-utensils me-2 text-warning"></i>All Products
                    </h1>
                    <p class="text-muted mb-0">Browse our complete collection</p>
                  </c:if>
                </div>

                <div class="col-lg-4 text-end">
                  <a href="/" class="btn btn-outline-warning">
                    <i class="fas fa-arrow-left me-2"></i>Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Search and Filter Section -->
          <div class="container-fluid py-3">
            <div class="container">
              <div class="row">
                <div class="col-lg-8">
                  <form action="/search-products" method="get" class="search-form">
                    <div class="input-group">
                      <input type="text" class="form-control border-warning" name="keyword"
                        placeholder="Search products..." value="${searchKeyword}"
                        style="border-radius: 25px 0 0 25px; border-right: none;">
                      <button class="btn btn-warning" type="submit"
                        style="border-radius: 0 25px 25px 0; border-left: none;">
                        <i class="fas fa-search me-2"></i>Search
                      </button>
                    </div>
                  </form>
                </div>

                <div class="col-lg-4">
                  <select class="form-select border-warning" id="categoryFilter" onchange="filterByCategory()">
                    <option value="">All Categories</option>
                    <c:forEach var="category" items="${categories}">
                      <option value="${category}" ${selectedCategory==category ? 'selected' : '' }>
                        ${category}
                      </option>
                    </c:forEach>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Grid -->
          <div class="container-fluid fruite py-3">
            <div class="container">
              <c:choose>
                <c:when test="${empty products}">
                  <div class="text-center py-5">
                    <div class="empty-state">
                      <i class="fas fa-search fa-3x text-muted mb-3"></i>
                      <h3 class="text-muted mb-2">No products found</h3>
                      <p class="text-muted mb-4">
                        <c:if test="${not empty searchKeyword}">
                          No products match your search for "${searchKeyword}"
                        </c:if>
                        <c:if test="${not empty selectedCategory}">
                          No products found in category "${selectedCategory}"
                        </c:if>
                        <c:if test="${empty searchKeyword and empty selectedCategory}">
                          No products available at the moment
                        </c:if>
                      </p>
                      <a href="/" class="btn btn-warning">
                        <i class="fas fa-home me-2"></i>Back to Home
                      </a>
                    </div>
                  </div>
                </c:when>

                <c:otherwise>
                  <div class="row g-4">
                    <c:forEach var="product" items="${products}" varStatus="status">
                      <div class="col-md-6 col-lg-4 col-xl-3 d-flex">
                        <div class="rounded position-relative fruite-item shadow-sm border-0 w-100 d-flex flex-column"
                          style="transition: transform 0.3s ease;">
                          <div class="fruite-img position-relative">
                            <a href="/product/${product.id}">
                              <img src="/images/product/${product.image}" class="img-fluid w-100 rounded-top"
                                alt="${product.name}" style="height: 200px; object-fit: cover;">
                            </a>

                            <!-- Save Badge -->
                            <c:choose>
                              <c:when test="${status.index % 3 == 0}">
                                <div class="bg-danger text-white px-2 py-1 rounded position-absolute"
                                  style="top: 10px; left: 10px; font-size: 12px; font-weight: bold;">
                                  Save 15%
                                </div>
                              </c:when>
                              <c:when test="${status.index % 3 == 1}">
                                <div class="bg-success text-white px-2 py-1 rounded position-absolute"
                                  style="top: 10px; left: 10px; font-size: 12px; font-weight: bold;">
                                  Save 10%
                                </div>
                              </c:when>
                            </c:choose>

                            <!-- Heart Icon -->
                            <div class="position-absolute" style="top: 10px; right: 10px;">
                              <button class="btn btn-light rounded-circle p-2 shadow-sm border-0 heart-btn"
                                style="width: 40px; height: 40px;">
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
                            <div class="rating mb-2">
                              <div class="stars">
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-warning"></i>
                                <i class="fas fa-star text-muted"></i>
                              </div>
                            </div>

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
                                      <button class="btn btn-warning rounded-pill px-4 py-2"
                                        style="font-size: 13px; font-weight: 600; min-width: 120px;">
                                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                                      </button>
                                    </form>
                                  </c:when>
                                  <c:otherwise>
                                    <button class="btn btn-warning rounded-pill px-4 py-2"
                                      style="font-size: 13px; font-weight: 600; min-width: 120px;"
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
                </c:otherwise>
              </c:choose>
            </div>
          </div>

          <!-- Footer -->
          <jsp:include page="../layout/footer.jsp" />
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
        <script src="/client/chat-popup.js"></script>

        <!-- Custom CSS and Scripts -->
        <style>
          /* Search and Filter Section Styles - Same Height */
          .search-form .input-group,
          #categoryFilter {
            height: 48px;
            /* Fixed height for both elements */
          }

          .search-form .input-group {
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border-radius: 25px;
            overflow: hidden;
          }

          .search-form .input-group:hover {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            transform: translateY(-1px);
          }

          .search-form .input-group:focus-within {
            box-shadow: 0 4px 20px rgba(255, 193, 7, 0.3);
          }

          .search-form .form-control {
            border: 1px solid #ffc107;
            border-right: none;
            box-shadow: none;
            padding: 12px 15px;
            font-size: 14px;
            height: 48px;
            /* Match the container height */
          }

          .search-form .form-control:focus {
            border-color: #ffc107;
            box-shadow: none;
          }

          .search-form .btn {
            border: 1px solid #ffc107;
            border-left: none;
            background: #ffc107;
            color: #212529;
            font-weight: 600;
            padding: 12px 20px;
            height: 48px;
            /* Match the container height */
            transition: all 0.3s ease;
          }

          .search-form .btn:hover {
            background: #e0a800;
            color: #212529;
            transform: translateY(-1px);
          }

          .search-form .btn:active {
            transform: translateY(0);
          }

          /* Category Filter Styles - Same Height */
          #categoryFilter {
            border: 1px solid #ffc107;
            border-radius: 25px;
            padding: 12px 15px;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            background: white;
            height: 48px;
            /* Match the search bar height */
            /* Ensure dropdown arrow is visible */
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 6 7 7 7-7'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 16px 12px;
            padding-right: 40px;
            /* Make room for the arrow */
          }

          #categoryFilter:hover {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            transform: translateY(-1px);
          }

          #categoryFilter:focus {
            border-color: #ffc107;
            box-shadow: 0 4px 20px rgba(255, 193, 7, 0.3);
          }
        </style>

        <script>
          // Format category name function
          function formatCategoryName(category) {
            if (!category) return '';

            // Replace underscores with spaces and capitalize each word
            let formatted = category.replace(/_/g, ' ')
              .toLowerCase()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            // Special cases for better formatting
            switch (formatted.toLowerCase()) {
              case 'burger chicken':
                return 'Burger & Chicken';
              case 'hot food':
                return 'Hot Food';
              case 'fast food':
                return 'Fast Food';
              default:
                return formatted;
            }
          }

          // Category filter function
          function filterByCategory() {
            const category = document.getElementById('categoryFilter').value;
            if (category) {
              window.location.href = '/products?category=' + encodeURIComponent(category);
            } else {
              window.location.href = '/products';
            }
          }

          // Heart button toggle
          document.addEventListener('DOMContentLoaded', function () {
            // Format category name if present
            const categoryNameElement = document.getElementById('formattedCategoryName');
            if (categoryNameElement) {
              const originalCategory = categoryNameElement.textContent;
              categoryNameElement.textContent = formatCategoryName(originalCategory);
            }

            document.querySelectorAll('.heart-btn').forEach(function (btn) {
              btn.addEventListener('click', function (e) {
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