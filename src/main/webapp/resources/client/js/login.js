// Login Page JavaScript

// Initialize AOS when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Auto-focus email input when page loads
    document.getElementById('email').focus();

    // Remember me functionality
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberMe = localStorage.getItem('rememberMe');

    if (rememberMe === 'true' && rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
});

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('passwordToggleIcon');

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

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Show loading
    showLoading(true);

    // Simulate login process
    setTimeout(() => {
        // Simple validation for demo
        if (email && password) {
            // Store login state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('rememberedEmail', email);
            }

            // Show success animation
            showSuccess();

            // Redirect to homepage
            setTimeout(() => {
                window.location.href = 'Homepage.html';
            }, 1500);
        } else {
            showError('Vui lòng nhập đầy đủ thông tin!');
        }
        showLoading(false);
    }, 2000);
});

// Show loading state
function showLoading(show) {
    const btnText = document.querySelector('.btn-text');
    const loading = document.querySelector('.loading');
    const submitBtn = document.querySelector('button[type="submit"]');

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
    showToast('Đăng nhập thành công!', 'success');
}

// Show error message
function showError(message) {
    showToast(message, 'error');
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
    }, 3000);
}

// Social login functions
function loginWithGoogle() {
    showToast('Tính năng đăng nhập Google sẽ được triển khai sau!', 'error');
}

function loginWithFacebook() {
    showToast('Tính năng đăng nhập Facebook sẽ được triển khai sau!', 'error');
}

function loginWithApple() {
    showToast('Tính năng đăng nhập Apple sẽ được triển khai sau!', 'error');
}