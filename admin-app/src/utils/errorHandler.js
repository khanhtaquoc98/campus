/**
 * Error handler utilities
 * Xử lý các lỗi và redirect đến error page tương ứng
 */

/**
 * Get error page path based on error status code
 * @param {number} status - HTTP status code
 * @returns {string} Error page path
 */
export const getErrorPagePath = (status) => {
  const errorRoutes = {
    401: '/errors/401',
    403: '/errors/403',
    404: '/errors/404',
    500: '/errors/500',
    503: '/errors/maintenance',
  }

  return errorRoutes[status] || '/errors/500'
}

/**
 * Handle error and redirect to appropriate error page
 * @param {Object} error - Error object
 * @param {Function} navigate - Navigate function from react-router-dom
 */
export const handleError = (error, navigate) => {
  const status = error?.status || error?.response?.status || 500

  // Don't redirect if already on an error page
  if (window.location.pathname.startsWith('/errors/')) {
    return
  }

  const errorPath = getErrorPagePath(status)
  navigate(errorPath, { replace: true })
}

/**
 * Check if current route is an error page
 * @returns {boolean}
 */
export const isErrorPage = () => {
  return window.location.pathname.startsWith('/errors/')
}

