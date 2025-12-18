import {
  LayoutDashboard,
  GraduationCap,
} from 'lucide-react'

// Import components
import Dashboard from '@/pages/Dashboard'
import AcademicRecords from '@/pages/AcademicRecords/list'
import AcademicRecordDetail from '@/pages/AcademicRecords/detail'
import AcademicRecordEdit from '@/pages/AcademicRecords/edit'
import AcademicRecordCreate from '@/pages/AcademicRecords/create'
import AcademicTraining from '@/pages/AcademicTraining/list'
import Login from '@/pages/Login'
import {
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError,
  Maintenance,
} from '@/pages/Errors'

/**
 * Route configuration với roles và permissions
 *
 * roles: Array các role được phép truy cập (nếu null/undefined = tất cả đều được phép)
 * permissions: Array các permission được phép (nếu null/undefined = không cần permission)
 *
 * Permission format: 'resource.action' (ví dụ: 'users.view', 'users.edit', 'academic.manage')
 */
export const routes = [
  // Public routes
  {
    path: '/login',
    component: Login,
    title: 'Đăng nhập',
    isPublic: true,
  },

  // Error pages (public)
  {
    path: '/errors/401',
    component: Unauthorized,
    title: 'Unauthorized',
    isPublic: true,
  },
  {
    path: '/errors/403',
    component: Forbidden,
    title: 'Forbidden',
    isPublic: true,
  },
  {
    path: '/errors/404',
    component: NotFound,
    title: 'Not Found',
    isPublic: true,
  },
  {
    path: '/errors/500',
    component: InternalServerError,
    title: 'Internal Server Error',
    isPublic: true,
  },
  {
    path: '/errors/maintenance',
    component: Maintenance,
    title: 'Maintenance',
    isPublic: true,
  },

  // Protected routes
  {
    path: '/',
    component: Dashboard,
    title: 'Dashboard',
    icon: LayoutDashboard,
    roles: null, // null = tất cả role đều được phép
    permissions: null, // null = không cần permission
  },
  // {
  //   path: '/users',
  //   component: UsersPage,
  //   title: 'Users',
  //   icon: Users,
  //   roles: ['admin', 'manager'], // Chỉ admin và manager được phép
  //   permissions: ['users.view'], // Cần permission users.view
  // },
  {
    path: '/academic',
    title: 'Học vụ',
    icon: GraduationCap,
    // roles: ['admin', 'manager', 'academic'], // Các role được phép
    // permissions: ['academic.view'], // Cần permission academic.view
    children: [
      {
        path: '/academic/records',
        title: 'Quản lý hồ sơ',
        component: AcademicRecords,
        // roles: ['admin', 'manager', 'academic'],
        // permissions: ['academic.records.view'],
        children: [
          {
            path: '/academic/records/create',
            component: AcademicRecordCreate,
            title: 'Tạo hồ sơ',
            // roles: ['admin', 'manager', 'academic'],
            // permissions: ['academic.records.create'],
          },
          {
            path: '/academic/records/edit/:id',
            component: AcademicRecordEdit,
            title: 'Chỉnh sửa hồ sơ',
          },
          {
            path: '/academic/records/:id',
            component: AcademicRecordDetail,
            title: 'Chi tiết hồ sơ',
          },
        ],
      },
      {
        path: '/academic/training',
        component: AcademicTraining,
        title: 'Quản lý đào tạo',
        // roles: ['admin', 'manager', 'academic'],
        // permissions: ['academic.training.view'],
      },
    ],
  },
  // {
  //   path: '/applications',
  //   component: Applications,
  //   title: 'Applications',
  //   icon: FileText,
  //   // roles: ['admin', 'manager'],
  //   // permissions: ['applications.view'],
  // },
  // {
  //   path: '/settings',
  //   component: Settings,
  //   title: 'Settings',
  //   icon: Settings,
  //   // roles: ['admin'], // Chỉ admin được phép
  //   // permissions: ['settings.manage'],
  // },
  // {
  //   path: '/profile',
  //   component: Profile,
  //   title: 'Profile',
  //   icon: UserCircle,
  //   roles: null, // Tất cả user đều có thể xem profile của mình
  //   permissions: null,
  // },
]

/**
 * Get all routes (including nested children) as flat array
 * Handles 3-level nested structure:
 * - Level 1: Parent route (e.g., /academic) - may not have component
 * - Level 2: Child route (e.g., /academic/records) - has component
 * - Level 3: Grandchild route (e.g., /academic/records/create) - has component
 */
