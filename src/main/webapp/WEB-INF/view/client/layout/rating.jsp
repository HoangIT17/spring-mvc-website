<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- Rating Stars -->
<div class="d-flex align-items-center justify-content-center mb-3">
    <div class="rating-stars me-2">
        <c:forEach begin="1" end="5" var="i">
            <c:choose>
                <c:when test="${i <= 4}">
                    <i class="fas fa-star text-warning" style="font-size: 12px;"></i>
                </c:when>
                <c:otherwise>
                    <i class="far fa-star text-warning" style="font-size: 12px;"></i>
                </c:otherwise>
            </c:choose>
        </c:forEach>
    </div>
    <span class="text-muted" style="font-size: 12px;">
        <c:choose>
            <c:when test="${status.index % 3 == 0}">4.6</c:when>
            <c:when test="${status.index % 3 == 1}">4.2</c:when>
            <c:otherwise>4.4</c:otherwise>
        </c:choose>
    </span>
</div>