/**
 * User Profile data structure
 * Based on API contract from docs/API_CONTRACTS_FEATURE_5.md
 */

/**
 * Gender types
 */
export const EGender = {
  M: 'M',
  F: 'F'
} as const;

export type TGender = typeof EGender[keyof typeof EGender];


/**
 * User status types
 */
export type UserStatus = 'A' | 'I' // A = Active, I = Inactive

/**
 * Blood type options
 */
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

/**
 * Complete user profile information
 */
export interface IUserProfile {
  uuid: string
  gender: TGender | null
  age: number | null
  birthDate: string | null // ISO 8601 format
  status: UserStatus | null
  alias: string | null
  hasUniform: boolean | null
  shirtSize: string | null
  pantsSize: string | null
  shoeSize: string | null
  heightMeters: number | null
  weightKg: number | null
  healthInsurance: string | null
  bloodType: BloodType | null
  allergies: string | null
  disabilityOrDisorder: string | null
  enrollmentDate: string | null // ISO 8601 format
  currentResidence: string | null
  professionalGoal: string | null
  favoriteHero: string | null
  firstNames: string | null
  lastNames: string | null
  registrationDate: string | null // ISO 8601 format
}

/**
 * User with profile data (response from /users/me and /users list)
 */
export interface IUserWithProfile {
  uuid: string
  firstName: string
  lastName: string
  email: string
  slug: string
  dni: string
  isActive?: boolean
  isGoogleAccount: boolean
  createdAt: string
  updatedAt: string
  profile: IUserProfile | null
}

/**
 * Update profile payload (all fields optional for partial updates)
 */
export interface IUpdateProfilePayload {
  // Basic user fields
  firstName?: string
  lastName?: string
  email?: string

  // Profile fields
  gender?: TGender
  age?: number
  birthDate?: string // Format: YYYY-MM-DD
  status?: UserStatus
  alias?: string
  hasUniform?: boolean
  shirtSize?: string
  pantsSize?: string
  shoeSize?: string
  heightMeters?: number
  weightKg?: number
  healthInsurance?: string
  bloodType?: BloodType
  allergies?: string
  disabilityOrDisorder?: string
  enrollmentDate?: string // Format: YYYY-MM-DD
  currentResidence?: string
  professionalGoal?: string
  favoriteHero?: string
  firstNames?: string
  lastNames?: string
  registrationDate?: string // Format: YYYY-MM-DD
}

/**
 * Profile section types for UI organization
 */
export interface IProfileSection {
  title: string
  icon?: React.ReactNode
  fields: IProfileField[]
}

export interface IProfileField {
  label: string
  value: string | number | boolean | null
  type?: 'text' | 'number' | 'date' | 'boolean' | 'email'
}
