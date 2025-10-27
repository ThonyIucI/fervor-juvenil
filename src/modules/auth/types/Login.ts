import type { IUser, UserRole } from './User'

/**
 * Login form inputs
 */
export interface ILoginInputs {
  email: string
  password: string
}

/**
 * Role object from backend
 */
export interface IRole {
  uuid: string
  name: UserRole
  description: string
}

/**
 * Login response from backend
 */
export interface ILoginResponse {
  accessToken: string
  user: IUser
  roles: IRole[]
}
