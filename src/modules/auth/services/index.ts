import { api } from '../../../config/api'
import type { ILoginInputs, ILoginResponse } from '../types/Login'

export const loginUser = (user: ILoginInputs) =>
  api.FJ_APIv1.post<ILoginResponse>('/auth/login', user)
