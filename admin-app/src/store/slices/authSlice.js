import { createSlice } from '@reduxjs/toolkit'
import { getAuthFromCookie, removeAuthFromCookie } from '@/lib/cookie'

// Try to get auth from cookie on initial load
const savedAuth = getAuthFromCookie()
const initialState = {
  user: savedAuth?.user || null,
  token: savedAuth?.token || null,
  isAuthenticated: !!(savedAuth?.user && savedAuth?.token),
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      // Remove from cookie
      removeAuthFromCookie()
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
})

export const { setCredentials, logout, setLoading, updateUser } = authSlice.actions

export default authSlice.reducer

