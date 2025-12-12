# Hệ Thống Quản Lý Giáo Vụ

Ứng dụng web quản lý hồ sơ đăng ký cho trường Trung cấp / Cao đẳng, được xây dựng bằng React + Vite.

> 👋 **Mới bắt đầu?** Đọc [START_HERE.md](START_HERE.md) hoặc [QUICK_START.md](QUICK_START.md) để chạy ứng dụng trong 5 phút!

## Tính năng

- ✅ **Đăng nhập**: Xác thực người dùng với JWT token
- ✅ **Danh sách hồ sơ**: Hiển thị tất cả hồ sơ đăng ký với phân trang và tìm kiếm
- ✅ **Chi tiết hồ sơ**: Xem thông tin chi tiết của từng hồ sơ
- ✅ **CRUD hồ sơ**: Tạo mới, chỉnh sửa, xóa hồ sơ
- ✅ **Lọc và tìm kiếm**: Tìm kiếm theo tên, email, số điện thoại và lọc theo trạng thái
- ✅ **Duyệt hồ sơ**: Phê duyệt hoặc từ chối hồ sơ đăng ký

## Công nghệ sử dụng

- **React 18** - Thư viện UI
- **Vite** - Build tool và dev server
- **React Router v6** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Cài đặt

### Yêu cầu

- Node.js >= 16.x
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd ministry-page
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

4. Cấu hình API URL trong file `.env`:
```
VITE_API_URL=http://localhost:3000/api
```

5. Chạy development server:
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5174`

## Chế độ Demo

Ứng dụng có sẵn chế độ demo để test mà không cần backend:

1. Truy cập trang đăng nhập
2. Click nút "Đăng nhập Demo"
3. Hệ thống sẽ tự động đăng nhập với dữ liệu mẫu

## Cấu trúc thư mục

```
src/
├── components/          # Các component dùng chung
│   ├── Layout.jsx      # Layout chính của ứng dụng
│   └── ProtectedRoute.jsx  # Route bảo vệ yêu cầu đăng nhập
├── contexts/           # React Context
│   └── AuthContext.jsx # Context quản lý authentication
├── pages/              # Các trang chính
│   ├── Login.jsx       # Trang đăng nhập
│   ├── ApplicationList.jsx    # Danh sách hồ sơ
│   ├── ApplicationDetail.jsx  # Chi tiết hồ sơ
│   └── ApplicationForm.jsx    # Form tạo/sửa hồ sơ
├── services/           # API services
│   └── api.js          # Cấu hình axios và API endpoints
└── utils/              # Utility functions
```

## API Endpoints

Ứng dụng cần backend API với các endpoints sau:

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất

### Applications (Hồ sơ)
- `GET /api/applications` - Lấy danh sách hồ sơ
- `GET /api/applications/:id` - Lấy chi tiết hồ sơ
- `POST /api/applications` - Tạo hồ sơ mới
- `PUT /api/applications/:id` - Cập nhật hồ sơ
- `DELETE /api/applications/:id` - Xóa hồ sơ
- `PATCH /api/applications/:id/status` - Cập nhật trạng thái hồ sơ

## Scripts

```bash
# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Tính năng nâng cao có thể thêm

- [ ] Upload file đính kèm (CMND, bằng cấp, ảnh)
- [ ] Export danh sách hồ sơ ra Excel/PDF
- [ ] Thông báo realtime
- [ ] Phân quyền người dùng (admin, staff)
- [ ] Dashboard thống kê
- [ ] Lịch sử thay đổi hồ sơ
- [ ] Gửi email thông báo tự động

## License

MIT
