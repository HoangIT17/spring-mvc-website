<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <a href="/" class="sidebar-logo" id="brand">
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
                        <span class="text-food">FOOD</span>
                        <span class="text-flow">FLOW</span>
                    </div>
                </div>
            </a>
        </div>
        <div class="sidebar-content" >
            <div class="sidebar-item active" onclick="window.location.href='/'">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </div>
            <div class="sidebar-item" onclick="window.location.href='/'">
                <i class="fas fa-box"></i>
                <span>Products</span>
            </div>
            <div class="sidebar-item" onclick="window.location.href='Favorite.html'">
                <i class="fas fa-heart"></i>
                <span>Favorites</span>
            </div>
            <div class="sidebar-item" onclick="window.location.href='Order.html'">
                <i class="fas fa-history"></i>
                <span>Order History</span>
            </div>
            <div class="sidebar-item" onclick="window.location.href='Invoice.html'">
                <i class="fas fa-receipt"></i>
                <span>Invoices</span>
            </div>
            <div class="sidebar-item" onclick="window.location.href='Profile.html'">
                <i class="fas fa-user"></i>
                <span>Settings</span>
            </div>
        </div>
    </div>