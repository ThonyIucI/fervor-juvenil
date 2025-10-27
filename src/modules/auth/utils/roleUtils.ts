import type { IUser, UserRole } from '../types/User'

/**
 * Check if user has a specific role
 */
export const hasRole = (user: IUser | null, role: UserRole): boolean => {
  if (!user || !user.roles) return false
  return user.roles.includes(role)
}

/**
 * Check if user is admin or superadmin
 */
export const isAdmin = (user: IUser | null): boolean => {
  return hasRole(user, 'admin') || hasRole(user, 'superadmin')
}

/**
 * Check if user is superadmin
 */
export const isSuperAdmin = (user: IUser | null): boolean => {
  return hasRole(user, 'superadmin')
}

/**
 * Check if user has any of the specified roles
 */
export const hasAnyRole = (user: IUser | null, roles: UserRole[]): boolean => {
  if (!user || !user.roles) return false
  return roles.some((role) => user.roles?.includes(role))
}
