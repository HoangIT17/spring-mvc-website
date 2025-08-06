// Invoice JavaScript
class InvoiceManager {
    constructor() {
        this.invoices = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadInvoices();
        this.bindEvents();
        this.displayInvoices();
    }

    loadInvoices() {
        // Check for current order from payment page
        const currentOrder = localStorage.getItem('currentOrder');
        const orderTimestamp = localStorage.getItem('orderTimestamp');
        const lastOrderId = localStorage.getItem('lastOrderId');

        if (currentOrder && orderTimestamp && lastOrderId) {
            // Parse current order data
            const orderData = JSON.parse(currentOrder);

            // Create invoice from current order
            const invoice = {
                id: lastOrderId,
                date: new Date(orderTimestamp).toLocaleDateString('vi-VN'),
                time: new Date(orderTimestamp).toLocaleTimeString('vi-VN'),
                items: orderData.items,
                delivery: orderData.delivery,
                payment: orderData.payment,
                status: orderData.status || 'confirmed',
                total: orderData.payment.total
            };

            // Check if user has completed payments
            const paidInvoices = JSON.parse(localStorage.getItem('paidInvoices')) || [];

            // Add current order to invoices if not already exists
            const existingInvoice = paidInvoices.find(inv => inv.id === lastOrderId);
            if (!existingInvoice) {
                paidInvoices.unshift(invoice); // Add to beginning of array
                localStorage.setItem('paidInvoices', JSON.stringify(paidInvoices));

                // Also save to completedOrders for Order History page
                const completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
                const orderForHistory = {
                    id: lastOrderId,
                    date: invoice.date,
                    time: invoice.time,
                    items: orderData.items,
                    delivery: orderData.delivery,
                    payment: orderData.payment,
                    status: 'completed',
                    timestamp: orderData.timestamp
                };

                const existingOrder = completedOrders.find(order => order.id === lastOrderId);
                if (!existingOrder) {
                    completedOrders.unshift(orderForHistory);
                    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
                }
            }

            // Set invoices array
            this.invoices = paidInvoices;

            // Clear current order data after processing
            localStorage.removeItem('currentOrder');
            localStorage.removeItem('orderTimestamp');
            localStorage.removeItem('lastOrderId');
        } else {
            // Only load invoices if they exist in localStorage
            const paidInvoices = JSON.parse(localStorage.getItem('paidInvoices')) || [];
            this.invoices = paidInvoices;
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

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchInvoices(e.target.value);
        });

