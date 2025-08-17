<%@page contentType="text/html" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Order details</title>
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
        <!-- Sidebar -->
        <jsp:include page="../layout/sidebar.jsp" />

        <div class="content-shift">
          <!-- Header -->
          <jsp:include page="../layout/header.jsp" />

          <main class="orders-main">
            <div class="container-fluid">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h4 class="m-0">Order details #${order.id}</h4>
                <a class="btn btn-outline-secondary" href="/shipper/orders/completed">Back</a>
              </div>

              <c:if test="${order == null}">
                <div class="alert alert-danger">No order found.</div>
              </c:if>

              <c:if test="${order != null}">
                <div class="row g-3">
                  <div class="col-12 col-lg-6">
                    <div class="card">
                      <div class="card-header">Delivery information</div>
                      <div class="card-body">
                        <div><strong>Name:</strong> ${order.receiverName}</div>
                        <div><strong>Phone:</strong> ${order.receiverPhone}</div>
                        <div><strong>Address:</strong> ${order.receiverAddress}</div>
                        <div class="mt-2"><strong>Status:</strong> <span
                            class="badge ${order.status == 'COMPLETE' ? 'bg-success' : 'bg-warning text-dark'}">${order.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-lg-6">
                    <div class="card">
                      <div class="card-header">Total amount</div>
                      <div class="card-body">
                        <div class="display-6 text-end">
                          <fmt:formatNumber type="number" pattern=",##0" value="${order.totalPrice}" /> VND
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="card">  
                      <div class="card-header">Products</div>
                      <div class="card-body p-0">
                        <div class="table-responsive">
                          <table class="table table-hover align-middle mb-0">
                            <thead class="table-light">
                              <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th class="text-center">Qty</th>
                                <th class="text-end">Price</th>
                                <th class="text-end">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <c:forEach var="d" items="${order.orderDetails}">
                                <tr>
                                  <td><img src="/images/product/${d.product.image}"
                                      style="width:56px;height:56px;object-fit:cover" class="rounded" /></td>
                                  <td>${d.product.name}</td>
                                  <td class="text-center">${d.quantity}</td>
                                  <td class="text-end">
                                    <fmt:formatNumber type="number" pattern=",##0" value="${d.price}" /> đ
                                  </td>
                                  <td class="text-end">
                                    <fmt:formatNumber type="number" pattern=",##0" value="${d.price * d.quantity}" /> đ
                                  </td>
                                </tr>
                              </c:forEach>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </c:if>
            </div>
          </main>

          <jsp:include page="../layout/footer.jsp" />
        </div>
        <script src="/client/js/main.js"></script>
      </body>

      </html>