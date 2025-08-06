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

                <!-- Customized Bootstrap Stylesheet -->
                <link href="/client/css/bootstrap.min.css" rel="stylesheet">

                <!-- Template Stylesheet -->
                <link href="/client/css/style.css" rel="stylesheet">

            </head>

            <body>

                <!-- Spinner Start -->
                <div id="spinner"
                    class="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
                    <div class="spinner-grow text-primary" role="status"></div>
                </div>
                <!-- Spinner End -->

                <jsp:include page="../layout/header.jsp" />

                <!-- Checkout Start -->
                <div class="container-fluid py-5">
                    <div class="container py-5">
                        <div class="mb-3">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Thông tin thanh toán</li>
                                </ol>
                            </nav>
                        </div>

                        <!-- Product Information Table - Top -->
                        <div class="row mb-5">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-borderless">
                                        <thead class="border-bottom">
                                            <tr>
                                                <th scope="col" class="text-start">Sản phẩm</th>
                                                <th scope="col" class="text-center">Tên</th>
                                                <th scope="col" class="text-center">Giá cả</th>
                                                <th scope="col" class="text-center">Số lượng</th>
                                                <th scope="col" class="text-end">Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <c:forEach var="cartDetail" items="${cartDetails}" varStatus="status">
                                                <tr class="border-bottom">
                                                    <td class="py-3">
                                                        <img src="/images/product/${cartDetail.product.image}" 
                                                            class="img-fluid rounded" 
                                                            style="width: 80px; height: 80px; object-fit: cover;" alt="">
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <div class="fw-bold">${cartDetail.product.name}</div>
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <fmt:formatNumber type="number" 
                                                            value="${cartDetail.price}"/> đ
                                                    </td>
                                                    <td class="align-middle text-center">
                                                        <span class="fw-bold">${cartDetail.quantity}</span>
                                                    </td>
                                                    <td class="align-middle text-end">
                                                        <div class="fw-bold text-primary">
                                                            <fmt:formatNumber type="number" 
                                                                value="${cartDetail.price * cartDetail.quantity}"/> đ
                                                        </div>
                                                    </td>
                                                </tr>
                                            </c:forEach>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <c:if test="${not empty cartDetails}">
                        <form:form action="/place-order" method="post" modelAttribute="cart">
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                            <div class="mt-5 row g-4 justify-content-start">
                                <div class="col-12 col-md-6">
                                    <div class="bg-light rounded p-4">
                                        <h5 class="mb-4">Thông Tin Người Nhận</h5>
                                        
                                        <div class="row">
                                            <div class="col-12 form-group mb-3">
                                                <label class="form-label">Tên người nhận</label>
                                                <input type="text" class="form-control" name="receiverName" placeholder="hoidanit" required>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-12 form-group mb-3">
                                                <label class="form-label">Địa chỉ người nhận</label>
                                                <input type="text" class="form-control" name="receiverAddress" placeholder="ha noi" required>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-12 form-group mb-4">
                                                <label class="form-label">Số điện thoại</label>
                                                <input type="tel" class="form-control" name="receiverPhone" placeholder="2366" required>
                                            </div>
                                        </div>

                                        <!-- Back to Cart Button -->
                                        <div class="mb-3">
                                            <a href="/cart" class="btn btn-outline-success w-100">
                                                <i class="fas fa-arrow-left me-2"></i>
                                                Quay lại giỏ hàng
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <!-- Right Side - Payment Information -->
                                <div class="col-12 col-md-6">
                                    <div class="bg-light rounded p-4">
                                        <h5 class="mb-4">Thông Tin Thanh Toán</h5>
                                        
                                        <div class="d-flex justify-content-between mb-3">
                                            <span>Phí vận chuyển</span>
                                            <strong>0 đ</strong>
                                        </div>
                                        
                                        <div class="d-flex justify-content-between mb-3">
                                            <span>Hình thức</span>
                                            <span>Thanh toán khi nhận hàng (COD)</span>
                                        </div>
                                        
                                        <hr class="my-4">
                                        
                                        <div class="d-flex justify-content-between mb-4">
                                            <h5 class="mb-0">Tổng số tiền</h5>
                                            <h5 class="mb-0 text-primary">
                                                <fmt:formatNumber type="number" value="${totalPrice}"/> đ
                                            </h5>
                                        </div>

                                        <!-- Place Order Button -->
                                        <button type="submit" class="btn btn-primary border-2 border-secondary rounded-pill px-4 py-3 text-uppercase w-100">
                                            XÁC NHẬN THANH TOÁN
                                        </button>
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
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
                <script src="/client/lib/easing/easing.min.js"></script>
                <script src="/client/lib/waypoints/waypoints.min.js"></script>
                <script src="/client/lib/lightbox/js/lightbox.min.js"></script>
                <script src="/client/lib/owlcarousel/owl.carousel.min.js"></script>

                <!-- Template Javascript -->
                <script src="/client/js/main.js"></script>
            </body>
            </html>