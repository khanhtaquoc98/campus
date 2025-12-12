import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import globalReducer from './slices/globalSlice'
import { baseApi } from './api/baseApi'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    global: globalReducer,
    // Thêm RTK Query reducer
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // Thêm middleware cho RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})