export const getAllRoutes = () => {
  const flatRoutes = []

  const processRoute = (route, parentPath = '', parentTitle = '') => {
    // Public routes: add directly and return
    if (route.isPublic) {
      flatRoutes.push(route)
      return
    }

    // If route has children, process them recursively
    if (route.children && route.children.length > 0) {
      route.children.forEach(child => {
        const childParentPath = route.path || parentPath
        const childParentTitle = route.title || parentTitle

        // If child has its own children (Level 3), process recursively
        if (child.children && child.children.length > 0) {
          // Process Level 2 route first if it has component
          if (child.component) {
            flatRoutes.push({
              ...child,
              parentPath: childParentPath,
              parentTitle: childParentTitle,
            })
          }
          // Then process Level 3 routes (grandchildren)
          child.children.forEach(grandchild => {
            flatRoutes.push({
              ...grandchild,
              parentPath: child.path || childParentPath,
              parentTitle: child.title || childParentTitle,
            })
          })
        } else {
          // Level 2 route without children - add it
          flatRoutes.push({
            ...child,
            parentPath: childParentPath,
            parentTitle: childParentTitle,
          })
        }
      })
    }

    // Add parent route (Level 1) if it has a component and no children
    // Routes with children are already processed above
    if (route.component && (!route.children || route.children.length === 0)) {
      flatRoutes.push({
        ...route,
        parentPath,
        parentTitle,
      })
    }
  }

  routes.forEach(route => {
    processRoute(route)
  })

  return flatRoutes
}

/**
 * Get menu items for sidebar (only routes with icon)
 */
export const getMenuItems = () => {
  return routes.filter(route =>
    !route.isPublic &&
    route.icon &&
    (route.component || route.children),
  )
}

/**
 * Check if user has required role
 * @param {string[]|null} requiredRoles - Array of required roles, null = no restriction
 * @param {string[]} userRoles - Array of user's roles
 * @returns {boolean}
 */
export const hasRole = (requiredRoles, userRoles = []) => {
  // If no role restriction, allow access
  if (!requiredRoles || requiredRoles.length === 0) {
    return true
  }

  // Check if user has at least one of the required roles
  return userRoles.some(role => requiredRoles.includes(role))
}

/**
 * Check if user has required permission
 * @param {string[]|null} requiredPermissions - Array of required permissions, null = no restriction
 * @param {string[]} userPermissions - Array of user's permissions
 * @returns {boolean}
 */
export const hasPermission = (requiredPermissions, userPermissions = []) => {
  // If no permission restriction, allow access
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true
  }

  // Check if user has all required permissions
  return requiredPermissions.every(permission => userPermissions.includes(permission))
}

/**
 * Check if user can access a route
 * @param {Object} route - Route object
 * @param {Object} user - User object with role and permissions
 * @returns {boolean}
 */
export const canAccessRoute = (route, user) => {
  if (!user) { return false }

  const userRoles = user.roles || (user.role ? [user.role] : [])
  const userPermissions = user.permissions || []

  // Check role
  const roleAllowed = hasRole(route.roles, userRoles)
  if (!roleAllowed) { return false }

  // Check permission
  const permissionAllowed = hasPermission(route.permissions, userPermissions)
  if (!permissionAllowed) { return false }

  return true
}

/**
 * Filter menu items based on user permissions
 * @param {Object} user - User object
 * @returns {Array} Filtered menu items
 */
export const getFilteredMenuItems = (user) => {
  if (!user) { return [] }

  return getMenuItems()
    .filter(route => canAccessRoute(route, user))
    .map(route => {
      // Filter children if route has children
      if (route.children) {
        // Filter out dynamic routes (routes with :id) - chỉ hiển thị 2 level
        const filteredChildren = route.children
          .filter(child => {
            // Bỏ qua dynamic routes (có : trong path)
            if (child.path && child.path.includes(':')) {
              return false
            }
            return canAccessRoute(child, user)
          })

        // Only include parent if it has accessible children or has its own component
        if (filteredChildren.length > 0 || route.component) {
          return {
            ...route,
            children: filteredChildren.length > 0 ? filteredChildren : undefined,
          }
        }
        return null
      }

      return route
    })
    .filter(Boolean) // Remove null values
}

/**
 * Find route by path
 * @param {string} path - Route path
 * @returns {Object|null} Route object or null
 */
export const findRouteByPath = (path) => {
  const allRoutes = getAllRoutes()
  return allRoutes.find(route => route.path === path) || null
}
