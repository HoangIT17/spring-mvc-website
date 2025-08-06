class ProductPage {
    constructor() {
        this.foodData = [];
        this.filteredData = [];
        this.searchQuery = '';
        this.activeFilter = 'all';
        this.activeSort = 'name';
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;

        this.init();
    }

    async init() {
        try {
            // Check login status and update UI
            this.updateLoginStatus();

            // Load food data
            await this.loadFoodData();

            // Get search query from URL
            this.getSearchFromURL();

            // Setup event listeners
            this.setupEventListeners();

            // Update cart display
            this.updateCartDisplay();

            // Perform initial search
            this.performSearch();

        } catch (error) {
            console.error('Error initializing product page:', error);
        }
    }

    async loadFoodData() {
        // Food data - Vietnamese pricing
        this.foodData = [
            {
                id: 1,
                name: "Sausage Pizza",
                description: "Sausage pizza with tomato and special cheese",
                price: 125000,
                image: "../images/pizzaxucxich.png",
                rating: 4.8,
                category: "pizza",
                discount: 15
            },
            {
                id: 2,
                name: "Hawaiian Pizza",
                description: "Pizza with fresh pineapple, bacon and cheese",
                price: 140000,
                image: "../images/HawaiPizza.png",
                rating: 4.5,
                category: "pizza"
            },
            {
                id: 3,
                name: "Seafood Pizza",
                description: "Pizza with fresh seafood, bell peppers and onions",
                price: 150000,
                image: "../images/PizzaHaiSan.png",
                rating: 4.7,
                category: "pizza"
            },
            {
                id: 4,
                name: "Cheese Burger",
                description: "Beef burger with cheddar cheese and fresh vegetables",
                price: 110000,
                image: "../images/BurgerPhoMai.png",
                rating: 4.2,
                category: "burger",
                discount: 10
            },
            {
                id: 5,
                name: "Crispy Chicken Burger",
                description: "Crispy chicken burger with special mayonnaise sauce",
                price: 105000,
                image: "../images/BurgerGaGion.png",
                rating: 4.6,
                category: "burger",
                discount: 15
            },
            {
                id: 6,
                name: "Carbonara Pasta",
                description: "Italian pasta with delicious carbonara sauce",
                price: 120000,
                image: "../images/MyYCaborana.png",
                rating: 4.4,
                category: "noodle"
            },
            {
                id: 7,
                name: "Grilled Chicken Rice",
                description: "Grilled chicken rice with vegetables",
                price: 115000,
                image: "../images/ComGaNuong.png",
                rating: 4.3,
                category: "rice"
            },
            {
                id: 9,
                name: "Vietnamese Iced Coffee",
                description: "Traditional Vietnamese black iced coffee",
                price: 100000,
                image: "../images/CafeDenDa.png",
                rating: 4.1,
                category: "drink"
            },
            {
                id: 10,
                name: "Margherita Pizza",
                description: "Classic pizza with tomato, fresh mozzarella cheese",
                price: 135000,
                image: "../images/PizzaMargherita.png",
                rating: 4.6,
                category: "pizza",
                discount: 20
            },
            {
                id: 11,
                name: "Double Beef Burger",
                description: "Burger with double beef layers and cheese",
                price: 145000,
                image: "../images/BurgerDoubleBeef.png",
                rating: 4.7,
                category: "burger"
            },
            {
                id: 12,
                name: "KFC Style Fried Chicken",
                description: "Crispy fried chicken with secret blend of 11 spices",
                price: 130000,
                image: "../images/GaRanKFC.png",
                rating: 4.5,
                category: "burger",
                discount: 15
            },
            {
                id: 13,
                name: "Pork Ramen",
                description: "Ramen with chashu pork and soft-boiled egg",
                price: 128000,
                image: "../images/RamenThitHeo.png",
                rating: 4.8,
                category: "noodle"
            },
            {
                id: 14,
                name: "Noodles Korea",
                description: "Traditional Korean beef noodle soup",
                price: 118000,
                image: "../images/MyCayHanQuoc.png",
                rating: 4.9,
                category: "noodle"
            },
            {
                id: 15,
                name: "Fried Rice with Sausage",
                description: "Fried rice with Chinese sausage and mixed vegetables",
                price: 108000,
                image: "../images/ComChienHaiSan.png",
                rating: 4.4,
                category: "rice"
            },
            {
                id: 16,
                name: "Thai Green Curry",
                description: "Spicy Thai green curry with coconut milk",
                price: 122000,
                image: "../images/MiCaySamYang.png",
                rating: 4.6,
                category: "rice"
            },
            {
                id: 17,
                name: "Fresh Orange Juice",
                description: "Freshly squeezed orange juice",
                price: 102000,
                image: "../images/TraDao.png",
                rating: 4.3,
                category: "drink"
            },
            {
                id: 18,
                name: "Mango Smoothie",
                description: "Fresh mango smoothie with ice",
                price: 138000,
                image: "../images/TraXoaiChanhDay.png",
                rating: 4.5,
                category: "drink"
            },
        ];

        this.filteredData = [...this.foodData];
    }

    getSearchFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        this.searchQuery = urlParams.get('q') || '';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = this.searchQuery;
        }
    }

    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.showSearchSuggestions();
            });

            searchInput.addEventListener('focus', () => {
                if (this.searchQuery) {
                    this.showSearchSuggestions();
                }
            });

            // Hide dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    this.hideSearchSuggestions();
                }
            });
        }

        // Category filter buttons
        document.querySelectorAll('.category-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.setActiveCategory(category);
            });
        });

        // Sort select
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.activeSort = e.target.value;
                this.sortAndDisplayResults();
            });
        }

        // Sort dropdown items
        document.querySelectorAll('.sort-dropdown .dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sortType = e.target.closest('.dropdown-item').dataset.sort;
                this.activeSort = sortType;
                this.sortAndDisplayResults();

                // Update button text to show current sort
                const sortBtn = document.querySelector('.sort-btn');
                const sortText = e.target.closest('.dropdown-item').textContent.trim();
                if (sortBtn) {
                    sortBtn.innerHTML = `<i class="fas fa-sort me-2"></i>${sortText}`;
                }
            });
        });

        // Back to top button
        this.setupScrollToTop();

        // Login/Register buttons
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const modalLoginBtn = document.getElementById('modalLoginBtn');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                this.showLoginModal();
            });
        }

        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                this.showRegisterModal();
            });
        }

        if (modalLoginBtn) {
            modalLoginBtn.addEventListener('click', () => {
                // Close current modal and show login
                const modal = bootstrap.Modal.getInstance(document.getElementById('loginRequiredModal'));
                if (modal) modal.hide();
                this.showLoginModal();
            });
        }

        // Logout button event
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
    }

    showSearchSuggestions() {
        if (!this.searchQuery.trim()) {
            this.hideSearchSuggestions();
            return;
        }

        const suggestions = this.foodData.filter(food =>
            food.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            food.category.toLowerCase().includes(this.searchQuery.toLowerCase())
        ).slice(0, 5);

        const dropdown = document.getElementById('searchDropdown');
        if (!dropdown) return;

        if (suggestions.length === 0) {
            dropdown.innerHTML = `
                <div class="search-item">
                    <div class="search-item-content">
                        <div class="search-item-name">No results found</div>
                    </div>
                </div>
            `;
        } else {
            dropdown.innerHTML = suggestions.map(food => `
                <div class="search-item" onclick="productPage.selectSearchItem('${food.name}')">
                    <img src="${food.image}" alt="${food.name}" class="search-item-image">
                    <div class="search-item-content">
                        <div class="search-item-name">${food.name}</div>
                        <div class="search-item-price">${this.formatPrice(food.price)}</div>
                    </div>
                    <span class="search-item-category">${this.getCategoryName(food.category)}</span>
                </div>
            `).join('');
        }

        dropdown.classList.add('show');
    }

    hideSearchSuggestions() {
        const dropdown = document.getElementById('searchDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }

    selectSearchItem(foodName) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = foodName;
            this.searchQuery = foodName;
        }
        this.hideSearchSuggestions();
        this.performSearch();
    }

    performSearch() {
        this.filterData();
        this.sortAndDisplayResults();
        this.updateSearchHeader();
    }

    filterData() {
        let filtered = this.foodData;

        // Apply search filter
        if (this.searchQuery.trim()) {
            filtered = filtered.filter(food =>
                food.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                food.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                food.description.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        // Apply category filter
        if (this.activeFilter !== 'all') {
            filtered = filtered.filter(food => food.category === this.activeFilter);
        }

        this.filteredData = filtered;
    }

    setActiveFilter(filter) {
        this.activeFilter = filter;

        // Update active button
        document.querySelectorAll('[data-filter]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        this.filterData();
        this.sortAndDisplayResults();
        this.updateSearchHeader();
    }

    setActiveCategory(category) {
        this.activeFilter = category;

        // Update active category button
        document.querySelectorAll('.category-item').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        this.filterData();
        this.sortAndDisplayResults();
        this.updateSearchHeader();
    }

    sortAndDisplayResults() {
        // Sort the filtered data
        this.filteredData.sort((a, b) => {
            switch (this.activeSort) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'popular':
                    // Sort by rating and discount (popular items tend to have higher ratings and discounts)
                    const aPopularity = (a.rating * 10) + (a.discount || 0);
                    const bPopularity = (b.rating * 10) + (b.discount || 0);
                    return bPopularity - aPopularity;
                case 'name':
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        this.displayResults();
    }

    displayResults() {
        const resultsContainer = document.getElementById('foodGrid');

        if (!resultsContainer) {
            console.error('Food grid container not found');
            return;
        }

        if (this.filteredData.length === 0) {
            resultsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div class="no-results">
                        <i class="fas fa-search fs-1 text-muted mb-3"></i>
                        <h4>No food found</h4>
                        <p class="text-muted">Try searching with different keywords</p>
                    </div>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = this.filteredData.map(food => {
            const discountBadge = food.discount ?
                `<div class="discount-badge">Save ${food.discount}%</div>` : '';

            return `
            <div class="food-item">
                <div class="food-card" data-food-id="${food.id}">
                    ${discountBadge}
                    <button class="favorite-btn" onclick="productPage.toggleFavorite(${food.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                    <img src="${food.image}" alt="${food.name}" class="food-image card-img-top">
                    <div class="food-info card-body">
                        <h5 class="food-name card-title">${food.name}</h5>
                        <p class="food-description card-text">${food.description}</p>
                        <div class="rating mb-3">
                            <div class="stars">${this.generateStars(food.rating)}</div>
                            <span class="rating-text">${food.rating}</span>
                        </div>
                        <div class="food-footer mt-auto">
                            <span class="price">${this.formatPrice(food.price)}</span>
                            <div class="add-buttons mt-3">
                                <button class="add-btn btn btn-warning w-100" onclick="productPage.openFoodModal(${food.id})" title="Add to cart">
                                    <i class="fas fa-cart-plus me-1"></i>Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }).join('');
    }

    updateSearchHeader() {
        // Update the product header based on search/filter
        const productHeader = document.querySelector('.product-header h2');
        const productSubtitle = document.querySelector('.product-header p');

        if (this.searchQuery.trim()) {
            if (productHeader) {
                productHeader.textContent = `Search Results for "${this.searchQuery}"`;
            }
            if (productSubtitle) {
                productSubtitle.textContent = `Found ${this.filteredData.length} dishes`;
            }
        } else if (this.activeFilter !== 'all') {
            if (productHeader) {
                productHeader.textContent = `${this.getCategoryName(this.activeFilter)} Dishes`;
            }
            if (productSubtitle) {
                productSubtitle.textContent = `Discover the best ${this.getCategoryName(this.activeFilter).toLowerCase()} dishes`;
            }
        } else {
            if (productHeader) {
                productHeader.textContent = 'All Products';
            }
            if (productSubtitle) {
                productSubtitle.textContent = 'Discover the best dishes from FoodFlow';
            }
        }
    }

    openFoodModal(foodId) {
        const food = this.foodData.find(f => f.id === foodId);
        if (!food) return;

        document.getElementById('modalFoodImage').src = food.image;
        document.getElementById('modalFoodName').textContent = food.name;
        document.getElementById('modalFoodDescription').textContent = food.description;
        document.getElementById('modalPrice').textContent = this.formatPrice(food.price);
        document.getElementById('modalStars').innerHTML = this.generateStars(food.rating);
        document.getElementById('modalRating').textContent = `(${food.rating})`;
        document.getElementById('modalQuantity').textContent = '1';

        const modal = document.getElementById('foodModal');
        modal.setAttribute('data-food-id', foodId);

        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        // Setup modal event listeners
        this.setupModalEventListeners();
    }

    setupModalEventListeners() {
        document.getElementById('decreaseQty').onclick = () => this.changeModalQuantity(-1);
        document.getElementById('increaseQty').onclick = () => this.changeModalQuantity(1);
        document.getElementById('addToCartBtn').onclick = () => this.addToCartFromModal();
    }

    changeModalQuantity(change) {
        const quantityElement = document.getElementById('modalQuantity');
        let currentQty = parseInt(quantityElement.textContent);

        currentQty += change;
        if (currentQty < 1) currentQty = 1;
        if (currentQty > 10) currentQty = 10;

        quantityElement.textContent = currentQty;
    }

    addToCartFromModal() {
        const modal = document.getElementById('foodModal');
        const foodId = parseInt(modal.getAttribute('data-food-id'));
        const quantity = parseInt(document.getElementById('modalQuantity').textContent);

        console.log('addToCartFromModal called with:', { foodId, quantity });

        // Collect special notes from the modal
        const specialNotes = this.collectSpecialNotes();

        this.addToCart(foodId, quantity, specialNotes);

        // Close modal
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();

        // Show success toast
        this.showToast('Added to cart!');

        // Reset modal form
        this.resetModalForm();
    }

    // Collect special notes from modal
    collectSpecialNotes() {
        const notes = [];

        // Debug: Check if modal exists
        const modal = document.getElementById('foodModal');
        console.log('Modal found:', modal);

        // Get checkbox notes
        const checkboxes = document.querySelectorAll('#foodModal .notes-options input[type="checkbox"]:checked');
        console.log('Found checked checkboxes:', checkboxes.length);

        checkboxes.forEach(checkbox => {
            const label = checkbox.nextElementSibling.textContent.trim();
            console.log('Checkbox label:', label);
            if (label) {
                notes.push(label);
            }
        });

        // Get custom notes
        const customNotes = document.getElementById('customNotes');
        console.log('Custom notes element:', customNotes);
        console.log('Custom notes value:', customNotes ? customNotes.value : 'null');

        if (customNotes && customNotes.value.trim()) {
            notes.push(customNotes.value.trim());
        }

        const result = notes.length > 0 ? notes.join(', ') : '';
        console.log('Final collected notes:', result);
        return result;
    }

    // Reset modal form after adding to cart
    resetModalForm() {
        // Reset checkboxes
        const checkboxes = document.querySelectorAll('#foodModal .notes-options input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset custom notes textarea
        const customNotes = document.getElementById('customNotes');
        if (customNotes) {
            customNotes.value = '';
        }

        // Reset quantity to 1
        const quantityElement = document.getElementById('modalQuantity');
        if (quantityElement) {
            quantityElement.textContent = '1';
        }
    }

    quickAddToCart(foodId, quantity = 1) {
        if (!this.checkLoginRequired()) {
            return;
        }
        // Quick add without special notes
        this.addToCart(foodId, quantity, '');
        this.showToast('Added to cart!');
    }

    addToCart(foodId, quantity = 1, specialNotes = '') {
        if (!this.checkLoginRequired()) {
            return;
        }

        const food = this.foodData.find(f => f.id === foodId);
        if (!food) {
            console.error('Food not found with ID:', foodId);
            return;
        }

        // Debug: Log what we're adding
        console.log('Adding to cart:', {
            foodId,
            quantity,
            specialNotes,
            food: {
                id: food.id,
                name: food.name,
                price: food.price,
                image: food.image,
                description: food.description
            }
        });

        // Check for existing item with same ID and identical special notes
        const existingItem = this.cart.find(item =>
            item.id === foodId &&
            (item.specialNotes || '') === (specialNotes || '')
        );

        if (existingItem) {
            // Ensure existing item has cartItemId
            if (!existingItem.cartItemId) {
                existingItem.cartItemId = 'item_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
            }
            existingItem.quantity += quantity;
            console.log('Updated existing item quantity to:', existingItem.quantity);
        } else {
            const cartItem = {
                id: food.id,
                name: food.name,
                description: food.description,
                price: food.price,
                image: food.image,
                rating: food.rating,
                category: food.category,
                cartItemId: 'item_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
                quantity: quantity
            };

            // Add special notes if provided
            if (specialNotes) {
                cartItem.specialNotes = specialNotes;
                console.log('Added special notes to cart item:', specialNotes);
            }

            this.cart.push(cartItem);
            console.log('Added new item to cart:', cartItem);
        }

        // Save to localStorage with debugging
        localStorage.setItem('cart', JSON.stringify(this.cart));
        console.log('Cart saved to localStorage:', this.cart);

        this.updateCartDisplay();
        this.animateCartIcon();
    }

    updateCartDisplay() {
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    animateCartIcon() {
        const cartIcon = document.getElementById('cartIcon');
        if (cartIcon) {
            cartIcon.style.animation = 'none';
            setTimeout(() => {
                cartIcon.style.animation = 'bounce 0.5s ease';
            }, 10);
        }
    }

    toggleFavorite(foodId) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(f => f.id === foodId);

        if (index > -1) {
            favorites.splice(index, 1);
            this.showToast('Removed from favorites!');
        } else {
            const food = this.foodData.find(f => f.id === foodId);
            if (food) {
                favorites.push(food);
                this.showToast('Added to favorites!');
            }
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.updateFavoriteButtons();
    }

    updateFavoriteButtons() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteIds = favorites.map(f => f.id);

        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const card = btn.closest('.product-card');
            const foodId = parseInt(card.querySelector('.btn-warning').onclick.toString().match(/\d+/)[0]);

            if (favoriteIds.includes(foodId)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    setupScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.onclick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
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

    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    getCategoryName(category) {
        const categoryNames = {
            'pizza': 'Pizza',
            'burger': 'Burger & Chicken',
            'noodle': 'Noodles & Pho',
            'drink': 'Drinks',
            'rice': 'Rice'
        };
        return categoryNames[category] || category;
    }

    // Login Status Management
    updateLoginStatus() {
        const loggedInSection = document.querySelector('.logged-in-section');
        const notLoggedInSection = document.querySelector('.not-logged-in-section');

        if (this.isLoggedIn) {
            loggedInSection?.classList.remove('d-none');
            notLoggedInSection?.classList.add('d-none');
        } else {
            loggedInSection?.classList.add('d-none');
            notLoggedInSection?.classList.remove('d-none');
        }
    }

    login() {
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        this.updateLoginStatus();
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.setItem('isLoggedIn', 'false');
        this.updateLoginStatus();
    }

    handleLogout() {
        // Show confirmation dialog
        if (confirm('Are you sure you want to logout?')) {
            this.logout();
            // Show success message
            this.showToast('Logout successful!', 'success');
        }
    }

    checkLoginRequired() {
        if (!this.isLoggedIn) {
            const modal = new bootstrap.Modal(document.getElementById('loginRequiredModal'));
            modal.show();
            return false;
        }
        return true;
    }

    showLoginModal() {
        // Redirect to new login page
        window.location.href = 'Login.html';
    }

    showRegisterModal() {
        // Redirect to new register page
        window.location.href = 'Register.html';
    }
}

// Initialize the product page
const productPage = new ProductPage();

// Add CSS for bounce animation
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(style);
