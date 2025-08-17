<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="description" content="" />
            <meta name="author" content="" />
            <title>View order</title>
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
        </head>

        <body class="sb-nav-fixed">
            <jsp:include page="../layout/header.jsp" />
            <div id="layoutSidenav">
                <jsp:include page="../layout/sidebar.jsp" />
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <h1 class="mt-4">Manage Orders</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item"><a href="/admin">Dashboard</a></li>
                                <li class="breadcrumb-item active">Orders</li>
                            </ol>
                            
                            <div class="mt-5">
                                <div class="row">
                                    <div class="col-12 mx-auto">
                                        <div class="d-flex justify-content-between">
                                            <h3>Table orders</h3>
                                        </div>

                                        <hr />
                                        <table class="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Total Price</th>
                                                    <th>User</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <c:forEach var="order" items="${orders}">
                                                    <tr>
                                                        <th>${order.id}</th>
                                                        <td>
                                                            <c:choose>
                                                                <c:when test="${order.totalPrice != null}">
                                                                    ${order.totalPrice}đ
                                                                </c:when>
                                                                <c:otherwise>
                                                                    N/A
                                                                </c:otherwise>
                                                            </c:choose>
                                                        </td>
                                                        <td>
                                                            <c:choose>
                                                                <c:when test="${order.user != null}">
                                                                    ${order.user.fullName}
                                                                </c:when>
                                                                <c:otherwise>
                                                                    N/A
                                                                </c:otherwise>
                                                            </c:choose>
                                                        </td>
                                                        <td>
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
                                                        </td>
                                                        <td>
                                                            <a href="/admin/order/${order.id}" 
                                                            class="btn btn-success">View</a>
                                                            <a href="/admin/order/update/${order.id}" 
                                                            class="btn btn-warning mx-2">Update</a>
                                                            <a href="/admin/order/delete/${order.id}" 
                                                            class="btn btn-danger">Delete</a>
                                                        </td>
                                                    </tr>
                                                </c:forEach>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <jsp:include page="../layout/footer.jsp" />
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
    <!-- Custom JS -->
    <script src="/client/homepage.js"></script>
    <script src="/client/chat-popup.js"></script>

        </body>

        </html>