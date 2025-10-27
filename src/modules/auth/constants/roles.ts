import type { UserRole } from '../types/User'

/**
 * Role constants to avoid hardcoded strings
 */
export const ROLES: Record<string, UserRole> = {
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
  USER: 'user'
} as const

/**
 * Admin roles array - includes both admin and superadmin
 */
export const ADMIN_ROLES: UserRole[] = [ROLES.ADMIN, ROLES.SUPERADMIN]
