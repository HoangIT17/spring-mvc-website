<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
    <div class="container">
        <div class="search-container mx-auto">
            <div class="input-group">
                <span class="input-group-text bg-white border-end-0">
                    <i class="fas fa-search text-muted"></i>
                </span>
                <input type="text" class="form-control border-start-0"
                    placeholder="What do you want to eat today..." id="searchInput">
            </div>
            <!-- Search Dropdown -->
            <div class="search-dropdown" id="searchDropdown">
                <!-- Search suggestions will be displayed here -->
            </div>
        </div>

        <div class="d-flex align-items-center">
            <!-- Debug info (remove in production) -->
            <!-- <small class="text-muted me-2">User: ${pageContext.request.userPrincipal.name}</small> -->
            
            <!-- Logged In State -->
            <c:if test="${not empty pageContext.request.userPrincipal}">
                <div class="logged-in-section">
                    <div class="me-3 position-relative">
                        <i class="fas fa-bell text-warning fs-5 cursor-pointer" id="notificationIcon"></i>
                        <span class="notification-badge">4</span>
                    </div>
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
                                    <c:out value="${not empty sessionScope.fullname ? sessionScope.fullname : pageContext.request.userPrincipal.name}" />
                                </div>
                            </li>

                            <li><a class="dropdown-item" href="#">Account Management</a></li>
                            <li><a class="dropdown-item" href="#">Purchase History</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <form method="post" action="/logout">
                                    <input type="hidden" name="${_csrf.parameterName}" 
                                            value="${_csrf.token}"/>
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