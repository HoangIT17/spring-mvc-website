<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
            <div class="container">
                <div class="mx-auto">
                    <!-- <form action="/search-products" method="get" class="search-form">
                        <div class="input-group">
                            <span class="input-group-text bg-white border-end-0">
                                <i class="fas fa-search text-muted"></i>
                            </span>
                            <input type="text" class="form-control border-start-0"
                                placeholder="What do you want to eat today..." name="keyword" id="searchInput"
                                value="${param.keyword}">
                            <button class="btn btn-warning border-start-0" type="submit">
                                Search
                            </button>
                        </div>
                    </form> -->

                    <div class="search-dropdown" id="searchDropdown">

                    </div>
                </div>

                <div class="d-flex align-items-center">
                    <!-- Debug info (remove in production) -->
                    <!-- <small class="text-muted me-2">User: ${pageContext.request.userPrincipal.name}</small> -->

                    <!-- Logged In State -->
                    <c:if test="${not empty pageContext.request.userPrincipal}">
                        <div class="logged-in-section">
                            <!-- <div class="me-3 position-relative">
                        <i class="fas fa-bell text-warning fs-5 cursor-pointer" id="notificationIcon"></i>
                        <span class="notification-badge">4</span>
                    </div> -->
                            <div class="me-3 position-relative">
                                <i class="fas fa-shopping-cart text-warning fs-5 cursor-pointer" id="cartIcon"
                                    onclick="window.location.href='/cart'"></i>
                                <span class="cart-badge" id="cartBadge">${sessionScope.sum}</span>
                            </div>
                            <div class="dropdown my-auto">
                                <a href="#" class="dropdown" role="button" id="dropdownMenuLink"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fas fa-user fa-2x text-warning"></i>
                                </a>

                                <ul class="dropdown-menu dropdown-menu-end p-4" aria-labelledby="dropdownMenuLink">
                                    <li class="d-flex align-items-center flex-column" style="min-width: 300px;">
                                        <c:choose>
                                            <c:when test="${not empty sessionScope.avatar}">
                                                <img style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden;"
                                                    src="/images/avatar/${sessionScope.avatar}" />
                                            </c:when>
                                            <c:otherwise>
                                                <i class="fas fa-user-circle fs-1 text-muted"></i>
                                            </c:otherwise>
                                        </c:choose>
                                        <div class="text-center my-3">
                                            <c:out
                                                value="${not empty sessionScope.fullname ? sessionScope.fullname : pageContext.request.userPrincipal.name}" />
                                        </div>
                                    </li>
                                    <li><a class="dropdown-item" href="/profile"><i
                                                class="fas fa-user me-2"></i>Profile</a></li>
                                    <li><a class="dropdown-item" href="/order-history"><i
                                                class="fas fa-history me-2"></i>Order history</a></li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li>
                                        <form method="post" action="/logout">
                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                                            <button class="dropdown-item">Log Out</button>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </c:if>

                    <!-- Not Logged In State -->
                    <c:if test="${empty pageContext.request.userPrincipal}">
                        <div class="not-logged-in-section">
                            <a href="/login" class="btn btn-outline-warning me-2" id="loginBtn">
                                <i class="fas fa-sign-in-alt me-1"></i>Login
                            </a>
                        </div>
                    </c:if>
                </div>
            </div>
        </nav>

        <style>
            .search-container {
                max-width: 500px;
                width: 100%;
            }

            .search-form .input-group {
                border-radius: 25px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            }

            .search-form .input-group:hover {
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
                transform: translateY(-1px);
            }

            .search-form .input-group:focus-within {
                box-shadow: 0 4px 20px rgba(255, 193, 7, 0.3);
            }

            .search-form .input-group-text {
                border: 1px solid #dee2e6;
                border-right: none;
                background: white;
                color: #6c757d;
            }

            .search-form .form-control {
                border: 1px solid #dee2e6;
                border-left: none;
                border-right: none;
                box-shadow: none;
                padding: 12px 15px;
                font-size: 14px;
            }

            .search-form .form-control:focus {
                border-color: #ffc107;
                box-shadow: none;
            }

            .search-form .btn {
                border: 1px solid #dee2e6;
                border-left: none;
                background: #ffc107;
                color: #212529;
                font-weight: 600;
                padding: 12px 20px;
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

            @media (max-width: 768px) {
                .search-container {
                    max-width: 100%;
                    margin: 0 15px;
                }

                .search-form .btn {
                    padding: 12px 15px;
                }
            }
        </style>