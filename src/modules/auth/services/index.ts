
import { api } from '../../../config/api'
import type { ILoginInputs } from '../types/Login'
import type { IUser } from '../types/User'

interface IloginUserResponse {
    accessToken: string
    user: IUser
}

export const loginUser = (user: ILoginInputs) => api.FJ_APIv1.post<IloginUserResponse>('/auth/login', user)
