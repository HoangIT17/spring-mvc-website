// Profile JavaScript
class ProfileManager {
    constructor() {
        this.currentTab = 'personal';
        this.userData = {};
        this.init();
    }

    init() {
        try {
            console.log('🚀 ProfileManager initializing...');
            this.loadUserData();
            this.bindEvents();
            this.initializePasswordStrength();
            console.log('✅ ProfileManager initialized successfully');
        } catch (error) {
            console.error('💥 ProfileManager initialization error:', error);
        }
    }

    loadUserData() {
        // Load saved user data from localStorage if available
        const savedUserData = localStorage.getItem('userData');

        if (savedUserData) {
            this.userData = JSON.parse(savedUserData);
        } else {
            // Sample user data matching current profile display
            this.userData = {
                firstName: 'Dinh',
                lastName: 'Vy',
                email: 'hoangyy@gmail.com',
                phone: '+84 0766629828',
                address: 'k733/5 ngô Quyền',
                city: 'danang',
                country: 'vietnam',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&auto=format',
                settings: {
                    twoFactorAuth: true,
                    loginNotifications: false,
                    orderUpdates: true,
                    deliveryUpdates: true,
                    promotions: true,
                    newRestaurants: false,
                    emailNotifications: true,
                    smsNotifications: false,
                    pushNotifications: true,
                    autoPayment: true,
                    saveReceipts: false
                }
            };
        }

        // Always save current userData to localStorage to ensure sync
        localStorage.setItem('userData', JSON.stringify(this.userData));
        console.log('📋 User data saved to localStorage:', this.userData);

        this.populateForm();
    }

    populateForm() {
        // Populate personal info with null checks
        const firstName = document.getElementById('firstName');
        if (firstName) firstName.value = this.userData.firstName || '';

        const lastName = document.getElementById('lastName');
        if (lastName) lastName.value = this.userData.lastName || '';

        const email = document.getElementById('email');
        if (email) email.value = this.userData.email || '';

        const phone = document.getElementById('phone');
        if (phone) phone.value = this.userData.phone || '';

        const address = document.getElementById('address');
        if (address) address.value = this.userData.address || '';

        const city = document.getElementById('city');
        if (city) city.value = this.userData.city || '';

        const country = document.getElementById('country');
        if (country) country.value = this.userData.country || '';

        const avatarImage = document.getElementById('avatarImage');
        if (avatarImage && this.userData.avatar) {
            avatarImage.src = this.userData.avatar;
        }

        // Populate settings
        if (this.userData.settings) {
            Object.keys(this.userData.settings).forEach(setting => {
                const element = document.getElementById(setting);
                if (element) {
                    element.checked = this.userData.settings[setting];
                }
            });
        }
    }

