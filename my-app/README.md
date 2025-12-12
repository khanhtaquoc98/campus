# Website Trường Đại Học

Website tuyển sinh và thông tin cho trường đại học, được xây dựng với React, Redux Toolkit, React Hook Form và Shadcn UI.

## Tính năng

- ✅ Trang chủ với banner, giới thiệu, chương trình đào tạo và tin tức
- ✅ Trang đăng nhập với form validation
- ✅ Trang đăng ký tuyển sinh với 6 bước:
  1. Chọn loại chương trình (Trung Cấp, Cao Đẳng, Khóa học ngắn hạn)
  2. Chọn ngành học với autocomplete
  3. Nhập thông tin ứng viên
  4. Xác nhận thông tin
  5. Xác thực OTP
  6. Hiển thị link profile
- ✅ Trang liên hệ với form
- ✅ Trang giới thiệu
- ✅ Responsive design cho mobile, tablet và desktop
- ✅ Header và Footer nhất quán trên tất cả các trang

## Công nghệ sử dụng

- **React 19** - UI Framework
- **React Router DOM** - Routing
- **Redux Toolkit** - State Management
- **React Hook Form** - Form Management
- **Shadcn UI** - UI Components
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **RTK Query** - Data Fetching

## Cài đặt

1. Cài đặt dependencies:

```bash
yarn install
# hoặc
npm install
```

2. Chạy development server:

```bash
yarn dev
# hoặc
npm run dev
```

3. Mở trình duyệt tại `http://localhost:5173`

## Cấu trúc dự án

```
src/
├── components/
│   ├── form/          # Form components tích hợp react-hook-form
│   ├── layout/        # Header, Footer, Layout
│   └── ui/            # Base UI components (shadcn/ui)
├── pages/             # Các trang chính
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── AdmissionPage.jsx
│   ├── ContactPage.jsx
│   └── AboutPage.jsx
├── store/             # Redux store và slices
│   ├── api/           # RTK Query APIs
│   └── slices/        # Redux slices
├── lib/               # Utilities
└── App.jsx            # Main app với routing
```

## Các trang

### Trang chủ (`/`)
- Banner với call-to-action
- Giới thiệu về trường
- Chương trình đào tạo
- Tin tức & Sự kiện

### Đăng nhập (`/login`)
- Form đăng nhập với validation
- Link quên mật khẩu
- Link đăng ký

### Đăng ký tuyển sinh (`/admission`)
Quy trình 6 bước:
1. **Chọn loại chương trình**: Dropdown với 3 options
2. **Chọn ngành học**: Autocomplete với search
3. **Thông tin ứng viên**: Form với các trường bắt buộc
4. **Xác nhận**: Review thông tin đã nhập
5. **Xác thực OTP**: Nhập mã OTP (mã mẫu: 123456)
6. **Hoàn thành**: Hiển thị link profile với nút copy

### Liên hệ (`/contact`)
- Thông tin liên hệ
- Form gửi tin nhắn

### Giới thiệu (`/about`)
- Lịch sử hình thành
- Sứ mệnh & Tầm nhìn
- Điểm mạnh
- Thành tựu

## Form Components

Tất cả form components đã được tích hợp sẵn với react-hook-form:

- `FormInput` - Input text
- `FormInputNumber` - Input số
- `FormSelect` - Dropdown select
- `FormAutoComplete` - Autocomplete với search
- `FormDate` - Date picker
- `FormDateRange` - Date range picker
- `FormCheckbox` - Checkbox
- `FormRadio` - Radio button group

Xem thêm trong `src/components/form/README.md`

## Responsive Design

Website được thiết kế responsive với:
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Mobile menu với hamburger icon
- Responsive grid layouts

## Accessibility

- High contrast colors
- Keyboard navigation support
- Semantic HTML
- ARIA labels where needed

## Environment Variables

Tạo file `.env` nếu cần:

```
VITE_API_BASE_URL=https://api.example.com
VITE_TOKEN_COOKIE_NAME=token
```

## Build

Để build cho production:

```bash
yarn build
# hoặc
npm run build
```

## Preview

Xem preview của build:

```bash
yarn preview
# hoặc
npm run preview
```

## Lưu ý

- Mã OTP mẫu trong trang đăng ký: `123456`
- File upload trong form đăng ký cần được tích hợp với backend thực tế
- Các API endpoints cần được cấu hình trong `src/store/api/`

## License

MIT
