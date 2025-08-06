<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - FoodFlow</title>
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
            <p class="brand-tagline">Create new account</p>
        </div>

        <!-- Register Form -->
        <form:form method="post" action="/register" modelAttribute="registerUser" id="registerForm">
            <c:set var="errorFirstName">
                <form:errors path="firstName" cssClass="invalid-feedback" />
            </c:set>
            <c:set var="errorEmail">
                <form:errors path="email" cssClass="invalid-feedback" />
            </c:set>
            <c:set var="errorPassword">
                <form:errors path="confirmPassword" cssClass="invalid-feedback" />
            </c:set>
            
            <!-- First Name & Last Name Row -->
            <div class="row mb-3">
                <div class="col-md-6">
                    <div class="form-group mb-3 mb-md-0">
                        <label for="firstName">First Name</label>
                        <form:input type="text" class="form-control ${not empty errorFirstName ? 'is-invalid' : ''}" 
                            id="firstName" placeholder="First name" path="firstName" required="true"/>
                        ${errorFirstName}
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <form:input type="text" class="form-control" id="lastName" 
                            placeholder="Last name" path="lastName" required="true"/>
                        <div class="invalid-feedback"></div>
                    </div>
                </div>
            </div>

            <!-- Email -->
            <div class="form-group mb-3">
                <label for="email">Email</label>
                <form:input type="email" class="form-control ${not empty errorEmail ? 'is-invalid' : ''}" 
                    id="email" placeholder="Enter email address" path="email" required="true"/>
                ${errorEmail}
            </div>

            <!-- Password Row -->
            <div class="form-group mb-3">
                <label for="password">Password</label>
                <div class="input-group">
                    <form:input type="password" class="form-control ${not empty errorPassword ? 'is-invalid' : ''}" 
                        id="password" placeholder="Create a password" path="password" required="true"/>
                    <span class="input-group-text" onclick="togglePassword('password', 'passwordToggleIcon')">
                        <i class="fas fa-eye" id="passwordToggleIcon"></i>
                    </span>
                </div>
                ${errorPassword}
            </div>

            <!-- Confirm Password Row -->
            <div class="form-group mb-3">
                <label for="confirmPassword">Confirm Password</label>
                <div class="input-group">
                    <form:input type="password" class="form-control" id="confirmPassword" 
                        placeholder="Confirm password" path="confirmPassword" required="true"/>
                    <span class="input-group-text" onclick="togglePassword('confirmPassword', 'confirmPasswordToggleIcon')">
                        <i class="fas fa-eye" id="confirmPasswordToggleIcon"></i>
                    </span>
                </div>
                <div class="invalid-feedback" id="confirmPasswordFeedback"></div>
            </div>

            <!-- Register Button -->
            <button type="submit" class="btn btn-primary w-100" id="registerBtn">
                <span class="btn-text">
                    <i class="fas fa-user-plus me-2"></i>Create Account
                </span>
                <span class="loading">
                    <div class="spinner"></div>Creating account...
                </span>
            </button>
        </form:form>
        <!-- Footer -->
        <div class="auth-footer">
            <p>Already have an account? <a href="/login">Login now</a></p>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="/js/scripts.js"></script>

    <!-- <script src="../js/Register.js"></script> -->
</body>

</html>