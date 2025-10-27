import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTokenState } from '@/state/useTokenState'
import { useUserState } from '@/state/useUserState'
import { useRequest } from '@common/hooks/useRequest'
import { USERS_ROUTES } from '@modules/users/routes'

import { AUTH_ROUTES } from '../routes'
import { loginUser } from '../services'
import type { ILoginInputs, ILoginResponse } from '../types/Login'

const useLogin = () => {
  const [loginErros, setLoginErrors] = useState<ILoginInputs | null>(null)
  const { accessToken, setToken } = useTokenState()
  const { user, setUser } = useUserState()
  const navigate = useNavigate()

  // Use useRequest hook for API call
  const { execute, isLoading } = useRequest<ILoginResponse, [ILoginInputs]>(
    async (loginInputs: ILoginInputs) => {
      const response = await loginUser(loginInputs)
      return response.data.data
    }
  )

  const handleLogin = useCallback(
    async (loginInputs: ILoginInputs) => {
      setLoginErrors(null)

      try {
        const loginData = await execute(loginInputs)

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
      }
    },
    [execute, setToken, setUser, navigate]
  )

  const logOut = useCallback(() => {
    setToken('')
    setUser(null)
    navigate(AUTH_ROUTES.LOGIN)
  }, [setToken, setUser, navigate])

  return { loginErros, isLoading, handleLogin, accessToken, user, logOut }
}

export default useLogin
