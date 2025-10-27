import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTokenState } from '@/state/useTokenState'
import { useUserState } from '@/state/useUserState'
import { USERS_ROUTES } from '@modules/users/routes'

import { AUTH_ROUTES } from '../routes'
import { loginUser } from '../services'
import type { ILoginInputs } from '../types/Login'

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [loginErros, setLoginErrors] = useState<ILoginInputs | null>(null)
  const { accessToken, setToken } = useTokenState()
  const { user, setUser } = useUserState()

  const navigate = useNavigate()
  const handleLogin = useCallback(async (LoginInputs: ILoginInputs) => {
    setIsLoading(true)
    try {
      const response = await loginUser(LoginInputs)
      const loginData = response.data.data // { accessToken, user, roles }

      if (!loginData?.accessToken || !loginData?.user) {
        console.error('Invalid login response:', loginData)
        return logOut()
      }

      // Map roles array to user.roles
      const userWithRoles = {
        ...loginData.user,
        roles: loginData.roles?.map((role) => role.name) || []
      }

      setToken(loginData.accessToken)
      setUser(userWithRoles)
      navigate(USERS_ROUTES.PROFILE)
    } catch (err: unknown) {
      const error = err as { response?: { data?: { errors?: ILoginInputs } } }
      setLoginErrors(error?.response?.data?.errors ?? null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logOut = () => {
    setToken('')
    setUser(null)
    navigate(AUTH_ROUTES.LOGIN)
  }

  return { loginErros, isLoading, handleLogin, accessToken, user, logOut }
}

export default useLogin
