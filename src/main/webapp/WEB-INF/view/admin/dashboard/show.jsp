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
                .card.shadow {
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .card.shadow:hover {
                    transform: translateY(-6px) scale(1.03);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
                    z-index:2;
                }
                .btn-sm.btn-light {
                    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
                }
                .btn-sm.btn-light:hover {
                    background: #ffc107;
                    color: #fff !important;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
                }
            </style>
        </head>

        <body >
            <jsp:include page="../layout/header.jsp" />
            <div id="layoutSidenav">
                <jsp:include page="../layout/sidebar.jsp" />
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <h1 class="mt-4">Dashboard</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Statistic</li>
                            </ol>
                            <div class="row g-4">
                                <div class="col-xl-4 col-md-6">
                                    <div class="card shadow border-0 rounded-4 h-100 bg-primary bg-gradient text-white">
                                        <div class="card-body d-flex align-items-center justify-content-between">
                                            <div>
                                                <span class="badge bg-light text-primary mb-2 px-3 py-2"><i class="fas fa-users me-1"></i> Users</span>
                                                <h3 class="fw-bold mb-0 count-animate" data-count="${countUsers}">0</h3>
                                                <p class="text-white-50 mb-0">Total registered users</p>
                                            </div>
                                            <i class="fa-solid fa-user fa-3x text-white-50"></i>
                                        </div>
                                        <div class="card-footer bg-primary bg-opacity-75 d-flex align-items-center justify-content-between rounded-bottom-4">
                                            <a class="btn btn-sm btn-light text-primary rounded-pill" href="/admin/user">View Details</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-md-6">
                                    <div class="card shadow border-0 rounded-4 h-100 bg-danger bg-gradient text-white">
                                        <div class="card-body d-flex align-items-center justify-content-between">
                                            <div>
                                                <span class="badge bg-light text-danger mb-2 px-3 py-2"><i class="fas fa-box me-1"></i> Products</span>
                                                <h3 class="fw-bold mb-0 count-animate" data-count="${countProducts}">0</h3>
                                                <p class="text-white-50 mb-0">Total products in store</p>
                                            </div>
                                            <i class="fa-solid fa-box fa-3x text-white-50"></i>
                                        </div>
                                        <div class="card-footer bg-danger bg-opacity-75 d-flex align-items-center justify-content-between rounded-bottom-4">
                                            <a class="btn btn-sm btn-light text-danger rounded-pill" href="/admin/product">View Details</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-md-6">
                                    <div class="card shadow border-0 rounded-4 h-100 bg-success bg-gradient text-white">
                                        <div class="card-body d-flex align-items-center justify-content-between">
                                            <div>
                                                <span class="badge bg-light text-success mb-2 px-3 py-2"><i class="fas fa-shopping-cart me-1"></i> Orders</span>
                                                <h3 class="fw-bold mb-0 count-animate" data-count="${countOrders}">0</h3>
                                                <p class="text-white-50 mb-0">Total orders placed</p>
                                            </div>
                                            <i class="fa-solid fa-shopping-cart fa-3x text-white-50"></i>
                                        </div>
                                        <div class="card-footer bg-success bg-opacity-75 d-flex align-items-center justify-content-between rounded-bottom-4">
                                            <a class="btn btn-sm btn-light text-success rounded-pill" href="/admin/order">View Details</a>
                                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
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
            <script src="js/scripts.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"
                crossorigin="anonymous"></script>
            <script src="js/chart-area-demo.js"></script>
            <script src="js/chart-bar-demo.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/umd/simple-datatables.min.js"
                crossorigin="anonymous"></script>
            <script src="js/datatables-simple-demo.js"></script>
            <script>
                // Animation count up for dashboard numbers
                document.addEventListener('DOMContentLoaded', function () {
                    document.querySelectorAll('.count-animate').forEach(function (el) {
                        const target = parseInt(el.getAttribute('data-count')) || 0;
                        let current = 0;
                        const duration = 1200;
                        const step = Math.ceil(target / (duration / 20));
                        function animate() {
                            current += step;
                            if (current >= target) {
                                el.textContent = target;
                            } else {
                                el.textContent = current;
                                setTimeout(animate, 20);
                            }
                        }
                        animate();
                    });
                });
            </script>
        </body>

        </html>