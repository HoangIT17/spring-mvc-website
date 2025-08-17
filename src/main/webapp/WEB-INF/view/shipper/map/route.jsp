<%@page contentType="text/html" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Delivery Route</title>
      <link href="/client/css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" href="/shipper/css/base.css">
      <link rel="stylesheet" href="/shipper/css/sidebar.css">
      <style>
        .content-shift {
          margin-left: 260px;
        }

        .map-container {
          height: calc(100vh - 80px);
        }

        #map {
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }

        @media (max-width: 991px) {
          .content-shift {
            margin-left: 220px;
          }
        }
      </style>
      <!-- Leaflet + Leaflet Routing Machine (OpenStreetMap) - no API key required -->
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
      <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.min.js"></script>
    </head>

    <body>
      <jsp:include page="../layout/sidebar.jsp" />
      <div class="content-shift">
        <jsp:include page="../layout/header.jsp" />

        <div class="container-fluid py-3">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <h5 class="m-0">Delivery Route for Order #
              <c:out value="${order.id}" />
            </h5>
            <a class="btn btn-outline-secondary" href="/shipper/orders/accepted">Back</a>
          </div>
          <div class="map-container">
            <div id="map"></div>
          </div>
        </div>
      </div>

      <script>
        const shipLatStr = "<c:out value='${shipperLatitude}'/>";
        const shipLngStr = "<c:out value='${shipperLongitude}'/>";
        const shipLat = shipLatStr ? parseFloat(shipLatStr) : null;
        const shipLng = shipLngStr ? parseFloat(shipLngStr) : null;

        function init() {
          if (shipLat == null || shipLng == null) {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(pos => start(pos.coords.latitude, pos.coords.longitude));
            } else { start(16.0471, 108.2068); }
          } else { start(shipLat, shipLng); }
        }

        function start(lat, lng) {
          const map = L.map('map').setView([lat, lng], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          const address = "<c:out value='${order.receiverAddress}'/>";
          fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address))
            .then(r => r.json())
            .then(res => {
              if (!res || res.length === 0) { alert('Unable to locate customer address'); return; }
              const dest = [parseFloat(res[0].lat), parseFloat(res[0].lon)];
              L.Routing.control({
                waypoints: [L.latLng(lat, lng), L.latLng(dest[0], dest[1])],
                router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
                routeWhileDragging: false
              }).addTo(map);
            })
            .catch(() => alert('Geocoding failed'));
        }
        init();
      </script>
    </body>

    </html>