// Pay Page JavaScript
class PaymentProcessor {
    constructor() {
        this.selectedPaymentMethod = 'cod';
        this.orderData = this.loadOrderData();
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadOrderSummary();
        this.initializeAnimations();
        this.formatInputs();
        this.loadDeliveryInfo();
        this.setupStorageListener();
    }

    setupStorageListener() {
        // Listen for localStorage changes to sync profile updates
        window.addEventListener('storage', (e) => {
            if (e.key === 'userData') {
                console.log('👤 User data updated, refreshing delivery info...');
                this.loadDeliveryInfo();
            }
        });

        // Also check when window gains focus (user returns from Profile page)
        window.addEventListener('focus', () => {
            this.loadDeliveryInfo();
        });
    }

    loadDeliveryInfo() {
        // Load user profile data from localStorage (sync with Profile page)
        console.log('🔍 Checking localStorage for userData...');
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log('📋 Raw userData from localStorage:', userData);

        if (userData) {
            console.log('📋 Loading delivery info from profile:', userData);

            // Update customer name
            const customerNameField = document.getElementById('customerName');
            if (customerNameField && userData.firstName && userData.lastName) {
                const fullName = `${userData.firstName} ${userData.lastName}`;
                console.log('👤 Setting customer name:', fullName);
                customerNameField.value = fullName;
            }

            // Update phone number
            const customerPhoneField = document.getElementById('customerPhone');
            if (customerPhoneField && userData.phone) {
                console.log('📞 Setting phone number:', userData.phone);
                customerPhoneField.value = userData.phone;
            }

            // Update delivery address
            const deliveryAddressField = document.getElementById('deliveryAddress');
            if (deliveryAddressField && userData.address) {
                // Format address with city information
                let fullAddress = userData.address;

                // Add city name if available
                if (userData.city) {
                    const cityName = this.getCityName(userData.city);
                    if (cityName) {
                        fullAddress += `, ${cityName}`;
                    }
                }

                // Add country if available
                if (userData.country) {
                    const countryName = this.getCountryName(userData.country);
                    if (countryName) {
                        fullAddress += `, ${countryName}`;
                    }
                }

                console.log('🏠 Setting delivery address:', fullAddress);
                deliveryAddressField.value = fullAddress;
            }

            // Show sync confirmation
            this.showSyncStatus();
        } else {
            console.log('⚠️ No user profile data found in localStorage');
            // Try to load from default values if no localStorage data
            this.setDefaultValues();
        }
    }

