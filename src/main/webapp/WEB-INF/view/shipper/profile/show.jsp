<%@page contentType="text/html" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Shipper Profile</title>
      <link href="/client/css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link rel="stylesheet" href="/shipper/css/base.css">
      <link rel="stylesheet" href="/shipper/css/sidebar.css">
      <link rel="stylesheet" href="/shipper/css/orders.css">
      <style>
        .content-shift {
          margin-left: 260px;
        }

        .orders-main {
          margin-top: 0;
          padding: 8px 16px 16px;
        }

        @media (max-width: 991px) {
          .content-shift {
            margin-left: 220px;
          }
        }
      </style>
    </head>

    <body>
      <jsp:include page="../layout/sidebar.jsp" />
      <div class="content-shift">
        <jsp:include page="../layout/header.jsp" />

        <main class="orders-main">
          <div class="container py-4">
            <div class="d-flex align-items-center justify-content-between pb-3 mb-4" style="border-bottom:2px solid #f1f1f1;">
              <div class="d-flex align-items-center gap-3">
                <span class="d-flex align-items-center justify-content-center" style="width:56px;height:56px;background:#fbbf24;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                  <i class="fa-solid fa-user fa-2x text-white"></i>
                </span>
                <h2 class="fw-bold mb-0 text-dark">Profile</h2>
              </div>
              <a class="btn btn-outline-warning rounded-pill px-4 fw-bold" href="/shipper">
                <i class="fa fa-arrow-left me-1"></i> Dashboard
              </a>
            </div>
            <div class="row g-4 justify-content-center align-items-stretch">
              <div class="col-12 col-lg-5 d-flex">
                <div class="card border-0 rounded-4 flex-fill d-flex flex-column justify-content-center" style="background:#f6f8fa;min-height:220px;">
                  <div class="card-body py-2 px-4">
                    <div class="mb-2 d-flex align-items-center gap-2">
                      <span class="d-flex align-items-center justify-content-center" style="width:40px;height:40px;background:#fbbf24;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                        <i class="fa-solid fa-id-card fa-lg text-white"></i>
                      </span>
                      <span class="fw-bold fs-4 text-dark">Your Info</span>
                    </div>
                    <div class="mb-1"><strong>Name:</strong> <c:out value="${user.fullName}" /></div>
                    <div class="mb-1"><strong>Email:</strong> <c:out value="${user.email}" /></div>
                    <div class="mb-1"><strong>Phone:</strong> <c:out value="${user.phone}" /></div>
                    <div class="mb-1"><strong>Address:</strong> <c:out value="${user.address}" /></div>
                    <div class="mt-2"><strong>Current location:</strong> <span class="fw-normal">(
                      <c:out value="${user.latitude}" />, <c:out value="${user.longitude}" />)
                    </span></div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-5 d-flex">
                <div class="card border-0 rounded-4 flex-fill d-flex flex-column justify-content-center" style="background:#f6f8fa;min-height:220px;">
                  <div class="card-body py-2 px-4">
                    <div class="mb-3 d-flex align-items-center gap-2">
                      <span class="d-flex align-items-center justify-content-center" style="width:40px;height:40px;background:#fbbf24;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.08);height:40px;line-height:40px;">
                        <i class="fa-solid fa-location-dot fa-lg text-white" style="margin:0;line-height:40px;"></i>
                      </span>
                      <span class="fw-bold fs-4 text-dark">Update Location</span>
                    </div>
                    <form method="post" action="/shipper/profile/location">
                      <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                      <div class="row g-3 align-items-end justify-content-center">
                        <div class="col-12 col-md-6">
                          <label class="form-label">Latitude</label>
                          <input name="latitude" id="lat" class="form-control rounded-pill" placeholder="16.0471"
                            value="${user.latitude}" />
                        </div>
                        <div class="col-12 col-md-6">
                          <label class="form-label">Longitude</label>
                          <input name="longitude" id="lng" class="form-control rounded-pill" placeholder="108.2068"
                            value="${user.longitude}" />
                        </div>
                      </div>
                      <div class="d-flex gap-3 mt-4">
                        <button type="submit" class="btn rounded-pill fw-bold px-3" style="background:#fbbf24;color:#fff;font-size:1rem;padding:6px 18px;min-width:90px;">
                          Save
                        </button>
                        <button id="btnLocate" type="button" class="btn rounded-pill fw-bold px-3 border border-warning text-warning bg-white" style="font-size:1rem;padding:6px 18px;min-width:170px;">
                          <i class="fas fa-location-crosshairs me-1"></i> Use current location
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <jsp:include page="../layout/footer.jsp" />
      </div>

      <script>
        const btn = document.getElementById('btnLocate');
        const lat = document.getElementById('lat');
        const lng = document.getElementById('lng');
        btn?.addEventListener('click', (e) => {
          e.preventDefault();
          if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
          }
          navigator.geolocation.getCurrentPosition((pos) => {
            lat.value = pos.coords.latitude.toFixed(6);
            lng.value = pos.coords.longitude.toFixed(6);
          }, (err) => {
            alert('Unable to retrieve your location: ' + err.message);
          }, { enableHighAccuracy: true, timeout: 10000 });
        });
      </script>
      <script src="/client/js/main.js"></script>
    </body>

    </html>