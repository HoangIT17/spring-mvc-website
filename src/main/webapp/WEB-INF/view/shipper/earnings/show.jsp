<%@page contentType="text/html" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
      <jsp:useBean id="now" class="java.util.Date" scope="page" />
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Earnings</title>
        <link href="/client/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <link rel="stylesheet" href="/shipper/css/base.css">
        <link rel="stylesheet" href="/shipper/css/sidebar.css">
        <link rel="stylesheet" href="/shipper/css/orders.css">
        <style>
          .content-shift {
            margin-left: 260px
          }

          @media(max-width:991px) {
            .content-shift {
              margin-left: 220px
            }
          }
        </style>
      </head>

      <body>
        <jsp:include page="../layout/sidebar.jsp" />
        <div class="content-shift">
          <jsp:include page="../layout/header.jsp" />
          <div class="container-fluid py-3">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h4 class="m-0">Earnings</h4>
              <a class="btn btn-outline-secondary" href="/shipper">Dashboard</a>
            </div>
            <div class="card border-0 shadow-sm mb-3">
              <div class="card-body d-flex justify-content-between align-items-center">
                <div class="fw-semibold text-muted">Total income</div>
                <div class="display-6">
                  <fmt:formatNumber type="number" pattern=",##0" value="${total}" /> đ
                </div>
              </div>
            </div>
            <div class="card border-0 shadow-sm">
              <div class="card-header">Completed orders</div>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th class="text-end">Total</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <c:forEach var="o" items="${orders}">
                        <tr>
                          <td><a href="/shipper/orders/${o.id}">#${o.id}</a></td>
                          <td>${o.receiverName}</td>
                          <td class="text-end">
                            <fmt:formatNumber type="number" pattern=",##0" value="${o.totalPrice}" /> đ
                          </td>
                          <td>
                            <c:choose>
                              <c:when test="${not empty o.createdAt}">
                                <fmt:formatDate value="${o.createdAt}" pattern="dd/MM/yyyy HH:mm" />
                              </c:when>
                              <c:otherwise>
                                <fmt:formatDate value="${now}" pattern="dd/MM/yyyy HH:mm" />
                              </c:otherwise>
                            </c:choose>
                          </td>
                          <td class="text-end"><a class="btn btn-sm btn-outline-secondary"
                              href="/shipper/orders/${o.id}">Details</a></td>
                        </tr>
                      </c:forEach>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="/client/js/main.js"></script>
      </body>

      </html>