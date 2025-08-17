<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
            <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="Dự án FoodFlow" />
                <meta name="author" content="Hoang IT" />
                <title>Detail Order</title>
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
            <style>
                #layoutSidenav_content {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                main {
                    flex: 1;
                }
            </style>
        </head>            <body class="sb-nav-fixed">
                <jsp:include page="../layout/header.jsp" />
                <div id="layoutSidenav">
                    <jsp:include page="../layout/sidebar.jsp" />
                    <div id="layoutSidenav_content">
                        <main>
                            <div class="container-fluid px-4">
                                <h1 class="mt-4">Orders</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item"><a href="/admin">Dashboard</a></li>
                                    <li class="breadcrumb-item"><a href="/admin/order">Orders</a></li>
                                    <li class="breadcrumb-item active">View Detail</li>
                                </ol>
                                <div class="container mt-5">
                                    <div class="row">
                                        <div class="col-12 mx-auto">
                                            <div class="d-flex justify-content-between">
                                                <h3>Order detail with id = ${id}</h3>
                                            </div>

                                            <hr />

                                            <div class="card mb-4" style="width: 80%">
                                                <div class="card-header">
                                                    <i class="fas fa-shopping-cart me-2"></i>Order Information
                                                </div>
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <ul class="list-group list-group-flush">
                                                                <li class="list-group-item"><strong>Order ID:</strong> ${order.id}</li>
                                                                <li class="list-group-item"><strong>Total Price:</strong> 
                                                                    <fmt:formatNumber value="${order.totalPrice}" type="currency" currencySymbol="₫" />
                                                                </li>
                                                                <li class="list-group-item"><strong>Status:</strong> 
                                                                    <span class="badge 
                                                                        <c:choose>
                                                                            <c:when test='${order.status == "PENDING"}'>bg-warning</c:when>
                                                                            <c:when test='${order.status == "CONFIRM"}'>bg-info</c:when>
                                                                            <c:when test='${order.status == "SHIPPING"}'>bg-primary</c:when>
                                                                            <c:when test='${order.status == "COMPLETE"}'>bg-success</c:when>
                                                                            <c:when test='${order.status == "CANCEL"}'>bg-danger</c:when>
                                                                            <c:otherwise>bg-secondary</c:otherwise>
                                                                        </c:choose>
                                                                    ">
                                                                        ${order.status}
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <h6><i class="fas fa-user me-2"></i>Customer Information</h6>
                                                            <ul class="list-group list-group-flush">
                                                                <li class="list-group-item"><strong>Name:</strong> ${order.receiverName}</li>
                                                                <li class="list-group-item"><strong>Email:</strong> ${order.user.email}</li>
                                                                <li class="list-group-item"><strong>Phone:</strong> ${order.receiverPhone}</li>
                                                                <li class="list-group-item"><strong>Address:</strong> ${order.receiverAddress}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Order Details Table -->
                                            <div class="card" style="width: 80%">
                                                <div class="card-header">
                                                    <i class="fas fa-list me-2"></i>Order Details
                                                </div>
                                                <div class="card-body">
                                                    <table class="table table-bordered table-hover">
                                                        <thead class="table-dark">
                                                            <tr>
                                                                <th>Product Image</th>
                                                                <th>Product Name</th>
                                                                <th>Price</th>
                                                                <th>Quantity</th>
                                                                <th>Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <c:forEach var="orderDetail" items="${order.orderDetails}">
                                                                <tr>
                                                                    <td>
                                                                        <img src="/images/product/${orderDetail.product.image}" 
                                                                             alt="${orderDetail.product.name}" 
                                                                             style="width: 60px; height: 60px; object-fit: cover;"
                                                                             class="rounded">
                                                                    </td>
                                                                    <td>${orderDetail.product.name}</td>
                                                                    <td>
                                                                        <fmt:formatNumber value="${orderDetail.price}" type="currency" currencySymbol="₫" />
                                                                    </td>
                                                                    <td>
                                                                        <span class="badge bg-primary">${orderDetail.quantity}</span>
                                                                    </td>
                                                                    <td>
                                                                        <strong>
                                                                            <fmt:formatNumber value="${orderDetail.price * orderDetail.quantity}" type="currency" currencySymbol="₫" />
                                                                        </strong>
                                                                    </td>
                                                                </tr>
                                                            </c:forEach>
                                                        </tbody>
                                                        <tfoot class="table-light">
                                                            <tr>
                                                                <td colspan="4" class="text-end"><strong>Total Amount:</strong></td>
                                                                <td>
                                                                    <strong class="text-success fs-5">
                                                                        <fmt:formatNumber value="${order.totalPrice}" type="currency" currencySymbol="₫" />
                                                                    </strong>
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </div>

                                            <div class="mt-3">
                                                <a href="/admin/order" class="btn btn-success">
                                                    <i class="fas fa-arrow-left me-2"></i>Back to Orders
                                                </a>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </main>
                        <jsp:include page="../layout/footer.jsp" />
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
                    crossorigin="anonymous"></script>
                <script src="/js/scripts.js"></script>

            </body>

            </html>
