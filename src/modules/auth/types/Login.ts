import type { IUser } from './User'

/**
 * Login form inputs
 */
export interface ILoginInputs {
  email: string
  password: string
}

/**
 * Login response from backend
 */
export interface ILoginResponse {
  accessToken: string
  user: IUser
}
