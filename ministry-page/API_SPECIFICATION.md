# API Specification - Hệ Thống Quản Lý Giáo Vụ

## Base URL
```
http://localhost:3000/api
```

## Authentication

Tất cả các API (trừ login) yêu cầu JWT token trong header:
```
Authorization: Bearer <token>
```

---

## 1. Authentication APIs

### 1.1. Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "name": "Quản trị viên",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "Tên đăng nhập hoặc mật khẩu không đúng"
}
```

### 1.2. Logout
**Endpoint:** `POST /auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

---

## 2. Application APIs (Hồ sơ đăng ký)

### 2.1. Get All Applications
**Endpoint:** `GET /applications`

**Query Parameters:**
- `page` (optional): Số trang (default: 1)
- `limit` (optional): Số lượng/trang (default: 10)
- `search` (optional): Tìm kiếm theo tên, email, phone
- `status` (optional): Lọc theo trạng thái (pending, approved, rejected)

**Example:**
```
GET /applications?page=1&limit=10&search=nguyen&status=pending
```

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "fullName": "Nguyễn Văn A",
      "gender": "male",
      "dateOfBirth": "2000-01-15",
      "placeOfBirth": "Hà Nội",
      "hometown": "Hà Nội",
      "idCard": "001234567890",
      "permanentAddress": "123 Đường ABC, Phường XYZ, Quận Đống Đa, Hà Nội",
      "contactAddress": "456 Đường DEF, Phường GHI, Quận Cầu Giấy, Hà Nội",
      "phone": "0987654321",
      "email": "nguyenvana@example.com",
      "ethnicity": "Kinh",
      "occupation": "Nhân viên văn phòng",
      "workplace": "Công ty ABC",
      "position": "Nhân viên",
      "educationLevel": "Tốt nghiệp THPT",
      "highSchool": "THPT Nguyễn Huệ",
      "graduationType": "Chính quy",
      "gpa": "8.5",
      "program": "cao-dang",
      "major": "Công nghệ thông tin",
      "birthCertificate": "giay-khai-sinh.pdf",
      "idCardFile": "cmnd.pdf",
      "transcript": "hoc-ba.pdf",
      "diploma": "bang-tot-nghiep.pdf",
      "otherCertificates": "chung-chi-tieng-anh.pdf",
      "additionalDocuments": "",
      "admissionFeeReceipt": "bien-lai.pdf",
      "status": "pending",
      "submittedAt": "2024-01-15T10:30:00Z",
      "notes": "Học sinh có thành tích tốt"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### 2.2. Get Application by ID
