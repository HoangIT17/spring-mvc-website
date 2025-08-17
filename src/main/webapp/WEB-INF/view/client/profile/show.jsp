<%@page contentType="text/html" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Client Profile</title>
      <link href="/client/css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link rel="stylesheet" href="/client/css/homepage.css">
      <link rel="stylesheet" href="/client/css/homepage-new.css">
      <link rel="stylesheet" href="/client/css/homepage-mobile.css">
      <link rel="stylesheet" href="/client/css/advanced-modal.css">
      <link rel="stylesheet" href="/client/css/user-dropdown.css">
      <link rel="stylesheet" href="/client/css/chat-popup.css">
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



      <div class="d-flex" style="min-height: 100vh;">
        <jsp:include page="../layout/sidebar.jsp" />
        <div class="flex-grow-1" style="padding-left:0;">
          <jsp:include page="../layout/navnew.jsp" />
          <main class="orders-main">
            <div class="container-fluid px-3 px-md-4">
              <div class="row justify-content-start">
                <div class="col-12">
                  <div class="card border-0 shadow-lg mb-4 mt-3" style="margin-left:0;">
                    <div class="card-header bg-white py-4 d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center gap-3">
                        <div class="rounded-circle bg-warning d-flex align-items-center justify-content-center" style="width:48px;height:48px;">
                          <i class="fas fa-user fa-lg text-white"></i>
                        </div>
                        <h3 class="mb-0 fw-bold text-dark">Profile</h3>
                      </div>
                      <a class="btn btn-outline-warning rounded-pill px-4" href="/">
                        <i class="fas fa-arrow-left me-2"></i>Dashboard
                      </a>
                    </div>
                    <div class="card-body py-4">
                      <div class="row g-4">
                        <div class="col-12 col-md-6">
                          <div class="bg-light rounded p-4 h-100">
                            <h5 class="fw-bold mb-3"><i class="fas fa-id-card me-2 text-warning"></i>Your Info</h5>
                            <ul class="list-unstyled mb-0">
                              <li class="mb-2"><strong>Name:</strong> <c:out value="${user.fullName}" /></li>
                              <li class="mb-2"><strong>Email:</strong> <c:out value="${user.email}" /></li>
                              <li class="mb-2"><strong>Phone:</strong> <c:out value="${user.phone}" /></li>
                              <li class="mb-2"><strong>Address:</strong> <c:out value="${user.address}" /></li>
                              <li class="mb-2"><strong>Current location:</strong>
                                <span id="currentLocationDisplay">
                                  <c:choose>
                                    <c:when test="${user.latitude != null and user.longitude != null}">
                                      (${user.latitude}, ${user.longitude})
                                    </c:when>
                                    <c:otherwise>
                                      Not set
                                    </c:otherwise>
                                  </c:choose>
                                </span>
                                <script>
                                  document.addEventListener('DOMContentLoaded', function () {
                                    const lat = document.getElementById('lat');
                                    const lng = document.getElementById('lng');
                                    const currentLocationDisplay = document.getElementById('currentLocationDisplay');
                                    function updateLocationDisplay() {
                                      const latVal = lat.value.trim();
                                      const lngVal = lng.value.trim();
                                      if (latVal !== '' && lngVal !== '') {
                                        currentLocationDisplay.textContent = `(${latVal}, ${lngVal})`;
                                      } else {
                                        currentLocationDisplay.textContent = 'Not set';
                                      }
                                    }
                                    if (lat && lng && currentLocationDisplay) {
                                      lat.addEventListener('input', updateLocationDisplay);
                                      lng.addEventListener('input', updateLocationDisplay);
                                      // Cập nhật khi bấm nút Use current location
                                      document.getElementById('btnLocate')?.addEventListener('click', function () {
                                        setTimeout(updateLocationDisplay, 100);
                                      });
                                    }
                                  });
                                </script>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="bg-light rounded p-4 h-100">
                            <h5 class="fw-bold mb-3"><i class="fas fa-map-marker-alt me-2 text-warning"></i>Update Location</h5>
                            <form method="post" action="/profile/location">
                              <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                              <div class="row g-2 mb-2">
                                <div class="col-12 col-md-6">
                                  <label class="form-label small">Latitude</label>
                                  <input name="latitude" id="lat" class="form-control" placeholder="16.0471" value="${user.latitude}" />
                                </div>
                                <div class="col-12 col-md-6">
                                  <label class="form-label small">Longitude</label>
                                  <input name="longitude" id="lng" class="form-control" placeholder="108.2068" value="${user.longitude}" />
                                </div>
                              </div>
                              <div class="d-flex gap-2">
                                <button type="submit" class="btn btn-warning rounded-pill px-4">Save</button>
                                <button id="btnLocate" type="button" class="btn btn-outline-warning rounded-pill px-4">
                                  <i class="fas fa-location-crosshairs me-1"></i> Use current location
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <jsp:include page="../layout/footer.jsp" />
        </div>
      </div>

      <script>
        const btn = document.getElementById('btnLocate');
        const lat = document.getElementById('lat');
        const lng = document.getElementById('lng');
        const currentLocationDisplay = document.getElementById('currentLocationDisplay');

        btn?.addEventListener('click', (e) => {
          e.preventDefault();
          if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
          }
          btn.disabled = true;
          btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>Getting location...';
          navigator.geolocation.getCurrentPosition((pos) => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            if (
              typeof latitude === 'number' && !isNaN(latitude) &&
              typeof longitude === 'number' && !isNaN(longitude)
            ) {
              const latStr = latitude.toFixed(6);
              const lngStr = longitude.toFixed(6);
              lat.value = latStr;
              lng.value = lngStr;
              if (currentLocationDisplay) {
                currentLocationDisplay.textContent = `(${latStr}, ${lngStr})`;
                currentLocationDisplay.className = '';
              }
            }
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-location-crosshairs me-1"></i> Use current location';
          }, (err) => {
            alert('Could not get location');
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-location-crosshairs me-1"></i> Use current location';
          });
        });

        // Add form submit handler to show confirmation
        const locationForm = document.querySelector('form[action="/profile/location"]');
        if (locationForm) {
          locationForm.addEventListener('submit', function (e) {
            const latitude = lat.value;
            const longitude = lng.value;

            if (!latitude || !longitude) {
              e.preventDefault();
              alert('Please get current location first or enter coordinates manually.');
              return;
            }

            if (confirm(`Are you sure you want to save location (${latitude}, ${longitude})?`)) {
              // Form will submit normally
              this.querySelector('button[type="submit"]').innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
              this.querySelector('button[type="submit"]').disabled = true;
            } else {
              e.preventDefault();
            }
          });
        }

        // Auto-update current location display when form inputs change
        if (lat && lng) {
          lat.addEventListener('input', function () {
            if (lat.value && lng.value) {
              currentLocationDisplay.textContent = `(${lat.value}, ${lng.value})`;
              currentLocationDisplay.className = '';
            }
            // Nếu thiếu 1 trong 2 giá trị, không cập nhật gì cả
          });

          lng.addEventListener('input', function () {
            if (lat.value && lng.value) {
              currentLocationDisplay.textContent = `(${lat.value}, ${lng.value})`;
              currentLocationDisplay.className = '';
            }
            // Nếu thiếu 1 trong 2 giá trị, không cập nhật gì cả
          });
        }
      </script>
      <script src="/client/js/main.js"></script>
    </body>

    </html>