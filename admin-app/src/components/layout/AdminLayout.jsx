import { useAppSelector } from '@/store/hooks'
import Sidebar from './Sidebar'
import Header from './Header'
import BreadcrumbNav from './BreadcrumbNav'
import { cn } from '@/lib/utils'

export default function AdminLayout({ children }) {
  const sidebarCollapsed = useAppSelector((state) => state.global.sidebarCollapsed)
  const sidebarOpen = useAppSelector((state) => state.global.sidebarOpen)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn(
        'transition-all duration-300',
        // Mobile: margin chỉ khi sidebar mở
        sidebarOpen ? 'ml-64' : 'ml-0',
        // Desktop: luôn có margin, tùy vào collapsed state
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64',
      )}>
        <Header />
        <main className="p-4">
          <div className="mb-4">
            {/* Breadcrumb */}
            <BreadcrumbNav />
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

