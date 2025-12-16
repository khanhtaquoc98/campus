import { Link, useLocation } from "react-router-dom"
import { Home, FileText, GraduationCap } from "lucide-react"

export function Sidebar({ collapsed = false }) {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  const menuItems = [
    {
      path: "/",
      label: "Trang Chủ",
      icon: Home,
    },
    {
      path: "/applications",
      label: "Quản Lý Hồ Sơ",
      icon: FileText,
    },
    {
      path: "/programs",
      label: "Quản Lý Đào Tạo",
      icon: GraduationCap,
    },
  ]

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white flex flex-col transition-all duration-300 z-40 ${
      collapsed ? 'w-20' : 'w-64'
      }`}>
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-2.5 rounded-lg transition-all group ${
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-50"
                    }`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-indigo-600' : 'text-gray-500'}`} />
                  {!collapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
