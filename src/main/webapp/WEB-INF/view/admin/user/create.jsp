<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="" />
                <meta name="author" content="" />
                <title>Create Product</title>
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
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

            <!-- Custom CSS -->
            <link rel="stylesheet" href="/client/css/homepage.css">
            <link rel="stylesheet" href="/client/css/homepage-new.css">
            <link rel="stylesheet" href="/client/css/homepage-mobile.css">
            <link rel="stylesheet" href="/client/css/advanced-modal.css">
            <link rel="stylesheet" href="/client/css/user-dropdown.css">
            <link rel="stylesheet" href="/client/css/chat-popup.css">
            </head>
            <style>
                #layoutSidenav_content {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                main {
                    flex: 1;
                }
                .form-row {
                    display: flex;
                    gap: 16px;
                }
                .form-row > .form-group {
                    flex: 1;
                    min-width: 0;
                }
                .form-control, .form-select {
                    height: 44px;
                    font-size: 1rem;
                    padding: 8px 12px;
                }
            </style>
            <script>
                    $(document).ready(() => {
                        const avatarFile = $("#avatarFile");
                        avatarFile.change(function (e) {
                            const imgURL = URL.createObjectURL(e.target.files[0]);
                            $("#avatarPreview").attr("src", imgURL);
                            $("#avatarPreview").css({ "display": "block" });
                        });
                    });
            </script>
            <body class="sb-nav-fixed">
                <jsp:include page="../layout/header.jsp" />
                <div id="layoutSidenav">
                    <jsp:include page="../layout/sidebar.jsp" />
                    <div id="layoutSidenav_content">
                        <main>
                            <div class="container-fluid px-4">
                                <h1 class="mt-4">Manage Users</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item"><a href="/admin">Dashboard</a></li>
                                    <li class="breadcrumb-item"><a href="/admin/user">Users</a></li>
                                    <li class="breadcrumb-item active">Create</li>
                                </ol>
                                <div class=" mt-5">
                                    <div class="row">
                                        <div class="col-md-6 col-12 mx-auto">
                                            <h3>Create a user</h3>
                                            <hr />
                        
                                            <form:form method="post" action="/admin/user/create"
                                                modelAttribute="newUser" class="row" enctype="multipart/form-data">
                                                <!-- Hàng 1: Email (full width) -->
                                                <div class="mb-3">
                                                    <div class="form-group">
                                                        <c:set var="errorEmail">
                                                            <form:errors path="email" cssClass="invalid-feedback" />
                                                        </c:set>
                                                        <label class="form-label">Email:</label>
                                                        <form:input type="email" 
                                                        class="form-control ${not empty errorEmail ? 'is-invalid' : ''}" 
                                                        path="email" />
                                                        ${errorEmail}
                                                    </div>
                                                </div>
                                                <!-- Hàng 2: Password | Confirm Password -->
                                                <div class="mb-3 form-row">
                                                    <div class="form-group">
                                                        <c:set var="errorPassword">
                                                            <form:errors path="password" cssClass="invalid-feedback" />
                                                        </c:set>
                                                        <label class="form-label">Password:</label>
                                                        <form:input type="password" class="form-control ${not empty errorPassword ? 'is-invalid' : ''}" path="password" id="password" />
                                                        ${errorPassword}
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="form-label">Confirm Password:</label>
                                                        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" />
                                                        <div class="invalid-feedback" id="confirmPasswordError" style="display:none;">Passwords do not match.</div>
                                                    </div>
                                                </div>
                                                <!-- Hàng 3: Phone number | Fullname -->
                                                <div class="mb-3 form-row">
                                                    <div class="form-group">
                                                        <c:set var="errorPhone">
                                                            <form:errors path="phone" cssClass="invalid-feedback" />
                                                        </c:set>
                                                        <label class="form-label">Phone number:</label>
                                                        <form:input type="text" class="form-control ${not empty errorPhone ? 'is-invalid' : ''}" path="phone" />
                                                        ${errorPhone}
                                                    </div>
                                                    <div class="form-group">
                                                        <c:set var="errorFullName">
                                                            <form:errors path="fullName" cssClass="invalid-feedback" />
                                                        </c:set>
                                                        <label class="form-label">Full Name:</label>
                                                        <form:input type="text" class="form-control ${not empty errorFullName ? 'is-invalid' : ''}" path="fullName" />
                                                        ${errorFullName}
                                                    </div>
                                                </div>
                                                <!-- Hàng 4: Address (full width) -->
                                                <div class="mb-3">
                                                    <div class="form-group">
                                                        <label class="form-label">Address:</label>
                                                        <form:input type="text" class="form-control" path="address" />
                                                    </div>
                                                </div>
                                                <!-- Hàng 5: Role | Avatar -->
                                                <div class="mb-3 form-row">
                                                    <div class="form-group">
                                                        <label class="form-label">Role:</label>
                                                        <form:select class="form-select" path="role.name">
                                                            <form:option value="ADMIN">ADMIN</form:option>
                                                            <form:option value="USER">USER</form:option>
                                                            <form:option value="SHIPPER">SHIPPER</form:option>
                                                        </form:select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="avatarFile" class="form-label">Avatar:</label>
                                                        <input class="form-control" type="file" id="avatarFile" accept=".png, .jpg, .jpeg" name="hoidanitFile" />
                                                    </div>
                                                </div>
                                                <!-- Avatar preview và nút Create ở cuối -->
                                                <div class="col-12 mb-3">
                                                    <img style="max-height: 250px; display: none;" alt="avatar preview" id="avatarPreview" />
                                                </div>
                                                <div class="col-12 mb-5">
                                                    <button type="submit" class="btn btn-primary">Create</button>
                                                </div>
                                                <script>
                                                    $(document).ready(function () {
                                                        $('form').on('submit', function (e) {
                                                            var password = $('#password').val();
                                                            var confirmPassword = $('#confirmPassword').val();
                                                            if (password !== confirmPassword) {
                                                                $('#confirmPassword').addClass('is-invalid');
                                                                $('#confirmPasswordError').show();
                                                                e.preventDefault();
                                                            } else {
                                                                $('#confirmPassword').removeClass('is-invalid');
                                                                $('#confirmPasswordError').hide();
                                                            }
                                                        });
                                                    });
                                                </script>
                                            </form:form>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </main>
                        <jsp:include page="../layout/footer.jsp" />
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
                <!-- JavaScript Libraries -->
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
                <script src="/client/lib/easing/easing.min.js"></script>
                <script src="/client/lib/waypoints/waypoints.min.js"></script>
                <script src="/client/lib/lightbox/js/lightbox.min.js"></script>
                <script src="/client/lib/owlcarousel/owl.carousel.min.js"></script>

            </body>

            </html>