import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import { getAllRoutes } from './config/routes'
import { NotFound } from './pages/Errors'

function App() {
  // Get all routes including nested children
  const allRoutes = getAllRoutes()

  return (
    <Router>
      <Routes>
        {allRoutes.map((route) => {
          // Public routes (no protection needed)
          if (route.isPublic) {
            const Component = route.component
            // Error pages don't need layout
            if (route.path.startsWith('/errors/')) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Component />}
                />
              )
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Component />}
              />
            )
          }

          // Protected routes
          const Component = route.component
          if (!Component) return null

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute route={route}>
                  <AdminLayout>
                    <Component />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          )
        })}
        {/* 404 - Not Found (no layout for error pages) */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Router>
  )
}

export default App
