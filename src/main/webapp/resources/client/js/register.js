// Register Page JavaScript

// Initialize AOS when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Auto-focus first input when page loads
    document.getElementById('fullName').focus();
});

// Toggle password visibility
function togglePassword(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = document.getElementById(iconId);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Password strength checker
document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    const strength = calculatePasswordStrength(password);

    strengthFill.className = 'strength-fill';

    if (password.length === 0) {
        strengthText.textContent = 'Nhập mật khẩu để kiểm tra độ mạnh';
        return;
    }

    switch (strength.level) {
        case 1:
            strengthFill.classList.add('strength-weak');
            strengthText.textContent = 'Mật khẩu yếu';
            break;
        case 2:
            strengthFill.classList.add('strength-fair');
            strengthText.textContent = 'Mật khẩu khá';
            break;
        case 3:
            strengthFill.classList.add('strength-good');
            strengthText.textContent = 'Mật khẩu tốt';
            break;
        case 4:
            strengthFill.classList.add('strength-strong');
            strengthText.textContent = 'Mật khẩu mạnh';
            break;
    }
});

// Calculate password strength
function calculatePasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return {
        level: Math.min(score, 4),
        score: score
    };
}

// Confirm password validation
document.getElementById('confirmPassword').addEventListener('input', function () {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    const feedback = document.getElementById('confirmPasswordFeedback');

    if (confirmPassword.length > 0) {
        if (password === confirmPassword) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            feedback.textContent = '';
        } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
            feedback.textContent = 'Mật khẩu xác nhận không khớp';
        }
    } else {
        this.classList.remove('is-valid', 'is-invalid');
        feedback.textContent = '';
    }
});

// Form validation
function validateForm() {
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');

    let isValid = true;

    // Validate full name
    if (fullName.value.trim().length < 2) {
        setFieldError(fullName, 'Họ tên phải có ít nhất 2 ký tự');
        isValid = false;
    } else {
        setFieldValid(fullName);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        setFieldError(email, 'Email không hợp lệ');
        isValid = false;
    } else {
        setFieldValid(email);
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
        setFieldError(phone, 'Số điện thoại không hợp lệ');
        isValid = false;
    } else {
        setFieldValid(phone);
    }

    // Validate password
    const strength = calculatePasswordStrength(password.value);
    if (strength.level < 2) {
        setFieldError(password, 'Mật khẩu quá yếu. Cần ít nhất 8 ký tự, có chữ hoa và số');
        isValid = false;
    } else {
        setFieldValid(password);
    }

    // Validate confirm password
    if (password.value !== confirmPassword.value) {
        setFieldError(confirmPassword, 'Mật khẩu xác nhận không khớp');
        isValid = false;
    } else {
        setFieldValid(confirmPassword);
    }

    // Validate terms
    if (!agreeTerms.checked) {
        showToast('Vui lòng đồng ý với điều khoản sử dụng', 'error');
        isValid = false;
    }

    return isValid;
}

// Set field error
function setFieldError(field, message) {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
    const feedback = field.parentNode.querySelector('.invalid-feedback') ||
        field.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = message;
    }
}

// Set field valid
function setFieldValid(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    const feedback = field.parentNode.querySelector('.invalid-feedback') ||
        field.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = '';
    }
}

// Register form handler
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        newsletter: document.getElementById('newsletter').checked
    };

    // Show loading
    showLoading(true);

    // Simulate registration process
    setTimeout(() => {
        // Store user data
        localStorage.setItem('userData', JSON.stringify(formData));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);

        // Show success animation
        showSuccess();

        // Redirect to homepage
        setTimeout(() => {
            window.location.href = 'Homepage.html';
        }, 1500);

        showLoading(false);
    }, 2000);
});

// Show loading state
function showLoading(show) {
    const btnText = document.querySelector('.btn-text');
    const loading = document.querySelector('.loading');
    const submitBtn = document.getElementById('registerBtn');

    if (show) {
        btnText.style.display = 'none';
        loading.style.display = 'flex';
        submitBtn.disabled = true;
    } else {
        btnText.style.display = 'flex';
        loading.style.display = 'none';
        submitBtn.disabled = false;
    }
}

// Show success animation
function showSuccess() {
    const container = document.querySelector('.auth-container');
    container.classList.add('success-animation');

    // Show toast
    showToast('Đăng ký thành công! Chào mừng bạn đến với GoMeal!', 'success');
}

// Toast notification
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #4CAF50, #45a049);' : 'background: linear-gradient(135deg, #f44336, #da190b);'}
    `;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
        ${message}
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Social registration functions
function registerWithGoogle() {
    showToast('Tính năng đăng ký Google sẽ được triển khai sau!', 'error');
}

function registerWithFacebook() {
    showToast('Tính năng đăng ký Facebook sẽ được triển khai sau!', 'error');
}

function registerWithApple() {
    showToast('Tính năng đăng ký Apple sẽ được triển khai sau!', 'error');
}

// Show terms modal
function showTerms() {
    showToast('Điều khoản sử dụng sẽ được hiển thị trong phiên bản chính thức!', 'error');
}

// Show privacy modal
function showPrivacy() {
    showToast('Chính sách bảo mật sẽ được hiển thị trong phiên bản chính thức!', 'error');
}