/**
 * Role type - matches backend roles
 */
export type UserRole = 'admin' | 'superadmin' | 'user'

/**
 * User interface - matches login response structure
 */
export interface IUser {
  uuid: string
  email: string
  firstName: string
  lastName: string
  slug: string
  roles?: UserRole[]
  // Optional fields from old structure (kept for backward compatibility)
  name?: string
  imageUrl?: string
  phone?: string
  isSuperAdmin?: boolean
}
