import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setCredentials } from '@/store/slices/authSlice'
import { saveAuthToCookie, getAuthFromCookie } from '@/lib/cookie'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogIn, Lock, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Check if already authenticated (from cookie or Redux)
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
      return
    }

    // Check cookie for saved auth
    const savedAuth = getAuthFromCookie()
    if (savedAuth && savedAuth.user && savedAuth.token) {
      dispatch(setCredentials(savedAuth))
      // Navigation will happen automatically when Redux state updates
    }
  }, [isAuthenticated, navigate, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Check credentials
    if (username === 'admin' && password === 'admin') {
      const authData = {
        user: {
          id: 1,
          username: 'admin',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        },
        token: 'mock-token-' + Date.now()
      }

      // Save to cookie
      saveAuthToCookie(authData.user, authData.token)

      // Set credentials in Redux
      dispatch(setCredentials(authData))

      // Redirect to dashboard
      navigate('/', { replace: true })
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập thông tin đăng nhập để tiếp tục
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>Thông tin đăng nhập mặc định:</p>
              <p className="font-mono mt-1">admin / admin</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

