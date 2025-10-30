import { httpService } from '@common/services/http.service'

import type { ILoginInputs, ILoginResponse } from '../types/Login'

export const loginUser = (user: ILoginInputs) =>
  httpService.post<ILoginResponse>('/auth/login', user)
