import { useLocation, Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Home } from 'lucide-react'
import { routes } from '@/config/routes'

export default function BreadcrumbNav() {
  const location = useLocation()

  const getBreadcrumbs = () => {
    const pathname = location.pathname
    const breadcrumbs = []

    // Luôn thêm Home
    breadcrumbs.push({
      title: 'Home',
      path: '/',
    })

    // Helper function để check nếu pathname match với route path (bao gồm dynamic routes)
    const isPathMatch = (routePath, targetPath) => {
      // Exact match
      if (routePath === targetPath) {
        return true
      }

      // Dynamic route match (e.g., /academic/records/:id)
      if (routePath.includes(':')) {
        const pattern = routePath.replace(/:[^/]+/g, '[^/]+')
        const regex = new RegExp(`^${pattern}$`)
        return regex.test(targetPath)
      }

      return false
    }

    // Helper function để check nested children (level 2)
    const checkNestedChildren = (child, targetPath, parentTrail) => {
      if (!child.children || child.children.length === 0) {
        return null
      }

      const nestedTrail = [...parentTrail, { route: child, path: child.path }]

      for (const grandchild of child.children) {
        if (isPathMatch(grandchild.path, targetPath)) {
          return [...nestedTrail, { route: grandchild, path: targetPath }]
        }
      }
      return null
    }

    // Helper function để check children (level 1)
    const checkChildren = (route, targetPath, parentTrail) => {
      if (!route.children || route.children.length === 0) {
        return null
      }

      const newTrail = [...parentTrail, { route, path: route.path }]

      for (const child of route.children) {
        if (isPathMatch(child.path, targetPath)) {
          return [...newTrail, { route: child, path: targetPath }]
        }

        // Check nested children (level 2)
        const nestedResult = checkNestedChildren(child, targetPath, newTrail)
        if (nestedResult) {
          return nestedResult
        }
      }
      return null
    }

    // Helper function để tìm route và build breadcrumb trail
    const findRouteAndBuildTrail = (routeList, targetPath, trail = []) => {
      for (const route of routeList) {
        if (route.isPublic) continue

        // Check exact match hoặc dynamic match
        if (isPathMatch(route.path, targetPath)) {
          return [...trail, { route, path: targetPath }]
        }

        // Check children (nested level 1)
        const childrenResult = checkChildren(route, targetPath, trail)
        if (childrenResult) {
          return childrenResult
        }
      }
      return null
    }

    // Tìm route trail
    const trail = findRouteAndBuildTrail(routes, pathname)

    if (trail && trail.length > 0) {
      trail.forEach((item, index) => {
        const { route, path } = item
        const isLast = index === trail.length - 1

        // Tìm first non-dynamic child để dùng làm link path cho parent
        let linkPath = path
        if (!isLast && route.children && route.children.length > 0) {
          const firstNonDynamicChild = route.children.find(child => !child.path.includes(':'))
          if (firstNonDynamicChild) {
            linkPath = firstNonDynamicChild.path
          } else if (route.children[0]) {
            linkPath = route.children[0].path
          }
        }

        breadcrumbs.push({
          title: route.title,
          path: isLast ? pathname : linkPath,
          isLast,
        })
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  // Nếu chỉ có Home và không có item nào khác, không hiển thị breadcrumb
  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <div key={`${crumb.path}-${index}`} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.path} className="flex items-center gap-1">
                      {index === 0 && <Home className="h-4 w-4" />}
                      {index > 0 && crumb.title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