**Endpoint:** `GET /applications/:id`

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "fullName": "Nguyễn Văn A",
    "gender": "male",
    "dateOfBirth": "2000-01-15",
    "placeOfBirth": "Hà Nội",
    "hometown": "Hà Nội",
    "idCard": "001234567890",
    "permanentAddress": "123 Đường ABC, Phường XYZ, Quận Đống Đa, Hà Nội",
    "contactAddress": "456 Đường DEF, Phường GHI, Quận Cầu Giấy, Hà Nội",
    "phone": "0987654321",
    "email": "nguyenvana@example.com",
    "ethnicity": "Kinh",
    "occupation": "Nhân viên văn phòng",
    "workplace": "Công ty ABC",
    "position": "Nhân viên",
    "educationLevel": "Tốt nghiệp THPT",
    "highSchool": "THPT Nguyễn Huệ",
    "graduationType": "Chính quy",
    "gpa": "8.5",
    "program": "cao-dang",
    "major": "Công nghệ thông tin",
    "birthCertificate": "giay-khai-sinh.pdf",
    "idCardFile": "cmnd.pdf",
    "transcript": "hoc-ba.pdf",
    "diploma": "bang-tot-nghiep.pdf",
    "otherCertificates": "chung-chi-tieng-anh.pdf",
    "additionalDocuments": "",
    "admissionFeeReceipt": "bien-lai.pdf",
    "status": "pending",
    "submittedAt": "2024-01-15T10:30:00Z",
    "notes": "Học sinh có thành tích tốt"
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Không tìm thấy hồ sơ"
}
```

### 2.3. Create Application
**Endpoint:** `POST /applications`

**Request Body:**
```json
{
  "fullName": "Nguyễn Văn B",
  "gender": "male",
  "dateOfBirth": "2001-05-20",
  "placeOfBirth": "TP.HCM",
  "hometown": "TP.HCM",
  "idCard": "001234567891",
  "permanentAddress": "456 Đường XYZ, Quận 2, TP.HCM",
  "contactAddress": "456 Đường XYZ, Quận 2, TP.HCM",
  "phone": "0987654322",
  "email": "nguyenvanb@example.com",
  "ethnicity": "Kinh",
  "occupation": "",
  "workplace": "",
  "position": "",
  "educationLevel": "Tốt nghiệp THPT",
  "highSchool": "THPT Lê Quý Đôn",
  "graduationType": "Chính quy",
  "gpa": "7.5",
  "program": "cao-dang",
  "major": "Kế toán",
  "birthCertificate": "giay-khai-sinh-2.pdf",
  "idCardFile": "cmnd-2.pdf",
  "transcript": "hoc-ba-2.pdf",
  "diploma": "bang-tot-nghiep-2.pdf",
  "otherCertificates": "",
  "additionalDocuments": "",
  "admissionFeeReceipt": "",
  "notes": "Có kinh nghiệm làm việc"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "message": "Tạo hồ sơ thành công",
  "data": {
    "id": 2,
    "fullName": "Nguyễn Văn B",
    ...
    "status": "pending",
    "submittedAt": "2024-01-16T14:20:00Z"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": {
    "email": "Email đã tồn tại",
    "idCard": "CMND/CCCD đã được sử dụng"
  }
}
```

### 2.4. Update Application
**Endpoint:** `PUT /applications/:id`

**Request Body:** (Giống Create Application)

**Response Success (200):**
```json
{
  "success": true,
  "message": "Cập nhật hồ sơ thành công",
  "data": {
    "id": 1,
    ...
  }
}
```

### 2.5. Delete Application
**Endpoint:** `DELETE /applications/:id`

**Response Success (200):**
```json
{
  "success": true,
  "message": "Xóa hồ sơ thành công"
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Không tìm thấy hồ sơ"
}
```

### 2.6. Update Application Status
**Endpoint:** `PATCH /applications/:id/status`

**Request Body:**
```json
{
  "status": "approved"
}
```

**Valid status values:**
- `pending` - Chờ duyệt
- `approved` - Đã duyệt
- `rejected` - Từ chối

**Response Success (200):**
```json
{
  "success": true,
  "message": "Cập nhật trạng thái thành công",
  "data": {
    "id": 1,
    "status": "approved"
  }
}
```

---

## Data Models

### User
```typescript
{
  id: number;
  username: string;
  name: string;
  role: 'admin' | 'staff';
}
```

### Application
```typescript
{
  id: number;

  // Thông tin cá nhân (Bắt buộc)
  fullName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string; // ISO 8601 format (YYYY-MM-DD)
  placeOfBirth: string;
  hometown: string;
  idCard: string; // 9-12 chữ số
  permanentAddress: string;
  contactAddress: string;
  phone: string; // 10 chữ số, bắt đầu bằng 0
  email: string;
  ethnicity: string;

  // Thông tin cá nhân (Không bắt buộc)
  occupation?: string;
  workplace?: string;
  position?: string;

  // Thông tin học tập (Bắt buộc)
  educationLevel: string;
  highSchool: string;
  graduationType: string; // 'Chính quy' | 'Tự do' | 'Liên thông' | 'Văn bằng 2'
  gpa: string; // Điểm trung bình 0-10

  // Nguyện vọng (Bắt buộc)
  program: 'trung-cap' | 'cao-dang';
  major: string; // Ngành học

  // Files đính kèm (Bắt buộc)
  birthCertificate: string; // URL hoặc tên file
  idCardFile: string;
  transcript: string;
  diploma: string;

  // Files đính kèm (Không bắt buộc)
  otherCertificates?: string;
  additionalDocuments?: string;
  admissionFeeReceipt?: string;

  // Metadata
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string; // ISO 8601 format
  notes?: string;
}
```

---

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in or invalid token)
- `403` - Forbidden (no permission)
- `404` - Not Found
- `500` - Internal Server Error

