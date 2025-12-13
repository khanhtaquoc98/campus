import { useState } from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

export default function Layout({ children, showSidebar = true }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex pt-16">
        {showSidebar && (
          <Sidebar 
            collapsed={sidebarCollapsed}
          />
        )}
        <main 
          className={`flex-1 p-6 animate-fadeIn bg-gray-50 transition-all duration-300 max-w-full overflow-x-hidden ${
            showSidebar && !sidebarCollapsed ? 'ml-64' : showSidebar && sidebarCollapsed ? 'ml-20' : 'ml-0'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
