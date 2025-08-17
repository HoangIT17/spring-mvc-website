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
            <div class="sidebar-content">
                <div class="sidebar-item" onclick="window.location.href='/'">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div class="sidebar-item" onclick="window.location.href='/products'">
                    <i class="fas fa-utensils"></i>
                    <span>Products</span>
                </div>
                <div class="sidebar-item" onclick="window.location.href='/order-history'">
                    <i class="fas fa-history"></i>
                    <span>Order history</span>
                </div>
                
                <div class="sidebar-item" onclick="window.location.href='/recommended-products'">
                    <i class="fas fa-heart"></i>
                    <span>Favorite products</span>
                </div>
                <div class="sidebar-item" onclick="window.location.href='/profile'">
                    <i class="fas fa-user"></i>
                    <span>Settings</span>
                </div>
            </div>
        </div>

        <script>
            // Highlight current page in sidebar
            document.addEventListener('DOMContentLoaded', function () {
                const currentPath = window.location.pathname;
                const sidebarItems = document.querySelectorAll('.sidebar-item');

                sidebarItems.forEach(function (item) {
                    const link = item.getAttribute('onclick');
                    if (link) {
                        if (currentPath === '/' && link.includes("href='/'")) {
                            item.classList.add('active');
                        } else if (currentPath.startsWith('/products') && link.includes("href='/products'")) {
                            item.classList.add('active');
                        } else if (currentPath.startsWith('/order-history') && link.includes("href='/order-history'")) {
                            item.classList.add('active');
                        } else if (currentPath.includes('/profile') && link.includes("href='/profile'")) {
                            item.classList.add('active');
                        }
                    }
                });
            });
        </script>