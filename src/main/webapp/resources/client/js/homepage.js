// GoMeal JavaScript - Homepage functionality
class GoMealApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.totalAmount = 0;
        this.foodData = [];
        this.currentCategory = 'all';
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || false;
        this.init();
    }

    init() {
        // Ensure DOM is ready before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        this.updateLoginStatus();
        this.loadFoodData();
        this.bindEvents();
        this.updateCartDisplay();
        this.initializeAnimations();
        this.setupSearchFunctionality();
        this.initializeHeroCarousel();
        // Update favorite buttons after initial render
        setTimeout(() => {
            this.updateFavoriteButtons();
        }, 100);
    }

    // Sample food data - In real app, this would come from API
    loadFoodData() {
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
                price: 69000,
                image: "../images/ComGaNuong.png",
                rating: 4.3,
                category: "rice"
            },
            {
                id: 8,
                name: "Vietnamese Rice Paper Salad",
                description: "Vietnamese rice paper with divine sauce",
                price: 25000,
                image: "../images/BanhTrangTron.png",
                rating: 4.9,
                category: "hotpot"
            },
            {
                id: 9,
                name: "Vietnamese Iced Coffee",
                description: "Traditional Vietnamese black iced coffee",
                price: 25000,
                image: "../images/CafeDenDa.png",
                rating: 4.1,
                category: "drink"
            },
            {
                id: 10,
                name: "Margherita Pizza",
                description: "Classic pizza with tomato, fresh mozzarella cheese",
                price: 120000,
                image: "../images/PizzaMargherita.png",
                rating: 4.6,
                category: "pizza",
                discount: 20
            },
            {
                id: 11,
                name: "Double Beef Burger",
                description: "Burger with double beef layers and cheese",
                price: 95000,
                image: "../images/BurgerDoubleBeef.png",
                rating: 4.7,
                category: "burger"
            },
            {
                id: 12,
                name: "KFC Style Fried Chicken",
                description: "Crispy fried chicken with secret blend of 11 spices",
                price: 75000,
                image: "../images/GaRanKFC.png",
                rating: 4.5,
                category: "burger",
                discount: 15
            },
            {
                id: 13,
                name: "Pork Ramen",
                description: "Ramen with chashu pork and soft-boiled egg",
                price: 85000,
                image: "../images/RamenThitHeo.png",
                rating: 4.8,
                category: "noodle"
            },
            {
                id: 14,
                name: "Beef Pho",
                description: "Traditional Vietnamese beef noodle soup",
                price: 65000,
                image: "../images/MyCayHanQuoc.png",
                rating: 4.9,
                category: "noodle"
            },
            {
                id: 15,
                name: "Fried Rice with Sausage",
                description: "Fried rice with Chinese sausage and mixed vegetables",
                price: 55000,
                image: "../images/ComChienHaiSan.png",
                rating: 4.4,
                category: "rice"
            },
            {
                id: 16,
                name: "Thai Green Curry",
                description: "Spicy Thai green curry with coconut milk",
                price: 78000,
                image: "../images/MiCaySamYang.png",
                rating: 4.6,
                category: "rice"
            },
            {
                id: 17,
                name: "Fresh Orange Juice",
                description: "Freshly squeezed orange juice",
                price: 30000,
                image: "../images/TraDao.png",
                rating: 4.3,
                category: "drink"
            },
            {
                id: 18,
                name: "Mango Smoothie",
                description: "Fresh mango smoothie with ice",
                price: 35000,
                image: "../images/TraXoaiChanhDay.png",
                rating: 4.5,
                category: "drink"
            },
            {
                id: 19,
                name: "Tom Yum Soup",
                description: "Spicy and sour Thai soup with shrimp",
                price: 68000,
                image: "../images/CaVienChien.png",
                rating: 4.7,
                category: "hotpot"
            },
            {
                id: 20,
                name: "Hot Pot Special",
                description: "Mixed hot pot with beef, seafood and vegetables",
                price: 150000,
                image: "../images/XucXichPhoMai.png",
                rating: 4.8,
                category: "hotpot",
                discount: 10
            }
        ];

        // Load featured dishes on homepage
        this.loadFeaturedDishes();
    }

    bindEvents() {
        // Sidebar navigation
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Skip if already has onclick attribute
                if (e.currentTarget.hasAttribute('onclick')) return;

                const itemText = e.currentTarget.querySelector('span').textContent.trim();
                switch (itemText) {
                    case 'Home':
                        // Already on homepage
                        break;
                    case 'Favorites':
                        window.location.href = 'Favorite.html';
                        break;
                    case 'Messages':
                        window.location.href = 'Chatbox.html';
                        break;
                    case 'Order History':
                        window.location.href = 'Order.html';
                        break;
                    case 'Invoices':
                        window.location.href = 'Invoice.html';
                        break;
                    case 'Settings':
                        window.location.href = 'Profile.html';
                        break;
                }
            });
        });

        // Sidebar logo click
        const sidebarLogo = document.getElementById('brand');
        if (sidebarLogo) {
            sidebarLogo.addEventListener('click', (e) => {
                e.preventDefault();
                // Already on homepage
            });
        }

        // Category selection
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.selectCategory(e.currentTarget);
            });
        });

        // Cart icon click - use onclick in HTML instead
        // const cartIcon = document.getElementById('cartIcon');
        // if (cartIcon) {
        //     cartIcon.addEventListener('click', () => {
        //         window.location.href = 'Cart.html';
        //     });
        // }

        // Modal events
        const addToCartBtn = document.getElementById('addToCartBtn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.addToCartFromModal();
            });
        }

        const increaseQty = document.getElementById('increaseQty');
        if (increaseQty) {
            increaseQty.addEventListener('click', () => {
                this.changeModalQuantity(1);
            });
        }

        const decreaseQty = document.getElementById('decreaseQty');
        if (decreaseQty) {
            decreaseQty.addEventListener('click', () => {
                this.changeModalQuantity(-1);
            });
        }

        // Sidebar toggle for mobile
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('sidebar-toggle')) {
                this.toggleSidebar();
            }
        });

        // Logout button event
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }

        // Login button event
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                window.location.href = 'Login.html';
            });
        }

        // Register button event
        const registerBtn = document.getElementById('registerBtn');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                window.location.href = 'Register.html';
            });
        }

        // Modal login button event
        const modalLoginBtn = document.getElementById('modalLoginBtn');
        if (modalLoginBtn) {
            modalLoginBtn.addEventListener('click', () => {
                window.location.href = 'Login.html';
            });
        }
    }

    selectCategory(categoryElement) {
        // Remove active class from all categories
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to selected category
        categoryElement.classList.add('active');

        // Get category type
        this.currentCategory = categoryElement.getAttribute('data-category');

        // Clear search input when selecting category
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }

        // Hide search suggestions
        this.hideSearchSuggestions();

        // Filter and render food items
        this.renderFoodGrid();

        // Add animation
        categoryElement.style.animation = 'none';
        setTimeout(() => {
            categoryElement.style.animation = 'successBounce 0.5s ease';
        }, 10);
    }

    renderFoodGrid(dataToRender = null) {
        const container = document.getElementById('foodGrid');
        if (!container) return;

        let data = dataToRender || this.foodData;

        // Filter by category if not showing search results
        if (!dataToRender && this.currentCategory !== 'all') {
            data = this.foodData.filter(food => food.category === this.currentCategory);
        }

        container.innerHTML = '';

        data.forEach((food, index) => {
            const foodCard = this.createFoodCard(food);
            container.appendChild(foodCard);

            // Staggered animation
            setTimeout(() => {
                foodCard.style.opacity = '1';
                foodCard.style.transform = 'translateY(0)';

                // Update favorite buttons after last card is rendered
                if (index === data.length - 1) {
                    setTimeout(() => {
                        this.updateFavoriteButtons();
                    }, 50);
                }
            }, index * 100);
        });
    }

    createFoodCard(food) {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4 mb-4';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';

        const discountBadge = food.discount ?
            `<div class="discount-badge">Save ${food.discount}%</div>` : '';

        const stars = this.generateStars(food.rating);

        card.innerHTML = `
            <div class="food-card" data-food-id="${food.id}">
                ${discountBadge}
                <button class="favorite-btn" onclick="app.toggleFavorite(${food.id})">
                    <i class="fas fa-heart"></i>
                </button>
                <img src="${food.image}" alt="${food.name}" class="food-image">
                <div class="food-info">
                    <h5 class="food-name">${food.name}</h5>
                    <p class="food-description">${food.description}</p>
                    <div class="rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">${food.rating}</span>
                    </div>
                    <div class="food-footer">
                        <span class="price">${this.formatPrice(food.price)}</span>
                        <div class="add-buttons">
                            <button class="add-btn quick-add" onclick="app.openFoodModal(${food.id})" title="Add to cart">
                                <i class="fas fa-cart-plus me-1"></i>Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star star"></i>';
            } else {
                stars += '<i class="fas fa-star star empty"></i>';
            }
        }
        return stars;
    }

    showFoodModal(foodId) {
        const food = this.foodData.find(f => f.id === foodId);
        if (!food) return;

        // Populate modal
        document.getElementById('modalFoodImage').src = food.image;
        document.getElementById('modalFoodName').textContent = food.name;
        document.getElementById('modalFoodDescription').textContent = food.description;
        document.getElementById('modalPrice').textContent = this.formatPrice(food.price);
        document.getElementById('modalStars').innerHTML = this.generateStars(food.rating);
        document.getElementById('modalRating').textContent = food.rating;
        document.getElementById('modalQuantity').textContent = '1';

        // Store current food in modal
        document.getElementById('foodModal').setAttribute('data-food-id', foodId);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('foodModal'));
        modal.show();
    }

    showAdvancedFoodModal(foodId) {
        const food = this.foodData.find(f => f.id === foodId);
        if (!food) return;

        // Create advanced modal if it doesn't exist
        this.createAdvancedModal();

        // Populate modal with food data
        document.getElementById('advancedModalFoodImage').src = food.image;
        document.getElementById('advancedModalFoodName').textContent = food.name;
        document.getElementById('advancedModalFoodDescription').textContent = food.description;
        document.getElementById('advancedModalPrice').textContent = this.formatPrice(food.price);
        document.getElementById('advancedModalStars').innerHTML = this.generateStars(food.rating);
        document.getElementById('advancedModalRating').textContent = food.rating;
        document.getElementById('advancedModalQuantity').textContent = '1';

        // Reset all options
        this.resetAdvancedModalOptions();

        // Show/hide options based on category and id
        this.configureAdvancedModalOptions(food);

        // Store current food in modal
        document.getElementById('advancedFoodModal').setAttribute('data-food-id', foodId);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('advancedFoodModal'));
        modal.show();
    }

    // Simple food modal (đồng bộ với Product page)
    openFoodModal(foodId) {
        const food = this.foodData.find(f => f.id === foodId);
        if (!food) return;

        // Check if simple modal exists, if not use the existing foodModal
        const modal = document.getElementById('foodModal');
        if (!modal) {
            console.error('Food modal not found');
            return;
        }

        // Reset modal form before opening
        this.resetModalForm();

        // Populate modal with food data
        const modalImage = document.getElementById('modalFoodImage');
        const modalName = document.getElementById('modalFoodName');
        const modalDescription = document.getElementById('modalFoodDescription');
        const modalPrice = document.getElementById('modalPrice');
        const modalStars = document.getElementById('modalStars');
        const modalRating = document.getElementById('modalRating');
        const modalQuantity = document.getElementById('modalQuantity');

        if (modalImage) modalImage.src = food.image;
        if (modalName) modalName.textContent = food.name;
        if (modalDescription) modalDescription.textContent = food.description;
        if (modalPrice) modalPrice.textContent = this.formatPrice(food.price);
        if (modalStars) modalStars.innerHTML = this.generateStars(food.rating);
        if (modalRating) modalRating.textContent = `(${food.rating})`;
        if (modalQuantity) modalQuantity.textContent = '1';

        // Store current food in modal
        modal.setAttribute('data-food-id', foodId);

        // Setup modal event listeners
        this.setupModalEventListeners();

        // Show modal
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        // Fix aria-hidden issue when modal is shown
        modal.addEventListener('shown.bs.modal', function () {
            modal.removeAttribute('aria-hidden');
        });

        // Restore aria-hidden when modal is hidden
        modal.addEventListener('hidden.bs.modal', function () {
            modal.setAttribute('aria-hidden', 'true');
        });
    }

    // Function to view food info only (without Add to Cart)
    viewFoodInfo(foodId) {
        const food = this.foodData.find(f => f.id === foodId);
        if (!food) return;

        // Check if view modal exists, if not create it
        let viewModal = document.getElementById('viewFoodModal');
        if (!viewModal) {
            this.createViewOnlyModal();
            viewModal = document.getElementById('viewFoodModal');
        }

        // Reset and populate modal with food data
        const modalImage = document.getElementById('viewModalFoodImage');
        const modalName = document.getElementById('viewModalFoodName');
        const modalDescription = document.getElementById('viewModalFoodDescription');
        const modalPrice = document.getElementById('viewModalPrice');
        const modalStars = document.getElementById('viewModalStars');
        const modalRating = document.getElementById('viewModalRating');

        if (modalImage) modalImage.src = food.image;
        if (modalName) modalName.textContent = food.name;
        if (modalDescription) modalDescription.textContent = food.description;
        if (modalPrice) modalPrice.textContent = this.formatPrice(food.price);
        if (modalStars) modalStars.innerHTML = this.generateStars(food.rating);
        if (modalRating) modalRating.textContent = `(${food.rating})`;

        // Show modal
        const bsModal = new bootstrap.Modal(viewModal);
        bsModal.show();

        // Fix aria-hidden issue
        viewModal.addEventListener('shown.bs.modal', function () {
            viewModal.removeAttribute('aria-hidden');
        });

        viewModal.addEventListener('hidden.bs.modal', function () {
            viewModal.setAttribute('aria-hidden', 'true');
        });
    }

    // Create view-only modal (without add to cart functionality)
    createViewOnlyModal() {
        const modalHTML = `
            <div class="modal fade" id="viewFoodModal" tabindex="-1" aria-labelledby="viewModalFoodName" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header border-0">
                            <h5 class="modal-title" id="viewModalFoodName"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <img id="viewModalFoodImage" src="" alt="" class="w-100 rounded mb-3">
                                    <div class="product-description">
                                        <h6 class="fw-bold text-warning mb-2">Product description</h6>
                                        <p id="viewModalFoodDescription" class="text-muted mb-3" style="line-height: 1.6;">
                                            Dishes are prepared from the freshest ingredients, ensuring quality and food safety.
                                        </p>
                                        <div class="product-features">
                                            <small class="text-muted d-block mb-1"><i class="fas fa-check-circle text-success me-2"></i>Fresh ingredients</small>
                                            <small class="text-muted d-block mb-1"><i class="fas fa-check-circle text-success me-2"></i>Made to order</small>
                                            <small class="text-muted d-block"><i class="fas fa-check-circle text-success me-2"></i>Hygienic and safe</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="rating mb-3">
                                        <div class="stars" id="viewModalStars"></div>
                                        <span id="viewModalRating" class="ms-2 text-muted"></span>
                                    </div>
                                    <div class="price-section mb-4">
                                        <span class="price fw-bold fs-4" id="viewModalPrice"></span>
                                    </div>
                                    
                                    <div class="info-notice p-3 mb-4" style="background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #ffc107;">
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-info-circle text-warning me-2"></i>
                                            <span class="text-muted">To order this dish, please visit the <strong>Products</strong> page</span>
                                        </div>
                                    </div>
                                    
                                    <button class="btn btn-outline-warning w-100 fw-bold" onclick="window.location.href='Product.html'">
                                        <i class="fas fa-shopping-cart me-2"></i>Go to Products Page
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    setupModalEventListeners() {
        const decreaseBtn = document.getElementById('decreaseQty');
        const increaseBtn = document.getElementById('increaseQty');
        const addToCartBtn = document.getElementById('addToCartBtn');

        // Remove existing event listeners to prevent conflicts
        if (decreaseBtn) {
            decreaseBtn.removeEventListener('click', this._decreaseHandler);
            this._decreaseHandler = () => this.changeModalQuantity(-1);
            decreaseBtn.addEventListener('click', this._decreaseHandler);
        }

        if (increaseBtn) {
            increaseBtn.removeEventListener('click', this._increaseHandler);
            this._increaseHandler = () => this.changeModalQuantity(1);
            increaseBtn.addEventListener('click', this._increaseHandler);
        }

        if (addToCartBtn) {
            addToCartBtn.removeEventListener('click', this._addToCartHandler);
            this._addToCartHandler = () => this.addToCartFromModal();
            addToCartBtn.addEventListener('click', this._addToCartHandler);
        }
    }

    changeModalQuantity(change) {
        const quantityElement = document.getElementById('modalQuantity');
        if (!quantityElement) return;

        let currentQty = parseInt(quantityElement.textContent);
        currentQty += change;
        if (currentQty < 1) currentQty = 1;
        if (currentQty > 10) currentQty = 10;

        quantityElement.textContent = currentQty;

        // Add animation effect
        quantityElement.style.animation = 'none';
        setTimeout(() => {
            quantityElement.style.animation = 'pulse 0.3s ease';
        }, 10);
    }

    createAdvancedModal() {
        // Check if modal already exists
        if (document.getElementById('advancedFoodModal')) return;

        const modalHTML = `
            <div class="modal fade" id="advancedFoodModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content advanced-modal">
                        <div class="modal-header border-0">
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-5">
                                    <img id="advancedModalFoodImage" src="" alt="" class="w-100 rounded food-modal-image">
                                </div>
                                <div class="col-md-7">
                                    <h3 id="advancedModalFoodName" class="fw-bold mb-3"></h3>
                                    <div class="rating mb-3">
                                        <div class="stars" id="advancedModalStars"></div>
                                        <span id="advancedModalRating" class="ms-2 text-muted"></span>
                                    </div>
                                    <p id="advancedModalFoodDescription" class="text-muted mb-4"></p>
                                    
                                    <!-- Size Options -->
                                    <div class="customization-section" id="sizeSection">
                                        <label class="section-title">Choose size:</label>
                                        <div class="size-options">
                                            <div class="size-option" data-size="S" data-price="0">
                                                <span class="size-name">S</span>
                                                <span class="size-price">+0đ</span>
                                            </div>
                                            <div class="size-option active" data-size="M" data-price="0">
                                                <span class="size-name">M</span>
                                                <span class="size-price">+0đ</span>
                                            </div>
                                            <div class="size-option" data-size="L" data-price="10000">
                                                <span class="size-name">L</span>
                                                <span class="size-price">+10,000đ</span>
                                            </div>
                                            <div class="size-option" data-size="XL" data-price="20000">
                                                <span class="size-name">XL</span>
                                                <span class="size-price">+20,000đ</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Topping Options -->
                                    <div class="customization-section" id="toppingSection">
                                        <label class="section-title">Topping options:</label>
                                        <div class="topping-options">
                                            <div class="topping-item">
                                                <input type="checkbox" id="topping1" data-price="5000">
                                                <label for="topping1">
                                                    <span class="topping-name">Extra cheese</span>
                                                    <span class="topping-price">(+5,000đ)</span>
                                                </label>
                                            </div>
                                            <div class="topping-item">
                                                <input type="checkbox" id="topping2" data-price="8000">
                                                <label for="topping2">
                                                    <span class="topping-name">Bacon</span>
                                                    <span class="topping-price">(+8,000đ)</span>
                                                </label>
                                            </div>
                                            <div class="topping-item">
                                                <input type="checkbox" id="topping3" data-price="3000">
                                                <label for="topping3">
                                                    <span class="topping-name">Vegetables</span>
                                                    <span class="topping-price">(+3,000đ)</span>
                                                </label>
                                            </div>
                                            <div class="topping-item">
                                                <input type="checkbox" id="topping4" data-price="7000">
                                                <label for="topping4">
                                                    <span class="topping-name">Fried egg</span>
                                                    <span class="topping-price">(+7,000đ)</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Spice Level -->
                                    <div class="customization-section" id="spiceSection">
                                        <label class="section-title">Spice level:</label>
                                        <div class="spice-selector">
                                            <button class="spice-btn" data-level="0">
                                                <div class="spice-display">
                                                    <span class="spice-level">0</span>
                                                    <div class="spice-dots">
                                                        <span class="dot"></span>
                                                    </div>
                                                </div>
                                                <i class="fas fa-chevron-down dropdown-arrow"></i>
                                            </button>
                                            <div class="spice-dropdown" id="spiceDropdown">
                                                <div class="spice-option" data-level="0">
                                                    <span>No spice</span>
                                                    <div class="spice-option-dots"></div>
                                                </div>
                                                <div class="spice-option" data-level="1">
                                                    <span>Mild</span>
                                                    <div class="spice-option-dots"></div>
                                                </div>
                                                <div class="spice-option" data-level="2">
                                                    <span>Medium</span>
                                                    <div class="spice-option-dots"></div>
                                                </div>
                                                <div class="spice-option" data-level="3">
                                                    <span>Spicy</span>
                                                    <div class="spice-option-dots"></div>
                                                </div>
                                                <div class="spice-option" data-level="4">
                                                    <span>Hot</span>
                                                    <div class="spice-option-dots"></div>
                                                </div>
                                                <div class="spice-option" data-level="5">
                                                    <span>Very hot</span>
                                                    <div class="spice-option-dots"></div>
                                                </div>
                                                <div class="spice-option" data-level="6">
                                                    <span>Extra hot</span>
                                                    <div class="spice-option-dots"></div>
                                                </div>
                                                <div class="spice-option" data-level="7">
                                                    <span>Super hot</span>
                                                    <div class="spice-option-dots"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Special Notes -->
                                    <div class="customization-section" id="notesSection">
                                        <label class="section-title">Special notes:</label>
                                        <div class="notes-container">
                                            <textarea id="specialNotes" class="special-notes" placeholder="Example: less sugar, extra ice, no onions, no spice..." maxlength="200"></textarea>
                                            <div class="character-counter" id="charCounter">0/200</div>
                                        </div>
                                        <div class="notes-suggestions">
                                            <span class="suggestion-chip" data-text="Less sugar">Less sugar</span>
                                            <span class="suggestion-chip" data-text="Extra ice">Extra ice</span>
                                            <span class="suggestion-chip" data-text="No onions">No onions</span>
                                            <span class="suggestion-chip" data-text="No spice">No spice</span>
                                            <span class="suggestion-chip" data-text="Hot">Hot</span>
                                            <span class="suggestion-chip" data-text="Less salt">Less salt</span>
                                        </div>
                                    </div>

                                    <div class="price-section mb-4">
                                        <span class="price fw-bold fs-4" id="advancedModalPrice"></span>
                                        <span class="total-price fw-bold fs-4 text-success" id="totalPrice"></span>
                                    </div>
                                    
                                    <div class="quantity-section mb-4">
                                        <label class="form-label">Quantity:</label>
                                        <div class="quantity-controls">
                                            <button class="btn btn-outline-warning" id="advancedDecreaseQty">-</button>
                                            <span class="quantity" id="advancedModalQuantity">1</span>
                                            <button class="btn btn-outline-warning" id="advancedIncreaseQty">+</button>
                                        </div>
                                    </div>
                                    
                                    <button class="btn btn-warning w-100 fw-bold" id="advancedAddToCartBtn">
                                        <i class="fas fa-cart-plus me-2"></i>Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.bindAdvancedModalEvents();
    }

    changeModalQuantity(change) {
        const quantityElement = document.getElementById('modalQuantity');
        let currentQty = parseInt(quantityElement.textContent);

        currentQty += change;
        if (currentQty < 1) currentQty = 1;
        if (currentQty > 10) currentQty = 10;

        quantityElement.textContent = currentQty;

        // Add animation
        quantityElement.style.animation = 'none';
        setTimeout(() => {
            quantityElement.style.animation = 'successBounce 0.3s ease';
        }, 10);
    }

    bindAdvancedModalEvents() {
        // Quantity controls
        const increaseBtn = document.getElementById('advancedIncreaseQty');
        const decreaseBtn = document.getElementById('advancedDecreaseQty');
        const addToCartBtn = document.getElementById('advancedAddToCartBtn');

        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => {
                this.changeAdvancedModalQuantity(1);
            });
        }

        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => {
                this.changeAdvancedModalQuantity(-1);
            });
        }

        // Add to cart button
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.addAdvancedToCart();
            });
        }

        // Size selection
        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                this.updateAdvancedModalPrice();
            });
        });

        // Topping checkboxes
        document.querySelectorAll('.topping-item input').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateAdvancedModalPrice();
            });
        });

        // Spice level dropdown
        const spiceBtn = document.querySelector('.spice-btn');
        const spiceDropdown = document.getElementById('spiceDropdown');

        if (spiceBtn && spiceDropdown) {
            spiceBtn.addEventListener('click', () => {
                spiceDropdown.classList.toggle('show');
            });

            document.querySelectorAll('.spice-option').forEach(option => {
                option.addEventListener('click', () => {
                    const level = option.getAttribute('data-level');
                    this.selectSpiceLevel(level);
                    spiceDropdown.classList.remove('show');
                });
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.spice-selector')) {
                    spiceDropdown.classList.remove('show');
                }
            });
        }

        // Special notes functionality
        this.bindNotesEvents();
    }

    bindNotesEvents() {
        const notesTextarea = document.getElementById('specialNotes');
        const charCounter = document.getElementById('charCounter');
        const suggestionChips = document.querySelectorAll('.suggestion-chip');

        if (notesTextarea && charCounter) {
            // Character counter
            notesTextarea.addEventListener('input', () => {
                const currentLength = notesTextarea.value.length;
                const maxLength = 200;

                charCounter.textContent = `${currentLength}/${maxLength}`;

                // Update counter color based on length
                charCounter.classList.remove('warning', 'error');
                if (currentLength > maxLength * 0.8) {
                    charCounter.classList.add('warning');
                }
                if (currentLength >= maxLength) {
                    charCounter.classList.add('error');
                }
            });

            // Auto-resize textarea
            notesTextarea.addEventListener('input', () => {
                notesTextarea.style.height = 'auto';
                notesTextarea.style.height = Math.min(notesTextarea.scrollHeight, 150) + 'px';
            });
        }

        // Suggestion chips
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const suggestionText = chip.getAttribute('data-text');
                const currentNotes = notesTextarea.value.trim();

                // Check if suggestion already exists
                if (!currentNotes.includes(suggestionText)) {
                    const newNotes = currentNotes
                        ? `${currentNotes}, ${suggestionText}`
                        : suggestionText;

                    if (newNotes.length <= 200) {
                        notesTextarea.value = newNotes;

                        // Trigger input event to update character counter
                        notesTextarea.dispatchEvent(new Event('input'));

                        // Add visual feedback
                        chip.style.animation = 'successBounce 0.3s ease';
                        setTimeout(() => {
                            chip.style.animation = '';
                        }, 300);
                    } else {
                        this.showToast('Ghi chú quá dài! Vui lòng rút gọn.', 'error');
                    }
                }
            });
        });
    } resetAdvancedModalOptions() {
        // Reset size to M
        document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
        const defaultSize = document.querySelector('.size-option[data-size="M"]');
        if (defaultSize) defaultSize.classList.add('active');

        // Reset toppings
        document.querySelectorAll('.topping-item input').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset spice level
        this.selectSpiceLevel(0);

        // Reset notes and character counter
        const notesTextarea = document.getElementById('specialNotes');
        const charCounter = document.getElementById('charCounter');

        if (notesTextarea) {
            notesTextarea.value = '';
            notesTextarea.style.height = 'auto';
        }

        if (charCounter) {
            charCounter.textContent = '0/200';
            charCounter.classList.remove('warning', 'error');
        }

        // Reset quantity
        document.getElementById('advancedModalQuantity').textContent = '1';
    }

    configureAdvancedModalOptions(food) {
        const sizeSection = document.getElementById('sizeSection');
        const toppingSection = document.getElementById('toppingSection');
        const spiceSection = document.getElementById('spiceSection');

        // Hide all sections first
        sizeSection.style.display = 'none';
        toppingSection.style.display = 'none';
        spiceSection.style.display = 'none';

        // Show size for drinks
        if (food.category === 'drink') {
            sizeSection.style.display = 'block';
        }

        // Show toppings for specific categories
        if (['drink', 'hotpot', 'burger', 'noodle'].includes(food.category)) {
            toppingSection.style.display = 'block';
            this.configureToppings(food.category);
        }

        // Show spice level for specific items
        if (food.id === 29 || food.id === 15) {
            spiceSection.style.display = 'block';
        }

        this.updateAdvancedModalPrice();
    }

    configureToppings(category) {
        const toppings = {
            'drink': [
                { name: 'Pearls', price: 5000 },
                { name: 'Pudding', price: 8000 },
                { name: 'Jelly', price: 3000 },
                { name: 'Cheese cream', price: 10000 }
            ],
            'hotpot': [
                { name: 'Extra vegetables', price: 5000 },
                { name: 'Extra mushrooms', price: 8000 },
                { name: 'Extra beef', price: 15000 },
                { name: 'Extra shrimp', price: 12000 }
            ],
            'burger': [
                { name: 'Extra cheese', price: 5000 },
                { name: 'Bacon', price: 8000 },
                { name: 'Vegetables', price: 3000 },
                { name: 'Fried egg', price: 7000 }
            ],
            'noodle': [
                { name: 'Extra meat', price: 10000 },
                { name: 'Extra egg', price: 5000 },
                { name: 'Extra vegetables', price: 3000 },
                { name: 'Extra onions', price: 2000 }
            ]
        };

        const toppingOptions = document.querySelector('.topping-options');
        const categoryToppings = toppings[category] || toppings['burger'];

        toppingOptions.innerHTML = categoryToppings.map((topping, index) => `
            <div class="topping-item">
                <input type="checkbox" id="topping${index + 1}" data-price="${topping.price}">
                <label for="topping${index + 1}">
                    <span class="topping-name">${topping.name}</span>
                    <span class="topping-price">(+${this.formatPrice(topping.price)})</span>
                </label>
            </div>
        `).join('');

        // Re-bind events for new checkboxes
        document.querySelectorAll('.topping-item input').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateAdvancedModalPrice();
            });
        });
    }

    selectSpiceLevel(level) {
        const spiceBtn = document.querySelector('.spice-btn');
        const spiceDots = spiceBtn.querySelector('.spice-dots');

        // Update button display
        spiceBtn.querySelector('.spice-level').textContent = level;
        spiceBtn.setAttribute('data-level', level);

        // Update dots display
        const colors = ['#e0e0e0', '#ffeb3b', '#ff9800', '#ff5722', '#f44336', '#d32f2f', '#b71c1c', '#4a0e4e'];
        spiceDots.innerHTML = '';

        for (let i = 0; i <= level; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot active';
            dot.style.backgroundColor = colors[level] || '#e0e0e0';
            spiceDots.appendChild(dot);
        }
    }

    changeAdvancedModalQuantity(change) {
        const quantityElement = document.getElementById('advancedModalQuantity');
        let currentQty = parseInt(quantityElement.textContent);

        currentQty += change;
        if (currentQty < 1) currentQty = 1;
        if (currentQty > 10) currentQty = 10;

        quantityElement.textContent = currentQty;
        this.updateAdvancedModalPrice();

        // Add animation
        quantityElement.style.animation = 'none';
        setTimeout(() => {
            quantityElement.style.animation = 'successBounce 0.3s ease';
        }, 10);
    }

    updateAdvancedModalPrice() {
        const modal = document.getElementById('advancedFoodModal');
        const foodId = parseInt(modal.getAttribute('data-food-id'));
        const food = this.foodData.find(f => f.id === foodId);

        if (!food) return;

        let totalPrice = food.price;

        // Add size price
        const selectedSize = document.querySelector('.size-option.active');
        if (selectedSize) {
            totalPrice += parseInt(selectedSize.getAttribute('data-price'));
        }

        // Add topping prices
        document.querySelectorAll('.topping-item input:checked').forEach(checkbox => {
            totalPrice += parseInt(checkbox.getAttribute('data-price'));
        });

        // Get quantity
        const quantity = parseInt(document.getElementById('advancedModalQuantity').textContent);
        const finalPrice = totalPrice * quantity;

        // Update display
        document.getElementById('advancedModalPrice').textContent = this.formatPrice(food.price);
        document.getElementById('totalPrice').textContent = `= ${this.formatPrice(finalPrice)}`;
    }

    addAdvancedToCart() {
        if (!this.checkLoginRequired()) {
            return;
        }

        const modal = document.getElementById('advancedFoodModal');
        const foodId = parseInt(modal.getAttribute('data-food-id'));
        const food = this.foodData.find(f => f.id === foodId);

        if (!food) return;

        // Get all selected options
        const quantity = parseInt(document.getElementById('advancedModalQuantity').textContent);

        // Get size
        const selectedSize = document.querySelector('.size-option.active');
        const size = selectedSize ? selectedSize.getAttribute('data-size') : 'M';
        const sizePrice = selectedSize ? parseInt(selectedSize.getAttribute('data-price')) : 0;

        // Get toppings
        const selectedToppings = [];
        let toppingsPrice = 0;
        document.querySelectorAll('.topping-item input:checked').forEach(checkbox => {
            const label = checkbox.nextElementSibling.textContent.split('(')[0].trim();
            const price = parseInt(checkbox.getAttribute('data-price'));
            selectedToppings.push({ name: label, price });
            toppingsPrice += price;
        });

        // Get spice level
        const spiceBtn = document.querySelector('.spice-btn');
        const spiceLevel = spiceBtn ? parseInt(spiceBtn.getAttribute('data-level')) : 0;

        // Get special notes
        const specialNotes = document.getElementById('specialNotes').value.trim();

        // Calculate total price per item
        const itemPrice = food.price + sizePrice + toppingsPrice;

        // Create unique cart item ID
        const cartItemId = Date.now() + Math.random();

        // Create cart item with customizations
        const cartItem = {
            ...food,
            cartItemId: cartItemId,
            price: itemPrice,
            quantity: quantity,
            customizations: {
                size,
                toppings: selectedToppings,
                spiceLevel,
                specialNotes
            }
        };

        // Add to cart
        this.cart.push(cartItem);
        this.saveCartToStorage();
        this.updateCartDisplay();
        this.animateCartIcon();

        // Close modal
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();

        // Show success toast
        this.showToast('Added item to cart with your options!');
    }

    addToCartFromModal() {
        const modal = document.getElementById('foodModal');
        const foodId = parseInt(modal.getAttribute('data-food-id'));
        const quantity = parseInt(document.getElementById('modalQuantity').textContent);

        // Collect special notes from the modal
        const specialNotes = this.collectSpecialNotes();

        this.addToCart(foodId, quantity, specialNotes);

        // Close modal
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();

        // Show success toast only - không chuyển trang
        this.showToast('Added to cart!');

        // Removed automatic redirect - user can navigate manually via cart icon
    }

    // Collect special notes from modal
    collectSpecialNotes() {
        const notes = [];

        // Get checkbox notes
        const checkboxes = document.querySelectorAll('#foodModal .notes-options input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            const label = checkbox.nextElementSibling.textContent.trim();
            if (label) {
                notes.push(label);
            }
        });

        // Get custom notes
        const customNotes = document.getElementById('customNotes');
        if (customNotes && customNotes.value.trim()) {
            notes.push(customNotes.value.trim());
        }

        return notes.length > 0 ? notes.join(', ') : '';
    }

    addToCart(foodId, quantity = 1, specialNotes = '') {
        if (!this.checkLoginRequired()) {
            return;
        }

        const food = this.foodData.find(f => f.id === foodId);
        if (!food) return;

        // Check for existing item with same ID and identical special notes
        const existingItem = this.cart.find(item =>
            item.id === foodId &&
            (item.specialNotes || '') === (specialNotes || '')
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            // Generate unique cartItemId - sử dụng format nhất quán với cart.js
            const cartItemId = 'item_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
            const cartItem = {
                ...food,
                cartItemId: cartItemId,
                quantity: quantity
            };

            // Add special notes if provided
            if (specialNotes) {
                cartItem.specialNotes = specialNotes;
            }

            this.cart.push(cartItem);
        }

        this.saveCartToStorage();
        this.updateCartDisplay();
        this.animateCartIcon();

        // Reset modal form
        this.resetModalForm();
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

    // Quick add to cart - chỉ thêm vào giỏ, không chuyển trang
    quickAddToCart(foodId, quantity = 1) {
        if (!this.checkLoginRequired()) {
            return;
        }

        const food = this.foodData.find(f => f.id === foodId);
        if (!food) return;

        // For simple add to cart (no customizations), check existing items
        const existingItem = this.cart.find(item => item.id === foodId && !item.customizations);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            // Generate unique cartItemId - sử dụng format nhất quán với cart.js
            const cartItemId = 'item_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
            this.cart.push({
                ...food,
                cartItemId: cartItemId,
                quantity: quantity
            });
        }

        // Save to localStorage immediately
        localStorage.setItem('cart', JSON.stringify(this.cart));

        // Update cart display
        this.updateCartDisplay();
        this.animateCartIcon();

        // Show success toast only - không chuyển trang
        this.showToast('Added to cart!');

        // Removed automatic redirect - user can navigate manually via cart icon
    }

    removeFromCart(foodId) {
        this.cart = this.cart.filter(item => item.id !== foodId);
        this.saveCartToStorage();
        this.updateCartDisplay();
    }

    updateCartQuantity(foodId, newQuantity) {
        const item = this.cart.find(item => item.id === foodId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(foodId);
            } else {
                item.quantity = newQuantity;
                this.saveCartToStorage();
                this.updateCartDisplay();
            }
        }
    }

    updateCartQuantityByCartId(cartItemId, newQuantity) {
        const itemIndex = this.cart.findIndex(item => item.cartItemId === cartItemId);
        if (itemIndex !== -1) {
            if (newQuantity <= 0) {
                this.cart.splice(itemIndex, 1);
            } else {
                this.cart[itemIndex].quantity = newQuantity;
            }
            this.saveCartToStorage();
            this.updateCartDisplay();
        }
    }

    saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartBadge = document.getElementById('cartBadge');
        const cartSummary = document.getElementById('cartSummary');

        // Update cart badge
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartBadge) {
            cartBadge.textContent = totalItems;

            if (totalItems > 0) {
                cartBadge.style.display = 'flex';
            } else {
                cartBadge.style.display = 'none';
            }
        }

        // Update cart items (only if container exists)
        if (!cartItemsContainer) return;
        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart text-center py-5">
                    <i class="fas fa-shopping-cart text-muted mb-3" style="font-size: 3rem;"></i>
                    <p class="text-muted">Your cart is empty</p>
                </div>
            `;
            cartSummary.style.display = 'none';
        } else {
            cartItemsContainer.innerHTML = '';

            this.cart.forEach(item => {
                const cartItem = this.createCartItem(item);
                cartItemsContainer.appendChild(cartItem);
            });

            // Update summary
            this.updateCartSummary();
            cartSummary.style.display = 'block';
        }
    }

    createCartItem(item) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        // Build customizations display
        let customizationsHtml = '';
        if (item.customizations) {
            const customizations = [];

            // Size
            if (item.customizations.size && item.customizations.size !== 'M') {
                customizations.push(`Size: ${item.customizations.size}`);
            }

            // Toppings
            if (item.customizations.toppings && item.customizations.toppings.length > 0) {
                const toppingsText = item.customizations.toppings.map(t => t.name).join(', ');
                customizations.push(`Topping: ${toppingsText}`);
            }

            // Spice level
            if (item.customizations.spiceLevel && item.customizations.spiceLevel > 0) {
                const spiceNames = ['No spice', 'Mild', 'Medium', 'Spicy', 'Hot', 'Very hot', 'Extra hot', 'Super hot'];
                customizations.push(`Spice level: ${spiceNames[item.customizations.spiceLevel] || 'Level ' + item.customizations.spiceLevel}`);
            }

            // Special notes
            if (item.customizations.specialNotes) {
                customizations.push(`Ghi chú: ${item.customizations.specialNotes}`);
            }

            if (customizations.length > 0) {
                customizationsHtml = `<div class="cart-item-customizations">${customizations.join(' • ')}</div>`;
            }
        }

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                ${customizationsHtml}
                <div class="cart-item-price">${this.formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-controls">
                <button onclick="app.updateCartQuantityByCartId('${item.cartItemId}', ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="app.updateCartQuantityByCartId('${item.cartItemId}', ${item.quantity + 1})">+</button>
            </div>
        `;
        return cartItem;
    }

    updateCartSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = subtotal > 200000 ? 0 : 20000; // Free delivery over 200k
        const total = subtotal + deliveryFee;

        document.getElementById('subtotal').textContent = this.formatPrice(subtotal);
        document.getElementById('deliveryFee').textContent = this.formatPrice(deliveryFee);
        document.getElementById('total').textContent = this.formatPrice(total);

        this.totalAmount = total;
    }

    applyPromoCode() {
        const promoCode = document.getElementById('promoCode').value.trim();

        if (!promoCode) {
            this.showToast('Vui lòng nhập mã giảm giá!', 'error');
            return;
        }

        // Sample promo codes
        const promoCodes = {
            'GOMEAL20': 20,
            'FIRSTORDER': 15,
            'WELCOME10': 10
        };

        if (promoCodes[promoCode.toUpperCase()]) {
            const discount = promoCodes[promoCode.toUpperCase()];
            this.showToast(`Applied successfully! ${discount}% discount`, 'success');

            // Apply discount (simplified)
            const discountAmount = this.totalAmount * (discount / 100);
            this.totalAmount -= discountAmount;
            document.getElementById('total').textContent = this.formatPrice(this.totalAmount);

            // Disable promo input
            document.getElementById('promoCode').disabled = true;
            document.getElementById('applyPromoBtn').disabled = true;
            document.getElementById('applyPromoBtn').textContent = 'Đã áp dụng';
        } else {
            this.showToast('Invalid promo code!', 'error');
        }
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showToast('Your cart is empty!', 'error');
            return;
        }

        // Add loading animation
        const checkoutBtn = document.getElementById('checkoutBtn');
        const originalText = checkoutBtn.textContent;
        checkoutBtn.innerHTML = '<span class="loading"></span> Đang xử lý...';
        checkoutBtn.disabled = true;

        // Simulate payment processing
        setTimeout(() => {
            // Reset button
            checkoutBtn.textContent = originalText;
            checkoutBtn.disabled = false;

            // Clear cart
            this.cart = [];
            this.updateCartDisplay();

            // Reset promo code
            document.getElementById('promoCode').disabled = false;
            document.getElementById('promoCode').value = '';
            document.getElementById('applyPromoBtn').disabled = false;
            document.getElementById('applyPromoBtn').textContent = 'Apply';

            // Show success message
            this.showToast('Order placed successfully! Thank you for using FoodFlow.', 'success');

            // Navigate to order confirmation (simplified)
            this.showOrderConfirmation();
        }, 2000);
    }

    showOrderConfirmation() {
        // This would typically navigate to a new page
        // For demo purposes, we'll show a modal or alert
        setTimeout(() => {
            alert('Your order is being prepared! Estimated time: 25-30 minutes.');
        }, 1000);
    }

    toggleFavorite(foodId) {
        const food = this.foodData.find(f => f.id === foodId);
        if (!food) return;

        const heartIcon = document.querySelector(`[data-food-id="${foodId}"] .favorite-btn i`);
        const favoriteBtn = document.querySelector(`[data-food-id="${foodId}"] .favorite-btn`);

        // Get current favorites from localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavorite = favorites.some(f => f.id === foodId);

        if (isFavorite) {
            // Remove from favorites
            favorites = favorites.filter(f => f.id !== foodId);
            favoriteBtn.classList.remove('active');
            this.showToast('Removed from favorites!');
        } else {
            // Add to favorites
            favorites.push(food);
            favoriteBtn.classList.add('active');
            heartIcon.style.animation = 'successBounce 0.5s ease';
            this.showToast('Added to favorites!');
        }

        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Update favorite button states
        this.updateFavoriteButtons();
    }

    updateFavoriteButtons() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteIds = favorites.map(f => f.id);

        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const foodCard = btn.closest('[data-food-id]');
            const foodId = parseInt(foodCard.dataset.foodId);

            if (favoriteIds.includes(foodId)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    animateCartIcon() {
        const cartIcon = document.getElementById('cartIcon');
        if (cartIcon) {
            cartIcon.style.animation = 'none';
            setTimeout(() => {
                cartIcon.style.animation = 'successBounce 0.5s ease';
            }, 10);
        }
    }

    scrollToCart() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        cartSidebar.scrollIntoView({ behavior: 'smooth' });
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('successToast');
        const toastMessage = document.getElementById('toastMessage');

        toastMessage.textContent = message;

        // Change toast style based on type
        const toastHeader = toast.querySelector('.toast-header');
        if (type === 'error') {
            toastHeader.innerHTML = `
                <i class="fas fa-exclamation-circle text-danger me-2"></i>
                <strong class="me-auto">Lỗi</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            `;
        } else {
            toastHeader.innerHTML = `
                <i class="fas fa-check-circle text-success me-2"></i>
                <strong class="me-auto">Success</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            `;
        }

        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }

    initializeAnimations() {
        // Animate sidebar brand logo
        const brand = document.getElementById('brand');
        if (brand) {
            brand.addEventListener('mouseenter', () => {
                brand.style.transform = 'scale(1.05)';
            });

            brand.addEventListener('mouseleave', () => {
                brand.style.transform = 'scale(1)';
            });

            // Add click functionality to go to homepage
            brand.addEventListener('click', (e) => {
                e.preventDefault();
                // Smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

                // Add click animation
                brand.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    brand.style.transform = 'scale(1)';
                }, 150);
            });
        }

        // Initialize footer functionality
        this.initializeFooter();

        // Add scroll animations
        window.addEventListener('scroll', () => {
            this.handleScrollAnimations();
        });

        // Add page load animations
        setTimeout(() => {
            document.querySelectorAll('.category-item').forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 500);
    }

    initializeFooter() {
        // Back to top button functionality
        const backToTopBtn = document.getElementById('backToTopBtn');

        if (backToTopBtn) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            // Scroll to top functionality
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Footer category links functionality
        document.querySelectorAll('.footer-links a[data-category]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.getAttribute('data-category');

                // Update category selection
                document.querySelectorAll('.category-item').forEach(item => {
                    item.classList.remove('active');
                });

                const categoryItem = document.querySelector(`.category-item[data-category="${category}"]`);
                if (categoryItem) {
                    categoryItem.classList.add('active');
                }

                this.currentCategory = category;
                this.renderFoodGrid();

                // Scroll to food grid
                const foodGrid = document.getElementById('foodGrid');
                if (foodGrid) {
                    foodGrid.scrollIntoView({ behavior: 'smooth' });
                }

                this.showToast(`Đã lọc theo danh mục: ${this.getCategoryName(category)}`);
            });
        });

        // Newsletter subscription
        const newsletterBtn = document.querySelector('.newsletter-btn');
        if (newsletterBtn) {
            newsletterBtn.addEventListener('click', () => {
                const emailInput = document.querySelector('.newsletter-input');
                const email = emailInput.value.trim();

                if (email && this.isValidEmail(email)) {
                    this.showToast('Newsletter subscription successful!');
                    emailInput.value = '';

                    // Add success animation
                    newsletterBtn.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        newsletterBtn.style.transform = 'scale(1)';
                    }, 150);
                } else {
                    this.showToast('Vui lòng nhập email hợp lệ!', 'error');
                }
            });
        }

        // Social links hover effects
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.animation = 'successBounce 0.5s ease';
            });

            link.addEventListener('animationend', () => {
                link.style.animation = '';
            });
        });

        // Footer wave animation on scroll
        window.addEventListener('scroll', () => {
            const footerWave = document.querySelector('.footer-wave svg path');
            if (footerWave) {
                const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
                const animationSpeed = scrollPercent * 10;
                footerWave.style.animationDuration = `${5 - animationSpeed}s`;
            }
        });
    }

    getCategoryName(category) {
        const categoryNames = {
            'pizza': 'Pizza',
            'burger': 'Burger',
            'noodle': 'Mì & Phở',
            'drink': 'Đồ uống',
            'rice': 'Cơm',
            'hotpot': 'Món Ăn Nóng'
        };
        return categoryNames[category] || category;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleScrollAnimations() {
        const elements = document.querySelectorAll('.food-card');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    }

    setupSearchFunctionality() {
        const searchInput = document.getElementById('searchInput');
        const searchContainer = document.querySelector('.search-container');

        if (!searchInput || !searchContainer) return;

        // Create search dropdown
        let searchDropdown = document.getElementById('searchDropdown');
        if (!searchDropdown) {
            searchDropdown = document.createElement('div');
            searchDropdown.id = 'searchDropdown';
            searchDropdown.className = 'search-dropdown';
            searchContainer.appendChild(searchDropdown);
        }

        // Search input event listeners
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query) {
                this.showSearchSuggestions(query);
            } else {
                this.hideSearchSuggestions();
            }
        });

        searchInput.addEventListener('focus', (e) => {
            const query = e.target.value.trim();
            if (query) {
                this.showSearchSuggestions(query);
            }
        });

        // Handle Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    this.handleSearch(query);
                }
            }
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSearchSuggestions();
            }
        });
    }

    showSearchSuggestions(query) {
        const searchDropdown = document.getElementById('searchDropdown');
        if (!searchDropdown) return;

        // Filter food data based on query
        const suggestions = this.foodData.filter(food =>
            food.name.toLowerCase().includes(query.toLowerCase()) ||
            food.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);

        if (suggestions.length === 0) {
            searchDropdown.innerHTML = `
                <div class="search-item">
                    <div class="search-item-content">
                        <div class="search-item-name">Không tìm thấy kết quả</div>
                    </div>
                </div>
            `;
        } else {
            searchDropdown.innerHTML = suggestions.map(food => `
                <div class="search-item" onclick="app.selectSearchItem('${food.name.replace(/'/g, "\\'")}')">
                    <img src="${food.image}" alt="${food.name}" class="search-item-image">
                    <div class="search-item-content">
                        <div class="search-item-name">${food.name}</div>
                        <div class="search-item-price">${this.formatPrice(food.price)}</div>
                    </div>
                    <span class="search-item-category">${this.getCategoryName(food.category)}</span>
                </div>
            `).join('');
        }

        searchDropdown.classList.add('show');
    }

    hideSearchSuggestions() {
        const searchDropdown = document.getElementById('searchDropdown');
        if (searchDropdown) {
            searchDropdown.classList.remove('show');
        }
    }

    selectSearchItem(foodName) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = foodName;
        }
        this.hideSearchSuggestions();
        this.handleSearch(foodName);
    }

    handleSearch(query) {
        // Redirect to Product page with search query
        window.location.href = `Product.html?q=${encodeURIComponent(query)}`;
    } getCategoryName(category) {
        const categoryNames = {
            'pizza': 'Pizza',
            'burger': 'Burger',
            'noodle': 'Mì & Phở',
            'drink': 'Đồ uống',
            'rice': 'Cơm',
            'hotpot': 'Món Ăn Nóng'
        };
        return categoryNames[category] || category;
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('show');
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

        // Add login button event listeners
        this.setupLoginEvents();
    }

    setupLoginEvents() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');

        if (loginBtn) {
            loginBtn.removeEventListener('click', this.redirectToLogin.bind(this));
            loginBtn.addEventListener('click', this.redirectToLogin.bind(this));
        }

        if (registerBtn) {
            registerBtn.removeEventListener('click', this.redirectToRegister.bind(this));
            registerBtn.addEventListener('click', this.redirectToRegister.bind(this));
        }
    }

    redirectToLogin() {
        window.location.href = 'Login.html';
    }

    redirectToRegister() {
        window.location.href = 'Register.html';
    }

    login() {
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        this.updateLoginStatus();
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userData');
        localStorage.removeItem('rememberMe');
        this.updateLoginStatus();
    }

    handleLogout() {
        // Show confirmation dialog
        if (confirm('Are you sure you want to logout?')) {
            this.logout();
            // Show success message
            this.showToast('Logout successful!', 'success');

            // Reload page to reset to initial state
            setTimeout(() => {
                window.location.reload();
            }, 1000);
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

    handleModalLogin() {
        // Close current modal and show login
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginRequiredModal'));
        if (modal) modal.hide();
        this.showLoginModal();
    }

    // New Homepage Functionality
    initializeHomepageFeatures() {
        this.setupSearchFunctionality();
        this.setupHeroFeatures();
        this.setupCategoryNavigation();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.loadFeaturedDishes();
    }

    setupHeroFeatures() {
        // Hero search functionality
        const heroSearchInput = document.getElementById('heroSearch');
        const heroSearchBtn = document.getElementById('heroSearchBtn');

        if (heroSearchInput && heroSearchBtn) {
            const performHeroSearch = () => {
                const query = heroSearchInput.value.trim();
                if (query) {
                    // Redirect to Product page with search query
                    window.location.href = `Product.html?q=${encodeURIComponent(query)}`;
                } else {
                    this.showToast('Please enter a search keyword!', 'error');
                }
            };

            heroSearchBtn.addEventListener('click', performHeroSearch);

            heroSearchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performHeroSearch();
                }
            });

            // Add search suggestions for hero search
            heroSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 2) {
                    this.showHeroSearchSuggestions(query);
                } else {
                    this.hideHeroSearchSuggestions();
                }
            });
        }

        // Get Started button functionality
        const getStartedBtn = document.getElementById('getStarted');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                // Scroll to categories section
                const categoriesSection = document.getElementById('popular-categories');
                if (categoriesSection) {
                    categoriesSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // If not on homepage, go to product page
                    window.location.href = 'Product.html';
                }
            });
        }
    }

    showHeroSearchSuggestions(query) {
        let heroSearchDropdown = document.getElementById('heroSearchDropdown');

        if (!heroSearchDropdown) {
            heroSearchDropdown = document.createElement('div');
            heroSearchDropdown.id = 'heroSearchDropdown';
            heroSearchDropdown.className = 'search-dropdown hero-search-dropdown';

            const heroSearchContainer = document.querySelector('.hero-search');
            if (heroSearchContainer) {
                heroSearchContainer.appendChild(heroSearchDropdown);
            }
        }

        // Filter food data based on query
        const suggestions = this.foodData.filter(food =>
            food.name.toLowerCase().includes(query.toLowerCase()) ||
            food.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3);

        if (suggestions.length === 0) {
            heroSearchDropdown.innerHTML = `
                <div class="search-item">
                    <div class="search-item-content">
                        <div class="search-item-name">Không tìm thấy kết quả</div>
                    </div>
                </div>
            `;
        } else {
            heroSearchDropdown.innerHTML = suggestions.map(food => `
                <div class="search-item" onclick="app.selectHeroSearchItem('${food.name.replace(/'/g, "\\'")}')">
                    <img src="${food.image}" alt="${food.name}" class="search-item-image">
                    <div class="search-item-content">
                        <div class="search-item-name">${food.name}</div>
                        <div class="search-item-price">${this.formatPrice(food.price)}</div>
                    </div>
                </div>
            `).join('');
        }

        heroSearchDropdown.classList.add('show');
    }

    hideHeroSearchSuggestions() {
        const heroSearchDropdown = document.getElementById('heroSearchDropdown');
        if (heroSearchDropdown) {
            heroSearchDropdown.classList.remove('show');
        }
    }

    selectHeroSearchItem(foodName) {
        const heroSearchInput = document.getElementById('heroSearch');
        if (heroSearchInput) {
            heroSearchInput.value = foodName;
        }
        this.hideHeroSearchSuggestions();
        // Redirect to Product page with search query
        window.location.href = `Product.html?q=${encodeURIComponent(foodName)}`;
    }

    setupCategoryNavigation() {
        // Category cards navigation
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                if (category) {
                    // Navigate to Product page with category filter
                    window.location.href = `Product.html?category=${category}`;
                }
            });
        });

        // View all categories button
        const viewAllCategoriesBtn = document.getElementById('viewAllCategories');
        if (viewAllCategoriesBtn) {
            viewAllCategoriesBtn.addEventListener('click', () => {
                window.location.href = 'Product.html';
            });
        }
    }

    setupSmoothScrolling() {
        // Order now buttons
        document.querySelectorAll('[data-scroll-to]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('data-scroll-to');
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // If target doesn't exist, go to product page
                    window.location.href = 'Product.html';
                }
            });
        });

        // Download app buttons
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('Ứng dụng sẽ sớm được phát hành!', 'info');
            });
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe sections for animations
        document.querySelectorAll('.hero-section, .how-it-works, .popular-categories, .featured-dishes, .why-choose-us, .stats-testimonials, .download-app').forEach(section => {
            observer.observe(section);
        });

        // Counter animation for stats
        this.animateCounters();
    }

    animateCounters() {
        // Only animate counters that have data-target attribute (not hero stats)
        const counters = document.querySelectorAll('.stat-box .stat-number[data-target]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const start = 0;
                    const startTime = performance.now();

                    const updateCounter = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        const current = Math.floor(progress * target);

                        counter.textContent = current.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    };

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    loadFeaturedDishes() {
        // Load featured dishes for homepage
        const featuredContainer = document.getElementById('featuredFoodGrid');
        if (!featuredContainer) return;

        // Get top rated dishes
        const featuredDishes = this.foodData
            .filter(food => food.rating >= 4.5)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6);

        featuredContainer.innerHTML = '';

        featuredDishes.forEach((dish, index) => {
            const dishCard = this.createFeaturedDishCard(dish);
            featuredContainer.appendChild(dishCard);

            // Staggered animation
            setTimeout(() => {
                dishCard.style.opacity = '1';
                dishCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    createFeaturedDishCard(dish) {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-3 mb-4';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';

        const discountBadge = dish.discount ?
            `<span class="discount-badge">${dish.discount}% OFF</span>` : '';

        card.innerHTML = `
            <div class="featured-dish-card" onclick="app.openFoodModal(${dish.id})">
                ${discountBadge}
                <div class="dish-image">
                    <img src="${dish.image}" alt="${dish.name}">
                    <div class="dish-overlay">
                        <button class="view-info-btn" onclick="event.stopPropagation(); app.viewFoodInfo(${dish.id})" title="View details">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="dish-info">
                    <h6 class="dish-name">${dish.name}</h6>
                    <div class="dish-rating">
                        <div class="stars">${this.generateStars(dish.rating)}</div>
                        <span class="rating-value">${dish.rating}</span>
                    </div>
                    <div class="dish-price">${this.formatPrice(dish.price)}</div>
                </div>
            </div>
        `;

        return card;
    }

    // Navigation helpers
    navigateToProducts(category = null) {
        let url = 'Product.html';
        if (category) {
            url += `?category=${category}`;
        }
        window.location.href = url;
    }

    navigateToCategory(categoryName) {
        // Map category names to category codes
        const categoryMap = {
            'Pizza': 'pizza',
            'Burger': 'burger',
            'Đồ uống': 'drink',
            'Mì & Phở': 'noodle',
            'Cơm': 'rice',
            'Món Nóng': 'hotpot'
        };

        const categoryCode = categoryMap[categoryName] || categoryName.toLowerCase();
        this.navigateToProducts(categoryCode);
    }

    // Enhanced toast with different types
    showToast(message, type = 'success') {
        const toast = document.getElementById('successToast');
        const toastMessage = document.getElementById('toastMessage');

        if (!toast || !toastMessage) {
            // Create toast if it doesn't exist
            this.createToast();
            return this.showToast(message, type);
        }

        toastMessage.textContent = message;

        // Change toast style based on type
        const toastHeader = toast.querySelector('.toast-header');
        const iconClass = {
            'success': 'fas fa-check-circle text-success',
            'error': 'fas fa-exclamation-circle text-danger',
            'warning': 'fas fa-exclamation-triangle text-warning',
            'info': 'fas fa-info-circle text-info'
        }[type] || 'fas fa-check-circle text-success';

        const title = {
            'success': 'Success',
            'error': 'Error',
            'warning': 'Warning',
            'info': 'Info'
        }[type] || 'Success';

        if (toastHeader) {
            toastHeader.innerHTML = `
                <i class="${iconClass} me-2"></i>
                <strong class="me-auto">${title}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            `;
        }

        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
    }

    createToast() {
        const toastHTML = `
            <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="successToast" class="toast" role="alert">
                    <div class="toast-header">
                        <i class="fas fa-check-circle text-success me-2"></i>
                        <strong class="me-auto">Success</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body" id="toastMessage">
                        Notification
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', toastHTML);
    }

    // Hero search functionality
    handleHeroSearch() {
        const locationInput = document.getElementById('heroLocationInput');
        const foodInput = document.getElementById('heroFoodInput');

        const location = locationInput ? locationInput.value.trim() : '';
        const food = foodInput ? foodInput.value.trim() : '';

        if (!food) {
            this.showToast('Vui lòng nhập món ăn bạn muốn tìm!', 'warning');
            return;
        }

        // Navigate to product page with search query
        let url = `Product.html?q=${encodeURIComponent(food)}`;
        if (location) {
            url += `&location=${encodeURIComponent(location)}`;
        }

        window.location.href = url;
    }

    // Handle URL parameters for Product page
    handleURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q');
        const categoryFilter = urlParams.get('category');

        if (searchQuery) {
            // Perform search
            this.performSearch(searchQuery);

            // Update search input if exists
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = searchQuery;
            }
        } else if (categoryFilter) {
            // Filter by category
            this.selectCategoryByCode(categoryFilter);
        }
    }

    performSearch(query) {
        const searchResults = this.foodData.filter(food =>
            food.name.toLowerCase().includes(query.toLowerCase()) ||
            food.category.toLowerCase().includes(query.toLowerCase())
        );

        // Clear category selection
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });

        // Render search results
        this.renderFoodGrid(searchResults);

        // Show search results message
        this.showToast(`Tìm thấy ${searchResults.length} kết quả cho "${query}"`);
    }

    selectCategoryByCode(categoryCode) {
        // Find and activate category
        const categoryItem = document.querySelector(`.category-item[data-category="${categoryCode}"]`);
        if (categoryItem) {
            this.selectCategory(categoryItem);
        }
    }

    // ===== HERO CAROUSEL FUNCTIONALITY =====
    initializeHeroCarousel() {
        this.currentSlide = 0;
        this.totalSlides = 4;
        this.autoSlideInterval = null;
        this.autoSlideDelay = 4000; // 4 seconds

        // Bind carousel events
        this.bindCarouselEvents();

        // Start auto-slide
        this.startAutoSlide();

        // Pause auto-slide on hover
        const heroCarousel = document.querySelector('.hero-carousel');
        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', () => this.pauseAutoSlide());
            heroCarousel.addEventListener('mouseleave', () => this.startAutoSlide());
        }
    }

    bindCarouselEvents() {
        // Previous button
        const prevBtn = document.getElementById('heroPrevBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }

        // Next button
        const nextBtn = document.getElementById('heroNextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlide();
    }

    updateSlide() {
        // Update images
        const images = document.querySelectorAll('.hero-food-image');
        images.forEach((img, index) => {
            img.classList.toggle('active', index === this.currentSlide);
        });

        // Update indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoSlide() {
        this.pauseAutoSlide(); // Clear any existing interval
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    }

    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    // Method to add new images to carousel (for user customization)
    addCarouselImage(imageUrl, altText) {
        const track = document.getElementById('heroCarouselTrack');
        const indicators = document.getElementById('heroCarouselIndicators');

        if (!track || !indicators) return;

        // Create new image element
        const newImage = document.createElement('img');
        newImage.src = imageUrl;
        newImage.alt = altText || `Delicious Food ${this.totalSlides + 1}`;
        newImage.className = 'hero-food-image';

        // Add to track
        track.appendChild(newImage);

        // Create new indicator
        const newIndicator = document.createElement('span');
        newIndicator.className = 'indicator';
        newIndicator.setAttribute('data-slide', this.totalSlides);
        newIndicator.addEventListener('click', () => this.goToSlide(this.totalSlides));

        // Add to indicators
        indicators.appendChild(newIndicator);

        // Update total slides count
        this.totalSlides++;

        console.log(`Added new carousel image. Total slides: ${this.totalSlides}`);
    }

    // Method to remove image from carousel
    removeCarouselImage(index) {
        if (index < 0 || index >= this.totalSlides || this.totalSlides <= 1) return;

        const images = document.querySelectorAll('.hero-food-image');
        const indicators = document.querySelectorAll('.indicator');

        if (images[index]) images[index].remove();
        if (indicators[index]) indicators[index].remove();

        this.totalSlides--;

        // Adjust current slide if necessary
        if (this.currentSlide >= this.totalSlides) {
            this.currentSlide = this.totalSlides - 1;
        }

        // Re-bind indicator events
        this.bindCarouselEvents();
        this.updateSlide();

        console.log(`Removed carousel image at index ${index}. Total slides: ${this.totalSlides}`);
    }

    // Method to update carousel images array (for easy management)
    updateCarouselImages(imageArray) {
        const track = document.getElementById('heroCarouselTrack');
        const indicators = document.getElementById('heroCarouselIndicators');

        if (!track || !indicators) return;

        // Clear existing content
        track.innerHTML = '';
        indicators.innerHTML = '';

        // Add new images
        imageArray.forEach((imageData, index) => {
            // Create image element
            const img = document.createElement('img');
            img.src = imageData.url;
            img.alt = imageData.alt || `Delicious Food ${index + 1}`;
            img.className = 'hero-food-image';
            if (index === 0) img.classList.add('active');

            track.appendChild(img);

            // Create indicator
            const indicator = document.createElement('span');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('data-slide', index);
            indicator.addEventListener('click', () => this.goToSlide(index));

            indicators.appendChild(indicator);
        });

        // Update carousel state
        this.totalSlides = imageArray.length;
        this.currentSlide = 0;

        // Restart auto-slide
        this.startAutoSlide();

        console.log(`Updated carousel with ${this.totalSlides} images`);
    }
    // ===== END CAROUSEL FUNCTIONALITY =====
}



// Initialize app immediately
window.app = new GoMealApp();

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function () {
            if (!this.disabled && !this.classList.contains('no-loading')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Add hover effects to cards
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.food-card')) {
            const card = e.target.closest('.food-card');
            card.style.transform = 'translateY(-10px)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.food-card')) {
            const card = e.target.closest('.food-card');
            card.style.transform = 'translateY(0)';
        }
    });

    // Add typing effect to search placeholder
    const searchInput = document.getElementById('searchInput');
    const phrases = [
        'What do you want to eat today...',
        'Search for pizza...',
        'Search for burger...',
        'Search for drinks...',
        'Search for delicious food...'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            searchInput.placeholder = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            searchInput.placeholder = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    // Start typing effect after a delay
    setTimeout(typeEffect, 2000);

    // Initialize logo animation
    initLogoAnimation();
});

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

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.app = new GoMealApp();

    // Check if we're on the homepage or product page
    const isHomepage = window.location.pathname.includes('Homepage.html') || window.location.pathname.endsWith('/');
    const isProductPage = window.location.pathname.includes('Product.html');

    if (isHomepage) {
        // Initialize homepage-specific features
        app.initializeHomepageFeatures();
    } else if (isProductPage) {
        // Initialize product page features (existing functionality)
        app.handleURLParams();
    }

    console.log('GoMeal App initialized successfully!');
});





