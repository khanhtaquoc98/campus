# Quick Start Guide - Hệ Thống Quản Lý Giáo Vụ

## 🚀 Khởi Động Nhanh (5 phút)

### Bước 1: Cài đặt
```bash
# Đã có sẵn node_modules, chỉ cần chạy:
npm run dev
```

### Bước 2: Mở trình duyệt
Truy cập: **http://localhost:5174**

### Bước 3: Đăng nhập Demo
1. Click nút **"Đăng nhập Demo"** (màu xám)
2. Tự động đăng nhập và chuyển đến trang danh sách hồ sơ

### Bước 4: Khám phá các tính năng

#### 📋 Xem danh sách hồ sơ
- Có sẵn 25 hồ sơ mẫu
- Thử tìm kiếm: gõ "Nguyễn" vào ô tìm kiếm
- Thử lọc: chọn "Chờ duyệt" trong dropdown trạng thái
- Thử phân trang: click "Sau »" để xem trang tiếp theo

#### 👁️ Xem chi tiết hồ sơ
- Click nút **"Xem"** (màu xanh dương) trên bất kỳ hồ sơ nào
- Xem đầy đủ thông tin
- Thử duyệt hồ sơ: click **"✓ Duyệt hồ sơ"** (nếu hồ sơ đang chờ duyệt)

#### ➕ Thêm hồ sơ mới
1. Click **"+ Thêm hồ sơ mới"** (góc trên bên phải)
2. Điền form (các trường có dấu * là bắt buộc)
3. Click **"Tạo mới"**

**Ví dụ dữ liệu test:**
- Họ và tên: `Trần Thị B`
- Ngày sinh: `2002-03-15`
- Giới tính: `Nữ`
- CMND/CCCD: `123456789012`
- Email: `tranthib@example.com`
- Số điện thoại: `0912345678`
- Địa chỉ: `789 Đường DEF, Quận 3, TP.HCM`
- Chương trình: `Cao đẳng Kế toán`
- Trình độ: `Tốt nghiệp THPT`
- Năm tốt nghiệp: `2020`

#### ✏️ Sửa hồ sơ
1. Click nút **"Sửa"** (màu vàng) trên hồ sơ
2. Thay đổi thông tin
3. Click **"Cập nhật"**

#### 🗑️ Xóa hồ sơ
1. Click nút **"Xóa"** (màu đỏ)
2. Xác nhận trong popup

#### 🚪 Đăng xuất
- Click **"Đăng xuất"** ở góc trên bên phải

---

## 🎯 Test Cases Nhanh

### Test 1: Tìm kiếm
```
1. Vào trang danh sách
2. Gõ "A" vào ô tìm kiếm
3. Kết quả: Chỉ hiện hồ sơ có tên chứa "A"
```

### Test 2: Lọc theo trạng thái
```
1. Chọn "Đã duyệt" trong dropdown
2. Kết quả: Chỉ hiện hồ sơ có badge màu xanh
```

### Test 3: Validation form
```
1. Click "Thêm hồ sơ mới"
2. Để trống tất cả
3. Click "Tạo mới"
4. Kết quả: Hiện lỗi màu đỏ dưới các trường bắt buộc
```

### Test 4: Email validation
```
1. Nhập email: "abc" (không hợp lệ)
2. Kết quả: "Email không hợp lệ"
3. Nhập email: "abc@example.com" (hợp lệ)
4. Kết quả: Lỗi biến mất
```

### Test 5: Phone validation
```
1. Nhập SĐT: "123" (không hợp lệ)
2. Kết quả: "Số điện thoại phải là 10 chữ số và bắt đầu bằng 0"
3. Nhập SĐT: "0987654321" (hợp lệ)
4. Kết quả: Lỗi biến mất
```

---

## 🎨 Màu Sắc Trạng Thái

- 🟡 **Vàng** = Chờ duyệt (pending)
- 🟢 **Xanh** = Đã duyệt (approved)
- 🔴 **Đỏ** = Từ chối (rejected)

---

## 🔧 Troubleshooting

### Lỗi: Port 5174 đã được sử dụng
```bash
# Tìm và kill process
lsof -ti:5174 | xargs kill -9
# Hoặc Vite sẽ tự động chọn port khác (5175, 5176...)
```

### Lỗi: Không thấy dữ liệu
- Đảm bảo đã đăng nhập (click "Đăng nhập Demo")
- Refresh trang (F5)

### Lỗi: Form không submit
- Kiểm tra tất cả trường bắt buộc (có dấu *)
- Xem lỗi màu đỏ dưới mỗi trường
- Đảm bảo format đúng (email, phone, CMND)

---

## 📱 Test Responsive

### Desktop (> 768px)
- Layout 2 cột cho form
- Table đầy đủ các cột
- Header ngang

### Mobile (< 768px)
```bash
# Mở DevTools (F12)
# Click icon mobile/tablet
# Hoặc resize browser window
```

Kết quả:
- Layout 1 cột cho form
- Table scroll ngang
- Header dọc
- Buttons full width

---

## 🎓 Tips & Tricks

1. **Tìm kiếm nhanh**: Gõ bất kỳ phần nào của tên, email, hoặc SĐT
2. **Phím tắt**: Tab để di chuyển giữa các trường trong form
3. **Clear filter**: Chọn "Tất cả trạng thái" để xem lại tất cả
4. **Xem nhanh**: Click vào tên hồ sơ (nếu có link) để xem chi tiết
5. **Undo delete**: Không có! Cẩn thận khi xóa

---

## 📞 Liên Hệ & Hỗ Trợ

Nếu gặp vấn đề:
1. Đọc **HUONG_DAN_SU_DUNG.md** (chi tiết hơn)
2. Đọc **README.md** (kỹ thuật)
3. Check console browser (F12 → Console tab)
4. Check terminal output

---

## ✅ Checklist Hoàn Thành

- [ ] Chạy được `npm run dev`
- [ ] Mở được http://localhost:5174
- [ ] Đăng nhập Demo thành công
- [ ] Xem được danh sách 25 hồ sơ
- [ ] Tìm kiếm hoạt động
- [ ] Lọc theo trạng thái hoạt động
- [ ] Phân trang hoạt động
- [ ] Xem chi tiết hồ sơ
- [ ] Tạo hồ sơ mới thành công
- [ ] Sửa hồ sơ thành công
- [ ] Xóa hồ sơ thành công
- [ ] Duyệt/Từ chối hồ sơ thành công
- [ ] Đăng xuất thành công

**Nếu tất cả đều ✅ → Dự án hoạt động hoàn hảo! 🎉**

