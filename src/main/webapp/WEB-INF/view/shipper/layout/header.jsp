<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
  <header class="shipper-header fixed-top" id="header">
    <div class="container">
      <div class="header-content">
        <div class="header-left">
          <!-- <div class="status-indicator">
            <div class="status-dot online" id="status-dot"></div>
            <span class="status-text" id="status-text">Online</span>
            <button class="status-toggle" id="status-toggle">
              <i class="fas fa-power-off"></i>
            </button>
          </div> -->
        </div>

        <div class="header-right">
          <!-- <div class="earnings-display">
            <div class="earnings-label">Today</div>
            <div class="earnings-amount" id="daily-earnings">${sessionScope.earnings}</div>
          </div> -->



          <div class="shipper-profile" style="margin-right:8px;">
            <div class="profile-avatar" style="background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.08);border:none;">
              <i class="fas fa-user-circle" style="color:#fbbf24;"></i>
            </div>
            <div class="profile-info">
              <div class="profile-name">
                <c:out value="${user.fullName}" default="${sessionScope.fullname}" />
              </div>
              <div class="profile-rating" style="margin-top:4px;">
                <i class="fas fa-star" style="color:#fbbf24;"></i>
                <span style="color:#fbbf24;font-weight:600;">4.9</span>
              </div>
            </div>
            <div class="profile-dropdown" >
              <a href="/shipper/profile" class="d-flex align-items-center gap-2">
                <i class="fas fa-user text-warning"></i> Personal profile
              </a>
              <a href="/shipper/earnings" class="d-flex align-items-center gap-2">
                <i class="fas fa-coins text-success"></i> Earnings
              </a>
              <hr>
              <form method="post" action="/logout" class="px-2 pb-2">
                <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                <button class="dropdown-item w-100 text-danger fw-bold d-flex align-items-center gap-2" style="border-radius:8px;">
                  <i class="fas fa-sign-out-alt"></i> Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>