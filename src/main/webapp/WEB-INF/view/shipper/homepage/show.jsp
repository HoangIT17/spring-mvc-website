<%@page contentType="text/html" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Shipper Dashboard</title>

        <!-- Google Web Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap"
          rel="stylesheet">
        <!-- Libraries Stylesheet -->
        <link href="/client/lib/lightbox/css/lightbox.min.css" rel="stylesheet">
        <link href="/client/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <!-- Shipper CSS -->
        <link rel="stylesheet" href="/shipper/css/base.css">
        <link rel="stylesheet" href="/shipper/css/sidebar.css">
        <link rel="stylesheet" href="/shipper/css/orders.css">
        <style>

        .stat-card {
          border-radius: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .btn-primary {
          border-radius: 50px;
          font-weight: 500;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        
        
        .stat-icon {
          font-size: 2.5rem;
          margin-bottom: 8px;
        }
        .display-4 {
          font-weight: 700;
          letter-spacing: 1px;
        }
    
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        /* .shipper-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #f8f9fa;
          border-radius: 2rem;
          padding: 0.5rem 1.2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        } */
        .profile-avatar i {
          font-size: 2.2rem;
          color: #ffc107;
        }
        .profile-name {
          font-weight: 600;
          color: #222;
        }
        .profile-rating {
          color: #ffc107;
          font-weight: 500;
        }
        @media (max-width: 991px) {
          .header-content { flex-direction: column; gap: 0.5rem; }
          .shipper-profile { flex-direction: column; align-items: flex-start; }
        }
        </style>
      </head>

      <body class="shipper-body">
        <!-- Sidebar -->
        <jsp:include page="../layout/sidebar.jsp" />

        <!-- Main Content Wrapper -->
        <div class="content-shift">
          <!-- Header -->
          <jsp:include page="../layout/header.jsp" />

          <!-- Main Content -->
          <main class="orders-main">
            <div class="container-fluid">
              <!-- Toolbar closely under header -->
              <div class="d-flex align-items-center justify-content-between mb-1" style="margin-top:-32px;">
                <h4 class="mb-0 fw-bold">Shipper Dashboard</h4>
                <a class="btn btn-primary px-4" href="/shipper/orders/available">Available orders</a>
              </div>

              <!-- Stat Cards -->
              <div class="row g-3 mb-3">
                <div class="col-12 col-md-3">
                  <div class="card border-0 shadow-sm stat-card h-100 text-center">
                    <div class="card-body">
                      <div class="stat-icon text-warning"><i class="fas fa-clock"></i></div>
                      <div class="card-title mb-2">Pending</div>
                      <div class="display-4 display-value count-animate text-dark" data-count="${pending}">0</div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-3">
                  <div class="card border-0 shadow-sm stat-card h-100 text-center">
                    <div class="card-body">
                      <div class="stat-icon text-primary"><i class="fas fa-truck"></i></div>
                      <div class="card-title mb-2">Shipping</div>
                      <div class="display-4 display-value count-animate text-primary" data-count="${shipping}">0</div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-3">
                  <div class="card border-0 shadow-sm stat-card h-100 text-center">
                    <div class="card-body">
                      <div class="stat-icon text-success"><i class="fas fa-check-circle"></i></div>
                      <div class="card-title mb-2">Completed</div>
                      <div class="display-4 display-value count-animate text-success" data-count="${complete}">0</div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-3">
                  <div class="card border-0 shadow-sm stat-card h-100 text-center">
                    <div class="card-body">
                      <div class="stat-icon text-danger"><i class="fas fa-times-circle"></i></div>
                      <div class="card-title mb-2">Cancelled</div>
                      <div class="display-4 display-value count-animate text-danger" data-count="${cancelled}">0</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bootstrap pills as tabs -->
              <!-- <ul class="nav nav-pills orders-tabs mb-3">
                <li class="nav-item"><button class="nav-link active" data-filter="available">Available <span
                      class="badge bg-warning text-dark ms-1">${pending}</span></button></li>
                <li class="nav-item"><button class="nav-link" data-filter="accepted">Accepted <span
                      class="badge bg-secondary ms-1">
                      <c:out value='${accepted}' default='0' />
                    </span></button></li>
                <li class="nav-item"><button class="nav-link" data-filter="completed">Completed <span
                      class="badge bg-success ms-1">${complete}</span></button></li>
              </ul>

              <div class="card border-0 shadow-sm">
                <div class="card-body orders-canvas" id="orders-canvas">No data to display</div>
              </div> -->

            </div>

          </main>

          <!-- no footer on shipper dashboard -->
        </div> <!-- Close content-shift -->
        <script>
          const tabs = document.querySelectorAll('.orders-tabs .tab, .orders-tabs .nav-link');
          const canvas = document.getElementById('orders-canvas');
          tabs.forEach(t => t.addEventListener('click', () => {
            tabs.forEach(x => x.classList.remove('active'));
            t.classList.add('active');
            const key = t.dataset.filter;
            if (key === 'available') canvas.textContent = 'Pending orders will appear here';
            else if (key === 'accepted') canvas.textContent = 'Accepted orders will appear here';
            else canvas.textContent = 'Completed orders will appear here';
          }));
        </script>
        <script src="/client/js/main.js"></script>
        <script>
          // Animation count up for dashboard numbers
          document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('.count-animate').forEach(function (el) {
              const target = parseInt(el.getAttribute('data-count')) || 0;
              let current = 0;
              const duration = 1200;
              const step = Math.ceil(target / (duration / 20));
              function animate() {
                current += step;
                if (current >= target) {
                  el.textContent = target;
                } else {
                  el.textContent = current;
                  setTimeout(animate, 20);
                }
              }
              animate();
            });
          });
        </script>
      </body>

      </html>