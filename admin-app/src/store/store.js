import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './slices/globalSlice'
import authReducer from './slices/authSlice'
import { baseApi } from './api/baseApi'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    // Thêm RTK Query reducer
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // Thêm middleware cho RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

