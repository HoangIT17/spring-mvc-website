# Tính năng Profile cho Client - FoodFlow

## Tổng quan
Tính năng Profile cho phép khách hàng xem và cập nhật thông tin cá nhân, bao gồm cả vị trí địa lý. Tính năng này tích hợp với hệ thống định vị và cung cấp danh sách các quận huyện, phường xã của Đà Nẵng.

## Các tính năng chính

### 1. Thông tin cá nhân
- **Họ và tên**: Cập nhật tên đầy đủ
- **Email**: Hiển thị (chỉ đọc)
- **Số điện thoại**: Cập nhật số điện thoại
- **Địa chỉ**: Cập nhật địa chỉ chi tiết
- **Ảnh đại diện**: Upload và thay đổi ảnh đại diện

### 2. Quản lý vị trí
- **Tọa độ GPS**: Nhập trực tiếp latitude/longitude
- **Lấy vị trí hiện tại**: Sử dụng GPS của thiết bị
- **Chọn từ danh sách**: Chọn quận/huyện và phường/xã của Đà Nẵng
- **Bản đồ tương tác**: Xem và chỉnh sửa vị trí trên bản đồ

### 3. Danh sách địa giới Đà Nẵng
- **8 quận/huyện**: Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn, Liên Chiểu, Cẩm Lệ, Hòa Vang, Hoàng Sa
- **Phường/Xã**: Tổng cộng hơn 50 phường/xã với tọa độ chính xác
- **Tìm kiếm**: Hỗ trợ tìm kiếm theo tên địa danh

## Cấu trúc file

### Backend
```
src/main/java/vn/hoangit/foodflow/controller/client/ProfileController.java
```

### Frontend
```
src/main/webapp/WEB-INF/view/client/profile/show.jsp
src/main/webapp/resources/client/css/client-profile.css
src/main/webapp/resources/client/js/client-profile.js
src/main/webapp/resources/client/js/danang-locations.js
```

### Navigation
```
src/main/webapp/WEB-INF/view/client/layout/nav.jsp
```

## Cách sử dụng

### 1. Truy cập Profile
- Đăng nhập vào hệ thống
- Click vào icon user (góc phải trên)
- Chọn "Thông tin cá nhân" từ dropdown menu

### 2. Cập nhật thông tin
- Chỉnh sửa các trường thông tin
- Upload ảnh đại diện mới (click vào ảnh)
- Click "Cập nhật thông tin" để lưu

### 3. Cập nhật vị trí
- **Cách 1**: Nhập trực tiếp tọa độ latitude/longitude
- **Cách 2**: Click "Lấy vị trí hiện tại" để sử dụng GPS
- **Cách 3**: Chọn quận/huyện và phường/xã từ dropdown
- **Cách 4**: Kéo marker trên bản đồ để thay đổi vị trí

## Cấu hình

### Google Maps API
API key đã được cập nhật trong dự án:
```javascript
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBr1sql8ydyhFIx562U6WRGeWHH4A_41hA&libraries=places"></script>
```

**Lưu ý**: API key này đã được tích hợp sẵn và sẵn sàng sử dụng.

### Dữ liệu địa giới
Dữ liệu quận huyện và phường xã được lưu trong file `danang-locations.js`. Có thể cập nhật tọa độ chính xác cho từng địa danh.

## Bảo mật

### Xác thực
- Chỉ user đã đăng nhập mới có thể truy cập profile
- Session validation được thực hiện ở backend
- CSRF protection được áp dụng cho form submission

### Validation
- Kiểm tra định dạng email
- Validate tọa độ GPS (trong phạm vi Đà Nẵng)
- Kiểm tra kích thước và định dạng file ảnh

## Responsive Design
- Hỗ trợ đầy đủ trên mobile và desktop
- Layout tự động điều chỉnh theo kích thước màn hình
- Touch-friendly interface cho mobile

## Tương thích trình duyệt
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Lưu ý kỹ thuật

### Database
- Các trường mới được thêm vào bảng `users`:
  - `latitude`: Vĩ độ (Double)
  - `longitude`: Kinh độ (Double)

### Session Management
- Thông tin user được lưu trong session
- Avatar được lưu trong thư mục `/images/avatar/`

### File Upload
- Hỗ trợ các định dạng: JPG, PNG, GIF
- Kích thước tối đa: 5MB
- Tự động resize và optimize

## Troubleshooting

### Lỗi thường gặp
1. **Không thể lấy vị trí GPS**
   - Kiểm tra quyền truy cập vị trí trong trình duyệt
   - Đảm bảo thiết bị có GPS

2. **Bản đồ không hiển thị**
   - Kiểm tra Google Maps API key
   - Kiểm tra kết nối internet

3. **Upload ảnh thất bại**
   - Kiểm tra định dạng file
   - Kiểm tra kích thước file
   - Kiểm tra quyền ghi thư mục

### Logs
- Console logs được ghi chi tiết trong JavaScript
- Backend logs được ghi trong Spring Boot application logs

## Phát triển tiếp theo

### Tính năng có thể thêm
- Lịch sử thay đổi thông tin
- Backup/restore profile
- Import/export dữ liệu
- Tích hợp với các dịch vụ bên thứ 3 (Google, Facebook)

### Cải tiến kỹ thuật
- Sử dụng WebSocket cho real-time updates
- Implement caching cho dữ liệu địa giới
- Thêm unit tests và integration tests
- Optimize performance cho mobile

## Liên hệ hỗ trợ
Nếu gặp vấn đề hoặc cần hỗ trợ, vui lòng liên hệ team phát triển FoodFlow.
