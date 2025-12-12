# Hướng Dẫn Tích Hợp Backend

## 🔌 Kết Nối Frontend với Backend API

### Bước 1: Cấu hình API URL

1. Tạo file `.env` từ template:
```bash
cp .env.example .env
```

2. Sửa file `.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

Hoặc URL backend của bạn:
```env
VITE_API_URL=https://api.yourdomain.com/api
```

### Bước 2: Tắt Demo Mode

Mở file `src/pages/Login.jsx` và comment/xóa phần demo login:

```jsx
// Comment hoặc xóa function này
/*
const handleDemoLogin = () => {
  const demoUser = { ... };
  const demoToken = 'demo-token-12345';
  login(demoUser, demoToken);
  navigate('/applications');
};
*/
```

Và xóa nút demo trong JSX:
```jsx
{/* Xóa phần này
<div className="demo-section">
  <hr />
  <p className="demo-text">Hoặc dùng tài khoản demo</p>
  <button type="button" onClick={handleDemoLogin} className="btn-demo">
    Đăng nhập Demo
  </button>
</div>
*/}
```

### Bước 3: Xóa Demo Data

Trong các file sau, xóa phần generate demo data:

**`src/pages/ApplicationList.jsx`:**
```jsx
// Xóa function này
/*
const generateDemoData = () => {
  return Array.from({ length: 25 }, ...);
};
*/

// Và sửa catch block:
catch (err) {
  console.error('Error fetching applications:', err);
  setError('Không thể tải danh sách hồ sơ');
  // Xóa dòng này: setApplications(generateDemoData());
}
```

**`src/pages/ApplicationDetail.jsx`:**
```jsx
// Sửa catch block:
catch (err) {
  console.error('Error fetching application:', err);
  setError('Không thể tải thông tin hồ sơ');
  // Xóa phần demo data
}
```

### Bước 4: Restart Development Server

```bash
# Stop server (Ctrl+C)
# Start lại
npm run dev
```

---

## 🔐 Backend Requirements

Backend API cần implement các endpoints sau (xem chi tiết trong `API_SPECIFICATION.md`):

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất

### Applications
- `GET /api/applications` - Lấy danh sách
- `GET /api/applications/:id` - Lấy chi tiết
- `POST /api/applications` - Tạo mới
- `PUT /api/applications/:id` - Cập nhật
- `DELETE /api/applications/:id` - Xóa
- `PATCH /api/applications/:id/status` - Cập nhật trạng thái

---

## 📋 Response Format

Backend phải trả về JSON theo format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": { ... } // Optional validation errors
}
```

---

## 🔑 JWT Token

### Login Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "name": "Admin User",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Token Usage
Frontend tự động gửi token trong header:
```
Authorization: Bearer <token>
```

### Token Expiration
Khi token hết hạn (401), frontend tự động:
1. Xóa token và user info
2. Redirect về trang login

---

## 🌐 CORS Configuration

Backend cần enable CORS cho frontend:

### Node.js/Express Example
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5174', // Frontend URL
  credentials: true
}));
```

### Production
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

---

## 🧪 Testing Backend Integration

### 1. Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

### 2. Test Get Applications (with token)
```bash
curl -X GET http://localhost:3000/api/applications \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Test Create Application
```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    ...
  }'
```

---

## 🐛 Troubleshooting

### Lỗi: CORS
**Triệu chứng:** Console hiện lỗi CORS  
**Giải pháp:** Enable CORS trên backend

### Lỗi: 401 Unauthorized
**Triệu chứng:** Tự động logout sau khi login  
**Giải pháp:** 
- Kiểm tra token format
- Kiểm tra backend verify token đúng

### Lỗi: Network Error
**Triệu chứng:** Không kết nối được API  
**Giải pháp:**
- Kiểm tra backend đang chạy
- Kiểm tra URL trong `.env`
- Kiểm tra firewall

### Lỗi: 400 Bad Request
**Triệu chứng:** Không tạo/sửa được hồ sơ  
**Giải pháp:**
- Kiểm tra format dữ liệu gửi lên
- Xem response error message
- Kiểm tra validation rules

---

## 📦 Backend Frameworks Suggestions

### Node.js
- Express.js + MongoDB/PostgreSQL
- NestJS (TypeScript)
- Fastify

### Python
- Django + Django REST Framework
- FastAPI
- Flask

### PHP
- Laravel
- Symfony

### Java
- Spring Boot

---

## 🔄 Migration from Demo to Production

1. ✅ Cấu hình `.env`
2. ✅ Xóa demo mode
3. ✅ Xóa demo data
4. ✅ Test login
5. ✅ Test CRUD operations
6. ✅ Test validation
7. ✅ Test error handling

---

## 📞 Support

Nếu gặp vấn đề khi tích hợp:
1. Kiểm tra console browser (F12)
2. Kiểm tra Network tab để xem request/response
3. Kiểm tra backend logs
4. Đọc `API_SPECIFICATION.md` để đảm bảo format đúng

