<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <!-- Hero Start -->
        <section class="hero-section">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="hero-content">
                            <h1 class="hero-title">
                                Order delicious food,
                                <span class="text-warning">delivered</span>
                                in 30 minutes
                            </h1>
                            <p class="hero-subtitle">
                                Over 1000+ quality restaurants. Super fast delivery.
                                Multiple payments. Daily promotions.
                            </p>

                            <!-- Hero Search -->
                            <div class="hero-search-container">
                                <div class="hero-search-box">
                                    <div class="location-input">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <input type="text" placeholder="Enter delivery address..."
                                            id="heroLocationInput">
                                    </div>
                                    <div class="food-input">
                                        <i class="fas fa-search"></i>
                                        <input type="text" placeholder="Search food, restaurants..." id="heroFoodInput">
                                    </div>
                                    <button class="hero-search-btn" onclick="app.handleHeroSearch()">
                                        <i class="fas fa-search"></i>
                                        Search
                                    </button>
                                </div>
                            </div>

                            <!-- Hero Stats -->
                            <div class="hero-stats">
                                <div class="stat-item">
                                    <div class="stat-number">1000+</div>
                                    <div class="stat-label">Restaurants</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">50K+</div>
                                    <div class="stat-label">Customers</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number">30 min</div>
                                    <div class="stat-label">Delivery</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="hero-image-container">
                            <div class="hero-carousel">
                                <div class="carousel-track" id="heroCarouselTrack">
                                    <img src="/client/img/BurgerAnimation.png" alt="Delicious Food 1"
                                        class="hero-food-image active">
                                    <img src="/client/img/PizzaAnimation.png" alt="Delicious Food 2"
                                        class="hero-food-image">
                                    <img src="/client/img/MycayAnimation.png" alt="Delicious Food 3"
                                        class="hero-food-image">
                                    <img src="/client/img/NuocUongAnimation.png" alt="Delicious Food 4"
                                        class="hero-food-image">
                                </div>
                                <div class="carousel-indicators" id="heroCarouselIndicators">
                                    <span class="indicator active" data-slide="0"></span>
                                    <span class="indicator" data-slide="1"></span>
                                    <span class="indicator" data-slide="2"></span>
                                    <span class="indicator" data-slide="3"></span>
                                </div>
                                <button class="carousel-btn prev-btn" id="heroPrevBtn">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <button class="carousel-btn next-btn" id="heroNextBtn">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Hero End -->