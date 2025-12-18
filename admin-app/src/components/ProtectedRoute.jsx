import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCredentials } from '@/store/slices/authSlice'
import { getAuthFromCookie } from '@/lib/cookie'
import { canAccessRoute } from '@/config/routes'

export default function ProtectedRoute({ children, route }) {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const user = useAppSelector((state) => state.auth.user)
  const [hasCheckedCookie, setHasCheckedCookie] = useState(false)

  // Check cookie if not authenticated in Redux (only once)
  useEffect(() => {
    if (!isAuthenticated && !hasCheckedCookie) {
      const savedAuth = getAuthFromCookie()
      if (savedAuth && savedAuth.user && savedAuth.token) {
        dispatch(setCredentials(savedAuth))
      }
      setHasCheckedCookie(true)
    } else if (isAuthenticated) {
      setHasCheckedCookie(true)
    }
  }, [isAuthenticated, hasCheckedCookie, dispatch])

  // Wait for cookie check to complete
  if (!hasCheckedCookie && !isAuthenticated) {
    return null // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Check route permissions if route is provided
  if (route && user) {
    const hasAccess = canAccessRoute(route, user)
    if (!hasAccess) {
      // Redirect to dashboard if user doesn't have permission
      return <Navigate to="/" replace />
    }
  }

  return children
}

