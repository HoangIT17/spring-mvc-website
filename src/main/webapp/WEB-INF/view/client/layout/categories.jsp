<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <section class="popular-categories">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h2 class="section-title">Popular categories</h2>
                        <p class="section-subtitle">Discover your favorite dishes</p>
                    </div>
                    <a href="Product.html" class="btn btn-outline-warning">View all</a>
                </div>
                <div class="categories-grid">
                    <div class="category-card" data-category="pizza" onclick="app.navigateToProducts('pizza')">
                        <img src="/client/img/PizzaAnimation.png" alt="Pizza">
                        <h5>Pizza</h5>
                        <p>120+ items</p>
                    </div>
                    <div class="category-card" data-category="burger" onclick="app.navigateToProducts('burger')">
                        <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop&auto=format"
                            alt="Burger">
                        <h5>Burger & Chicken</h5>
                        <p>80+ items</p>
                    </div>
                    <div class="category-card" data-category="noodle" onclick="app.navigateToProducts('noodle')">
                        <img src="https://images.unsplash.com/photo-1555126634-323283e090fa?w=200&h=200&fit=crop&auto=format"
                            alt="Noodles">
                        <h5>Noodles</h5>
                        <p>150+ items</p>
                    </div>
                    <div class="category-card" data-category="drink" onclick="app.navigateToProducts('drink')">
                        <img src="https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=200&fit=crop&auto=format"
                            alt="Drinks">
                        <h5>Drinks</h5>
                        <p>60+ items</p>
                    </div>
                    <div class="category-card" data-category="rice" onclick="app.navigateToProducts('rice')">
                        <img src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop&auto=format"
                            alt="Rice">
                        <h5>Rice</h5>
                        <p>90+ items</p>
                    </div>
                    
                    <!-- <div class="category-card" data-category="hotpot" onclick="app.navigateToProducts('hotpot')">
                        <img src="../images/XucXichPhoMai.png" alt="Hotpot">
                        <h5>Hot Food</h5>
                        <p>70+ items</p>
                    </div> -->
                </div>
            </div>
        </section>