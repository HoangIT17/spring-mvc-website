<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
            <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Thank You - Order Confirmed | FoodFlow</title>

                    <!-- Google Web Fonts -->
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap"
                        rel="stylesheet">

                    <!-- Icon Font Stylesheet -->
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
                        rel="stylesheet">

                    <!-- Libraries Stylesheet -->
                    <link href="/client/lib/lightbox/css/lightbox.min.css" rel="stylesheet">
                    <link href="/client/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">

                    <!-- Template Stylesheet -->
                    <link href="/client/css/bootstrap.min.css" rel="stylesheet">
                    <link href="/client/css/style.css" rel="stylesheet">

                    <!-- Custom Stylesheets -->
                    <link rel="stylesheet" href="/client/css/homepage.css">
                    <link rel="stylesheet" href="/client/css/homepage-new.css">
                    <link rel="stylesheet" href="/client/css/homepage-mobile.css">
                    <link rel="stylesheet" href="/client/css/advanced-modal.css">
                    <link rel="stylesheet" href="/client/css/user-dropdown.css">
                    <link rel="stylesheet" href="/client/css/chat-popup.css">

                </head>

                <body>

                    <!-- Navigation -->
                    <jsp:include page="../layout/navnew.jsp" />
                    <!-- Sidebar -->
                    <jsp:include page="../layout/sidebar.jsp" />
                    <!-- Main Content -->

                    <!-- Thank You Page Start -->
                    <div class="container-fluid thank-you-wrapper">
                        <!-- Hero Section -->
                        <div class="hero-section text-center">
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-lg-8">
                                        <!-- Success Animation -->
                                        <div class="success-animation-wrapper mb-4">
                                            <div class="success-pulse"></div>
                                            <div class="success-checkmark">
                                                <div class="check-icon">
                                                    <span class="icon-line line-tip"></span>
                                                    <span class="icon-line line-long"></span>
                                                    <div class="icon-circle"></div>
                                                    <div class="icon-fix"></div>
                                                </div>
                                            </div>
                                            <div class="success-confetti">
                                                <div class="confetti-piece"></div>
                                                <div class="confetti-piece"></div>
                                                <div class="confetti-piece"></div>
                                                <div class="confetti-piece"></div>
                                                <div class="confetti-piece"></div>
                                            </div>
                                        </div>

                                        <!-- Main Message -->
                                        <div class="hero-content">
                                            <h1 class="hero-title mb-3">Order Confirmed!</h1>
                                            <p class="hero-subtitle mb-4">Your delicious food is on its way</p>
                                            <div class="order-number-card">
                                                <span class="order-label">Order Number:</span>
                                                <span class="order-number">${order.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Status Timeline -->
                        <!-- <div class="timeline-section">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-10">
                                    <div class="status-timeline">
                                        <div class="timeline-item completed">
                                            <div class="timeline-icon">
                                                <i class="fas fa-check"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <h6>Order Placed</h6>
                                                <span>Just now</span>
                                            </div>
                                        </div>
                                        <div class="timeline-line active"></div>
                                        <div class="timeline-item active">
                                            <div class="timeline-icon">
                                                <i class="fas fa-utensils"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <h6>Preparing</h6>
                                                <span>5-10 min</span>
                                            </div>
                                        </div>
                                        <div class="timeline-line"></div>
                                        <div class="timeline-item">
                                            <div class="timeline-icon">
                                                <i class="fas fa-motorcycle"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <h6>On the way</h6>
                                                <span>15-20 min</span>
                                            </div>
                                        </div>
                                        <div class="timeline-line"></div>
                                        <div class="timeline-item">
                                            <div class="timeline-icon">
                                                <i class="fas fa-home"></i>
                                            </div>
                                            <div class="timeline-content">
                                                <h6>Delivered</h6>
                                                <span>20-30 min</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                        <!-- Details Cards Section -->
                        <div class="details-section">
                            <div class="container">
                                <div class="row g-4">
                                    <!-- Delivery Info Card -->
                                    <div class="col-lg-4">
                                        <div class="detail-card delivery-card">
                                            <div class="card-icon">
                                                <i class="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div class="card-content">
                                                <h5>Delivery Info</h5>
                                                <p>Standard delivery to your location</p>
                                                <div class="delivery-time">
                                                    <i class="fas fa-clock text-warning"></i>
                                                    <span>20-30 minutes</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Payment Info Card -->
                                    <div class="col-lg-4">
                                        <div class="detail-card payment-card">
                                            <div class="card-icon">
                                                <i class="fas fa-credit-card"></i>
                                            </div>
                                            <div class="card-content">
                                                <h5>Payment Method</h5>
                                                <p>Cash on Delivery (COD)</p>
                                                <div class="payment-status">
                                                    <span class="status-badge pending">Payment Pending</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Support Card -->
                                    <div class="col-lg-4">
                                        <div class="detail-card support-card">
                                            <div class="card-icon">
                                                <i class="fas fa-headset"></i>
                                            </div>
                                            <div class="card-content">
                                                <h5>Need Help?</h5>
                                                <p>Our support team is ready</p>
                                                <div class="support-actions">
                                                    <a href="tel:+84123456789" class="support-btn">
                                                        <i class="fas fa-phone"></i>Call
                                                    </a>
                                                    <a href="#" class="support-btn">
                                                        <i class="fas fa-comments"></i>Chat
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons Section -->
                        <div class="actions-section">
                            <div class="container">
                                <div class="row justify-content-center">
                                    <div class="col-lg-6">
                                        <div class="action-buttons">
                                            <button class="btn-primary-custom" onclick="window.location.href='/'">
                                                <i class="fas fa-utensils"></i>
                                                <span>Continue Shopping</span>
                                            </button>
                                            <button class="btn-secondary-custom"
                                                onclick="window.location.href='/order-history'">
                                                <i class="fas fa-receipt"></i>
                                                <span>Track Order</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Thank You Page End -->

                    <jsp:include page="../layout/footer.jsp" />


                    <!-- JavaScript Libraries -->
                    <script src="/client/lib/jquery/jquery.min.js"></script>
                    <script src="/client/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
                    <script src="/client/lib/lightbox/js/lightbox.min.js"></script>
                    <script src="/client/lib/owlcarousel/owl.carousel.min.js"></script>
                    <script src="/client/js/main.js"></script>

                    <!-- Custom CSS for Thank You Page -->
                    <style>
                        /* Modern Thank You Page Design */
                        .thank-you-wrapper {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            min-height: 100vh;
                            padding: 0;
                            margin: 0;
                        }

                        /* Hero Section */
                        .hero-section {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            padding: 80px 0 60px 0;
                            color: white;
                            position: relative;
                            overflow: hidden;
                        }

                        .hero-section::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
                            opacity: 0.3;
                        }

                        /* Success Animation Enhanced */
                        .success-animation-wrapper {
                            position: relative;
                            display: inline-block;
                        }

                        .success-pulse {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 120px;
                            height: 120px;
                            border: 2px solid rgba(255, 255, 255, 0.3);
                            border-radius: 50%;
                            animation: pulse 2s infinite;
                        }

                        .success-checkmark {
                            width: 100px;
                            height: 100px;
                            border-radius: 50%;
                            display: inline-block;
                            stroke-width: 3;
                            stroke: #fff;
                            stroke-miterlimit: 10;
                            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
                            animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
                            background: rgba(255, 255, 255, 0.1);
                        }

                        .success-checkmark .check-icon {
                            width: 70px;
                            height: 70px;
                            position: relative;
                            border-radius: 50%;
                            box-sizing: content-box;
                            border: 4px solid #fff;
                            margin: 11px auto;
                        }

                        .success-checkmark .icon-line {
                            height: 4px;
                            background-color: #fff;
                            display: block;
                            border-radius: 2px;
                            position: absolute;
                            z-index: 10;
                        }

                        .success-checkmark .icon-line.line-tip {
                            top: 35px;
                            left: 15px;
                            width: 20px;
                            transform: rotate(45deg);
                            animation: icon-line-tip 0.75s;
                        }

                        .success-checkmark .icon-line.line-long {
                            top: 30px;
                            right: 10px;
                            width: 35px;
                            transform: rotate(-45deg);
                            animation: icon-line-long 0.75s;
                        }

                        /* Confetti Animation */
                        .success-confetti {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                        }

                        .confetti-piece {
                            position: absolute;
                            width: 8px;
                            height: 8px;
                            background: #ffc107;
                            animation: confetti-fall 3s linear infinite;
                        }

                        .confetti-piece:nth-child(1) {
                            left: 20%;
                            background: #ffc107;
                            animation-delay: 0s;
                        }

                        .confetti-piece:nth-child(2) {
                            left: 40%;
                            background: #ff6b6b;
                            animation-delay: 0.5s;
                        }

                        .confetti-piece:nth-child(3) {
                            left: 60%;
                            background: #4ecdc4;
                            animation-delay: 1s;
                        }

                        .confetti-piece:nth-child(4) {
                            left: 80%;
                            background: #45b7d1;
                            animation-delay: 1.5s;
                        }

                        .confetti-piece:nth-child(5) {
                            left: 90%;
                            background: #96ceb4;
                            animation-delay: 2s;
                        }

                        /* Hero Content */
                        .hero-title {
                            font-size: 3.5rem;
                            font-weight: 800;
                            margin-bottom: 1rem;
                            background: linear-gradient(45deg, #fff, #f8f9fa);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                        }

                        .hero-subtitle {
                            font-size: 1.5rem;
                            font-weight: 300;
                            opacity: 0.9;
                            margin-bottom: 2rem;
                        }

                        .order-number-card {
                            background: rgba(255, 255, 255, 0.15);
                            backdrop-filter: blur(10px);
                            border-radius: 15px;
                            padding: 20px 30px;
                            display: inline-block;
                            border: 1px solid rgba(255, 255, 255, 0.2);
                        }

                        .order-label {
                            font-size: 0.9rem;
                            opacity: 0.8;
                            display: block;
                            margin-bottom: 5px;
                        }

                        .order-number {
                            font-size: 1.5rem;
                            font-weight: 700;
                            letter-spacing: 1px;
                        }

                        /* Timeline Section */
                        .timeline-section {
                            background: #f8f9fa;
                            padding: 60px 0;
                        }

                        .status-timeline {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            position: relative;
                            padding: 20px 0;
                        }

                        .timeline-item {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            position: relative;
                            z-index: 2;
                        }

                        .timeline-icon {
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                            background: #e9ecef;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 1.2rem;
                            color: #6c757d;
                            margin-bottom: 10px;
                            transition: all 0.3s ease;
                        }

                        .timeline-item.completed .timeline-icon {
                            background: #28a745;
                            color: white;
                        }

                        .timeline-item.active .timeline-icon {
                            background: #ffc107;
                            color: white;
                            animation: pulse 2s infinite;
                        }

                        .timeline-content h6 {
                            font-weight: 600;
                            margin-bottom: 5px;
                            color: #333;
                        }

                        .timeline-content span {
                            font-size: 0.9rem;
                            color: #6c757d;
                        }

                        .timeline-line {
                            position: absolute;
                            height: 4px;
                            background: #e9ecef;
                            top: 30px;
                            z-index: 1;
                            width: 22%;
                        }

                        .timeline-line:nth-of-type(2) {
                            left: 19%;
                        }

                        .timeline-line:nth-of-type(4) {
                            left: 44%;
                        }

                        .timeline-line:nth-of-type(6) {
                            left: 69%;
                        }

                        .timeline-line.active {
                            background: linear-gradient(90deg, #ffc107, #e9ecef);
                            animation: progress 2s ease-in-out infinite;
                        }

                        /* Details Section */
                        .details-section {
                            background: white;
                            padding: 80px 0;
                        }

                        .detail-card {
                            background: white;
                            border-radius: 20px;
                            padding: 30px;
                            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                            border: 1px solid rgba(0, 0, 0, 0.05);
                            transition: all 0.3s ease;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            text-align: center;
                        }

                        .detail-card:hover {
                            transform: translateY(-10px);
                            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                        }

                        .card-icon {
                            width: 80px;
                            height: 80px;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 2rem;
                            margin-bottom: 20px;
                            transition: all 0.3s ease;
                        }

                        .delivery-card .card-icon {
                            background: linear-gradient(135deg, #ff6b6b, #ffa500);
                            color: white;
                        }

                        .payment-card .card-icon {
                            background: linear-gradient(135deg, #4ecdc4, #44a08d);
                            color: white;
                        }

                        .support-card .card-icon {
                            background: linear-gradient(135deg, #667eea, #764ba2);
                            color: white;
                        }

                        .card-content h5 {
                            font-weight: 700;
                            margin-bottom: 10px;
                            color: #333;
                        }

                        .card-content p {
                            color: #6c757d;
                            margin-bottom: 20px;
                        }

                        .delivery-time,
                        .payment-status {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 10px;
                        }

                        .status-badge {
                            padding: 8px 16px;
                            border-radius: 20px;
                            font-size: 0.9rem;
                            font-weight: 600;
                        }

                        .status-badge.pending {
                            background: #fff3cd;
                            color: #856404;
                            border: 1px solid #ffeaa7;
                        }

                        .support-actions {
                            display: flex;
                            gap: 10px;
                        }

                        .support-btn {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 10px 20px;
                            border-radius: 25px;
                            text-decoration: none;
                            font-weight: 600;
                            transition: all 0.3s ease;
                            background: #f8f9fa;
                            color: #333;
                            border: 1px solid #e9ecef;
                        }

                        .support-btn:hover {
                            background: #667eea;
                            color: white;
                            transform: translateY(-2px);
                        }

                        /* Action Buttons Section */
                        .actions-section {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            padding: 60px 0;
                        }

                        .action-buttons {
                            display: flex;
                            gap: 20px;
                            justify-content: center;
                            flex-wrap: wrap;
                        }

                        .btn-primary-custom,
                        .btn-secondary-custom {
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            padding: 16px 32px;
                            border-radius: 30px;
                            font-weight: 600;
                            font-size: 1.1rem;
                            text-decoration: none;
                            transition: all 0.3s ease;
                            border: none;
                            cursor: pointer;
                            min-width: 200px;
                            justify-content: center;
                        }

                        .btn-primary-custom {
                            background: linear-gradient(135deg, #ffc107, #ff8c00);
                            color: white;
                            box-shadow: 0 8px 25px rgba(255, 193, 7, 0.4);
                        }

                        .btn-primary-custom:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 15px 35px rgba(255, 193, 7, 0.5);
                            color: white;
                        }

                        .btn-secondary-custom {
                            background: transparent;
                            color: white;
                            border: 2px solid rgba(255, 255, 255, 0.3);
                            backdrop-filter: blur(10px);
                        }

                        .btn-secondary-custom:hover {
                            background: rgba(255, 255, 255, 0.15);
                            transform: translateY(-3px);
                            border-color: rgba(255, 255, 255, 0.5);
                            color: white;
                        }

                        /* Animations */
                        @keyframes pulse {
                            0% {
                                transform: translate(-50%, -50%) scale(1);
                                opacity: 1;
                            }

                            50% {
                                transform: translate(-50%, -50%) scale(1.1);
                                opacity: 0.7;
                            }

                            100% {
                                transform: translate(-50%, -50%) scale(1);
                                opacity: 1;
                            }
                        }

                        @keyframes confetti-fall {
                            0% {
                                transform: translateY(-100px) rotate(0deg);
                                opacity: 1;
                            }

                            100% {
                                transform: translateY(400px) rotate(360deg);
                                opacity: 0;
                            }
                        }

                        @keyframes progress {
                            0% {
                                background-position: 0% 50%;
                            }

                            50% {
                                background-position: 100% 50%;
                            }

                            100% {
                                background-position: 0% 50%;
                            }
                        }

                        @keyframes icon-line-tip {
                            0% {
                                width: 0;
                                left: 1px;
                                top: 19px;
                            }

                            54% {
                                width: 0;
                                left: 1px;
                                top: 19px;
                            }

                            70% {
                                width: 50px;
                                left: -8px;
                                top: 37px;
                            }

                            84% {
                                width: 17px;
                                left: 21px;
                                top: 48px;
                            }

                            100% {
                                width: 25px;
                                left: 14px;
                                top: 45px;
                            }
                        }

                        @keyframes icon-line-long {
                            0% {
                                width: 0;
                                right: 46px;
                                top: 54px;
                            }

                            65% {
                                width: 0;
                                right: 46px;
                                top: 54px;
                            }

                            84% {
                                width: 55px;
                                right: 0px;
                                top: 35px;
                            }

                            100% {
                                width: 47px;
                                right: 8px;
                                top: 38px;
                            }
                        }

                        @keyframes fill {
                            100% {
                                box-shadow: inset 0px 0px 0px 60px rgba(255, 255, 255, 0.2);
                            }
                        }

                        @keyframes scale {

                            0%,
                            100% {
                                transform: none;
                            }

                            50% {
                                transform: scale3d(1.1, 1.1, 1);
                            }
                        }

                        /* Mobile Responsive */
                        @media (max-width: 768px) {
                            .hero-title {
                                font-size: 2.5rem;
                            }

                            .hero-subtitle {
                                font-size: 1.2rem;
                            }

                            .status-timeline {
                                flex-direction: column;
                                gap: 30px;
                            }

                            .timeline-line {
                                display: none;
                            }

                            .action-buttons {
                                flex-direction: column;
                                align-items: center;
                            }

                            .btn-primary-custom,
                            .btn-secondary-custom {
                                min-width: 250px;
                            }

                            .hero-section {
                                padding: 60px 0 40px 0;
                            }

                            .details-section,
                            .timeline-section {
                                padding: 40px 0;
                            }
                        }
                    </style>

                    <!-- Thank You Page JavaScript -->
                    <script>
                        $(document).ready(function () {
                            // Enhanced page load animations
                            $('.hero-section').fadeIn(1000);

                            // Simulate order progress
                            setTimeout(function () {
                                $('.timeline-item.active').removeClass('active').addClass('completed');
                                $('.timeline-item:nth-child(6)').addClass('active');
                            }, 5000);

                            // Interactive button effects
                            $('.btn-primary-custom, .btn-secondary-custom').hover(function () {
                                $(this).addClass('animate__animated animate__pulse');
                            }, function () {
                                $(this).removeClass('animate__animated animate__pulse');
                            });

                            // Smooth scroll for better UX
                            $('a[href^="#"]').click(function (event) {
                                event.preventDefault();
                                $('html, body').animate({
                                    scrollTop: $($.attr(this, 'href')).offset().top
                                }, 500);
                            });

                            // Order number generation
                            $('.order-number').text('#FD' + Math.floor(Math.random() * 10000));

                            // Auto refresh timeline (optional)
                            setInterval(function () {
                                if ($('.timeline-item.active').length > 0) {
                                    var activeItem = $('.timeline-item.active');
                                    activeItem.removeClass('active').addClass('completed');
                                    activeItem.next('.timeline-line').addClass('active');
                                    activeItem.next('.timeline-line').next('.timeline-item').addClass('active');
                                }
                            }, 10000);
                        });
                    </script>
                </body>

                </html>