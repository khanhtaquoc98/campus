# Hướng Dẫn Sử Dụng Hệ Thống Quản Lý Giáo Vụ

## 1. Đăng Nhập

### Đăng nhập với tài khoản thật (cần backend API)
1. Mở ứng dụng tại `http://localhost:5174`
2. Nhập tên đăng nhập và mật khẩu
3. Click "Đăng nhập"

### Đăng nhập Demo (không cần backend)
1. Mở ứng dụng tại `http://localhost:5174`
2. Click nút "Đăng nhập Demo"
3. Hệ thống sẽ tự động đăng nhập với dữ liệu mẫu

## 2. Xem Danh Sách Hồ Sơ

Sau khi đăng nhập, bạn sẽ thấy danh sách tất cả hồ sơ đăng ký.

### Tính năng:
- **Tìm kiếm**: Nhập tên, email hoặc số điện thoại vào ô tìm kiếm
- **Lọc theo trạng thái**: 
  - Tất cả trạng thái
  - Chờ duyệt (màu vàng)
  - Đã duyệt (màu xanh)
  - Từ chối (màu đỏ)
- **Phân trang**: Điều hướng qua các trang (10 hồ sơ/trang)
- **Thao tác**:
  - **Xem**: Xem chi tiết hồ sơ
  - **Sửa**: Chỉnh sửa thông tin hồ sơ
  - **Xóa**: Xóa hồ sơ (có xác nhận)

## 3. Thêm Hồ Sơ Mới

1. Click nút "+ Thêm hồ sơ mới" ở góc trên bên phải
2. Điền đầy đủ thông tin:

### Thông tin cá nhân:
- Họ và tên (*)
- Ngày sinh (*)
- Giới tính (*)
- CMND/CCCD (*) - 9-12 chữ số

### Thông tin liên hệ:
- Email (*) - định dạng email hợp lệ
- Số điện thoại (*) - 10 chữ số, bắt đầu bằng 0
- Địa chỉ (*)

### Thông tin đăng ký:
- Chương trình đào tạo (*):
  - Cao đẳng CNTT
  - Cao đẳng Kế toán
  - Trung cấp CNTT
  - Trung cấp Kế toán
  - Đào tạo ngắn hạn - Lập trình
  - Đào tạo ngắn hạn - Kế toán
- Trình độ học vấn (*)
- Năm tốt nghiệp (*)
- Ghi chú (tùy chọn)

3. Click "Tạo mới" để lưu hồ sơ
4. Click "Hủy" để quay lại danh sách

**Lưu ý**: Các trường có dấu (*) là bắt buộc

## 4. Xem Chi Tiết Hồ Sơ

1. Từ danh sách, click nút "Xem" trên hồ sơ muốn xem
2. Xem đầy đủ thông tin hồ sơ được chia thành các phần:
   - Thông tin cá nhân
   - Thông tin liên hệ
   - Thông tin đăng ký

### Thao tác có thể thực hiện:
- **Quay lại**: Về danh sách hồ sơ
- **Chỉnh sửa**: Sửa thông tin hồ sơ
- **Xóa**: Xóa hồ sơ (có xác nhận)
- **Duyệt hồ sơ**: Chỉ hiện với hồ sơ "Chờ duyệt"
  - ✓ Duyệt hồ sơ: Chấp nhận hồ sơ
  - ✗ Từ chối hồ sơ: Từ chối hồ sơ

## 5. Chỉnh Sửa Hồ Sơ

1. Từ danh sách hoặc trang chi tiết, click "Sửa"
2. Form sẽ hiển thị với thông tin hiện tại
3. Chỉnh sửa các trường cần thiết
4. Click "Cập nhật" để lưu thay đổi
5. Click "Hủy" để bỏ qua thay đổi

## 6. Xóa Hồ Sơ

1. Từ danh sách hoặc trang chi tiết, click "Xóa"
2. Xác nhận xóa trong hộp thoại
3. Hồ sơ sẽ bị xóa vĩnh viễn

**Cảnh báo**: Thao tác này không thể hoàn tác!

## 7. Đăng Xuất

Click nút "Đăng xuất" ở góc trên bên phải để thoát khỏi hệ thống.

## Lưu Ý Quan Trọng

### Chế độ Demo
- Khi sử dụng chế độ demo, dữ liệu chỉ tồn tại trong bộ nhớ trình duyệt
- Các thao tác CRUD sẽ không thực sự gọi API backend
- Dữ liệu sẽ bị mất khi refresh trang

### Chế độ Production (với Backend)
- Cần cấu hình `VITE_API_URL` trong file `.env`
- Backend API phải implement đầy đủ các endpoints
- Dữ liệu được lưu trữ trong database

## Xử Lý Lỗi

### Lỗi đăng nhập
- Kiểm tra tên đăng nhập và mật khẩu
- Kiểm tra kết nối backend API
- Sử dụng chế độ Demo để test

### Lỗi không tải được danh sách
- Kiểm tra kết nối mạng
- Kiểm tra backend API đang chạy
- Xem console browser để biết chi tiết lỗi

### Lỗi validation form
- Đọc thông báo lỗi màu đỏ dưới mỗi trường
- Điền đầy đủ các trường bắt buộc (*)
- Đảm bảo định dạng dữ liệu đúng (email, số điện thoại, CMND)

## Hỗ Trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console browser (F12)
2. Kiểm tra log backend API
3. Đọc file README.md để biết thêm chi tiết kỹ thuật

