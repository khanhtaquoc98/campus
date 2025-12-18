# Redux Store Structure

This directory contains the Redux store configuration and slices for the admin app.

## Structure

```
store/
├── api/
│   ├── baseApi.js      # Base RTK Query API configuration
│   └── adminApi.js     # Admin-specific API endpoints
├── slices/
│   ├── globalSlice.js  # Global state (theme, sidebar, notifications)
│   └── authSlice.js    # Authentication state
├── hooks.js            # Typed Redux hooks
├── store.js            # Store configuration
└── README.md           # This file
```

## Usage

### Using Redux Hooks

```javascript
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTheme, toggleSidebar } from '@/store/slices/globalSlice'

function MyComponent() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.global.theme)
  
  const handleToggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }
  
  return <button onClick={handleToggleTheme}>Toggle Theme</button>
}
```

### Using RTK Query

```javascript
import { useGetUsersQuery, useCreateUserMutation } from '@/store/api/adminApi'

function UsersPage() {
  const { data, isLoading, error } = useGetUsersQuery()
  const [createUser] = useCreateUserMutation()
  
  const handleCreate = async (userData) => {
    try {
      await createUser(userData).unwrap()
      // User created successfully
    } catch (err) {
      // Handle error
    }
  }
  
  // ... rest of component
}
```

## Slices

### globalSlice
- `theme`: 'light' | 'dark'
- `sidebarOpen`: boolean
- `notifications`: array

### authSlice
- `user`: user object
- `token`: authentication token
- `isAuthenticated`: boolean
- `loading`: boolean

## API Configuration

The `baseApi.js` file configures:
- Axios instance with interceptors
- Token management via cookies
- Error handling
- Base URL from environment variables

Environment variables:
- `VITE_API_BASE_URL`: API base URL
- `VITE_TOKEN_COOKIE_NAME`: Cookie name for token (default: 'token')

