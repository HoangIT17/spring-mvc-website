<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %> 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - FoodFlow</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="/client/css/auth.css" rel="stylesheet">
</head>

<body>
    <div class="auth-container">
        <!-- Logo Section -->
        <div class="logo-section">
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
            <p class="brand-tagline">Login to continue</p>
        </div>

        <!-- Login Form -->
        <form method="post" action="/login" id="loginForm">
            <c:if test="${param.error != null}">
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-triangle me-2"></i>Invalid email or password.
                </div>
            </c:if>
            <c:if test="${param.logout != null}">
                <div class="alert alert-success" role="alert">
                    <i class="fas fa-check-circle me-2"></i>You have been logged out successfully.
                </div>
            </c:if>
            
            <!-- Email Input -->
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="username" placeholder="Enter email address" required>
                <div class="invalid-feedback"></div>
            </div>

            <!-- Password Input -->
            <div class="form-group">
                <label for="password">Password</label>
                <div class="input-group">
                    <input type="password" class="form-control" id="password" name="password" placeholder="Enter password" required>
                    <span class="input-group-text" onclick="togglePassword()">
                        <i class="fas fa-eye" id="passwordToggleIcon"></i>
                    </span>
                </div>
                <div class="invalid-feedback"></div>
            </div>

            <!-- CSRF Token -->
            <div>
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
            </div>
            <!-- Login Button -->
            <button type="submit" class="btn btn-primary w-100">
                <span class="btn-text">
                    <i class="fas fa-sign-in-alt me-2"></i>Login
                </span>
                <span class="loading">
                    <div class="spinner"></div>Logging in...
                </span>
            </button>
        </form>

        <!-- Footer -->
        <div class="auth-footer">
            <p>Don't have an account? <a href="/register">Register now</a></p>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/scripts.js"></script>
    <!-- <script src="/client/js/Login.js"></script> -->
</body>

</html>