import { Button } from '@/components/ui/button'
import { Moon, Sun, Bell, User, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTheme } from '@/store/slices/globalSlice'
import { logout } from '@/store/slices/authSlice'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useAppSelector((state) => state.global.theme)
  const user = useAppSelector((state) => state.auth.user)
  const darkMode = theme === 'dark'

  const toggleDarkMode = () => {
    const newTheme = darkMode ? 'light' : 'dark'
    dispatch(setTheme(newTheme))
    document.documentElement.classList.toggle('dark')
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {/* Removed menu button - collapse button is in sidebar */}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="relative h-8 w-8 rounded-full p-0 overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer">
                  <span className="text-primary font-semibold text-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || 'admin@example.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

