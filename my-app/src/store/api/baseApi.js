import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

// Helper function để lấy cookie theo tên
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
  return null
}

// Helper function để xóa cookie
const deleteCookie = (name, path = '/') => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`
}

// Tên cookie chứa token (có thể thay đổi theo nhu cầu)
const TOKEN_COOKIE_NAME = import.meta.env.VITE_TOKEN_COOKIE_NAME || 'token'

// Tạo axios instance với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Bật withCredentials để gửi cookie trong cross-origin requests
  withCredentials: true,
})

// Interceptor cho request (thêm token từ cookie)
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ cookie
    const token = getCookie(TOKEN_COOKIE_NAME)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor cho response (xử lý lỗi, refresh token, etc.)
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Xử lý lỗi chung ở đây
    if (error.response?.status === 401) {
      // Xử lý unauthorized - xóa token cookie
      deleteCookie(TOKEN_COOKIE_NAME)
      // Có thể redirect về trang login
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Base query sử dụng axios
const baseQuery = async (args, api, extraOptions) => {
  try {
    const result = await axiosInstance({
      url: typeof args === 'string' ? args : args.url,
      method: typeof args === 'string' ? 'GET' : args.method || 'GET',
      data: typeof args === 'object' && args.body ? args.body : undefined,
      params: typeof args === 'object' && args.params ? args.params : undefined,
      ...extraOptions,
    })
    return { data: result.data }
  } catch (axiosError) {
    return {
      error: {
        status: axiosError.response?.status,
        data: axiosError.response?.data || axiosError.message,
      },
    }
  }
}

// Tạo base API với RTK Query
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: [], // Thêm các tag types cho cache invalidation (ví dụ: ['Post', 'User'])
  endpoints: () => ({}),
})

// Export axios instance để sử dụng trực tiếp nếu cần
export { axiosInstance }

