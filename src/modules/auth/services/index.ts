import { type IData } from '@/@common/types/requests'

import { api } from '../../../config/api'
import type { ILoginInputs, ILoginResponse } from '../types/Login'

export const loginUser = (user: ILoginInputs) =>
  api.FJ_APIv1.post<IData<ILoginResponse>>('/auth/login', user)
