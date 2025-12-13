# Hướng dẫn Setup và Chạy Ứng dụng

## Cài đặt Dependencies

Chạy lệnh sau để cài đặt tất cả dependencies:

```bash
npm install
```

Hoặc nếu dùng yarn:

```bash
yarn install
```

## Dependencies cần thiết

Đảm bảo các package sau đã được cài đặt:

- `react` và `react-dom`
- `react-router-dom`
- `axios`
- `lucide-react` (cho icons)
- `tailwindcss`, `postcss`, `autoprefixer` (dev dependencies)

## Chạy ứng dụng

Sau khi cài đặt dependencies, chạy:

```bash
npm run dev
```

Hoặc:

```bash
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

## Kiểm tra lỗi

Nếu gặp lỗi khi chạy:

1. **Lỗi module not found**: Chạy lại `npm install`
2. **Lỗi Tailwind CSS**: Đảm bảo `tailwind.config.js` và `postcss.config.js` đã được tạo
3. **Lỗi import**: Kiểm tra các file components đã được tạo đúng

## Cấu trúc Components

- `src/components/Header.jsx` - Header với user info và logout
- `src/components/Sidebar.jsx` - Sidebar navigation
- `src/components/Layout.jsx` - Layout wrapper
- `src/components/ProtectedRoute.jsx` - Protected route component

## Pages

- `src/pages/Login.jsx` - Trang đăng nhập
- `src/pages/ApplicationList.jsx` - Danh sách hồ sơ
- `src/pages/ApplicationDetail.jsx` - Chi tiết hồ sơ
- `src/pages/ApplicationForm.jsx` - Form tạo/sửa hồ sơ

