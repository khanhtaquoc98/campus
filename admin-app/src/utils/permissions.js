/**
 * Permission utility functions
 * Re-export từ routes.js để dễ sử dụng
 */
import { hasRole, hasPermission, canAccessRoute } from '@/config/routes'

export { hasRole, hasPermission, canAccessRoute }

/**
 * Get user roles from user object
 * @param {Object} user - User object
 * @returns {string[]} Array of roles
 */
export const getUserRoles = (user) => {
  if (!user) return []
  
  // Support both formats: user.roles (array) or user.role (string)
  if (Array.isArray(user.roles)) {
    return user.roles
  }
  
  if (user.role) {
    return [user.role]
  }
  
  return []
}

/**
 * Get user permissions from user object
 * @param {Object} user - User object
 * @returns {string[]} Array of permissions
 */
export const getUserPermissions = (user) => {
  if (!user) return []
  
  return user.permissions || []
}

/**
 * Check if user is admin
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const isAdmin = (user) => {
  const roles = getUserRoles(user)
  return roles.includes('admin')
}

/**
 * Check if user is manager
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const isManager = (user) => {
  const roles = getUserRoles(user)
  return roles.includes('manager')
}