        // Status filter
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filterByStatus(e.target.value);
        });

        // Date filter
        document.getElementById('dateFilter').addEventListener('change', (e) => {
            this.filterByDate(e.target.value);
        });

        // Modal buttons
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadInvoice();
        });

        document.getElementById('printBtn').addEventListener('click', () => {
            this.printInvoice();
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
                // Already on invoice page
                break;
            case 'Cài Đặt':
                window.location.href = 'Profile.html';
                break;
        }
    }

    displayInvoices(invoicesToShow = this.invoices) {
        const container = document.getElementById('invoicesContainer');
        const emptyState = document.getElementById('emptyInvoicesState');
        const invoicesList = document.getElementById('invoicesList');
        const searchFilter = document.getElementById('searchFilterSection');

        if (invoicesToShow.length === 0) {
            // Show empty state, hide everything else
            if (emptyState) emptyState.style.display = 'block';
            if (invoicesList) invoicesList.style.display = 'none';
            if (searchFilter) searchFilter.style.display = 'none';
            return;
        }

        // Hide empty state, show content
        if (emptyState) emptyState.style.display = 'none';
        if (invoicesList) invoicesList.style.display = 'block';
        if (searchFilter) searchFilter.style.display = 'block';

        // Clear and populate invoices list
        if (invoicesList) {
            invoicesList.innerHTML = '';
            invoicesToShow.forEach(invoice => {
                const invoiceCard = this.createInvoiceCard(invoice);
                invoicesList.appendChild(invoiceCard);
            });
        }

        // Add animation
        this.animateInvoices();
    }

    createInvoiceCard(invoice) {
        const invoiceCard = document.createElement('div');
        invoiceCard.className = 'invoice-card';
        invoiceCard.style.opacity = '0';
        invoiceCard.style.transform = 'translateY(20px)';
        invoiceCard.onclick = () => this.showInvoiceDetail(invoice.id);

        const statusClass = `status-${invoice.status}`;
        const statusText = this.getStatusText(invoice.status);

        // Format payment method
        const paymentMethodText = this.getPaymentMethodText(invoice.payment.method);

        // Get main item name for display
        const mainItem = invoice.items.length > 0 ? invoice.items[0].name : 'Không có món';
        const itemCount = invoice.items.length;
        const itemsText = itemCount > 1 ? `${mainItem} và ${itemCount - 1} món khác` : mainItem;

        invoiceCard.innerHTML = `
            <div class="invoice-header">
                <div class="invoice-info">
                    <h6>Hóa đơn ${invoice.id}</h6>
                    <div class="invoice-date">Ngày đặt: ${invoice.date} ${invoice.time}</div>
                </div>
                <div class="invoice-status ${statusClass}">${statusText}</div>
            </div>

            <div class="invoice-details">
                <div class="detail-item">
                    <div class="detail-label">Món ăn</div>
                    <div class="detail-value">${itemsText}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Địa chỉ giao hàng</div>
                    <div class="detail-value">${invoice.delivery.address}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Phương thức thanh toán</div>
                    <div class="detail-value">${paymentMethodText}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Người nhận</div>
                    <div class="detail-value">${invoice.delivery.name} - ${invoice.delivery.phone}</div>
                </div>
            </div>

            <div class="invoice-summary">
                <div class="invoice-total">${this.formatPrice(invoice.total)}</div>
                <div class="invoice-actions">
                    <button class="btn btn-outline-primary btn-sm" onclick="event.stopPropagation(); invoiceManager.showInvoiceDetail('${invoice.id}')">
                        Xem chi tiết
                    </button>
                </div>
            </div>
        `;

        return invoiceCard;
    }

    getStatusText(status) {
        const statusMap = {
            'confirmed': 'Đã xác nhận',
            'preparing': 'Đang chuẩn bị',
            'shipping': 'Đang giao hàng',
            'completed': 'Hoàn thành',
            'cancelled': 'Đã hủy'
        };
        return statusMap[status] || status;
    }

    getPaymentMethodText(method) {
        const methodMap = {
            'cod': 'Thanh toán khi nhận hàng',
            'momo': 'Ví MoMo',
            'zalopay': 'ZaloPay',
            'card': 'Thẻ tín dụng/ghi nợ'
        };
        return methodMap[method] || method;
    }

    animateInvoices() {
        const invoiceCards = document.querySelectorAll('.invoice-card');
        invoiceCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    searchInvoices(searchTerm) {
        const filteredInvoices = this.invoices.filter(invoice => {
            return invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                invoice.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                invoice.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        });

        this.displayInvoices(filteredInvoices);
    }

    filterByStatus(status) {
        let filteredInvoices = this.invoices;
        if (status !== 'all') {
            filteredInvoices = this.invoices.filter(invoice => invoice.status === status);
        }

        this.displayInvoices(filteredInvoices);
    }

    filterByDate(dateFilter) {
        // Simple date filtering - in real app would use proper date comparison
        let filteredInvoices = this.invoices;

        // For demo purposes, just show all invoices
        this.displayInvoices(filteredInvoices);
    }

    showInvoiceDetail(invoiceId) {
        const invoice = this.invoices.find(inv => inv.id === invoiceId);
        if (!invoice) return;

        const modalContent = document.getElementById('invoiceDetailContent');
        modalContent.innerHTML = this.createInvoiceDetailContent(invoice);

        const modal = new bootstrap.Modal(document.getElementById('invoiceDetailModal'));
        modal.show();
    }

    createInvoiceDetailContent(invoice) {
        return `
            <div class="invoice-detail-container">
                <div class="invoice-header-detail">
                    <div class="company-info">
                        <h3>GoMeal</h3>
                        <p>
                            Công ty TNHH GoMeal<br>
                            123 Đường ABC, Quận 1<br>
                            TP. Hồ Chí Minh, Việt Nam<br>
                            Email: support@gomeal.vn<br>
                            Điện thoại: (028) 1234 5678
                        </p>
                    </div>
                    <div class="invoice-meta">
                        <div class="invoice-number">HÓA ĐƠN ${invoice.id}</div>
                        <div class="invoice-dates">
                            <strong>Ngày đặt:</strong> ${invoice.date} ${invoice.time}<br>
                            <strong>Trạng thái:</strong> ${this.getStatusText(invoice.status)}<br>
                            <strong>Phương thức thanh toán:</strong> ${this.getPaymentMethodText(invoice.payment.method)}
                        </div>
                    </div>
                </div>

                <div class="billing-info">
                    <div class="billing-section">
                        <h6>Thông tin khách hàng</h6>
                        <p>
                            <strong>${invoice.delivery.name}</strong><br>
                            ${invoice.delivery.address}<br>
                            ${invoice.delivery.note ? `Ghi chú: ${invoice.delivery.note}<br>` : ''}
                            Điện thoại: ${invoice.delivery.phone}
                        </p>
                    </div>
                </div>

                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>Món ăn</th>
                            <th class="text-right">Số lượng</th>
                            <th class="text-right">Đơn giá</th>
                            <th class="text-right">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoice.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td class="text-right">${item.quantity}</td>
                                <td class="text-right">${this.formatPrice(item.price)}</td>
                                <td>${this.formatPrice(item.price * item.quantity)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <table class="table-totals">
                    <tr>
                        <td>Tổng tiền món ăn:</td>
                        <td class="text-right">${this.formatPrice(invoice.payment.subtotal)}</td>
                    </tr>
                    <tr>
                        <td>Phí giao hàng:</td>
                        <td class="text-right">${this.formatPrice(invoice.payment.shippingFee)}</td>
                    </tr>
                    <tr>
                        <td><strong>TỔNG CỘNG:</strong></td>
                        <td class="text-right"><strong>${this.formatPrice(invoice.payment.total)}</strong></td>
                    </tr>
                </table>

                <div class="invoice-footer">
                    <p>
                        <strong>Phương thức thanh toán:</strong> ${this.getPaymentMethodText(invoice.payment.method)}<br>
                        <strong>Trạng thái đơn hàng:</strong> ${this.getStatusText(invoice.status)}<br>
                        <em>Cảm ơn bạn đã sử dụng dịch vụ GoMeal!</em>
                    </p>
                </div>
            </div>
        `;
    }

    downloadInvoice() {
        // In a real application, this would generate and download a PDF
        this.showNotification('Chức năng tải về PDF đang được phát triển!', 'info');
    }

    printInvoice() {
        // Print the invoice
        const printContent = document.getElementById('invoiceDetailContent').innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;

        // Reinitialize after printing
        this.init();
    }

    showEmptyState() {
        const container = document.getElementById('invoicesContainer');
        container.innerHTML = `
            <div class="empty-invoices">
                <i class="fas fa-receipt"></i>
                <h5>Chưa có hóa đơn nào</h5>
                <p>Bạn chưa có hóa đơn nào. Hãy đặt món và thanh toán để xem hóa đơn!</p>
                <button class="btn btn-warning mt-3" onclick="window.location.href='Homepage.html'">
                    Đặt món ngay
                </button>
            </div>
        `;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
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
let invoiceManager;
document.addEventListener('DOMContentLoaded', function () {
    invoiceManager = new InvoiceManager();
});
