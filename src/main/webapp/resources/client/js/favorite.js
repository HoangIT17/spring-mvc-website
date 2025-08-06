// Favorite Page JavaScript
class FavoriteManager {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.filteredFavorites = [...this.favorites];
        this.currentFilter = 'all';

        this.init();
        this.loadFavorites();
        this.updateStats();
        this.updateCartBadge();
    }

    init() {
        // Sidebar logo click
        const sidebarLogo = document.getElementById('brand');
        if (sidebarLogo) {
            sidebarLogo.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'Homepage.html';
            });
        }

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchFavorites(e.target.value);
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterFavorites(e.target.dataset.filter);
                this.updateFilterButtons(e.target);
            });
        });

        // Clear all favorites
        document.getElementById('clearAllBtn').addEventListener('click', () => {
            this.showClearAllModal();
        });

        // View All button
        document.getElementById('viewAllBtn').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'Product.html';
        });

        // Cart icon click - use onclick in HTML instead
        // document.getElementById('cartIcon').addEventListener('click', () => {
        //     window.location.href = 'Cart.html';
        // });

        // Modal quantity controls
        document.getElementById('decreaseQty').addEventListener('click', () => {
            this.updateModalQuantity(-1);
        });

        document.getElementById('increaseQty').addEventListener('click', () => {
            this.updateModalQuantity(1);
        });

        // Modal actions
        document.getElementById('addToCartBtn').addEventListener('click', () => {
            this.addToCartFromModal();
        });

        document.getElementById('removeFavoriteBtn').addEventListener('click', () => {
            this.removeFavoriteFromModal();
        });
    }

    loadFavorites() {
        const grid = document.getElementById('favoritesGrid');
        const emptyState = document.getElementById('emptyState');

        if (this.filteredFavorites.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        emptyState.style.display = 'none';

        grid.innerHTML = this.filteredFavorites.map((food, index) => `
            <div class="food-card" data-food-id="${food.id}" onclick="favoriteManager.openFoodModal(${food.id})">
                <div class="favorite-badge" onclick="event.stopPropagation(); favoriteManager.removeFavorite(${food.id})">
                    <i class="fas fa-heart"></i>
                </div>
                <img src="${food.image}" alt="${food.name}" class="food-image">
                <div class="food-info">
                    <h5 class="food-name">${food.name}</h5>
                    <p class="food-description">${food.description}</p>
                    <div class="food-rating">
                        <div class="stars">
                            ${this.generateStars(food.rating)}
                        </div>
                        <span class="rating-text">${food.rating}</span>
                    </div>
                    <div class="food-price">${this.formatPrice(food.price)}</div>
                    <div class="food-actions">
                        <button class="action-btn btn-add-cart" onclick="event.stopPropagation(); favoriteManager.addToCart(${food.id})">
                            <i class="fas fa-cart-plus me-2"></i>Thêm món
                        </button>
                        <button class="action-btn btn-remove-favorite" onclick="event.stopPropagation(); favoriteManager.removeFavorite(${food.id})">
                            <i class="fas fa-heart-broken me-2"></i>Xóa
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add animation delay
        const cards = grid.querySelectorAll('.food-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    searchFavorites(query) {
        const searchTerm = query.toLowerCase().trim();

        if (searchTerm === '') {
            this.filteredFavorites = this.currentFilter === 'all'
                ? [...this.favorites]
                : this.favorites.filter(food => food.category === this.currentFilter);
        } else {
            const baseList = this.currentFilter === 'all'
                ? this.favorites
                : this.favorites.filter(food => food.category === this.currentFilter);

            this.filteredFavorites = baseList.filter(food =>
                food.name.toLowerCase().includes(searchTerm) ||
                food.description.toLowerCase().includes(searchTerm)
            );
        }

        this.loadFavorites();
    }

    filterFavorites(category) {
        this.currentFilter = category;

        if (category === 'all') {
            this.filteredFavorites = [...this.favorites];
        } else {
            this.filteredFavorites = this.favorites.filter(food => food.category === category);
        }

        // Apply current search if exists
        const searchQuery = document.getElementById('searchInput').value;
        if (searchQuery.trim()) {
            this.searchFavorites(searchQuery);
        } else {
            this.loadFavorites();
        }
    }

    updateFilterButtons(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    addToCart(foodId) {
        const food = this.favorites.find(f => f.id === foodId);
        if (!food) return;

        const existingItem = this.cart.find(item => item.id === foodId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...food,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartBadge();
        this.showToast(`Đã thêm ${food.name} vào giỏ hàng!`);
    }

    removeFavorite(foodId) {
        const food = this.favorites.find(f => f.id === foodId);
        if (!food) return;

        // Show delete favorite modal
        window.showDeleteFavoriteModal(foodId, food.name);
    }

    actuallyRemoveFavorite(foodId) {
        console.log('🔥 Attempting to remove favorite with ID:', foodId);
        console.log('📦 Current favorites:', this.favorites.length);

        // Actually remove the item from favorites
        const index = this.favorites.findIndex(f => f.id == foodId);
        console.log('📍 Found index:', index);

        if (index !== -1) {
            const removedFood = this.favorites[index];
            console.log('✅ Removing food:', removedFood.name);

            this.favorites.splice(index, 1);

            // Update localStorage
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
            console.log('💾 Updated localStorage, new count:', this.favorites.length);

            // Update filtered favorites to match current favorites
            this.filteredFavorites = this.filteredFavorites.filter(f => f.id != foodId);

            // If current filter is not 'all', reapply filter
            if (this.currentFilter !== 'all') {
                this.filteredFavorites = this.favorites.filter(food => food.category === this.currentFilter);
            } else {
                this.filteredFavorites = [...this.favorites];
            }

            console.log('🎯 Filtered favorites count:', this.filteredFavorites.length);

            // Reload favorites display
            this.loadFavorites();
            this.updateStats();

            // Show success notification
            this.showNotification(`${removedFood.name} has been removed from favorites!`, 'success');
        } else {
            console.log('❌ Food not found in favorites');
        }
    }

    clearAllFavorites() {
        // Clear favorites from localStorage
        this.favorites = [];
        localStorage.setItem('favorites', JSON.stringify(this.favorites));

        // Update display
        this.filteredFavorites = [];
        this.loadFavorites();
        this.updateStats();

        // Show success notification
        this.showNotification('All favorite items have been successfully removed!', 'success');
    }

    showClearAllModal() {
        // Show clear all favorites modal
        window.showClearAllFavoritesModal();
    }

    openFoodModal(foodId) {
        const food = this.favorites.find(f => f.id === foodId);
        if (!food) return;

        // Populate modal
        document.getElementById('modalFoodImage').src = food.image;
        document.getElementById('modalFoodName').textContent = food.name;
        document.getElementById('modalFoodDescription').textContent = food.description;
        document.getElementById('modalPrice').textContent = this.formatPrice(food.price);
        document.getElementById('modalRating').textContent = food.rating;
        document.getElementById('modalStars').innerHTML = this.generateStars(food.rating);
        document.getElementById('modalQuantity').textContent = '1';

        // Store current food ID for modal actions
        document.getElementById('foodModal').dataset.foodId = foodId;

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('foodModal'));
        modal.show();
    }

    updateModalQuantity(change) {
        const quantityElement = document.getElementById('modalQuantity');
        let currentQty = parseInt(quantityElement.textContent);

        currentQty += change;
        if (currentQty < 1) currentQty = 1;
        if (currentQty > 99) currentQty = 99;

        quantityElement.textContent = currentQty;
    }

    addToCartFromModal() {
        const modal = document.getElementById('foodModal');
        const foodId = parseInt(modal.dataset.foodId);
        const quantity = parseInt(document.getElementById('modalQuantity').textContent);

        const food = this.favorites.find(f => f.id === foodId);
        if (!food) return;

        const existingItem = this.cart.find(item => item.id === foodId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...food,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartBadge();
        this.showToast(`Đã thêm ${quantity} ${food.name} vào giỏ hàng!`);

        // Close modal
        bootstrap.Modal.getInstance(modal).hide();
    }

    removeFavoriteFromModal() {
        const modal = document.getElementById('foodModal');
        const foodId = parseInt(modal.dataset.foodId);

        this.actuallyRemoveFavorite(foodId);

        // Close modal
        bootstrap.Modal.getInstance(modal).hide();
    }

    updateStats() {
        const totalFavorites = this.favorites.length;
        const categories = [...new Set(this.favorites.map(f => f.category))];
        const avgRating = totalFavorites > 0
            ? (this.favorites.reduce((sum, f) => sum + f.rating, 0) / totalFavorites).toFixed(1)
            : '0.0';
        const avgPrice = totalFavorites > 0
            ? Math.round(this.favorites.reduce((sum, f) => sum + f.price, 0) / totalFavorites)
            : 0;

        document.getElementById('totalFavorites').textContent = totalFavorites;
        document.getElementById('totalCategories').textContent = categories.length;
        document.getElementById('avgRating').textContent = avgRating;
        document.getElementById('avgPrice').textContent = this.formatPrice(avgPrice);
    }

    updateCartBadge() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cartBadge').textContent = totalItems;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let stars = '';

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        // Half star
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price).replace('₫', 'đ');
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('successToast');
        const toastMessage = document.getElementById('toastMessage');
        const toastHeader = toast.querySelector('.toast-header strong');
        const toastIcon = toast.querySelector('.toast-header i');

        // Update content
        toastMessage.textContent = message;

        // Update style based on type
        toastIcon.className = `fas me-2 ${type === 'success' ? 'fa-check-circle text-success' :
            type === 'warning' ? 'fa-exclamation-triangle text-warning' :
                type === 'error' ? 'fa-times-circle text-danger' :
                    'fa-info-circle text-info'
            }`;

        toastHeader.textContent =
            type === 'success' ? 'Thành công' :
                type === 'warning' ? 'Cảnh báo' :
                    type === 'error' ? 'Lỗi' :
                        'Thông báo';

        // Show toast
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // Method to add favorite from other pages
    static addToFavorites(food) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Check if already in favorites
        if (favorites.some(f => f.id === food.id)) {
            return false; // Already in favorites
        }

        favorites.push(food);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return true; // Successfully added
    }

    // Method to remove favorite from other pages
    static removeFromFavorites(foodId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(f => f.id !== foodId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Method to check if food is favorite
    static isFavorite(foodId) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.some(f => f.id === foodId);
    }

    // Method to toggle favorite status
    static toggleFavorite(food) {
        if (FavoriteManager.isFavorite(food.id)) {
            FavoriteManager.removeFromFavorites(food.id);
            return false; // Removed from favorites
        } else {
            return FavoriteManager.addToFavorites(food);
        }
    }
}

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
}

// Login/Logout functionality
class AuthManager {
    constructor() {
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
        this.init();
    }

    init() {
        this.updateLoginStatus();
        this.setupLoginEvents();
    }

    updateLoginStatus() {
        const loggedInSection = document.querySelector('.logged-in-section');
        const notLoggedInSection = document.querySelector('.not-logged-in-section');

        if (this.isLoggedIn) {
            if (loggedInSection) loggedInSection.classList.remove('d-none');
            if (notLoggedInSection) notLoggedInSection.classList.add('d-none');
        } else {
            if (loggedInSection) loggedInSection.classList.add('d-none');
            if (notLoggedInSection) notLoggedInSection.classList.remove('d-none');
        }
    }

    setupLoginEvents() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                window.location.href = 'Login.html';
            });
        }

        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                window.location.href = 'Register.html';
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    }

    handleLogout() {
        if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
            this.isLoggedIn = false;
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userData');
            localStorage.removeItem('rememberMe');
            this.updateLoginStatus();

            // Show success message
            this.showToast('Đăng xuất thành công!', 'success');
        }
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('successToast');
        const toastMessage = document.getElementById('toastMessage');

        if (toast && toastMessage) {
            toastMessage.textContent = message;
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
        }
    }
}

// Initialize both managers
document.addEventListener('DOMContentLoaded', () => {
    window.favoriteManager = new FavoriteManager();
    window.authManager = new AuthManager();

    // Add logo startup animation
    initLogoAnimation();
});

// Export for use in other pages
window.FavoriteManager = FavoriteManager;
window.AuthManager = AuthManager;

// Show delete favorite modal
window.showDeleteFavoriteModal = function (foodId, foodName) {
    console.log('🏠 Modal called with foodId:', foodId, 'foodName:', foodName);

    document.getElementById('deleteFavoriteFoodName').textContent = '"' + foodName + '"';
    const modal = new bootstrap.Modal(document.getElementById('deleteFavoriteModal'));
    modal.show();

    // Remove previous handler
    const btn = document.getElementById('confirmDeleteFavoriteBtn');
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', function () {
        console.log('🎯 Modal confirm button clicked for foodId:', foodId);
        if (window.favoriteManager) {
            window.favoriteManager.actuallyRemoveFavorite(foodId);
        } else {
            console.log('❌ No favoriteManager found');
        }
        modal.hide();
    });
};

// Show clear all favorites modal
window.showClearAllFavoritesModal = function () {
    const modal = new bootstrap.Modal(document.getElementById('clearAllFavoritesModal'));
    modal.show();

    // Remove previous handler
    const btn = document.getElementById('confirmClearAllFavoritesBtn');
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    // Add new handler
    newBtn.addEventListener('click', function () {
        // Call the clearAllFavorites method from favoriteManager
        if (window.favoriteManager) {
            window.favoriteManager.clearAllFavorites();
        }
        modal.hide();
    });
};
