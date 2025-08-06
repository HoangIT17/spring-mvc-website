// Cart Page JavaScript
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Refresh cart data when page loads (in case it was cleared from payment page)
        this.refreshCartFromLocalStorage();

        this.promoCodes = {
            'WELCOME20': { discount: 20, type: 'percentage', description: 'Giảm 20% cho đơn hàng đầu tiên' },
            'FREESHIP': { discount: 25000, type: 'fixed', description: 'Miễn phí vận chuyển' },
            'SAVE50K': { discount: 50000, type: 'fixed', description: 'Giảm 50,000đ cho đơn từ 200,000đ' }
        };
        this.appliedPromo = null;
        this.shippingFee = 25000;

        this.init();
    }

    refreshCartFromLocalStorage() {
        // Re-read cart from localStorage to ensure it's up to date
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Ensure all items have cartItemId
        let needSave = false;
        this.cart.forEach(item => {
            if (!item.cartItemId) {
                item.cartItemId = 'item_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
                needSave = true;
            }
        });

        // Save back to localStorage if any cartItemId was added
        if (needSave) {
            this.saveCart();
        }
    }

    init() {
        this.bindEvents();
        this.renderCart();
        this.updateSummary();
        this.loadUserAddress(); // Load user address from profile

        // Listen for page focus to reload user address (when coming from Profile page)
        window.addEventListener('focus', () => {
            this.loadUserAddress();
        });

        // Also listen for storage changes in case address is updated in another tab
        window.addEventListener('storage', (e) => {
            if (e.key === 'userAddress' || e.key === 'userData') {
                this.loadUserAddress();
            }
        });
    }

    bindEvents() {
        // Apply promo code
        const applyPromoBtn = document.getElementById('applyPromoBtn');
        if (applyPromoBtn) {
            applyPromoBtn.addEventListener('click', () => {
                this.applyPromoCode();
            });
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.cart.length === 0) {
                    this.showToast('Your cart is empty!', 'error');
                    return;
                }
                this.proceedToCheckout();
            });
        }

        // Note modal events
        this.bindNoteModalEvents();
    }

    bindNoteModalEvents() {
        // Character count for textarea
        const textarea = document.getElementById('noteTextarea');
        if (textarea) {
            textarea.addEventListener('input', () => {
                this.updateCharCount();
            });
        }

        // Suggestion tags
        document.querySelectorAll('.suggestion-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const noteText = tag.getAttribute('data-note');
                const currentText = textarea.value.trim();

                if (currentText === '') {
                    textarea.value = noteText;
                } else {
                    textarea.value = currentText + ', ' + noteText;
                }

                this.updateCharCount();
                tag.classList.add('active');

                setTimeout(() => {
                    tag.classList.remove('active');
                }, 1000);
            });
        });

        // Save note button
        const saveNoteBtn = document.getElementById('saveNoteBtn');
        if (saveNoteBtn) {
            saveNoteBtn.addEventListener('click', () => {
                this.saveNote();
            });
        }

        // Clear note button
        const clearNoteBtn = document.getElementById('clearNoteBtn');
        if (clearNoteBtn) {
            clearNoteBtn.addEventListener('click', () => {
                this.clearNote();
            });
        }
    }

    renderCart() {
        console.log('renderCart called, cart length:', this.cart.length);
        console.log('Cart data:', this.cart);

        const cartItemsList = document.getElementById('cartItemsList');
        const emptyCartState = document.getElementById('emptyCartState');

        if (this.cart.length === 0) {
            if (cartItemsList) cartItemsList.style.display = 'none';
            if (emptyCartState) emptyCartState.style.display = 'block';
            this.updateItemCountBadge();
            return;
        }

        if (cartItemsList) cartItemsList.style.display = 'block';
        if (emptyCartState) emptyCartState.style.display = 'none';

        if (cartItemsList) {
            cartItemsList.innerHTML = this.cart.map(item => {
                // Debug log for each item
                console.log('Rendering cart item:', {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    cartItemId: item.cartItemId,
                    formattedPrice: this.formatPrice(item.price)
                });

                return `
                <div class="cart-item" data-cart-item-id="${item.cartItemId}">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-description">${item.description || ''}</div>
                        ${item.specialNotes ? `<div class="item-note special-notes"><i class="fas fa-sticky-note me-1 text-warning"></i><span class="text-muted">Special Notes:</span> ${item.specialNotes}</div>` : ''}
                        ${item.note ? `<div class="item-note custom-note"><i class="fas fa-comment me-1 text-info"></i><span class="text-muted">Additional Notes:</span> ${item.note}</div>` : ''}
                        <div class="item-price">${this.formatPrice(item.price)}</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease-btn" onclick="decreaseQuantity('${item.cartItemId}')">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn increase-btn" onclick="increaseQuantity('${item.cartItemId}')">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="item-actions">
                        <button class="note-btn" onclick="editNote('${item.cartItemId}')" title="Add note">
                            <i class="fas fa-comment"></i>
                        </button>
                        <button class="remove-item-btn" onclick="removeItem('${item.cartItemId}')" title="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                `;
            }).join('');
        }

        // Save cart with updated cartItemIds
        this.saveCart();
        this.updateItemCountBadge();
        this.updateSummary();
    }

    updateQuantity(itemId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(itemId);
            return;
        }

        const itemIndex = this.cart.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            this.cart[itemIndex].quantity = newQuantity;
            this.saveCart();
            this.renderCart();
            this.updateSummary();
            this.updateItemCountBadge();
            this.showToast('Đã cập nhật số lượng!');
        }
    }

    removeItem(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.renderCart();
        this.updateSummary();
        this.updateItemCountBadge();
        this.showToast('Đã xóa món khỏi giỏ hàng!');
    }

    // New methods using cartItemId for better handling of items with notes
    updateQuantityByCartId(cartItemId, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItemByCartId(cartItemId);
            return;
        }

        const itemIndex = this.cart.findIndex(item => item.cartItemId === cartItemId);
        if (itemIndex !== -1) {
            this.cart[itemIndex].quantity = newQuantity;
            this.saveCart();
            this.renderCart();
            this.updateSummary();
            this.updateItemCountBadge();
            this.showToast('Đã cập nhật số lượng!');
        }
    }

    removeItemByCartId(cartItemId) {
        this.cart = this.cart.filter(item => item.cartItemId !== cartItemId);
        this.saveCart();
        this.renderCart();
        this.updateSummary();
        this.updateItemCountBadge();
        this.showToast('Đã xóa món khỏi giỏ hàng!');
    }

    editNoteByCartId(cartItemId) {
        const item = this.cart.find(item => item.cartItemId === cartItemId);
        if (!item) {
            return;
        }

        // Store current item for modal
        this.currentNoteItem = item;

        // Populate modal with item info
        document.getElementById('noteFoodImage').src = item.image;
        document.getElementById('noteFoodName').textContent = item.name;
        document.getElementById('noteFoodPrice').textContent = this.formatPrice(item.price);
        document.getElementById('noteTextarea').value = item.note || '';

        // Update character count
        this.updateCharCount();

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('noteModal'));
        modal.show();
    }

    editNote(itemId) {
        const item = this.cart.find(item => item.id === itemId);
        if (!item) return;

        // Store current item for modal
        this.currentNoteItem = item;

        // Populate modal with item info
        document.getElementById('noteFoodImage').src = item.image;
        document.getElementById('noteFoodName').textContent = item.name;
        document.getElementById('noteFoodPrice').textContent = this.formatPrice(item.price);
        document.getElementById('noteTextarea').value = item.note || '';

        // Update character count
        this.updateCharCount();

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('noteModal'));
        modal.show();
    }

    clearCart() {
        if (this.cart.length === 0) {
            this.showToast('Giỏ hàng đã trống!', 'error');
            return;
        }

        if (confirm('Bạn có chắc muốn xóa tất cả món ăn?')) {
            this.cart = [];
            this.appliedPromo = null;
            this.saveCart();
            this.renderCart();
            this.updateSummary();
            this.updateItemCountBadge();
            this.showToast('Đã xóa tất cả món ăn!');
            document.getElementById('promoCodeInput').value = '';
            document.getElementById('promoResult').innerHTML = '';
        }
    }

    applyPromoCode() {
        const promoInput = document.getElementById('promoCodeInput');
        const promoCode = promoInput.value.trim().toUpperCase();
        const promoResult = document.getElementById('promoResult');

        if (!promoCode) {
            promoResult.innerHTML = '<small class="error">Vui lòng nhập mã giảm giá</small>';
            return;
        }

        if (this.cart.length === 0) {
            promoResult.innerHTML = '<small class="error">Thêm món vào giỏ hàng trước khi áp dụng mã</small>';
            return;
        }

        if (this.promoCodes[promoCode]) {
            const promo = this.promoCodes[promoCode];
            const subtotal = this.getSubtotal();

            // Check minimum order for some promo codes
            if (promoCode === 'SAVE50K' && subtotal < 200000) {
                promoResult.innerHTML = '<small class="error">Đơn hàng tối thiểu 200,000đ để sử dụng mã này</small>';
                return;
            }

            this.appliedPromo = { code: promoCode, ...promo };
            this.updateSummary();
            promoResult.innerHTML = `<small class="success"><i class="fas fa-check me-1"></i>${promo.description}</small>`;
            this.showToast('Đã áp dụng mã giảm giá!');
        } else {
            promoResult.innerHTML = '<small class="error">Mã giảm giá không hợp lệ</small>';
        }
    }

    getSubtotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getDiscountAmount() {
        if (!this.appliedPromo) return 0;

        const subtotal = this.getSubtotal();
        if (this.appliedPromo.type === 'percentage') {
            return Math.round(subtotal * this.appliedPromo.discount / 100);
        } else {
            return this.appliedPromo.discount;
        }
    }

    getTotal() {
        const subtotal = this.getSubtotal();
        const discount = this.getDiscountAmount();
        const shipping = subtotal > 0 ? this.shippingFee : 0;

        // If promo code is FREESHIP, remove shipping fee
        if (this.appliedPromo && this.appliedPromo.code === 'FREESHIP') {
            return subtotal - discount;
        }

        return subtotal + shipping - discount;
    }

    updateSummary() {
        const itemCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        const subtotal = this.getSubtotal();
        const discount = this.getDiscountAmount();
        const total = this.getTotal();

        // Debug log
        console.log('UpdateSummary:', {
            itemCount,
            subtotal,
            discount,
            total,
            cart: this.cart.map(item => ({ name: item.name, price: item.price, quantity: item.quantity }))
        });

        // Update UI elements
        const itemCountElement = document.getElementById('itemCount');
        const itemCountBadgeElement = document.getElementById('itemCountBadge');
        const subtotalElement = document.getElementById('subtotal');
        const totalAmountElement = document.getElementById('totalAmount');

        if (itemCountElement) itemCountElement.textContent = itemCount;
        if (itemCountBadgeElement) itemCountBadgeElement.textContent = `${itemCount} items`;
        if (subtotalElement) subtotalElement.textContent = this.formatPrice(subtotal);
        if (totalAmountElement) totalAmountElement.textContent = this.formatPrice(total);

        // Show/hide discount row
        const discountRow = document.getElementById('discountRow');
        if (discount > 0 && discountRow) {
            discountRow.style.display = 'flex';
            const discountAmountElement = document.getElementById('discountAmount');
            if (discountAmountElement) discountAmountElement.textContent = `-${this.formatPrice(discount)}`;
        } else if (discountRow) {
            discountRow.style.display = 'none';
        }

        // Update shipping fee
        const shippingElement = document.getElementById('shippingFee');
        if (shippingElement) {
            if (this.appliedPromo && this.appliedPromo.code === 'FREESHIP') {
                shippingElement.innerHTML = `<s>${this.formatPrice(this.shippingFee)}</s> <span class="text-success">Free</span>`;
            } else if (subtotal > 0) {
                shippingElement.textContent = this.formatPrice(this.shippingFee);
            } else {
                shippingElement.textContent = this.formatPrice(0);
            }
        }

        // Enable/disable checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            if (this.cart.length === 0) {
                checkoutBtn.classList.add('disabled');
                checkoutBtn.innerHTML = '<i class="fas fa-shopping-cart me-2"></i>Cart Empty';
            } else {
                checkoutBtn.classList.remove('disabled');
                checkoutBtn.innerHTML = '<i class="fas fa-credit-card me-2"></i>Proceed to Checkout';
            }
        }
    }

    proceedToCheckout() {
        // Save order summary to localStorage for payment page
        const orderSummary = {
            items: this.cart,
            subtotal: this.getSubtotal(),
            discount: this.getDiscountAmount(),
            shippingFee: this.appliedPromo && this.appliedPromo.code === 'FREESHIP' ? 0 : this.shippingFee,
            total: this.getTotal(),
            appliedPromo: this.appliedPromo
        };

        localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
        window.location.href = 'Pay.html';
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));

        // Update cart badge on all pages
        this.updateCartBadge();
    }

    updateCartBadge() {
        const itemCount = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartBadges = document.querySelectorAll('.cart-badge, #cartBadge');
        cartBadges.forEach(badge => {
            if (badge) {
                badge.textContent = itemCount;
                badge.style.display = itemCount > 0 ? 'block' : 'none';
            }
        });
    }

    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    }

    updateCharCount() {
        const textarea = document.getElementById('noteTextarea');
        const charCount = document.getElementById('charCount');

        if (textarea && charCount) {
            const currentLength = textarea.value.length;
            charCount.textContent = currentLength;

            // Change color based on length
            if (currentLength > 180) {
                charCount.style.color = '#e53e3e';
            } else if (currentLength > 150) {
                charCount.style.color = '#ff9500';
            } else {
                charCount.style.color = '#64748b';
            }
        }
    }

    saveNote() {
        if (!this.currentNoteItem) return;

        const textarea = document.getElementById('noteTextarea');
        const noteText = textarea.value.trim();

        if (noteText === '') {
            // Remove note if empty
            delete this.currentNoteItem.note;
            this.showToast('Đã xóa ghi chú!');
        } else {
            this.currentNoteItem.note = noteText;
            this.showToast('Đã lưu ghi chú!');
        }

        this.saveCart();
        this.renderCart();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('noteModal'));
        modal.hide();
    }

    clearNote() {
        const textarea = document.getElementById('noteTextarea');
        textarea.value = '';
        this.updateCharCount();
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('successToast');
        const toastMessage = document.getElementById('toastMessage');
        const toastHeader = toast.querySelector('.toast-header');

        // Update message
        toastMessage.textContent = message;

        // Update icon and color based on type
        const icon = toastHeader.querySelector('i');
        if (type === 'error') {
            icon.className = 'fas fa-exclamation-circle text-danger me-2';
            toastHeader.querySelector('strong').textContent = 'Lỗi';
        } else {
            icon.className = 'fas fa-check-circle text-success me-2';
            toastHeader.querySelector('strong').textContent = 'Thành công';
        }

        // Show toast
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }

    // Method to add items from other pages
    addToCart(item) {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += item.quantity || 1;
        } else {
            this.cart.push({
                ...item,
                cartItemId: item.cartItemId || Date.now() + Math.random(),
                quantity: item.quantity || 1
            });
        }

        this.saveCart();
        this.renderCart();
        this.updateSummary();
        this.updateItemCountBadge();
        this.showToast(`Đã thêm ${item.name} vào giỏ hàng!`);
    }

    // Load user address from profile data
    loadUserAddress() {
        // Load from userAddress first (saved from profile page)
        const userAddress = JSON.parse(localStorage.getItem('userAddress'));
        if (userAddress && userAddress.fullAddress) {
            const addressElement = document.getElementById('userAddress');
            if (addressElement) {
                addressElement.textContent = userAddress.fullAddress;
            }
            return;
        }

        // Fallback to userData
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.address) {
            const cityName = this.getCityName(userData.city);
            const countryName = this.getCountryName(userData.country);
            const fullAddress = `${userData.address}, ${cityName}, ${countryName}`;

            const addressElement = document.getElementById('userAddress');
            if (addressElement) {
                addressElement.textContent = fullAddress;
            }
        }
    }

    getCityName(cityCode) {
        const cities = {
            'hcm': 'Hồ Chí Minh',
            'hanoi': 'Hà Nội',
            'danang': 'Đà Nẵng'
        };
        return cities[cityCode] || cityCode;
    }

    getCountryName(countryCode) {
        const countries = {
            'vietnam': 'Việt Nam'
        };
        return countries[countryCode] || countryCode;
    }

    // Update item count badge in navigation
    updateItemCountBadge() {
        // Update cart badge in navigation
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
        }

        // Update item count badge in cart page
        const itemCountBadge = document.getElementById('itemCountBadge');
        if (itemCountBadge) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            itemCountBadge.textContent = totalItems + ' items';
        }
    }
}