    bindEvents() {
        // Sidebar navigation
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const itemText = e.currentTarget.querySelector('span').textContent.trim();
                this.handleSidebarNavigation(itemText);
            });
        });

        // Sidebar logo click
        const sidebarLogo = document.getElementById('brand');
        if (sidebarLogo) {
            sidebarLogo.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'Homepage.html';
            });
        }

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });

        // Avatar upload
        const avatarContainer = document.querySelector('.avatar-container');
        if (avatarContainer) {
            avatarContainer.addEventListener('click', () => {
                const avatarInput = document.getElementById('avatarInput');
                if (avatarInput) {
                    avatarInput.click();
                }
            });
        }

        const avatarInput = document.getElementById('avatarInput');
        if (avatarInput) {
            avatarInput.addEventListener('change', (e) => {
                this.handleAvatarUpload(e);
            });
        }

        // Form submissions
        const savePersonalBtn = document.getElementById('savePersonalBtn');
        console.log('🔍 savePersonalBtn found:', !!savePersonalBtn);
        if (savePersonalBtn) {
            savePersonalBtn.addEventListener('click', () => {
                console.log('🖱️ Save button clicked!');
                this.savePersonalInfo();
            });
            console.log('✅ savePersonalBtn event listener attached');
        } else {
            console.error('❌ savePersonalBtn not found!');
        }

        const saveSecurityBtn = document.getElementById('saveSecurityBtn');
        if (saveSecurityBtn) {
            saveSecurityBtn.addEventListener('click', () => {
                this.saveSecuritySettings();
            });
        }

        const saveNotificationsBtn = document.getElementById('saveNotificationsBtn');
        if (saveNotificationsBtn) {
            saveNotificationsBtn.addEventListener('click', () => {
                this.saveNotificationSettings();
            });
        }

        // Password toggles
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                this.togglePassword(e.currentTarget);
            });
        });

        // Password strength
        document.getElementById('newPassword').addEventListener('input', (e) => {
            this.updatePasswordStrength(e.target.value);
        });

        // Payment methods
        document.getElementById('addPaymentBtn').addEventListener('click', () => {
            this.showAddPaymentModal();
        });

        document.getElementById('savePaymentBtn').addEventListener('click', () => {
            this.savePaymentMethod();
        });

        // Cancel buttons
        document.getElementById('cancelPersonalBtn').addEventListener('click', () => {
            this.resetPersonalForm();
        });

        document.getElementById('cancelSecurityBtn').addEventListener('click', () => {
            this.resetSecurityForm();
        });

        document.getElementById('cancelNotificationsBtn').addEventListener('click', () => {
            this.resetNotificationSettings();
        });
    }

    handleSidebarNavigation(itemText) {
        switch (itemText) {
            case 'Trang Chủ':
                window.location.href = 'Homepage.html';
                break;
            case 'Yêu Thích':
                window.location.href = 'Favorite.html';
                break;
            case 'Tin Nhắn':
                window.location.href = 'Chatbox.html';
                break;
            case 'Lịch Sử Đặt Hàng':
                window.location.href = 'Order.html';
                break;
            case 'Hóa Đơn':
                window.location.href = 'Invoice.html';
                break;
            case 'Cài Đặt':
                // Already on profile page
                break;
        }
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;
    }

    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                this.showNotification('Kích thước file không được vượt quá 2MB!', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('avatarImage').src = e.target.result;
                this.showNotification('Ảnh đại diện đã được cập nhật!', 'success');
            };
            reader.readAsDataURL(file);
        }
    }

    savePersonalInfo() {
        try {
            console.log('🚀 savePersonalInfo called');

            // Collect form data with null checks
            const firstNameEl = document.getElementById('firstName');
            const lastNameEl = document.getElementById('lastName');
            const emailEl = document.getElementById('email');
            const phoneEl = document.getElementById('phone');
            const addressEl = document.getElementById('address');
            const cityEl = document.getElementById('city');
            const countryEl = document.getElementById('country');

            console.log('📋 Elements found:', {
                firstName: !!firstNameEl,
                lastName: !!lastNameEl,
                email: !!emailEl,
                phone: !!phoneEl,
                address: !!addressEl,
                city: !!cityEl,
                country: !!countryEl
            });

            if (!firstNameEl || !lastNameEl || !emailEl || !phoneEl || !addressEl || !cityEl || !countryEl) {
                console.error('❌ Missing elements');
                this.showNotification('Không thể tìm thấy các trường thông tin. Vui lòng tải lại trang!', 'error');
                return;
            }

            const formData = {
                firstName: firstNameEl.value,
                lastName: lastNameEl.value,
                email: emailEl.value,
                phone: phoneEl.value,
                address: addressEl.value,
                city: cityEl.value,
                country: countryEl.value
            };

            console.log('📋 Form data:', formData);

            // Validate required fields
            if (!formData.firstName || !formData.lastName || !formData.email) {
                this.showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
                return;
            }

            // Validate email
            if (!this.isValidEmail(formData.email)) {
                this.showNotification('Email không hợp lệ!', 'error');
                return;
            }

            // Save data (in real app would send to API)
            Object.assign(this.userData, formData);

            // Save address info to localStorage for use in cart/checkout
            const addressInfo = {
                address: formData.address,
                city: formData.city,
                country: formData.country,
                fullAddress: `${formData.address}, ${this.getCityName(formData.city)}, ${this.getCountryName(formData.country)}`
            };
            localStorage.setItem('userAddress', JSON.stringify(addressInfo));

            // Save all user data to localStorage
            localStorage.setItem('userData', JSON.stringify(this.userData));

            this.showNotification('Thông tin cá nhân đã được cập nhật thành công!', 'success');
            console.log('✅ Profile saved successfully');

        } catch (error) {
            console.error('❌ Error in savePersonalInfo:', error);
            this.showNotification('Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại!', 'error');
        }
    }

    saveSecuritySettings() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword) {
            if (!currentPassword) {
                this.showNotification('Vui lòng nhập mật khẩu hiện tại!', 'error');
                return;
            }

            if (newPassword !== confirmPassword) {
                this.showNotification('Mật khẩu xác nhận không khớp!', 'error');
                return;
            }

            if (newPassword.length < 8) {
                this.showNotification('Mật khẩu mới phải có ít nhất 8 ký tự!', 'error');
                return;
            }
        }

        // Update security settings
        this.userData.settings.twoFactorAuth = document.getElementById('twoFactorAuth').checked;
        this.userData.settings.loginNotifications = document.getElementById('loginNotifications').checked;

        this.showNotification('Cài đặt bảo mật đã được cập nhật!', 'success');
        this.resetSecurityForm();
    }

    saveNotificationSettings() {
        // Update notification settings
        const notificationElements = [
            'orderUpdates', 'deliveryUpdates', 'promotions', 'newRestaurants',
            'emailNotifications', 'smsNotifications', 'pushNotifications'
        ];

        notificationElements.forEach(setting => {
            const element = document.getElementById(setting);
            if (element) {
                this.userData.settings[setting] = element.checked;
            }
        });

        this.showNotification('Cài đặt thông báo đã được cập nhật!', 'success');
    }

    togglePassword(button) {
        const input = button.previousElementSibling;
        const icon = button.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    initializePasswordStrength() {
        this.updatePasswordStrength('');
    }

    updatePasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text span');

        let strength = 0;
        let strengthLabel = 'Yếu';
        let strengthColor = '#dc3545';

        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;

        if (strength >= 75) {
            strengthLabel = 'Mạnh';
            strengthColor = '#28a745';
        } else if (strength >= 50) {
            strengthLabel = 'Trung bình';
            strengthColor = '#ffc107';
        } else if (strength >= 25) {
            strengthLabel = 'Yếu';
            strengthColor = '#fd7e14';
        }

        strengthBar.style.width = `${strength}%`;
        strengthBar.style.background = strengthColor;
        strengthText.textContent = strengthLabel;
        strengthText.style.color = strengthColor;
    }

    showAddPaymentModal() {
        const modal = new bootstrap.Modal(document.getElementById('addPaymentModal'));
        modal.show();
    }

    savePaymentMethod() {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('cardName').value;

        if (!cardNumber || !expiryDate || !cvv || !cardName) {
            this.showNotification('Vui lòng điền đầy đủ thông tin thẻ!', 'error');
            return;
        }

        // Validate card number (simple validation)
        if (cardNumber.replace(/\s/g, '').length !== 16) {
            this.showNotification('Số thẻ không hợp lệ!', 'error');
            return;
        }

        this.showNotification('Phương thức thanh toán đã được thêm!', 'success');

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addPaymentModal'));
        modal.hide();

        // Reset form
        document.getElementById('addPaymentForm').reset();
    }

    resetPersonalForm() {
        this.populateForm();
        this.showNotification('Đã khôi phục thông tin ban đầu!', 'info');
    }

    resetSecurityForm() {
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        this.updatePasswordStrength('');
    }

    resetNotificationSettings() {
        // Reset to saved settings
        Object.keys(this.userData.settings).forEach(setting => {
            const element = document.getElementById(setting);
            if (element) {
                element.checked = this.userData.settings[setting];
            }
        });
        this.showNotification('Đã khôi phục cài đặt ban đầu!', 'info');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
        `;

        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    new ProfileManager();

    // Card number formatting
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
        });
    }

    // Expiry date formatting
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV formatting
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        });
    }
});

// Add missing methods to ProfileManager

ProfileManager.prototype.saveSecuritySettings = function () {
    // Get security data
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword && newPassword !== confirmPassword) {
        this.showNotification('Mật khẩu xác nhận không khớp!', 'error');
        return;
    }

    // In real app, would validate current password and update on server
    this.showNotification('Cài đặt bảo mật đã được cập nhật!', 'success');
};

ProfileManager.prototype.getCityName = function (cityCode) {
    const cities = {
        'hcm': 'Hồ Chí Minh',
        'hanoi': 'Hà Nội',
        'danang': 'Đà Nẵng'
    };
    return cities[cityCode] || cityCode;
};

ProfileManager.prototype.getCountryName = function (countryCode) {
    const countries = {
        'vietnam': 'Việt Nam'
    };
    return countries[countryCode] || countryCode;
};

ProfileManager.prototype.showNotification = function (message, type = 'success') {
    // Create toast notification container
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;

    // Create toast content structure
    const toastContent = document.createElement('div');
    toastContent.className = 'toast-content';

    const toastTitle = document.createElement('div');
    toastTitle.className = 'toast-title';

    const toastMessage = document.createElement('div');
    toastMessage.className = 'toast-message';
    toastMessage.textContent = message;

    // Set title based on type
    switch (type) {
        case 'success':
            toastTitle.textContent = 'Thành công!';
            break;
        case 'error':
            toastTitle.textContent = 'Lỗi!';
            break;
        case 'warning':
            toastTitle.textContent = 'Cảnh báo!';
            break;
        default:
            toastTitle.textContent = 'Thông báo';
    }

    // Assemble toast structure
    toastContent.appendChild(toastTitle);
    toastContent.appendChild(toastMessage);
    toast.appendChild(toastContent);

    // Add to page
    document.body.appendChild(toast);

    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show', 'slide-in');
    }, 50);

    // Auto-hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('slide-out');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 4000);

    // Add click to dismiss
    toast.addEventListener('click', () => {
        toast.classList.remove('show');
        toast.classList.add('slide-out');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    });
};

ProfileManager.prototype.resetPersonalForm = function () {
    this.populateForm();
};

ProfileManager.prototype.resetSecurityForm = function () {
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
};
