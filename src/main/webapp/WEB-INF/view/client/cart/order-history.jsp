<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
            <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Order History - FoodFlow</title>

                    <!-- Google Web Fonts -->
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap"
                        rel="stylesheet">

                    <!-- Icon Font Stylesheet -->
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
                        rel="stylesheet">

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
                    <jsp:include page="../layout/navnew.jsp" />

                    <!-- Sidebar -->
                    <jsp:include page="../layout/sidebar.jsp" />

                    <!-- Cart page start -->

                    <!-- Checkout Start -->
                    <div class="container-fluid py-3 mt-2">
                        <div class="container">
                            <div class="row g-4">
                                <div class="col-12">
                                    <nav aria-label="breadcrumb" class="mb-3">
                                        <ol class="breadcrumb bg-light px-3 py-2 rounded">
                                            <li class="breadcrumb-item"><a href="/"
                                                    class="text-decoration-none text-warning">Home</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Order History</li>
                                        </ol>
                                    </nav>
                                </div>
                                <div class="mb-3">
                                    <div class="d-flex flex-column gap-4">
                                        <c:if test="${empty orders}">
                                            <div class="text-center py-5 text-muted border rounded bg-white">
                                                No orders found
                                            </div>
                                        </c:if>

                                        <c:forEach var="order" items="${orders}">
                                            <div class="card shadow-sm">
                                                <div
                                                    class="card-header bg-white d-flex flex-wrap align-items-center justify-content-between gap-2">
                                                    <div class="fw-semibold">
                                                        Order ID: <span class="text-primary">${order.id}</span>
                                                    </div>
                                                    <div class="ms-auto me-3">
                                                        <span class="text-muted me-1">Total:</span>
                                                        <span class="fw-bold text-dark">
                                                            <fmt:formatNumber type="number" pattern=",##0"
                                                                value="${order.totalPrice}" /> đ
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <c:choose>
                                                            <c:when test="${order.status eq 'COMPLETE'}">
                                                                <span class="badge bg-success">COMPLETED</span>
                                                            </c:when>
                                                            <c:when test="${order.status eq 'SHIPPING'}">
                                                                <span class="badge bg-primary">SHIPPING</span>
                                                            </c:when>
                                                            <c:when
                                                                test="${order.status eq 'CANCELLED' || order.status eq 'CANCELED'}">
                                                                <span class="badge bg-danger">CANCELLED</span>
                                                            </c:when>
                                                            <c:otherwise>
                                                                <span class="badge bg-warning text-dark">PENDING</span>
                                                            </c:otherwise>
                                                        </c:choose>
                                                    </div>
                                                </div>

                                                <div class="card-body p-0">
                                                    <div class="table-responsive">
                                                        <table class="table table-hover align-middle mb-0">
                                                            <thead class="table-light">
                                                                <tr>
                                                                    <th style="width:72px">Product</th>
                                                                    <th>Product Name</th>
                                                                    <th class="text-center" style="width:120px">Quantity
                                                                    </th>
                                                                    <th class="text-end" style="width:160px">Price</th>
                                                                    <th class="text-end" style="width:180px">Total</th>
                                                                </tr>

                                                            </thead>
                                                            <tbody>
                                                                <c:forEach var="orderDetail"
                                                                    items="${order.orderDetails}">
                                                                    <tr>
                                                                        <td>
                                                                            <img src="/images/product/${orderDetail.product.image}"
                                                                                alt="${orderDetail.product.name}"
                                                                                class="rounded-circle border"
                                                                                style="width:56px; height:56px; object-fit:cover;">
                                                                        </td>
                                                                        <td class="fw-semibold">
                                                                            ${orderDetail.product.name}</td>
                                                                        <td class="text-center">${orderDetail.quantity}
                                                                        </td>
                                                                        <td class="text-end">
                                                                            <fmt:formatNumber type="number"
                                                                                pattern=",##0"
                                                                                value="${orderDetail.price}" /> đ
                                                                        </td>
                                                                        <td class="text-end">
                                                                            <fmt:formatNumber type="number"
                                                                                pattern=",##0"
                                                                                value="${orderDetail.quantity * orderDetail.price}" />
                                                                            đ
                                                                        </td>
                                                                    </tr>
                                                                </c:forEach>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </c:forEach>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Cart page end -->
                    <jsp:include page="../layout/footer.jsp" />
                    <!-- JavaScript Libraries -->
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
                    <!-- JavaScript Libraries -->
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
                    <script src="/client/lib/easing/easing.min.js"></script>
                    <script src="/client/lib/waypoints/waypoints.min.js"></script>
                    <script src="/client/lib/lightbox/js/lightbox.min.js"></script>
                    <script src="/client/lib/owlcarousel/owl.carousel.min.js"></script>
                    <!-- Scripts -->
                    <script src="/client/js/main.js"></script>
                </body>

                </html>