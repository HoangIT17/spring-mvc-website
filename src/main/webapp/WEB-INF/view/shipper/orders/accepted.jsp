<%@page contentType="text/html" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Accepted orders</title>
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
            <div class="container-fluid">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h4 class="m-0">Accepted orders</h4>
                <a class="btn btn-outline-secondary" href="/shipper">Dashboard</a>
              </div>

              <c:if test="${empty orders}">
                <div class="alert alert-info">No accepted (SHIPPING) orders.</div>
              </c:if>

              <div class="table-responsive">
                <table class="table table-hover align-middle">
                  <thead class="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Address</th>
                      <th class="text-end">Total</th>
                      <th>Status</th>
                      <th class="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <c:forEach var="o" items="${orders}">
                      <tr>
                        <td><a href="/shipper/orders/${o.id}">#${o.id}</a></td>
                        <td>${o.receiverName} - ${o.receiverPhone}</td>
                        <td>${o.receiverAddress}</td>
                        <td class="text-end">
                          <fmt:formatNumber type="number" pattern=",##0" value="${o.totalPrice}" /> đ
                        </td>
                        <td><span
                            class="badge ${o.status == 'SHIPPING' ? 'bg-primary' : 'bg-secondary'}">${o.status}</span>
                        </td>
                        <td class="text-end">
                          <a class="btn btn-sm btn-outline-primary me-1" href="/shipper/orders/${o.id}/route">Route</a>
                          <form method="post" action="/shipper/orders/${o.id}/complete" class="d-inline">
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                            <button class="btn btn-sm btn-success" type="submit">Complete</button>
                          </form>
                          <form method="post" action="/shipper/orders/${o.id}/cancel" class="d-inline ms-1">
                            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                            <button class="btn btn-sm btn-outline-danger" type="submit">Cancel</button>
                          </form>
                        </td>
                      </tr>
                    </c:forEach>
                  </tbody>
                </table>
              </div>
            </div>
          </main>

          <jsp:include page="../layout/footer.jsp" />
        </div>
        <script src="/client/js/main.js"></script>
      </body>

      </html>