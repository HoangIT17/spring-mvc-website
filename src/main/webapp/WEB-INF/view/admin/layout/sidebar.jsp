<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id="layoutSidenav_nav">
    <div class="sidebar d-flex flex-column" id="sidebar" style="height: 100vh;">
        <div class="sidebar-header">
            <a href="/admin" class="sidebar-logo" id="brand">
                <div class="logo-3d-container">
                    <div class="chef-hat-icon">
                        <div class="hat-top"></div>
                        <div class="hat-band"></div>
                        <div class="speed-lines">
                            <div class="line line-1"></div>
                            <div class="line line-2"></div>
                            <div class="line line-3"></div>
                        </div>
                    </div>
                    <div class="logo-text-3d">
                        <span class="text-food">Food</span>
                        <span class="text-flow">Flow</span>
                    </div>
                </div>
            </a>
        </div>
        <div class="sidebar-content flex-grow-1">
            <div class="sidebar-item active" onclick="window.location.href='/admin'">
                <i class="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </div>
            <div class="sidebar-item" onclick="window.location.href='/admin/user'">
                <i class="fas fa-users"></i>
                <span>Users</span>
            </div>
            <div class="sidebar-item" onclick="window.location.href='/admin/product'">
                <i class="fas fa-box"></i>
                <span>Products</span>
            </div>
            <div class="sidebar-item" onclick="window.location.href='/admin/order'">
                <i class="fas fa-shopping-cart"></i>
                <span>Orders</span>
            </div>
        </div>
        <div class="sidebar-footer text-white p-3 border-top" style="background: linear-gradient(135deg, #ff6b35, #f7931e);">
            <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-3">
                    <c:choose>
                        <c:when test="${not empty sessionScope.avatar}">
                            <img src="/images/avatar/${sessionScope.avatar}" 
                                alt="Admin Avatar" 
                                class="rounded-circle border border-light" 
                                style="width: 40px; height: 40px; object-fit: cover;">
                        </c:when>
                        <c:otherwise>
                            <div class="bg-white rounded-circle d-flex align-items-center justify-content-center" 
                                style="width: 40px; height: 40px; color: #ff6b35;">
                                <i class="fas fa-user"></i>
                            </div>
                        </c:otherwise>
                    </c:choose>
                </div>
                <div class="flex-grow-1">
                    <div class="small" style="opacity: 0.9;">Logged in as:</div>
                    <div class="fw-bold text-truncate">${sessionScope.fullname}</div>
                </div>
            </div>
        </div>
    </div>
</div>