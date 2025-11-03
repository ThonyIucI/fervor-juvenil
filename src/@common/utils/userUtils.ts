import type { IUser } from '@modules/auth/types/User'
import type { IUserWithProfile } from '@modules/users/types/Profile'

/**
 * Get user initials from first and last name
 * @param user - User object with firstName/lastName or profile.firstNames/lastNames
 * @returns Uppercase initials (e.g., "JD")
 */
export function getUserInitials(user: IUser | IUserWithProfile): string {
  const userWithProfile = user as IUserWithProfile

  const firstInitial = user.firstName?.[0] || userWithProfile.profile?.firstNames?.[0] || ''
  const lastInitial = user.lastName?.[0] || userWithProfile.profile?.lastNames?.[0] || ''

  return `${firstInitial}${lastInitial}`.toUpperCase()
}

/**
 * Get full name from user
 * @param user - User object
 * @returns Full name string
 */
export function getUserFullName(user: IUser | IUserWithProfile): string {
  const userWithProfile = user as IUserWithProfile

  const firstName = userWithProfile.profile?.firstNames || user.firstName || ''
  const lastName = userWithProfile.profile?.lastNames || user.lastName || ''

  return `${firstName} ${lastName}`.trim()
}

/**
 * Gets the user's full name with last name first (Spanish format)
 * @param user - User object (IUser or IUserWithProfile)
 * @returns Full name formatted as "LastName, FirstName"
 */
export function getUserFullNameLastFirst(user: IUser | IUserWithProfile): string {
  const userWithProfile = user as IUserWithProfile

  const firstName = userWithProfile.profile?.firstNames || user.firstName || ''
  const lastName = userWithProfile.profile?.lastNames || user.lastName || ''

  if (!firstName && !lastName) return '-'
  if (!lastName) return firstName.toLowerCase()
  if (!firstName) return lastName.toLowerCase()

  return `${lastName}, ${firstName}`.toLocaleLowerCase()
}

/**
 * Calculates user seniority based on enrollment date
 * @param enrollmentDate - ISO date string or Date object
 * @returns Formatted seniority string (e.g., "2 años", "6 meses", "Nuevo")
 */
export function getUserSeniority(enrollmentDate: string | Date | null | undefined): string {
  if (!enrollmentDate) return '-'

  const enrollment = new Date(enrollmentDate)
  const now = new Date()

  // Calculate difference in months
  const diffTime = now.getTime() - enrollment.getTime()
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44))

  if (diffMonths < 1) return 'Nuevo'
  if (diffMonths < 12) return `${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`

  const years = Math.floor(diffMonths / 12)
  const remainingMonths = diffMonths % 12

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'año' : 'años'}`
  }

  return `${years} ${years === 1 ? 'año' : 'años'}, ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`
}
