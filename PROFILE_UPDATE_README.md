# Cập nhật Profile Client - FoodFlow

## Tổng quan
Tính năng Profile đã được cập nhật để cho phép client chỉ cập nhật được **tên** và **địa chỉ**, đồng thời hỗ trợ upload ảnh đại diện. Các thông tin khác như email, số điện thoại, và tọa độ vị trí không thể thay đổi trực tiếp từ form.

## Các thay đổi chính

### 1. Controller (`ProfileCustomerController.java`)
- **Chỉ cho phép cập nhật**: `fullName` và `address`
- **Không cho phép cập nhật**: `phone`, `email`, `latitude`, `longitude`
- **Hỗ trợ upload ảnh**: Xử lý file avatar với validation
- **Validation**: Kiểm tra dữ liệu đầu vào và hiển thị thông báo lỗi
- **Error handling**: Xử lý lỗi và hiển thị thông báo phù hợp

### 2. Giao diện (`show.jsp`)
- **Form đơn giản**: Chỉ hiển thị các trường có thể cập nhật
- **Trường readonly**: Email và số điện thoại hiển thị nhưng không thể chỉnh sửa
- **Upload ảnh**: Click vào ảnh để chọn file mới
- **Thông báo**: Hiển thị thông báo thành công/lỗi
- **Responsive**: Giao diện tương thích với mobile

### 3. JavaScript (`client-profile.js`)
- **Avatar upload**: Xử lý chọn và preview ảnh
- **Validation**: Kiểm tra file type và size
- **Location update**: Cập nhật vị trí thông qua GPS
- **Form handling**: Xử lý submit form với validation

### 4. CSS (`client-profile.css`)
- **Avatar overlay**: Hiệu ứng hover khi di chuột qua ảnh
- **Modern design**: Giao diện đẹp và responsive
- **Animations**: Hiệu ứng chuyển động mượt mà

## Cách sử dụng

### 1. Cập nhật thông tin cơ bản
1. Truy cập `/profile`
2. Chỉnh sửa **Họ và tên** và **Địa chỉ**
3. Click "Cập nhật thông tin"

### 2. Thay đổi ảnh đại diện
1. Click vào ảnh hiện tại
2. Chọn file ảnh mới (JPG, PNG, GIF, tối đa 5MB)
3. Ảnh sẽ được preview ngay lập tức
4. Click "Cập nhật thông tin" để lưu

### 3. Cập nhật vị trí
1. Click "Lấy vị trí hiện tại"
2. Cho phép trình duyệt truy cập vị trí
3. Tọa độ sẽ được tự động cập nhật

## Lưu ý quan trọng

### 1. Bảo mật
- **Email và SĐT**: Không thể thay đổi để đảm bảo tính bảo mật
- **Validation**: Tất cả dữ liệu đầu vào đều được kiểm tra
- **File upload**: Chỉ chấp nhận file ảnh với kích thước hợp lệ

### 2. Đồng bộ dữ liệu
- **Database**: Thông tin được cập nhật ngay lập tức
- **Admin panel**: Admin có thể thấy thông tin mới
- **Shipper**: Shipper có thể thấy địa chỉ cập nhật để giao hàng chính xác

### 3. Session management
- **Avatar**: Được cập nhật trong session ngay lập tức
- **Fullname**: Được cập nhật trong session để hiển thị ở navigation

## Cấu trúc file

```
src/main/java/vn/hoangit/foodflow/controller/client/
└── ProfileCustomerController.java

src/main/webapp/WEB-INF/view/client/profile/
└── show.jsp

src/main/webapp/resources/client/
├── css/
│   └── client-profile.css
└── js/
    └── client-profile.js
```

## API Endpoints

### POST `/profile/update`
- **Parameters**: `fullName`, `address`, `avatarFile` (optional)
- **Response**: Redirect to profile page with success/error message
- **Validation**: Required fields, file type, file size

### POST `/profile/location`
- **Parameters**: `latitude`, `longitude`
- **Response**: Redirect to profile page with success/error message
- **Usage**: Called automatically when getting current location

## Tương thích

- **Browsers**: Chrome, Firefox, Safari, Edge (modern versions)
- **Mobile**: Responsive design cho tất cả kích thước màn hình
- **File types**: JPG, PNG, GIF
- **File size**: Tối đa 5MB

## Troubleshooting

### 1. Không thể upload ảnh
- Kiểm tra file type (chỉ ảnh)
- Kiểm tra file size (tối đa 5MB)
- Đảm bảo có quyền ghi vào thư mục upload

### 2. Không thể lấy vị trí
- Cho phép trình duyệt truy cập vị trí
- Kiểm tra kết nối internet
- Đảm bảo thiết bị có GPS

### 3. Form không submit
- Kiểm tra các trường bắt buộc
- Đảm bảo đã nhập đầy đủ thông tin
- Kiểm tra console để xem lỗi JavaScript
