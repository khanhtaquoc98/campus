# Admin App - Hướng Dẫn Sử Dụng

Admin Dashboard được xây dựng với React, Vite, Tailwind CSS, Shadcn UI, Redux Toolkit và React Router DOM.

## 📋 Mục Lục

- [Cài Đặt](#cài-đặt)
- [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
- [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
- [Các Thành Phần Chính](#các-thành-phần-chính)

---

## 🚀 Cài Đặt

### Yêu Cầu Hệ Thống

- Node.js >= 16.x
- npm hoặc yarn

### Cài Đặt Dependencies

```bash
npm install
```

### Chạy Development Server

```bash
npm run dev
```

### Build Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
# Kiểm tra lỗi
npm run lint

# Tự động sửa lỗi
npm run lint:fix
```

---

## 📁 Cấu Trúc Thư Mục

### Root Directory

```
admin-app/
├── src/                    # Source code chính
├── node_modules/           # Dependencies
├── .husky/                 # Git hooks (pre-commit linting)
├── index.html              # HTML entry point
├── package.json            # Dependencies và scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── eslint.config.js        # ESLint configuration
└── README.md               # File này
```

---

## 📂 Chi Tiết Cấu Trúc Thư Mục `src/`

### 1. `/src/components/` - Components

Thư mục chứa tất cả các React components được sử dụng trong ứng dụng.

#### `/src/components/ui/` - UI Components (Shadcn UI)

Các component UI cơ bản được xây dựng dựa trên Shadcn UI và Radix UI:

- **`button.jsx`** - Button component với các variants (default, outline, ghost, etc.)
- **`input.jsx`** - Input field component
- **`card.jsx`** - Card container component
- **`table.jsx`** - Table component với header, body, row, cell
- **`select.jsx`** - Dropdown select component
- **`checkbox.jsx`** - Checkbox component
- **`radio-group.jsx`** - Radio button group component
- **`dialog.jsx`** - Modal/Dialog component
- **`dropdown-menu.jsx`** - Dropdown menu component
- **`popover.jsx`** - Popover component
- **`tooltip.jsx`** - Tooltip component
- **`collapsible.jsx`** - Collapsible/Accordion component
- **`breadcrumb.jsx`** - Breadcrumb navigation component
- **`badge.jsx`** - Badge component
- **`label.jsx`** - Label component
- **`calendar.jsx`** - Calendar/Date picker component
- **`skeleton.jsx`** - Skeleton loading component

**Nhiệm vụ:** Cung cấp các component UI cơ bản, tái sử dụng được, tuân thủ design system của Shadcn UI.

#### `/src/components/form/` - Form Components

Các component form được tích hợp với React Hook Form:

- **`FormInput.jsx`** - Input text với validation
- **`FormInputNumber.jsx`** - Input số với min/max validation
- **`FormSelect.jsx`** - Select dropdown với options
- **`FormAutoComplete.jsx`** - Autocomplete với search
- **`FormDate.jsx`** - Date picker cho một ngày
- **`FormDateRange.jsx`** - Date picker cho khoảng thời gian
- **`FormCheckbox.jsx`** - Checkbox với validation
- **`FormRadio.jsx`** - Radio button group
- **`FormFileInput.jsx`** - File upload với preview
- **`index.js`** - Export tất cả form components

**Nhiệm vụ:** Cung cấp các component form đã tích hợp sẵn với React Hook Form, giảm boilerplate code khi tạo form.

**Xem thêm:** `src/components/form/README.md` để biết cách sử dụng chi tiết.

#### `/src/components/layout/` - Layout Components

Các component quản lý layout của ứng dụng:

- **`AdminLayout.jsx`** - Layout chính bao bọc toàn bộ admin pages, quản lý Sidebar và Header
- **`Sidebar.jsx`** - Sidebar navigation với menu items, hỗ trợ collapse/expand
- **`Header.jsx`** - Header bar với user menu, notifications, theme toggle
- **`BreadcrumbNav.jsx`** - Breadcrumb navigation hiển thị đường dẫn hiện tại

**Nhiệm vụ:** Quản lý layout chung của ứng dụng, navigation, và breadcrumbs.

#### `/src/components/common/` - Common Components

Các component dùng chung trong toàn bộ ứng dụng:

- **`DataTable.jsx`** - Table component với search, pagination, sorting
- **`FileViewerModal.jsx`** - Modal để xem file (images, PDFs, documents)
- **`ConfirmModal.jsx`** - Modal xác nhận hành động (approve, reject, delete)
- **`ActionFooter.jsx`** - Footer với các action buttons cố định ở cuối page

**Nhiệm vụ:** Cung cấp các component tái sử dụng cho các tính năng chung như table, modal, footer.

#### `/src/components/ProtectedRoute.jsx` - Route Protection

Component bảo vệ routes, kiểm tra authentication và permissions trước khi cho phép truy cập.

**Nhiệm vụ:** Bảo vệ các routes cần authentication, kiểm tra roles và permissions.

---

### 2. `/src/pages/` - Pages

Thư mục chứa các page components. Mỗi page thường chỉ import và export container tương ứng.

#### Cấu trúc:

```
pages/
├── Dashboard/
│   └── index.jsx          # Export DashboardContainer
├── Login/
│   └── index.jsx          # Login page
├── User/
│   └── index.jsx          # Export UserContainer
├── Applications/
│   └── index.jsx          # Export ApplicationsContainer
├── AcademicRecords/
│   ├── list.jsx           # Export AcademicRecordsContainer
│   ├── detail.jsx         # Detail page
│   ├── edit.jsx           # Edit page
│   └── create.jsx         # Create page
├── AcademicTraining/
│   └── list.jsx           # Export AcademicTrainingContainer
├── Setting/
│   └── index.jsx         # Export SettingContainer
├── Profile/
│   └── index.jsx         # Export ProfileContainer
└── Errors/
    ├── index.jsx          # Export error pages
    ├── Unauthorized.jsx   # 401 error page
    ├── Forbidden.jsx      # 403 error page
    ├── NotFound.jsx        # 404 error page
    ├── InternalServerError.jsx  # 500 error page
    └── Maintenance.jsx    # Maintenance page
```

**Nhiệm vụ:** Định nghĩa các page routes, mỗi page thường chỉ là wrapper import/export container tương ứng.

---

### 3. `/src/containers/` - Containers

Thư mục chứa các container components - nơi quản lý logic, state, và API calls cho mỗi page.

#### Cấu trúc:

```
containers/
├── Dashboard/
│   ├── index.jsx                    # Main container logic
│   └── components/
│       ├── StatsCard.jsx            # Stats card component
│       ├── RecentActivity.jsx       # Recent activity component
│       └── QuickActions.jsx         # Quick actions component
├── User/
│   ├── index.jsx                    # Main container logic
│   └── components/
│       └── UserList.jsx             # User list component
├── AcademicRecords/
│   └── list/
│       ├── index.jsx                # Main container (state, filtering, sorting)
│       ├── FilterSection.jsx        # Filter section component
│       ├── TableSection.jsx         # Table section component
│       └── components/
│           ├── Badges.jsx           # Badge components (Status, Aspiration, FeeInfo)
│           └── SortableHeader.jsx   # Sortable table header component
├── AcademicTraining/
│   ├── index.jsx
│   └── components/
│       └── TrainingProgramList.jsx
├── Applications/
│   ├── index.jsx
│   └── components/
│       └── ApplicationList.jsx
├── Setting/
│   ├── index.jsx
│   └── components/
│       ├── GeneralSettings.jsx
│       ├── NotificationSettings.jsx
│       ├── SecuritySettings.jsx
│       └── AppearanceSettings.jsx
└── Profile/
    ├── index.jsx
    └── components/
        ├── ProfileForm.jsx
        └── AccountSummary.jsx
```

**Nhiệm vụ:** 
- **Container (`index.jsx`)**: Quản lý state, logic, API calls, filtering, sorting cho page
- **Components**: Các component UI nhỏ hơn, tái sử dụng được trong container

**Pattern:** 1 page → 1 container → nhiều components

---

### 4. `/src/store/` - Redux Store

Thư mục quản lý state management với Redux Toolkit.

#### Cấu trúc:

```
store/
├── api/
│   ├── baseApi.js        # Base RTK Query API configuration
│   └── adminApi.js       # Admin-specific API endpoints
├── slices/
│   ├── globalSlice.js   # Global state (theme, sidebar, notifications)
│   └── authSlice.js     # Authentication state (user, token)
├── hooks.js             # Typed Redux hooks (useAppDispatch, useAppSelector)
├── store.js             # Redux store configuration
└── README.md            # Store documentation
```

**Nhiệm vụ:**

- **`store.js`**: Cấu hình Redux store, combine reducers
- **`hooks.js`**: Export typed hooks để sử dụng Redux trong components
- **`slices/globalSlice.js`**: Quản lý global UI state (theme, sidebar open/collapsed, notifications)
- **`slices/authSlice.js`**: Quản lý authentication state (user, token, isAuthenticated, loading)
- **`api/baseApi.js`**: Base RTK Query API với Axios instance, interceptors, error handling
- **`api/adminApi.js`**: Các API endpoints cụ thể cho admin (users, dashboard, applications, etc.)

**Xem thêm:** `src/store/README.md` để biết cách sử dụng chi tiết.

---

### 5. `/src/config/` - Configuration

Thư mục chứa các file cấu hình.

#### `/src/config/routes.js`

File định nghĩa tất cả routes của ứng dụng với roles và permissions.

**Nhiệm vụ:**
- Định nghĩa routes với cấu trúc 3 levels:
  - **Level 1**: Parent route (e.g., `/academic`) - có thể không có component
  - **Level 2**: Child route (e.g., `/academic/records`) - có component
  - **Level 3**: Grandchild route (e.g., `/academic/records/create`) - có component
- Quản lý roles và permissions cho mỗi route
- Export functions:
  - `getAllRoutes()`: Lấy tất cả routes dạng flat array
  - `getMenuItems()`: Lấy menu items cho sidebar
  - `getFilteredMenuItems(user)`: Lọc menu items theo user permissions
  - `canAccessRoute(route, user)`: Kiểm tra user có thể truy cập route không

**Ví dụ:**

```javascript
{
  path: '/academic',
  title: 'Học vụ',
  icon: GraduationCap,
  children: [
    {
      path: '/academic/records',
      title: 'Quản lý hồ sơ',
      component: AcademicRecords,
      children: [
        {
          path: '/academic/records/create',
          component: AcademicRecordCreate,
          title: 'Tạo hồ sơ',
        },
      ],
    },
  ],
}
```

---

### 6. `/src/constants/` - Constants

Thư mục chứa các constants, options, và dữ liệu tĩnh.

#### `/src/constants/AcademicRecords.js`

Chứa các constants liên quan đến Academic Records:
- `aspirationOptions`: Options cho nguyện vọng
- `majorOptions`: Options cho ngành học
- `genderOptions`: Options cho giới tính
- `feeInfoOptions`: Options cho thông tin lệ phí
- `ethnicityOptions`: Options cho dân tộc
- `statusOptions`: Options cho trạng thái

**Nhiệm vụ:** Centralize các constants để dễ quản lý và tái sử dụng.

---

### 7. `/src/lib/` - Library Utilities

Thư mục chứa các utility functions và helpers.

#### `/src/lib/utils.js`

Chứa utility functions:
- **`cn(...classes)`**: Function merge Tailwind CSS classes sử dụng `clsx` và `tailwind-merge`

**Nhiệm vụ:** Cung cấp các utility functions dùng chung.

#### `/src/lib/cookie.js`

Chứa các functions quản lý cookies:
- `getCookie(name)`: Lấy giá trị cookie
- `setCookie(name, value, days)`: Set cookie
- `removeCookie(name)`: Xóa cookie
- `getToken()`: Lấy authentication token từ cookie
- `setToken(token)`: Set authentication token vào cookie
- `removeToken()`: Xóa authentication token
- `getUser()`: Lấy user data từ cookie
- `setUser(user)`: Set user data vào cookie
- `removeUser()`: Xóa user data

**Nhiệm vụ:** Quản lý authentication tokens và user data trong cookies.

---

### 8. `/src/utils/` - Utilities

Thư mục chứa các utility functions khác.

#### `/src/utils/errorHandler.js`

Xử lý errors từ API và redirect đến error pages tương ứng:
- 401 → `/errors/401`
- 403 → `/errors/403`
- 500 → `/errors/500`

**Nhiệm vụ:** Centralize error handling và redirect logic.

#### `/src/utils/permissions.js`

Các functions kiểm tra permissions (có thể đã được move vào `config/routes.js`).

---

### 9. `/src/App.jsx` - Main App Component

Component chính của ứng dụng, định nghĩa routing.

**Nhiệm vụ:**
- Cấu hình React Router
- Map routes từ `config/routes.js`
- Wrap protected routes với `ProtectedRoute` và `AdminLayout`
- Render error pages không có layout

---

### 10. `/src/main.jsx` - Entry Point

Entry point của ứng dụng, render `App` component vào DOM.

**Nhiệm vụ:** Khởi tạo React app, render root component.

---

### 11. `/src/index.css` - Global Styles

File CSS global, import Tailwind CSS và định nghĩa CSS variables cho theme.

**Nhiệm vụ:** Định nghĩa global styles, theme variables, và Tailwind directives.

---

## 🎯 Các Thành Phần Chính

### 1. Authentication Flow

1. User đăng nhập qua `/login`
2. Credentials được lưu vào cookies (`lib/cookie.js`)
3. `authSlice` cập nhật state với user và token
4. `ProtectedRoute` kiểm tra `isAuthenticated` trước khi cho phép truy cập
5. API calls tự động thêm token vào headers (qua `baseApi.js` interceptors)

### 2. Routing Structure

- **Public routes**: `/login`, `/errors/*` - không cần authentication
- **Protected routes**: Tất cả routes khác - cần authentication và có thể cần permissions

Routes được định nghĩa trong `config/routes.js` với cấu trúc 3 levels.

### 3. State Management

- **Redux Toolkit**: Quản lý global state (auth, UI state)
- **RTK Query**: Quản lý API calls và caching
- **React Hook Form**: Quản lý form state và validation

### 4. Component Pattern

- **Pages**: Wrapper import/export containers
- **Containers**: Logic, state, API calls
- **Components**: UI components tái sử dụng

### 5. Form Handling

Sử dụng React Hook Form với các form components trong `components/form/`:
- Tự động validation
- Error handling
- Integration với Shadcn UI

---

## 📝 Best Practices

### 1. Tạo Page Mới

1. Tạo page trong `pages/YourPage/index.jsx`:
```javascript
import YourPageContainer from '@/containers/YourPage'
export default YourPageContainer
```

2. Tạo container trong `containers/YourPage/index.jsx`:
```javascript
// Logic, state, API calls
export default function YourPageContainer() {
  // ...
}
```

3. Tạo components trong `containers/YourPage/components/`:
```javascript
// UI components
export default function YourComponent() {
  // ...
}
```

4. Thêm route vào `config/routes.js`

### 2. Sử dụng Form Components

```javascript
import { useForm } from 'react-hook-form'
import { FormInput, FormSelect } from '@/components/form'

function MyForm() {
  const { control, handleSubmit } = useForm()
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        name="email"
        label="Email"
        rules={{ required: 'Email is required' }}
      />
    </form>
  )
}
```

### 3. Sử dụng Redux

```javascript
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTheme } from '@/store/slices/globalSlice'

function MyComponent() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.global.theme)
  
  const handleToggle = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }
}
```

### 4. Sử dụng RTK Query

```javascript
import { useGetUsersQuery } from '@/store/api/adminApi'

function UsersPage() {
  const { data, isLoading, error } = useGetUsersQuery()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  
  return <div>{/* Render users */}</div>
}
```

---

## 🔧 Configuration Files

### `vite.config.js`

Cấu hình Vite với path aliases:
- `@` → `src`
- `@lib` → `src/lib`
- `@components` → `src/components`
- `@admin` → `src`

### `tailwind.config.js`

Cấu hình Tailwind CSS với Shadcn theme, colors, animations.

### `eslint.config.js`

Cấu hình ESLint cho code quality và style.

### `.husky/pre-commit`

Git hook chạy lint-staged trước khi commit.

---

## 📚 Tài Liệu Tham Khảo

- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Router DOM](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 License

MIT
