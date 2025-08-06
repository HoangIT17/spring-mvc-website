// Order History JavaScript
class OrderManager {
    constructor() {
        this.orders = [];
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.ordersPerPage = 5;
        this.init();
    }

    init() {
        this.loadOrders();
        this.bindEvents();
        this.displayOrders();
    }

    loadOrders() {
        // Load completed orders from localStorage
        const completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];

        // Transform data to match order card format
        this.orders = completedOrders.map(order => ({
            id: order.id,
            date: order.date,
            time: order.time,
            items: order.items || [],
            delivery: order.delivery,
            payment: order.payment,
            status: order.status || 'completed',
            timestamp: order.timestamp,
            restaurant: 'FoodFlow Restaurant', // Default restaurant name
            total: order.payment?.total || 0
        }));

        console.log('📋 Loaded orders:', this.orders);
    }

    bindEvents() {
        // Sidebar logo click
        const sidebarLogo = document.getElementById('brand');
        if (sidebarLogo) {
            sidebarLogo.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'Homepage.html';
            });
        }

        // Tab filters
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const status = e.currentTarget.getAttribute('data-status');
                this.filterOrders(status);
            });
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchOrders(e.target.value);
        });

        // Date filter
        document.getElementById('dateFilter').addEventListener('change', (e) => {
            this.filterByDate(e.target.value);
        });

        // Reorder button in modal
        document.getElementById('reorderBtn').addEventListener('click', () => {
            this.reorderItems();
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
                // Already on order page
                break;
            case 'Hóa Đơn':
                window.location.href = 'Invoice.html';
                break;
            case 'Cài Đặt':
                window.location.href = 'Profile.html';
                break;
        }
    }

    displayOrders(ordersToShow = this.orders) {
        const container = document.getElementById('ordersContainer');
        const emptyState = document.getElementById('emptyOrdersState');
        const ordersList = document.getElementById('ordersList');
        const searchFilter = document.getElementById('searchFilterSection');
        const orderTabs = document.getElementById('orderTabsSection');
        const pagination = document.getElementById('paginationContainer');

        if (ordersToShow.length === 0) {
            // Show empty state, hide everything else
            if (emptyState) emptyState.style.display = 'block';
            if (ordersList) ordersList.style.display = 'none';
            if (searchFilter) searchFilter.style.display = 'none';
            if (orderTabs) orderTabs.style.display = 'none';
            if (pagination) pagination.style.display = 'none';
            return;
        }

        // Hide empty state, show content
        if (emptyState) emptyState.style.display = 'none';
        if (ordersList) ordersList.style.display = 'block';
        if (searchFilter) searchFilter.style.display = 'block';
        if (orderTabs) orderTabs.style.display = 'block';
        if (pagination) pagination.style.display = 'block';

        // Clear and populate orders list
        if (ordersList) {
            ordersList.innerHTML = '';
            ordersToShow.forEach(order => {
                const orderCard = this.createOrderCard(order);
                ordersList.appendChild(orderCard);
            });
        }

        // Add animation
        this.animateOrders();
    }

    createOrderCard(order) {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.style.opacity = '0';
        orderCard.style.transform = 'translateY(20px)';

        const statusClass = `status-${order.status}`;
        const statusText = this.getStatusText(order.status);

        // Ensure items array exists and has valid data
        const items = order.items || [];
        const itemsHtml = items.length > 0 ? items.map(item => `
            <div class="order-item">
                <img src="${item.image || '../images/default-food.svg'}" alt="${item.name}" class="item-image" 
                     onerror="this.src='../images/default-food.svg'">
                <div class="item-details">
                    <div class="item-name">${item.name || 'Unknown Item'}</div>
                    <div class="item-info">Quantity: ${item.quantity || 1}</div>
                </div>
                <div class="item-price">${this.formatPrice((item.price || 0) * (item.quantity || 1))}</div>
            </div>
        `).join('') : '<div class="text-muted">No items found</div>';

        orderCard.innerHTML = `
            <div class="order-header">
                <div class="order-info">
                    <h6>${order.restaurant || 'FoodFlow Restaurant'}</h6>
                    <div class="order-date">Order ID: ${order.id} • ${order.date} • ${order.time}</div>
                </div>
                <div class="order-status ${statusClass}">${statusText}</div>
            </div>

            <div class="order-items">
                ${itemsHtml}
            </div>

            <div class="order-summary">
                <div class="order-total">${this.formatPrice(order.total || order.payment?.total || 0)}</div>
                <div class="order-actions">
                    <button class="btn btn-outline-warning btn-sm" onclick="orderManager.showOrderDetail('${order.id}')">
                        View Details
                    </button>
                    ${order.status === 'completed' ? `
                        <button class="btn btn-warning btn-sm" onclick="orderManager.reorderFromCard('${order.id}')">
                            Reorder
                        </button>
                    ` : ''}
                </div>
            </div>
        `;

        return orderCard;
    }

    getStatusText(status) {
        const statusMap = {
            'completed': 'Completed',
            'pending': 'Processing',
            'processing': 'Processing',
            'cancelled': 'Cancelled'
        };
        return statusMap[status] || status;
    }

    animateOrders() {
        const orderCards = document.querySelectorAll('.order-card');
        orderCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    filterOrders(status) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-status="${status}"]`).classList.add('active');

        this.currentFilter = status;

        let filteredOrders = this.orders;
        if (status !== 'all') {
            filteredOrders = this.orders.filter(order => order.status === status);
        }

        this.displayOrders(filteredOrders);
    }

    searchOrders(searchTerm) {
        const filteredOrders = this.orders.filter(order => {
            return order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        });

        this.displayOrders(filteredOrders);
    }

    filterByDate(dateFilter) {
        // Simple date filtering - in real app would use proper date comparison
        let filteredOrders = this.orders;

        // For demo purposes, just show all orders
        this.displayOrders(filteredOrders);
    }

    showOrderDetail(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        // Store current order ID for reorder functionality
        this.currentOrderId = orderId;

        const modalContent = document.getElementById('orderDetailContent');
        modalContent.innerHTML = this.createOrderDetailContent(order);

        const modal = new bootstrap.Modal(document.getElementById('orderDetailModal'));
        modal.show();
    }

    createOrderDetailContent(order) {
        const delivery = order.delivery || {};
        const payment = order.payment || {};
        const items = order.items || [];

        return `
            <div class="order-detail-section">
                <h6>Order Information</h6>
                <div class="detail-row">
                    <span>Order ID:</span>
                    <span>${order.id}</span>
                </div>
                <div class="detail-row">
                    <span>Date:</span>
                    <span>${order.date} at ${order.time}</span>
                </div>
                <div class="detail-row">
                    <span>Restaurant:</span>
                    <span>${order.restaurant || 'FoodFlow Restaurant'}</span>
                </div>
                <div class="detail-row">
                    <span>Status:</span>
                    <span class="order-status status-${order.status}">${this.getStatusText(order.status)}</span>
                </div>
                <div class="detail-row">
                    <span>Delivery Address:</span>
                    <span>${delivery.address || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span>Customer Name:</span>
                    <span>${delivery.name || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span>Phone:</span>
                    <span>${delivery.phone || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span>Payment Method:</span>
                    <span>${payment.method === 'cod' ? 'Cash on Delivery' : payment.method || 'N/A'}</span>
                </div>
                ${delivery.note ? `
                <div class="detail-row">
                    <span>Note:</span>
                    <span>${delivery.note}</span>
                </div>
                ` : ''}
            </div>

            <div class="order-detail-section">
                <h6>Order Items</h6>
                ${items.length > 0 ? items.map(item => `
                    <div class="order-item">
                        <img src="${item.image || '../images/default-food.svg'}" alt="${item.name}" class="item-image"
                             onerror="this.src='../images/default-food.svg'">
                        <div class="item-details">
                            <div class="item-name">${item.name || 'Unknown Item'}</div>
                            <div class="item-info">Quantity: ${item.quantity || 1}</div>
                            ${item.specialNotes ? `<div class="item-info text-muted">Note: ${item.specialNotes}</div>` : ''}
                        </div>
                        <div class="item-price">${this.formatPrice((item.price || 0) * (item.quantity || 1))}</div>
                    </div>
                `).join('') : '<div class="text-muted">No items found</div>'}
            </div>

            <div class="order-detail-section">
                <h6>Payment Summary</h6>
                <div class="detail-row">
                    <span>Subtotal:</span>
                    <span>${this.formatPrice(payment.subtotal || 0)}</span>
                </div>
                <div class="detail-row">
                    <span>Delivery Fee:</span>
                    <span>${this.formatPrice(payment.shippingFee || 0)}</span>
                </div>
                <div class="detail-row">
                    <span><strong>Total:</strong></span>
                    <span><strong>${this.formatPrice(payment.total || order.total || 0)}</strong></span>
                </div>
            </div>
        `;
    }

    reorderFromCard(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) {
            this.showNotification('Order not found!', 'error');
            return;
        }

        // Get existing cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let addedItemsCount = 0;

        // Add each item from the order to cart
        order.items.forEach(item => {
            // Create cart item with unique ID
            const cartItemId = 'item_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
            const cartItem = {
                id: item.id || Date.now(), // Use existing ID or generate one
                cartItemId: cartItemId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image || '../images/default-food.svg',
                category: item.category || 'food',
                rating: item.rating || 4.5
            };

            // Add special notes if available
            if (item.specialNotes) {
                cartItem.specialNotes = item.specialNotes;
            }

            cart.push(cartItem);
            addedItemsCount++;
            console.log(`✅ Added ${item.name} x${item.quantity} to cart`);
        });

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem('cartCount', totalItems.toString());

        // Update cart badge if exists
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        this.showNotification(`Added ${addedItemsCount} items to cart successfully!`, 'success');

        // Redirect to cart page after a short delay
        setTimeout(() => {
            window.location.href = 'Cart.html';
        }, 1500);
    }

    reorderItems() {
        if (!this.currentOrderId) {
            this.showNotification('No order selected!', 'error');
            return;
        }

        const order = this.orders.find(o => o.id === this.currentOrderId);
        if (!order) {
            this.showNotification('Order not found!', 'error');
            return;
        }

        // Get existing cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let addedItemsCount = 0;

        // Add each item from the order to cart
        order.items.forEach(item => {
            // Create cart item with unique ID
            const cartItemId = 'item_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
            const cartItem = {
                id: item.id || Date.now(), // Use existing ID or generate one
                cartItemId: cartItemId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image || '../images/default-food.svg',
                category: item.category || 'food',
                rating: item.rating || 4.5
            };

            // Add special notes if available
            if (item.specialNotes) {
                cartItem.specialNotes = item.specialNotes;
            }

            cart.push(cartItem);
            addedItemsCount++;
            console.log(`✅ Added ${item.name} x${item.quantity} to cart`);
        });

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem('cartCount', totalItems.toString());

        // Update cart badge if exists
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        this.showNotification(`Added ${addedItemsCount} items to cart successfully!`, 'success');

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('orderDetailModal'));
        if (modal) {
            modal.hide();
        }

        // Redirect to cart page after a short delay
        setTimeout(() => {
            window.location.href = 'Cart.html';
        }, 1500);
    }

    showEmptyState() {
        const container = document.getElementById('ordersContainer');
        container.innerHTML = `
            <div class="empty-orders">
                <i class="fas fa-receipt"></i>
                <h5>Chưa có đơn hàng nào</h5>
                <p>Bạn chưa đặt món ăn nào. Hãy khám phá và đặt món yêu thích!</p>
                <button class="btn btn-warning mt-3" onclick="window.location.href='Homepage.html'">
                    Đặt món ngay
                </button>
            </div>
        `;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
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
let orderManager;
document.addEventListener('DOMContentLoaded', function () {
    orderManager = new OrderManager();
});
