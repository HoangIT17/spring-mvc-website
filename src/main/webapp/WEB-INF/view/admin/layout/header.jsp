<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <div class="d-flex align-items-center justify-content-end bg-white py-2 px-4 shadow-sm" style="margin-left: 0px !important; margin-top: -3rem !important;">
            <!-- Welcome Message -->
            <div class="me-4">
                <span class="text-muted">Welcome, </span>
                <span class="fw-bold text-warning">${sessionScope.fullname}</span>
            </div>

            <!-- Admin Dropdown -->
            <div class="dropdown">
                        <a href="#" class="dropdown" role="button" id="navbarDropdown"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user fa-2x text-warning"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end p-3" aria-labelledby="navbarDropdown">
                            <li class="d-flex align-items-center flex-column" style="min-width: 250px;">
                                <c:choose>
                                    <c:when test="${not empty sessionScope.avatar}">
                                        <img style="width: 80px; height: 80px; border-radius: 50%; overflow: hidden;"
                                            src="/images/avatar/${sessionScope.avatar}" />
                                    </c:when>
                                    <c:otherwise>
                                        <i class="fas fa-user-circle text-warning" style="font-size: 5rem;"></i>
                                    </c:otherwise>
                                </c:choose>
                                <div class="text-center my-3">
                                    <div class="fw-bold">${sessionScope.fullname}</div>
                                    <small class="text-muted">Administrator</small>
                                </div>
                            </li>
                            <li><a class="dropdown-item" href="#!">
                                <i class="fas fa-cog me-2 text-warning"></i>Settings
                            </a></li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li>
                                <form method="post" action="/logout" >
                                    <input type="hidden" name="${_csrf.parameterName}" 
                                            value="${_csrf.token}"/>
                                    <button class="dropdown-item text-danger">
                                        <i class="fas fa-sign-out-alt me-2"></i>Logout
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>