    setDefaultValues() {
        console.log('📝 Setting default values...');
        const defaultData = {
            firstName: 'Dinh',
            lastName: 'Vy',
            phone: '+84 0766629828',
            address: 'k733/5 ngô Quyền',
            city: 'danang',
            country: 'vietnam'
        };

        const customerNameField = document.getElementById('customerName');
        if (customerNameField) {
            customerNameField.value = `${defaultData.firstName} ${defaultData.lastName}`;
        }

        const customerPhoneField = document.getElementById('customerPhone');
        if (customerPhoneField) {
            customerPhoneField.value = defaultData.phone;
        }

        const deliveryAddressField = document.getElementById('deliveryAddress');
        if (deliveryAddressField) {
            const fullAddress = `${defaultData.address}, ${this.getCityName(defaultData.city)}, ${this.getCountryName(defaultData.country)}`;
            deliveryAddressField.value = fullAddress;
        }
    } showSyncStatus() {
        // Create or update sync status indicator
        let syncIndicator = document.getElementById('syncIndicator');
        if (!syncIndicator) {
            syncIndicator = document.createElement('div');
            syncIndicator.id = 'syncIndicator';
            syncIndicator.className = 'alert alert-success alert-sm mt-2';
            syncIndicator.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                Thông tin đã được đồng bộ từ hồ sơ của bạn
            `;
            syncIndicator.style.cssText = `
                padding: 8px 12px;
                font-size: 0.85rem;
                border-radius: 6px;
                background: linear-gradient(135deg, #d1edff, #e8f8f5);
                border: 1px solid #bee5eb;
                color: #0c5460;
                margin-top: 10px;
                transition: opacity 0.3s ease;
            `;

            const deliverySection = document.querySelector('.delivery-info');
            if (deliverySection) {
                deliverySection.appendChild(syncIndicator);
            }
        }

        // Show the indicator
        syncIndicator.style.opacity = '1';

        // Auto-hide after 3 seconds
        setTimeout(() => {
            if (syncIndicator) {
                syncIndicator.style.opacity = '0';
            }
        }, 3000);
    }

    loadOrderData() {
        // Load cart data from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        let sampleOrderItems;
        if (cartItems.length > 0) {
            // Use actual cart data
            sampleOrderItems = cartItems;
        } else {
            // Use sample data if cart is empty
            sampleOrderItems = [
                {
                    id: 1,
                    name: "Pizza Xúc Xích",
                    quantity: 1,
                    price: 129000,
                    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop&auto=format"
                }
            ];
        }

        const subtotal = sampleOrderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const deliveryFee = 20000;
        const discount = 0;

        return {
            items: sampleOrderItems,
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            discount: discount,
            total: subtotal + deliveryFee - discount
        };
    }

    bindEvents() {
        // Sidebar navigation
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const itemText = e.currentTarget.querySelector('span').textContent.trim();
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
                    case 'Thanh Toán':
                        // Already on payment page
                        break;
                }
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

        // Payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', (e) => {
                this.selectPaymentMethod(e.currentTarget);
            });
        });

        // Radio button changes
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.handlePaymentMethodChange(e.target.value);
            });
        });

        // Place order button - updated to use new data synchronization
        document.getElementById('placeOrderBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleOrderSubmission();
        });

        // Apply promo code
        document.getElementById('applyPromo').addEventListener('click', () => {
            this.applyPromoCode();
        });

        // Sync data button
        const syncDataBtn = document.getElementById('syncDataBtn');
        if (syncDataBtn) {
            syncDataBtn.addEventListener('click', () => {
                console.log('🔄 Manual sync triggered');
                this.loadDeliveryInfo();
            });
        }

        // Input validations
        this.bindInputValidations();
    }

    selectPaymentMethod(methodElement) {
        // Remove active class from all methods
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('active');
        });

        // Add active class to selected method
        methodElement.classList.add('active');

        // Update radio button
        const radio = methodElement.querySelector('input[type="radio"]');
        radio.checked = true;

        // Update selected method
        this.selectedPaymentMethod = radio.value;

        // Show/hide card form
        this.toggleCardForm();

        // Add animation
        methodElement.style.animation = 'none';
        setTimeout(() => {
            methodElement.style.animation = 'fadeInScale 0.5s ease';
        }, 10);
    }

    handlePaymentMethodChange(method) {
        this.selectedPaymentMethod = method;
        this.toggleCardForm();
    }

    toggleCardForm() {
        // Card form is no longer needed since we only support COD
        const cardForm = document.getElementById('cardForm');
        if (cardForm) {
            cardForm.style.display = 'none';
        }
    }

    loadOrderSummary() {
        const container = document.getElementById('orderItems');
        container.innerHTML = '';

        this.orderData.items.forEach((item, index) => {
            const orderItem = this.createOrderItem(item);
            container.appendChild(orderItem);

            // Staggered animation
            setTimeout(() => {
                orderItem.style.opacity = '1';
                orderItem.style.transform = 'translateX(0)';
            }, index * 100);
        });

        this.updateOrderTotals();
    }

    createOrderItem(item) {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.style.opacity = '0';
        orderItem.style.transform = 'translateX(-20px)';
        orderItem.style.transition = 'all 0.5s ease';

        orderItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="order-item-image">
            <div class="order-item-info">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-details">Số lượng: ${item.quantity}</div>
            </div>
            <div class="order-item-price">
                ${this.formatPrice(item.price * item.quantity)}
            </div>
        `;

        return orderItem;
    }

    updateOrderTotals() {
        document.getElementById('subtotal').textContent = this.formatPrice(this.orderData.subtotal);
        document.getElementById('deliveryFee').textContent = this.formatPrice(this.orderData.deliveryFee);
        document.getElementById('discount').textContent = this.formatPrice(-this.orderData.discount);
        document.getElementById('finalTotal').textContent = this.formatPrice(this.orderData.total);
    }

    applyPromoCode() {
        const promoInput = document.getElementById('promoCode');
        const promoCode = promoInput.value.trim().toUpperCase();

        if (!promoCode) {
            this.showNotification('Vui lòng nhập mã giảm giá!', 'error');
            return;
        }

        // Sample promo codes
        const promoCodes = {
            'GOMEAL20': { discount: 20, type: 'percentage' },
            'FIRSTORDER': { discount: 50000, type: 'amount' },
            'WELCOME10': { discount: 10, type: 'percentage' }
        };

        const promo = promoCodes[promoCode];

        if (promo) {
            let discountAmount;

            if (promo.type === 'percentage') {
                discountAmount = this.orderData.subtotal * (promo.discount / 100);
            } else {
                discountAmount = promo.discount;
            }

            // Apply discount
            this.orderData.discount = discountAmount;
            this.orderData.total = this.orderData.subtotal + this.orderData.deliveryFee - discountAmount;

            this.updateOrderTotals();

            // Disable promo input
            promoInput.disabled = true;
            document.getElementById('applyPromo').disabled = true;
            document.getElementById('applyPromo').textContent = 'Đã áp dụng';

            this.showNotification(`Áp dụng thành công! Giảm ${this.formatPrice(discountAmount)}`, 'success');
        } else {
            this.showNotification('Mã giảm giá không hợp lệ!', 'error');
            this.animateError(promoInput);
        }
    }

    processOrder() {
        if (!this.validateOrder()) {
            return;
        }

        this.showLoadingOverlay();

        // Simulate payment processing
        setTimeout(() => {
            this.hideLoadingOverlay();
            this.showSuccessModal();
        }, 3000);
    }

    validateOrder() {
        const customerName = document.getElementById('customerName').value.trim();
        const customerPhone = document.getElementById('customerPhone').value.trim();
        const deliveryAddress = document.getElementById('deliveryAddress').value.trim();

        if (!customerName || !customerPhone || !deliveryAddress) {
            this.showNotification('Vui lòng điền đầy đủ thông tin giao hàng!', 'error');
            return false;
        }

        // Since we only support COD, no card validation needed
        return true;
    }

    validateCardNumber(cardNumber) {
        // Remove spaces and check if it's 16 digits
        const cleanNumber = cardNumber.replace(/\s/g, '');
        return /^\d{16}$/.test(cleanNumber);
    }

    validateExpiryDate(expiryDate) {
        // Check MM/YY format
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!regex.test(expiryDate)) return false;

        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        const expYear = parseInt(year);
        const expMonth = parseInt(month);

        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            return false;
        }

        return true;
    }

    validateCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }

    showLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.add('show');
    }

    hideLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.remove('show');
    }

    showSuccessModal() {
        // Process successful payment
        const orderData = this.processSuccessfulPayment();

        // Update modal with actual order number
        const orderNumberDisplay = document.getElementById('orderNumberDisplay');
        if (orderNumberDisplay && orderData) {
            orderNumberDisplay.innerHTML = `<strong>Mã đơn hàng: ${orderData.id}</strong>`;
        }

        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();
    }

    processSuccessfulPayment() {
        // Get current cart items
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        if (cartItems.length === 0) {
            console.warn('No items in cart to process');
            return;
        }

        // Get customer information
        const customerName = document.getElementById('customerName')?.value || 'Khách hàng';
        const customerPhone = document.getElementById('customerPhone')?.value || '';
        const customerEmail = 'customer@example.com'; // Default email
        const deliveryAddress = document.getElementById('deliveryAddress')?.value || '';

        // Calculate totals
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = 20000; // Fixed delivery fee
        const discount = 0; // Can be calculated from coupon
        const total = subtotal + deliveryFee - discount;

        // Generate unique IDs
        const orderId = this.generateOrderId();
        const invoiceId = this.generateInvoiceId();
        const currentDate = this.getCurrentDate();
        const currentTime = this.getCurrentTime();

        // Create order object for order history
        const orderData = {
            id: orderId,
            date: currentDate,
            time: currentTime,
            status: 'completed',
            restaurant: 'GoMeal', // Can be extracted from items if needed
            items: cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=50&h=50&fit=crop&auto=format'
            })),
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            discount: discount,
            total: total,
            address: deliveryAddress,
            paymentMethod: this.getPaymentMethodText()
        };

        // Create invoice object
        const invoiceData = {
            id: invoiceId,
            orderNumber: orderId,
            date: currentDate,
            dueDate: currentDate, // Same as creation date for completed orders
            status: 'paid',
            restaurant: 'GoMeal',
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhone: customerPhone,
            customerAddress: deliveryAddress,
            items: cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
            })),
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            discount: discount,
            tax: 0,
            total: total,
            paymentMethod: this.getPaymentMethodText(),
            paymentDate: currentDate
        };

        // Save to localStorage
        this.saveCompletedOrder(orderData);
        this.savePaidInvoice(invoiceData);

        // Clear cart
        this.clearCart();

        console.log('Payment processed successfully:', { orderData, invoiceData });

        // Return order data for use in modal
        return orderData;
    }

    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `GO-${timestamp}${random}`.substring(0, 12);
    }

    generateInvoiceId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 100);
        return `INV-${timestamp}${random}`.substring(0, 10);
    }

    getCurrentDate() {
        const now = new Date();
        return now.toLocaleDateString('vi-VN');
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    }

    getPaymentMethodText() {
        // Only support COD now
        return 'Thanh toán khi nhận hàng';
    }

    saveCompletedOrder(orderData) {
        try {
            const existingOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
            existingOrders.unshift(orderData); // Add to beginning of array
            localStorage.setItem('completedOrders', JSON.stringify(existingOrders));
        } catch (error) {
            console.error('Error saving completed order:', error);
        }
    }

    savePaidInvoice(invoiceData) {
        try {
            const existingInvoices = JSON.parse(localStorage.getItem('paidInvoices')) || [];
            existingInvoices.unshift(invoiceData); // Add to beginning of array
            localStorage.setItem('paidInvoices', JSON.stringify(existingInvoices));
        } catch (error) {
            console.error('Error saving paid invoice:', error);
        }
    }

    clearCart() {
        try {
            localStorage.removeItem('cart');
            // Also clear cart count if exists
            localStorage.setItem('cartCount', '0');
            console.log('Cart cleared successfully');
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }

    // Clear cart after successful order placement
    clearCartAfterOrder() {
        try {
            // Remove cart items from all possible keys
            localStorage.removeItem('cartItems');
            localStorage.removeItem('cart');

            // Reset cart count
            localStorage.setItem('cartCount', '0');

            // Update cart badge if it exists
            const cartBadge = document.getElementById('cartBadge');
            if (cartBadge) {
                cartBadge.textContent = '0';
            }

            // Update cart badge on other pages too
            const cartCount = document.querySelector('.cart-badge');
            if (cartCount) {
                cartCount.textContent = '0';
            }

            console.log('✅ Cart cleared after successful order');
        } catch (error) {
            console.error('❌ Error clearing cart after order:', error);
        }
    }

    formatInputs() {
        // Format card number input
        const cardNumberInput = document.getElementById('cardNumber');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\s/g, '');
                let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
                e.target.value = formattedValue;
            });
        }

        // Format expiry date input
        const expiryInput = document.getElementById('expiryDate');
        if (expiryInput) {
            expiryInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }

        // Format CVV input (numbers only)
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Format phone number
        const phoneInput = document.getElementById('customerPhone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^\d\s\-\+\(\)]/g, '');
            });
        }
    }

    bindInputValidations() {
        // Real-time validation for card inputs
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber) {
            cardNumber.addEventListener('blur', (e) => {
                if (e.target.value && !this.validateCardNumber(e.target.value)) {
                    this.animateError(e.target);
                }
            });
        }

        const expiryDate = document.getElementById('expiryDate');
        if (expiryDate) {
            expiryDate.addEventListener('blur', (e) => {
                if (e.target.value && !this.validateExpiryDate(e.target.value)) {
                    this.animateError(e.target);
                }
            });
        }

        const cvv = document.getElementById('cvv');
        if (cvv) {
            cvv.addEventListener('blur', (e) => {
                if (e.target.value && !this.validateCVV(e.target.value)) {
                    this.animateError(e.target);
                }
            });
        }

        // Auto-save delivery information
        const deliveryFields = ['customerName', 'customerPhone', 'deliveryAddress', 'orderNote'];

        deliveryFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.addEventListener('input', () => {
                    this.saveDeliveryInfo();
                });
            }
        });
    }

    animateError(element) {
        element.style.borderColor = '#dc3545';
        element.style.animation = 'shake 0.5s ease';

        setTimeout(() => {
            element.style.borderColor = '';
            element.style.animation = '';
        }, 500);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : 'success'} notification-toast`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'} me-2"></i>
            ${message}
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            animation: slideInRight 0.5s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }

    initializeAnimations() {
        // Animate sections on load
        const sections = ['.payment-section', '.card-form', '.delivery-section', '.order-summary'];

        sections.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    element.style.transition = 'all 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });

        // Animate payment methods
        setTimeout(() => {
            document.querySelectorAll('.payment-method').forEach((method, index) => {
                setTimeout(() => {
                    method.style.opacity = '1';
                    method.style.transform = 'translateX(0)';
                }, index * 100);
            });
        }, 800);
    }

    // Load delivery information from localStorage or set defaults
    loadDeliveryInfo() {
        const savedDeliveryInfo = localStorage.getItem('deliveryInfo');
        if (savedDeliveryInfo) {
            const deliveryInfo = JSON.parse(savedDeliveryInfo);
            // Populate form fields with saved data
            const fieldMapping = {
                'customerName': 'name',
                'customerPhone': 'phone',
                'deliveryAddress': 'address',
                'orderNote': 'note'
            };

            Object.keys(fieldMapping).forEach(fieldId => {
                const element = document.getElementById(fieldId);
                const dataKey = fieldMapping[fieldId];
                if (element && deliveryInfo[dataKey]) {
                    element.value = deliveryInfo[dataKey];
                }
            });
        }
    }

    // Handle order submission and data synchronization
    handleOrderSubmission() {
        // Collect form data
        const orderData = this.collectOrderData();

        // Validate required fields
        if (!this.validateOrderData(orderData)) {
            this.showNotification('Vui lòng điền đầy đủ thông tin giao hàng', 'error');
            return;
        }

        // Generate order ID
        const orderId = 'FD' + Date.now().toString().slice(-8);
        orderData.id = orderId;

        // Save order to orders list for Invoice page
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        // Save current order and order ID
        localStorage.setItem('currentOrder', JSON.stringify(orderData));
        localStorage.setItem('orderTimestamp', new Date().toISOString());
        localStorage.setItem('lastOrderId', orderId);

        // Clear cart after successful order
        this.clearCartAfterOrder();

        // Show success modal instead of alert
        this.showSuccessModal(orderId);
    }

    // Collect all order data from the form
    collectOrderData() {
        // Get cart items - check both possible keys for compatibility
        let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (cartItems.length === 0) {
            cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        }

        console.log('📦 Cart items found:', cartItems);

        // Get delivery information
        const deliveryInfo = {
            name: document.getElementById('customerName')?.value || '',
            phone: document.getElementById('customerPhone')?.value || '',
            address: document.getElementById('deliveryAddress')?.value || '',
            note: document.getElementById('orderNote')?.value || ''
        };

        // Get payment method
        const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'cod';

        // Calculate totals
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shippingFee = 20000; // Fixed shipping fee
        const total = subtotal + shippingFee;

        return {
            items: cartItems,
            delivery: deliveryInfo,
            payment: {
                method: paymentMethod,
                subtotal: subtotal,
                shippingFee: shippingFee,
                total: total
            },
            timestamp: new Date().toISOString(),
            status: 'confirmed'
        };
    }

    // Validate order data
    validateOrderData(orderData) {
        const delivery = orderData.delivery;
        return delivery.name && delivery.phone && delivery.address;
    }

    // Save delivery info when form changes
    saveDeliveryInfo() {
        const deliveryInfo = {
            name: document.getElementById('customerName')?.value || '',
            phone: document.getElementById('customerPhone')?.value || '',
            address: document.getElementById('deliveryAddress')?.value || '',
            note: document.getElementById('orderNote')?.value || ''
        };

        localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
    }

    // Show success modal with order details
    showSuccessModal(orderId) {
        // Update order number in modal
        const orderNumberDisplay = document.querySelector('.order-value');
        if (orderNumberDisplay) {
            orderNumberDisplay.textContent = '#' + orderId;
        }

        // Calculate estimated delivery time (current time + 25-30 minutes)
        const now = new Date();
        const estimatedTime = new Date(now.getTime() + 27.5 * 60000); // 27.5 minutes average
        const timeString = estimatedTime.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const estimatedDeliveryElement = document.getElementById('estimatedDelivery');
        if (estimatedDeliveryElement) {
            estimatedDeliveryElement.textContent = timeString;
        }

        // Show modal with Bootstrap
        const modal = new bootstrap.Modal(document.getElementById('successModal'), {
            backdrop: 'static',
            keyboard: false
        });
        modal.show();

        // Add confetti effect
        this.triggerConfetti();

        // Auto redirect after 10 seconds if user doesn't interact
        setTimeout(() => {
            if (document.getElementById('successModal').classList.contains('show')) {
                window.location.href = 'Invoice.html';
            }
        }, 10000);
    }

    // Trigger confetti animation effect
    triggerConfetti() {
        // Create confetti elements
        const colors = ['#667eea', '#764ba2', '#28a745', '#ffc107', '#dc3545', '#17a2b8'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;

        document.body.appendChild(confettiContainer);

        // Generate confetti pieces
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;

            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                left: ${left}%;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall ${animationDuration}s linear ${delay}s forwards;
            `;

            confettiContainer.appendChild(confetti);
        }

        // Remove confetti after animation
        setTimeout(() => {
            if (confettiContainer.parentNode) {
                confettiContainer.parentNode.removeChild(confettiContainer);
            }
        }, 7000);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    .notification-toast {
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        border-radius: 10px;
        border: none;
    }
