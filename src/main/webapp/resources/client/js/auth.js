// Authentication System JavaScript
// GoMeal - Shared Authentication Functions

class AuthSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthState();
    }

    // Check current authentication state
    checkAuthState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userEmail = localStorage.getItem('userEmail');

        if (isLoggedIn && userEmail) {
            console.log(`✅ User logged in: ${userEmail}`);
        } else {
            console.log('🔓 User not logged in');
        }

        return { isLoggedIn, userEmail };
    }

    // Login user
    login(email, userData = null) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);

        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        this.showToast('Đăng nhập thành công!', 'success');

        // Redirect to homepage after success
        setTimeout(() => {
            window.location.href = 'Homepage.html';
        }, 1500);
    }

    // Register user
    register(userData) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('userData', JSON.stringify(userData));

        this.showToast('Đăng ký thành công! Chào mừng bạn đến với GoMeal!', 'success');

        // Redirect to homepage after success
        setTimeout(() => {
            window.location.href = 'Homepage.html';
        }, 1500);
    }

    // Logout user
    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userData');
        localStorage.removeItem('rememberMe');

        this.showToast('Đăng xuất thành công!', 'success');

        // Redirect to homepage
        setTimeout(() => {
            window.location.href = 'Homepage.html';
        }, 1000);
    }

    // Password validation
    validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        let score = 0;
        let feedback = [];

        if (password.length >= minLength) score++;
        else feedback.push(`Tối thiểu ${minLength} ký tự`);

        if (hasUpperCase) score++;
        else feedback.push('Có chữ hoa');

        if (hasLowerCase) score++;
        else feedback.push('Có chữ thường');

        if (hasNumbers) score++;
        else feedback.push('Có số');

        if (hasSpecial) score++;
        else feedback.push('Có ký tự đặc biệt');

        return {
            score,
            isValid: score >= 3,
            feedback: feedback.join(', '),
            strength: this.getPasswordStrength(score)
        };
    }

    // Get password strength text
    getPasswordStrength(score) {
        if (score <= 1) return { level: 'weak', text: 'Yếu', color: '#ff4757' };
        if (score <= 2) return { level: 'fair', text: 'Khá', color: '#ffa502' };
        if (score <= 3) return { level: 'good', text: 'Tốt', color: '#2ed573' };
        return { level: 'strong', text: 'Mạnh', color: '#2ed573' };
    }

    // Email validation
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation (Vietnamese format)
    validatePhone(phone) {
        const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Show toast notification
    showToast(message, type = 'success') {
        // Remove existing toasts
        document.querySelectorAll('.toast-notification').forEach(toast => toast.remove());

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

        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        toast.innerHTML = `
            <i class="fas ${icon} me-2"></i>
            ${message}
        `;

        document.body.appendChild(toast);

        // Show animation
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Hide animation
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Setup common event listeners
    setupEventListeners() {
        // Toggle password visibility
        document.addEventListener('click', (e) => {
            if (e.target.closest('.password-toggle')) {
                this.togglePassword(e.target.closest('.password-toggle'));
            }
        });

        // Real-time validation
        document.addEventListener('input', (e) => {
            if (e.target.type === 'email') {
                this.validateEmailField(e.target);
            }

            if (e.target.type === 'tel') {
                this.validatePhoneField(e.target);
            }

            if (e.target.type === 'password' && e.target.id === 'password') {
                this.validatePasswordField(e.target);
            }

            if (e.target.id === 'confirmPassword') {
                this.validateConfirmPassword(e.target);
            }
        });
    }

    // Toggle password visibility
    togglePassword(toggleElement) {
        const input = toggleElement.previousElementSibling;
        const icon = toggleElement.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    // Validate email field
    validateEmailField(field) {
        if (field.value.trim().length > 0) {
            if (this.validateEmail(field.value)) {
                this.setFieldValid(field);
            } else {
                this.setFieldError(field, 'Email không hợp lệ');
            }
        } else {
            this.clearFieldValidation(field);
        }
    }

    // Validate phone field
    validatePhoneField(field) {
        if (field.value.trim().length > 0) {
            if (this.validatePhone(field.value)) {
                this.setFieldValid(field);
            } else {
                this.setFieldError(field, 'Số điện thoại không hợp lệ');
            }
        } else {
            this.clearFieldValidation(field);
        }
    }

    // Validate password field with strength meter
    validatePasswordField(field) {
        const validation = this.validatePassword(field.value);
        const strengthMeter = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');

        if (field.value.length === 0) {
            this.clearFieldValidation(field);
            if (strengthMeter) {
                strengthMeter.className = 'strength-fill';
                strengthText.textContent = 'Nhập mật khẩu để kiểm tra độ mạnh';
            }
            return;
        }

        // Update strength meter
        if (strengthMeter && strengthText) {
            strengthMeter.className = 'strength-fill';
            strengthMeter.classList.add(`strength-${validation.strength.level}`);
            strengthText.textContent = `Mật khẩu ${validation.strength.text}`;
        }

        // Set field validation
        if (validation.isValid) {
            this.setFieldValid(field);
        } else {
            this.setFieldError(field, `Mật khẩu cần: ${validation.feedback}`);
        }
    }

    // Validate confirm password
    validateConfirmPassword(field) {
        const password = document.getElementById('password');

        if (field.value.length > 0) {
            if (password && field.value === password.value) {
                this.setFieldValid(field);
            } else {
                this.setFieldError(field, 'Mật khẩu xác nhận không khớp');
            }
        } else {
            this.clearFieldValidation(field);
        }
    }

    // Set field as valid
    setFieldValid(field) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        const feedback = this.getFeedbackElement(field);
        if (feedback) feedback.textContent = '';
    }

    // Set field as invalid
    setFieldError(field, message) {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        const feedback = this.getFeedbackElement(field);
        if (feedback) feedback.textContent = message;
    }

    // Clear field validation
    clearFieldValidation(field) {
        field.classList.remove('is-valid', 'is-invalid');
        const feedback = this.getFeedbackElement(field);
        if (feedback) feedback.textContent = '';
    }

    // Get feedback element for field
    getFeedbackElement(field) {
        return field.parentNode.querySelector('.invalid-feedback') ||
            field.nextElementSibling?.classList.contains('invalid-feedback') ?
            field.nextElementSibling : null;
    }

    // Show loading state on button
    showButtonLoading(button, show = true) {
        const btnText = button.querySelector('.btn-text');
        const loading = button.querySelector('.loading');

        if (show) {
            if (btnText) btnText.style.display = 'none';
            if (loading) loading.style.display = 'flex';
            button.disabled = true;
        } else {
            if (btnText) btnText.style.display = 'flex';
            if (loading) loading.style.display = 'none';
            button.disabled = false;
        }
    }

    // Simulate API delay
    async simulateApiCall(delay = 2000) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}

// Initialize auth system
const authSystem = new AuthSystem();

// Export for use in other files
window.AuthSystem = AuthSystem;
window.authSystem = authSystem;
