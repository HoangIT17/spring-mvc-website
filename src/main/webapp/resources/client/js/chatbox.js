// Chatbox JavaScript
class ChatboxManager {
    constructor() {
        this.currentChat = 'gomeal-support';
        this.messages = {};
        this.init();
    }

    init() {
        this.loadMessages();
        this.bindEvents();
        this.initializeScrolling();
    }

    loadMessages() {
        // Sample chat data
        this.messages = {
            'gomeal-support': [
                {
                    type: 'received',
                    text: 'Chào bạn, chúng tôi có thể giúp gì cho bạn?',
                    time: '10:30 AM',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&auto=format'
                },
                {
                    type: 'sent',
                    text: 'Chào bạn, tôi đang có vấn đề với đơn hàng gần nhất của tôi',
                    time: '10:32 AM'
                },
                {
                    type: 'received',
                    text: 'Rất tiếc khi nghe điều đó. Bạn có thể cho tôi biết mã đơn hàng không?',
                    time: '10:33 AM',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&auto=format'
                },
                {
                    type: 'sent',
                    text: 'Đơn hàng #GO-123456',
                    time: '10:34 AM'
                },
                {
                    type: 'received',
                    text: 'Cảm ơn bạn. Tôi đang kiểm tra đơn hàng của bạn. Vui lòng đợi trong giây lát.',
                    time: '10:35 AM',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&auto=format'
                },
                {
                    type: 'received',
                    text: 'Tôi thấy rằng đơn hàng của bạn bị trì hoãn do thời tiết xấu. Chúng tôi xin lỗi vì sự bất tiện này. Nhà hàng đang chuẩn bị đơn hàng của bạn và sẽ giao trong vòng 15 phút nữa.',
                    time: '10:38 AM',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&auto=format'
                }
            ],
            'pizza-express': [
                {
                    type: 'received',
                    text: 'Xin chào! Cảm ơn bạn đã đặt hàng tại Pizza Express.',
                    time: 'Hôm qua',
                    avatar: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=32&h=32&fit=crop&auto=format'
                },
                {
                    type: 'received',
                    text: 'Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị.',
                    time: 'Hôm qua',
                    avatar: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=32&h=32&fit=crop&auto=format'
                }
            ],
            'burger-king': [
                {
                    type: 'received',
                    text: 'Cảm ơn bạn đã đặt hàng tại Burger King!',
                    time: '22:06',
                    avatar: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=32&h=32&fit=crop&auto=format'
                },
                {
                    type: 'received',
                    text: 'Đơn hàng của bạn đã được giao thành công. Chúc bạn ngon miệng!',
                    time: '22:30',
                    avatar: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=32&h=32&fit=crop&auto=format'
                }
            ]
        };
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

        // Chat item clicks
        document.querySelectorAll('.chat-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const chatId = e.currentTarget.getAttribute('data-chat');
                this.switchChat(chatId);
            });
        });

        // Tab clicks
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.currentTarget.getAttribute('data-tab'));
            });
        });

        // Send message
        document.getElementById('sendBtn').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key to send message
        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Auto-response simulation
        this.setupAutoResponse();
    }

    switchChat(chatId) {
        // Update active chat item
        document.querySelectorAll('.chat-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-chat="${chatId}"]`).classList.add('active');

        // Update current chat
        this.currentChat = chatId;

        // Load chat messages
        this.loadChatMessages(chatId);

        // Update chat header
        this.updateChatHeader(chatId);

        // Remove unread badge
        const chatItem = document.querySelector(`[data-chat="${chatId}"]`);
        const unreadBadge = chatItem.querySelector('.unread-badge');
        if (unreadBadge) {
            unreadBadge.remove();
        }
    }

    loadChatMessages(chatId) {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.innerHTML = '';

        const messages = this.messages[chatId] || [];

        messages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            messagesContainer.appendChild(messageElement);
        });

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;

        let messageHTML = '';

        if (message.type === 'received') {
            messageHTML = `
                <div class="message-avatar">
                    <img src="${message.avatar}" alt="Avatar">
                </div>
                <div class="message-content">
                    <div class="message-text">${message.text}</div>
                    <div class="message-time">${message.time}</div>
                </div>
            `;
        } else {
            messageHTML = `
                <div class="message-content">
                    <div class="message-text">${message.text}</div>
                    <div class="message-time">${message.time}</div>
                </div>
            `;
        }

        messageDiv.innerHTML = messageHTML;
        return messageDiv;
    }

    updateChatHeader(chatId) {
        const chatNames = {
            'gomeal-support': 'GoMeal Hỗ Trợ',
            'pizza-express': 'Nhà Hàng Pizza Express',
            'burger-king': 'Burger King'
        };

        const chatAvatars = {
            'gomeal-support': 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&auto=format',
            'pizza-express': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=40&h=40&fit=crop&auto=format',
            'burger-king': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=40&h=40&fit=crop&auto=format'
        };

        const headerImg = document.querySelector('.chat-window-header img');
        const headerName = document.querySelector('.chat-window-header h6');

        if (headerImg && headerName) {
            headerImg.src = chatAvatars[chatId];
            headerName.textContent = chatNames[chatId];
        }
    }

    switchTab(tab) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Filter chat list based on tab
        this.filterChatList(tab);
    }

    filterChatList(filter) {
        const chatItems = document.querySelectorAll('.chat-item');

        chatItems.forEach(item => {
            switch (filter) {
                case 'all':
                    item.style.display = 'flex';
                    break;
                case 'unread':
                    const hasUnread = item.querySelector('.unread-badge');
                    item.style.display = hasUnread ? 'flex' : 'none';
                    break;
                case 'support':
                    const isSupport = item.getAttribute('data-chat') === 'gomeal-support';
                    item.style.display = isSupport ? 'flex' : 'none';
                    break;
            }
        });
    }

    sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const messageText = messageInput.value.trim();

        if (messageText === '') return;

        // Create message object
        const message = {
            type: 'sent',
            text: messageText,
            time: this.getCurrentTime()
        };

        // Add message to current chat
        if (!this.messages[this.currentChat]) {
            this.messages[this.currentChat] = [];
        }
        this.messages[this.currentChat].push(message);

        // Create and append message element
        const messageElement = this.createMessageElement(message);
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.appendChild(messageElement);

        // Clear input
        messageInput.value = '';

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Trigger auto-response after a delay
        setTimeout(() => {
            this.triggerAutoResponse();
        }, 1000 + Math.random() * 2000);
    }

    setupAutoResponse() {
        this.autoResponses = {
            'gomeal-support': [
                'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ hỗ trợ bạn ngay.',
                'Vui lòng cung cấp thêm thông tin để chúng tôi có thể hỗ trợ tốt hơn.',
                'Chúng tôi đã ghi nhận yêu cầu của bạn và sẽ xử lý trong thời gian sớm nhất.',
                'Có gì khác tôi có thể giúp bạn không?'
            ],
            'pizza-express': [
                'Cảm ơn bạn đã liên hệ với Pizza Express!',
                'Chúng tôi sẽ kiểm tra và phản hồi bạn sớm nhất.',
                'Đơn hàng của bạn đang được xử lý.'
            ],
            'burger-king': [
                'Xin chào! Cảm ơn bạn đã chọn Burger King.',
                'Chúng tôi luôn sẵn sàng phục vụ bạn.',
                'Bạn có cần hỗ trợ gì thêm không?'
            ]
        };
    }

    triggerAutoResponse() {
        if (this.currentChat === 'gomeal-support') {
            const responses = this.autoResponses[this.currentChat];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const autoMessage = {
                type: 'received',
                text: randomResponse,
                time: this.getCurrentTime(),
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&auto=format'
            };

            // Add to messages
            this.messages[this.currentChat].push(autoMessage);

            // Create and append message element
            const messageElement = this.createMessageElement(autoMessage);
            const messagesContainer = document.getElementById('chatMessages');
            messagesContainer.appendChild(messageElement);

            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    initializeScrolling() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
    new ChatboxManager();
});

// Handle search functionality
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase();
            const chatItems = document.querySelectorAll('.chat-item');

            chatItems.forEach(item => {
                const chatName = item.querySelector('.chat-name').textContent.toLowerCase();
                const chatMessage = item.querySelector('.chat-message').textContent.toLowerCase();

                if (chatName.includes(searchTerm) || chatMessage.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});