// Initialize cart manager globally - make it available immediately
window.cartManager = null;

// Initialize CartManager immediately - don't wait for DOM
console.log('Starting CartManager initialization...');

// Initialize immediately
window.cartManager = null;

try {
    window.cartManager = new CartManager();
    console.log('CartManager initialized successfully:', window.cartManager);
} catch (error) {
    console.error('Failed to initialize CartManager:', error);
}

// Also setup when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded fired');

    // Ensure CartManager is initialized
    if (!window.cartManager) {
        try {
            window.cartManager = new CartManager();
            console.log('CartManager initialized on DOMContentLoaded:', window.cartManager);
        } catch (error) {
            console.error('Failed to initialize CartManager on DOMContentLoaded:', error);
        }
    }

    // Test that global functions are available
    console.log('Testing global functions...');
    console.log('increaseQuantity function available:', typeof increaseQuantity);
    console.log('decreaseQuantity function available:', typeof decreaseQuantity);
    console.log('editNote function available:', typeof editNote);
    console.log('removeItem function available:', typeof removeItem);
    console.log('clearAllCart function available:', typeof clearAllCart);

    // Reload cart when page becomes visible (handles navigation from other pages)
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden && window.cartManager) {
            // Reload cart from localStorage when page becomes visible
            window.cartManager.cart = JSON.parse(localStorage.getItem('cart')) || [];
            window.cartManager.renderCart();
            window.cartManager.updateSummary();
            window.cartManager.loadUserAddress(); // Reload user address
        }
    });

    // Also reload when window regains focus
    window.addEventListener('focus', function () {
        if (window.cartManager) {
            window.cartManager.cart = JSON.parse(localStorage.getItem('cart')) || [];
            window.cartManager.renderCart();
            window.cartManager.updateSummary();
            window.cartManager.loadUserAddress(); // Reload user address
        }
    });
});

