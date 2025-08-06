<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="modal fade" id="foodModal" tabindex="-1" aria-labelledby="modalFoodName" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header border-0">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <img id="modalFoodImage" src="/images/product/${product.image}" alt="${product.name}" class="w-100 rounded mb-3">
                                        <!-- Product Description moved below image -->
                                        <div class="product-description">
                                            <h6 class="fw-bold text-warning mb-2">Product description</h6>
                                            <p id="modalFoodDescription" class="text-muted mb-3" style="line-height: 1.6;">
                                                ${product.detailDesc}
                                            </p>
                                            <div class="product-features">
                                                <small class="text-muted d-block mb-1"><i
                                                        class="fas fa-check-circle text-success me-2"></i>Fresh ingredients</small>
                                                <small class="text-muted d-block mb-1"><i
                                                        class="fas fa-check-circle text-success me-2"></i>Made to order</small>
                                                <small class="text-muted d-block"><i
                                                        class="fas fa-check-circle text-success me-2"></i>Hygienic and safe</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <h3 id="modalFoodName" class="fw-bold mb-3">${product.name}</h3>
                                        <div class="rating mb-3">
                                            <div class="stars" id="modalStars">
                                                <i class="fa fa-star text-warning"></i>
                                                <i class="fa fa-star text-warning"></i>
                                                <i class="fa fa-star text-warning"></i>
                                                <i class="fa fa-star text-warning"></i>
                                                <i class="fa fa-star text-secondary"></i>
                                            </div>
                                            <span id="modalRating" class="ms-2 text-muted">(4.0)</span>
                                        </div>
                                        <div class="price-section mb-4">
                                            <span class="price fw-bold fs-4" id="modalPrice">
                                                <fmt:formatNumber type="number" value="${product.price}" /> đ
                                            </span>
                                        </div>

                                        <!-- Special Notes Section -->
                                        <div class="special-notes mb-4">
                                            <h6 class="fw-bold mb-3">Special notes:</h6>
                                            <div class="notes-options">
                                                <div class="form-check mb-2">
                                                    <input class="form-check-input" type="checkbox" id="noteSpicy">
                                                    <label class="form-check-label" for="noteSpicy">Less sugar</label>
                                                </div>
                                                <div class="form-check mb-2">
                                                    <input class="form-check-input" type="checkbox" id="noteNoOnion">
                                                    <label class="form-check-label" for="noteNoOnion">Extra ice</label>
                                                </div>
                                                <div class="form-check mb-2">
                                                    <input class="form-check-input" type="checkbox" id="noteHot">
                                                    <label class="form-check-label" for="noteHot">No onions</label>
                                                </div>
                                                <div class="form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" id="noteExtraSpice">
                                                    <label class="form-check-label" for="noteExtraSpice">Less salt</label>
                                                </div>
                                            </div>
                                            <textarea class="form-control" rows="2" placeholder="Other notes..."
                                                id="customNotes"></textarea>
                                        </div>

                                        <div class="quantity-section mb-4">
                                            <label class="form-label">Quantity:</label>
                                            <div class="quantity-controls d-flex align-items-center">
                                                <button class="btn btn-outline-warning" id="decreaseModalQty">-</button>
                                                <span class="quantity mx-3 fw-bold" id="modalQuantity">1</span>
                                                <button class="btn btn-outline-warning" id="increaseModalQty">+</button>
                                            </div>
                                        </div>

                                        <form method="post" action="/add-product-to-cart/${product.id}">
                                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                                            <input type="hidden" name="quantity" id="modalHiddenQuantity" value="1"/>
                                            <button type="submit" class="btn btn-warning w-100 fw-bold" id="addToCartBtn">
                                                <i class="fas fa-cart-plus me-2"></i>Add to cart
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>