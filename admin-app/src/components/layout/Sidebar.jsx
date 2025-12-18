import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSidebarOpen, toggleSidebarCollapsed } from '@/store/slices/globalSlice'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { getFilteredMenuItems } from '@/config/routes'

function MenuItemTooltip({ item, isActive, handleCloseSidebar }) {
  const Icon = item.icon
  const [tooltipOpen, setTooltipOpen] = useState(false)

  return (
    <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
      <TooltipTrigger asChild>
        <Link
          to={item.path}
          className={cn(
            'flex items-center justify-center rounded-lg text-sm font-medium transition-colors p-2',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          )}
          onClick={() => {
            handleCloseSidebar()
            setTooltipOpen(false)
          }}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        <p>{item.title}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function MenuItemWithChildren({ item, sidebarCollapsed, location, handleCloseSidebar }) {
  const Icon = item.icon
  const hasChildren = item.children && item.children.length > 0
  
  // Helper function để check nếu pathname match với child route (bao gồm cả dynamic routes và nested children)
  const isChildPathMatch = (childPath, pathname, childChildren = null) => {
    // Exact match
    if (childPath === pathname) return true
    
    // Check nếu child path là dynamic route (có :)
    if (childPath.includes(':')) {
      const pattern = childPath.replace(/:[^/]+/g, '[^/]+')
      const regex = new RegExp(`^${pattern}$`)
      if (regex.test(pathname)) return true
    }
    
    // Check nếu pathname bắt đầu với child path (cho trường hợp có params)
    // Ví dụ: /academic/records/1 startsWith /academic/records
    if (pathname.startsWith(childPath + '/')) {
      return true
    }
    
    // Check nested children (level 3)
    if (childChildren && childChildren.length > 0) {
      return childChildren.some(grandchild => isChildPathMatch(grandchild.path, pathname))
    }
    
    return false
  }
  
  // Check active state: exact match hoặc match với bất kỳ child nào (bao gồm nested children)
  const isActive = location.pathname === item.path ||
    (hasChildren && item.children.some(child => 
      isChildPathMatch(child.path, location.pathname, child.children)
    ))
  const isChildActive = hasChildren && item.children.some(child => isChildPathMatch(child.path, location.pathname))
  const [isOpen, setIsOpen] = useState(isChildActive)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [disableTooltip, setDisableTooltip] = useState(false)

  // Khi sidebar expanded: sử dụng Collapsible
  if (hasChildren && !sidebarCollapsed) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CollapsibleTrigger
          className={cn(
            'w-full flex items-center rounded-lg text-sm font-medium transition-colors gap-3 px-3 py-2',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
          )}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <span className="flex-1 text-left">{item.title}</span>
          <ChevronDown className={cn(
            'h-4 w-4 transition-transform',
            isOpen && 'transform rotate-180',
          )} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 mt-1 space-y-1 border-l-2 border-border ml-2">
          {item.children.map((child) => {
            // Check active cho child, bao gồm cả dynamic routes
            const isChildActive = isChildPathMatch(child.path, location.pathname)
            return (
              <Link
                key={child.path}
                to={child.path}
                onClick={handleCloseSidebar}
                className={cn(
                  'flex items-center rounded-lg text-sm font-medium transition-colors px-3 py-2',
                  isChildActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <span>{child.title}</span>
                {isChildActive && <ChevronRight className="h-4 w-4 ml-auto" />}
              </Link>
            )
          })}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  // Khi sidebar collapsed và có children: Tooltip khi hover, Popover khi click
  if (hasChildren && sidebarCollapsed) {
    return (
      <Popover open={popoverOpen} onOpenChange={(open) => {
        setPopoverOpen(open)
        if (open) {
          setTooltipOpen(false)
        }
      }}>
        <Tooltip 
          open={tooltipOpen && !popoverOpen && !disableTooltip} 
          onOpenChange={(open) => {
            // Không cho phép tooltip mở nếu đang disable hoặc popover đang mở
            if (!disableTooltip && !popoverOpen) {
              setTooltipOpen(open)
            }
          }}
        >
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'w-full flex items-center justify-center rounded-lg text-sm font-medium transition-colors p-2',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
                onClick={(e) => {
                  e.preventDefault()
                  setPopoverOpen(!popoverOpen)
                  setTooltipOpen(false)
                  setDisableTooltip(false)
                }}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
              </button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent
          side="right"
          align="start"
          className="w-56 p-1"
          sideOffset={8}
        >
          <div className="space-y-1">
            {item.children.map((child) => {
              // Check active cho child, bao gồm cả dynamic routes
              const isChildActive = isChildPathMatch(child.path, location.pathname)
              return (
                <Link
                  key={child.path}
                  to={child.path}
                  onClick={() => {
                    handleCloseSidebar()
                    setPopoverOpen(false)
                    setTooltipOpen(false)
                    // Tạm thời disable tooltip để tránh hiển thị lại ngay sau khi click
                    setDisableTooltip(true)
                    // Sau 300ms cho phép tooltip hoạt động lại
                    setTimeout(() => {
                      setDisableTooltip(false)
                    }, 300)
                  }}
                  className={cn(
                    'flex items-center rounded-lg text-sm font-medium transition-colors px-3 py-2 w-full',
                    isChildActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  )}
                >
                  <span>{child.title}</span>
                  {isChildActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                </Link>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  // Menu item thông thường không có children
  if (sidebarCollapsed) {
    return (
      <MenuItemTooltip
        item={item}
        isActive={isActive}
        handleCloseSidebar={handleCloseSidebar}
      />
    )
  }

  // Nếu có children, navigate đến first child khi click vào parent
  const getLinkPath = () => {
    if (hasChildren && item.children && item.children.length > 0) {
      // Tìm first non-dynamic child
      const firstNonDynamicChild = item.children.find(child => !child.path.includes(':'))
      return firstNonDynamicChild?.path || item.children[0].path
    }
    return item.path
  }

  return (
    <Link
      to={getLinkPath()}
      className={cn(
        'flex items-center rounded-lg text-sm font-medium transition-colors gap-3 px-3 py-2',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      )}
      onClick={handleCloseSidebar}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span>{item.title}</span>
      {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
    </Link>
  )
}

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector((state) => state.global.sidebarOpen)
  const sidebarCollapsed = useAppSelector((state) => state.global.sidebarCollapsed)
  const user = useAppSelector((state) => state.auth.user)
  const location = useLocation()

  // Get filtered menu items based on user permissions
  const menuItems = getFilteredMenuItems(user)

  const handleCloseSidebar = () => {
    dispatch(setSidebarOpen(false))
  }

  const handleOpenSidebar = () => {
    dispatch(setSidebarOpen(true))
  }

  const handleToggleCollapse = () => {
    dispatch(toggleSidebarCollapsed())
  }

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0',
          sidebarCollapsed ? 'w-16' : 'w-64',
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={cn(
            'flex items-center transition-all duration-300',
            sidebarCollapsed ? 'justify-center p-2' : 'justify-between p-4',
          )}>
            {!sidebarCollapsed && (
              <h2 className="text-xl font-bold text-foreground">Admin Panel</h2>
            )}
            {sidebarCollapsed ? (
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex"
                onClick={handleToggleCollapse}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={handleCloseSidebar}
                >
                  <X className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden lg:flex"
                  onClick={handleToggleCollapse}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className={cn(
            'flex-1 space-y-1 overflow-y-auto transition-all duration-300',
            sidebarCollapsed ? 'p-2' : 'p-4',
          )}>
            <TooltipProvider delayDuration={200}>
              {menuItems.map((item) => {
                const Icon = item.icon
                const hasChildren = item.children && item.children.length > 0
                
                // Helper function để check nếu pathname match với child route (bao gồm nested children)
                const isChildPathMatch = (childPath, pathname, childChildren = null) => {
                  if (childPath === pathname) return true
                  if (childPath.includes(':')) {
                    const pattern = childPath.replace(/:[^/]+/g, '[^/]+')
                    const regex = new RegExp(`^${pattern}$`)
                    if (regex.test(pathname)) return true
                  }
                  if (pathname.startsWith(childPath + '/')) {
                    return true
                  }
                  // Check nested children (level 3)
                  if (childChildren && childChildren.length > 0) {
                    return childChildren.some(grandchild => isChildPathMatch(grandchild.path, pathname))
                  }
                  return false
                }
                
                const isActive = location.pathname === item.path ||
                (hasChildren && item.children.some(child => 
                  isChildPathMatch(child.path, location.pathname, child.children)
                ))

                // Nếu có children, sử dụng component riêng
                if (hasChildren) {
                  return (
                    <MenuItemWithChildren
                      key={item.path}
                      item={item}
                      sidebarCollapsed={sidebarCollapsed}
                      location={location}
                      handleCloseSidebar={handleCloseSidebar}
                    />
                  )
                }

                // Menu item thông thường
                if (sidebarCollapsed) {
                  return (
                    <MenuItemTooltip
                      key={item.path}
                      item={item}
                      isActive={isActive}
                      handleCloseSidebar={handleCloseSidebar}
                    />
                  )
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center rounded-lg text-sm font-medium transition-colors gap-3 px-3 py-2',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    )}
                    onClick={handleCloseSidebar}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.title}</span>
                    {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </Link>
                )
              })}
            </TooltipProvider>
          </nav>

          {/* Footer - Removed logout button */}
        </div>
      </aside>

      {/* Mobile menu button - nằm dưới sidebar khi mở */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'fixed z-50 lg:hidden transition-all duration-300',
          sidebarOpen
            ? 'bottom-4 left-4' // Khi sidebar mở: nằm dưới cùng bên trái (dưới sidebar)
            : 'top-4 left-4', // Khi sidebar đóng: nằm góc trên trái
        )}
        onClick={handleOpenSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  )
}