`;
document.head.appendChild(style);

// Initialize payment processor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.paymentProcessor = new PaymentProcessor();
});

// Add some utility functions
window.goBack = function () {
    window.history.back();
};

window.goToHomepage = function () {
    window.location.href = 'Homepage.html';
};

window.goToOrders = function () {
    window.location.href = 'Order.html';
};

// Logo animation function
function initLogoAnimation() {
    const logo = document.querySelector('.sidebar-logo');
    const logoIcon = document.querySelector('.sidebar-logo i');
    const logoText = document.querySelector('.logo-text');

    if (logo) {
        // Initial hide state
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.5) translateY(-20px)';

        // Animate in after short delay
        setTimeout(() => {
            logo.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1) translateY(0)';

            // Add special effect to icon
            if (logoIcon) {
                setTimeout(() => {
                    logoIcon.style.animation = 'iconBounce 0.6s ease, iconSpin 2s linear infinite';
                }, 400);
            }

            // Add text animation
            if (logoText) {
                setTimeout(() => {
                    logoText.style.animation = 'gradientShift 3s ease-in-out infinite';
                }, 600);
            }
        }, 200);

        // Add click effect
        logo.addEventListener('click', function () {
            this.style.animation = 'logoBounce 0.6s ease';
            setTimeout(() => {
                this.style.animation = 'logoGlow 3s ease-in-out infinite';
            }, 600);
        });
    }

    // Helper method to get city name from code
    function getCityName(cityCode) {
        const cities = {
            'hcm': 'Hồ Chí Minh',
            'hanoi': 'Hà Nội',
            'danang': 'Đà Nẵng'
        };
        return cities[cityCode] || cityCode;
    }

    // Helper method to get country name from code
    function getCountryName(countryCode) {
        const countries = {
            'vietnam': 'Việt Nam'
        };
        return countries[countryCode] || countryCode;
    }
}

// Initialize logo animation when page loads
document.addEventListener('DOMContentLoaded', function () {
    initLogoAnimation();
});