// Global function to add items to cart (can be called from other pages)
function addToCartGlobal(item) {
    if (typeof window.cartManager !== 'undefined' && window.cartManager) {
        window.cartManager.addToCart(item);
    } else {
        // If cart manager is not initialized, save to localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += item.quantity || 1;
        } else {
            cart.push({
                ...item,
                quantity: item.quantity || 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Simple global functions for button clicks
function increaseQuantity(cartItemId) {
    console.log('increaseQuantity called with:', cartItemId);
    if (window.cartManager) {
        const item = window.cartManager.cart.find(item => item.cartItemId === cartItemId);
        if (item) {
            window.cartManager.updateQuantityByCartId(cartItemId, item.quantity + 1);
        } else {
            console.error('Item not found with cartItemId:', cartItemId);
        }
    } else {
        console.error('CartManager not available');
    }
}

function decreaseQuantity(cartItemId) {
    console.log('decreaseQuantity called with:', cartItemId);
    if (window.cartManager) {
        const item = window.cartManager.cart.find(item => item.cartItemId === cartItemId);
        if (item) {
            if (item.quantity > 1) {
                window.cartManager.updateQuantityByCartId(cartItemId, item.quantity - 1);
            } else {
                // If quantity is 1, remove the item
                window.cartManager.removeItemByCartId(cartItemId);
            }
        } else {
            console.error('Item not found with cartItemId:', cartItemId);
        }
    } else {
        console.error('CartManager not available');
    }
}

function editNote(cartItemId) {
    console.log('editNote called with:', cartItemId);
    if (window.cartManager) {
        window.cartManager.editNoteByCartId(cartItemId);
    } else {
        console.error('CartManager not available');
    }
}

function removeItem(cartItemId) {
    console.log('removeItem called with:', cartItemId);
    if (window.cartManager) {
        window.cartManager.removeItemByCartId(cartItemId);
    } else {
        console.error('CartManager not available');
    }
}

// Attach event listener to the Clear Cart button in the confirmation modal (id='confirmClearCart')
(function attachClearCartModalHandler() {
    const clearCartBtn = document.getElementById('confirmClearCart');
    if (clearCartBtn) {
        // Remove any previous event listeners to avoid duplicate clears
        clearCartBtn.replaceWith(clearCartBtn.cloneNode(true));
        const newClearCartBtn = document.getElementById('confirmClearCart');
        newClearCartBtn.addEventListener('click', function () {
            localStorage.removeItem('cartItems');
            // Update UI using CartManager
            if (window.cartManager) {
                window.cartManager.cart = [];
                window.cartManager.renderCart();
                window.cartManager.updateSummary();
            }
            // Hide the modal
            const clearCartModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('clearCartModal'));
            clearCartModal.hide();
            // Show success notification
            showClearSuccessNotification();
        });
    }
})();

function clearAllCart() {
    const clearCartModal = new bootstrap.Modal(document.getElementById('clearCartModal'));
    clearCartModal.show();
    // Attach event handler every time modal is shown, but remove previous first
    const clearCartBtn = document.getElementById('confirmClearCart');
    if (clearCartBtn) {
        const newBtn = clearCartBtn.cloneNode(true);
        clearCartBtn.parentNode.replaceChild(newBtn, clearCartBtn);
        newBtn.addEventListener('click', function () {
            // Clear both localStorage and CartManager
            localStorage.removeItem('cartItems');
            localStorage.removeItem('cart');
            if (window.cartManager) {
                window.cartManager.cart = [];
                window.cartManager.saveCart();
                window.cartManager.renderCart();
                window.cartManager.updateSummary();
            }
            // Hide the modal
            const clearCartModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('clearCartModal'));
            clearCartModal.hide();
            // Show success notification
            showClearSuccessNotification();
        });
    }
}

// Function to show modern success notification
function showClearSuccessNotification() {
    // Remove existing notification if any
    const existingNotification = document.getElementById('clearSuccessNotification');
    if (existingNotification) {
        existingNotification.remove();
    }
    // Create modern notification
    const notification = document.createElement('div');
    notification.id = 'clearSuccessNotification';
    notification.innerHTML = `
        <div class="clear-success-notification">
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="notification-text">
                    <h5>Cart Cleared Successfully!</h5>
                    <p>All items have been removed from your cart.</p>
                </div>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification && notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}
