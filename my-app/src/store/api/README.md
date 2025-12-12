# RTK Query với Axios

## Cấu trúc

- `baseApi.js`: Cấu hình base API với axios instance và interceptors
- `exampleApi.js`: Ví dụ về cách tạo API endpoints

## Cách sử dụng

### 1. Tạo API endpoints mới

Tạo file mới trong thư mục `api/` và inject endpoints vào `baseApi`:

```javascript
import { baseApi } from './baseApi'

export const yourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => ({
        url: '/your-endpoint',
        method: 'GET',
      }),
    }),
    createData: builder.mutation({
      query: (data) => ({
        url: '/your-endpoint',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useGetDataQuery, useCreateDataMutation } = yourApi
```

### 2. Sử dụng trong Component

```javascript
import { useGetUsersQuery, useCreateUserMutation } from '@/store/api/exampleApi'

function MyComponent() {
  // Query (GET request)
  const { data, isLoading, error, refetch } = useGetUsersQuery()
  
  // Mutation (POST/PUT/DELETE)
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()

  const handleCreate = async () => {
    try {
      const result = await createUser({ name: 'John', email: 'john@example.com' }).unwrap()
      console.log('Created:', result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {data?.map(user => <div key={user.id}>{user.name}</div>)}
      <button onClick={handleCreate}>Create User</button>
    </div>
  )
}
```

### 3. Cấu hình Base URL

Thêm vào file `.env`:
```
VITE_API_BASE_URL=https://your-api-url.com
```

### 4. Authentication với Cookie

Token được tự động lấy từ cookie và thêm vào request headers.

**Cấu hình tên cookie (tùy chọn):**

Thêm vào file `.env`:
```
VITE_TOKEN_COOKIE_NAME=your_token_cookie_name
```

Mặc định sẽ tìm cookie có tên `token`.

**Cách hoạt động:**
- Token được tự động đọc từ cookie trong mỗi request
- Khi nhận được lỗi 401 (Unauthorized), token cookie sẽ tự động bị xóa
- `withCredentials: true` đã được bật để gửi cookie trong cross-origin requests

**Lưu ý:** Backend cần set cookie với các thuộc tính phù hợp:
- `HttpOnly`: true (để bảo mật, không cho JavaScript truy cập)
- `Secure`: true (chỉ gửi qua HTTPS)
- `SameSite`: 'strict' hoặc 'lax' (tùy nhu cầu)

