// Chat Popup Manager
class ChatPopup {
    constructor() {
        this.isOpen = false;
        this.messages = [
            {
                id: 1,
                text: "Xin chào! Tôi có thể giúp gì cho bạn?",
                type: "received",
                time: this.getCurrentTime(),
                sender: "support"
            }
        ];
        this.init();
    }

    init() {
        this.createChatElements();
        this.bindEvents();
        this.loadMessages();
    }

    createChatElements() {
        // Create chat trigger button
        const chatTrigger = document.createElement('div');
        chatTrigger.className = 'chat-popup-trigger';
        chatTrigger.id = 'chatPopupTrigger';
        chatTrigger.innerHTML = `
            <i class="fas fa-comments"></i>
            <div class="notification-dot"></div>
        `;
        document.body.appendChild(chatTrigger);

        // Create chat popup window
        const chatWindow = document.createElement('div');
        chatWindow.className = 'chat-popup-window';
        chatWindow.id = 'chatPopupWindow';
        chatWindow.innerHTML = `
            <div class="chat-popup-header">
                <div class="chat-info">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=35&h=35&fit=crop&auto=format" 
                         alt="Support" class="chat-avatar">
                    <div>
                        <div class="chat-title">FoodFlow Support</div>
                        <div class="chat-status">Đang hoạt động</div>
                    </div>
                </div>
                <button class="close-btn" id="closeChatBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="chat-popup-messages" id="chatPopupMessages">
                <div class="welcome-message">
                    <i class="fas fa-headset"></i>
                    <h6>Chào mừng đến với FoodFlow Support!</h6>
                    <p>Chúng tôi sẵn sàng hỗ trợ bạn 24/7</p>
                </div>
            </div>
            
            <div class="chat-popup-input">
                <div class="chat-input-group">
                    <input type="text" class="chat-input-field" id="chatPopupInput" 
                           placeholder="Nhập tin nhắn...">
                    <button class="chat-send-btn" id="chatPopupSendBtn">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(chatWindow);
    }

    bindEvents() {
        // Chat trigger click
        document.getElementById('chatPopupTrigger').addEventListener('click', () => {
            this.toggleChat();
        });

        // Close button click
        document.getElementById('closeChatBtn').addEventListener('click', () => {
            this.closeChat();
        });

        // Send message
        document.getElementById('chatPopupSendBtn').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send
        document.getElementById('chatPopupInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Click outside to close
        document.addEventListener('click', (e) => {
            const chatWindow = document.getElementById('chatPopupWindow');
            const chatTrigger = document.getElementById('chatPopupTrigger');

            if (this.isOpen &&
                !chatWindow.contains(e.target) &&
                !chatTrigger.contains(e.target)) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const chatWindow = document.getElementById('chatPopupWindow');
        const chatTrigger = document.getElementById('chatPopupTrigger');

        chatWindow.classList.add('show');
        chatTrigger.style.transform = 'scale(0.9)';
        this.isOpen = true;

        // Hide notification dot
        const notificationDot = chatTrigger.querySelector('.notification-dot');
        if (notificationDot) {
            notificationDot.style.display = 'none';
        }

        // Focus input
        setTimeout(() => {
            document.getElementById('chatPopupInput').focus();
        }, 300);

        // Scroll to bottom
        this.scrollToBottom();
    }

    closeChat() {
        const chatWindow = document.getElementById('chatPopupWindow');
        const chatTrigger = document.getElementById('chatPopupTrigger');

        chatWindow.classList.remove('show');
        chatTrigger.style.transform = 'scale(1)';
        this.isOpen = false;
    }

    sendMessage() {
        const input = document.getElementById('chatPopupInput');
        const text = input.value.trim();

        if (!text) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: text,
            type: 'sent',
            time: this.getCurrentTime(),
            sender: 'user'
        };

        this.messages.push(userMessage);
        this.renderMessage(userMessage);

        // Clear input
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateBotResponse(text);
        }, 1000 + Math.random() * 2000);

        this.scrollToBottom();
    }

    generateBotResponse(userMessage) {
        const responses = this.getBotResponses(userMessage.toLowerCase());
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        const botMessage = {
            id: Date.now(),
            text: randomResponse,
            type: 'received',
            time: this.getCurrentTime(),
            sender: 'support'
        };

        this.messages.push(botMessage);
        this.renderMessage(botMessage);
        this.scrollToBottom();
    }

    getBotResponses(message) {
        // Order related
        if (message.includes('đơn hàng') || message.includes('order')) {
            return [
                "Bạn có thể kiểm tra trạng thái đơn hàng trong mục 'Order History' hoặc cung cấp mã đơn hàng để tôi hỗ trợ.",
                "Để hỗ trợ về đơn hàng, vui lòng cung cấp mã đơn hàng hoặc số điện thoại đặt hàng.",
                "Tôi có thể giúp bạn kiểm tra đơn hàng. Vui lòng cho tôi biết mã đơn hàng."
            ];
        }

        // Delivery related
        if (message.includes('giao hàng') || message.includes('delivery') || message.includes('ship')) {
            return [
                "Thời gian giao hàng thông thường là 30-45 phút. Bạn có thể theo dõi shipper trên bản đồ.",
                "Chúng tôi giao hàng 24/7. Phí ship được tính dựa trên khoảng cách và khuyến mãi hiện có.",
                "Đơn hàng của bạn sẽ được giao trong vòng 30-45 phút. Bạn sẽ nhận được thông báo khi shipper đang trên đường."
            ];
        }

        // Payment related
        if (message.includes('thanh toán') || message.includes('payment') || message.includes('pay')) {
            return [
                "Chúng tôi hỗ trợ thanh toán bằng tiền mặt, thẻ, MoMo, ZaloPay và chuyển khoản ngân hàng.",
                "Bạn có thể thanh toán khi nhận hàng hoặc thanh toán online qua ví điện tử.",
                "Nếu có vấn đề về thanh toán, vui lòng cung cấp thông tin giao dịch để tôi hỗ trợ."
            ];
        }

        // Menu related
        if (message.includes('menu') || message.includes('món ăn') || message.includes('food')) {
            return [
                "Bạn có thể xem menu đầy đủ tại trang Products. Chúng tôi có pizza, burger, noodles, rice và đồ uống.",
                "Menu được cập nhật thường xuyên với nhiều món ngon. Bạn tìm món gì cụ thể?",
                "Chúng tôi có hơn 100+ món ăn đa dạng. Bạn có thể lọc theo danh mục hoặc tìm kiếm món yêu thích."
            ];
        }

        // Promotion related
        if (message.includes('khuyến mãi') || message.includes('giảm giá') || message.includes('promotion')) {
            return [
                "Hiện tại chúng tôi có mã WELCOME20 (giảm 20%), FREESHIP (miễn phí ship), SAVE50K (giảm 50k cho đơn từ 200k).",
                "Bạn có thể kiểm tra khuyến mãi mới nhất trong giỏ hàng hoặc theo dõi fanpage để cập nhật ưu đãi.",
                "Mã giảm giá được cập nhật hàng tuần. Đăng ký nhận thông báo để không bỏ lỡ ưu đãi!"
            ];
        }

        // Greeting
        if (message.includes('hello') || message.includes('hi') || message.includes('chào')) {
            return [
                "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
                "Chào bạn! Bạn cần hỗ trợ về vấn đề gì?",
                "Hi! Tôi là FoodFlow Support, sẵn sàng hỗ trợ bạn 24/7."
            ];
        }

        // Default responses
        return [
            "Cảm ơn bạn đã liên hệ! Tôi sẽ chuyển cho chuyên viên để hỗ trợ chi tiết hơn.",
            "Để hỗ trợ tốt nhất, bạn có thể gọi hotline 1900-xxxx hoặc mô tả chi tiết vấn đề.",
            "Tôi đã ghi nhận yêu cầu của bạn. Đội ngũ hỗ trợ sẽ liên hệ trong thời gian sớm nhất.",
            "Bạn có thể mô tả rõ hơn để tôi hỗ trợ chính xác nhất? Hoặc chọn chủ đề: Đơn hàng, Giao hàng, Thanh toán, Menu."
        ];
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatPopupMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'popup-message received typing-indicator show';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="popup-message-content">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    renderMessage(message) {
        const messagesContainer = document.getElementById('chatPopupMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `popup-message ${message.type}`;

        messageDiv.innerHTML = `
            <div class="popup-message-content">
                ${message.text}
                <div class="popup-message-time">${message.time}</div>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
    }

    loadMessages() {
        const messagesContainer = document.getElementById('chatPopupMessages');

        this.messages.forEach(message => {
            this.renderMessage(message);
        });

        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            const messagesContainer = document.getElementById('chatPopupMessages');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 100);
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    // Show notification on new message
    showNotification() {
        const chatTrigger = document.getElementById('chatPopupTrigger');
        const notificationDot = chatTrigger.querySelector('.notification-dot');

        if (!this.isOpen && notificationDot) {
            notificationDot.style.display = 'block';
        }
    }
}

// Initialize chat popup when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Only initialize on pages that should have chat (not login/register pages)
    const excludePages = ['Login.html', 'Register.html', 'ForgotPassword.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (!excludePages.includes(currentPage)) {
        window.chatPopup = new ChatPopup();
        console.log('Chat popup initialized');
    }
});

// Export for global access
window.ChatPopup = ChatPopup;
