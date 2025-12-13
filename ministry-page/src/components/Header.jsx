import { useNavigate } from "react-router-dom"
import { 
  Plus, 
  Moon, 
  Bell, 
  MessageCircle, 
  BarChart3, 
  Settings,
  LogOut,
  Flag,
  Menu,
  GraduationCap
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

export function Header({ onToggleSidebar }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Hamburger Menu */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Toggle sidebar"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 flex-shrink-0 shadow-sm">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">PreSkool</h1>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Flag className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Plus className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Moon className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <MessageCircle className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <BarChart3 className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
            
            {/* User Profile */}
            {user && (
              <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-gray-200">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {user?.name?.[0] || user?.username?.[0] || 'U'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="h-4 w-4 text-gray-600 hover:text-red-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
