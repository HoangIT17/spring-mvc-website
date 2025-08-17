<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="HoangIT - FoodFlow" />
                <meta name="author" content="HoangIT" />
                <title>Update Order</title>   
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
                                    <li class="breadcrumb-item active">Update</li>
                                </ol>
                                <div class="mt-5">
                                    <div class="row">
                                        <div class="col-md-6 col-12 mx-auto">
                                            <h3>Update Order</h3>
                                            <hr />
                                            <form:form method="post" action="/admin/order/update"
                                                modelAttribute="newOrder" class="row">
                                                
                                                <!-- Hidden field for ID -->
                                                <div style="display: none;">
                                                    <form:input path="id" />
                                                </div>
                                            
                                                <div class="mb-3 col-12">
                                                    <label class="form-label">Order ID:</label>
                                                    <input type="text" class="form-control" value="${newOrder.id}" disabled />
                                                </div>

                                                <div class="mb-3 col-12">
                                                    <label class="form-label">Customer Name:</label>
                                                    <input type="text" class="form-control" value="${newOrder.receiverName}" disabled />
                                                </div>

                                                <div class="mb-3 col-12">
                                                    <label class="form-label">Total Price:</label>
                                                    <input type="text" class="form-control" value="${newOrder.totalPrice}₫" disabled />
                                                </div>

                                                <div class="mb-3 col-12">
                                                    <label class="form-label">Status:</label>
                                                    <form:select class="form-select" path="status">
                                                        <form:option value="PENDING">PENDING</form:option>
                                                        <form:option value="SHIPPING">SHIPPING</form:option>
                                                        <form:option value="COMPLETE">COMPLETE</form:option>
                                                        <form:option value="CANCEL">CANCEL</form:option>
                                                    </form:select>  
                                                </div>

                                                <div class="col-12 mb-5">
                                                    <button type="submit" class="btn btn-warning">Update Order</button>
                                                    <a href="/admin/order" class="btn btn-secondary ms-2">Cancel</a>
                                                </div>
                                            </form:form>
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
