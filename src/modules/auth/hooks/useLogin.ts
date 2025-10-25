import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserState } from '../../../state/useUserState'
import { USERS_ROUTES } from '../../users/routes'
import { AUTH_ROUTES } from '../routes'
import { loginUser } from '../services'
import type { ILoginInputs } from '../types/Login'
import { getAccessToken } from '../utils'

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [loginErros, setLoginErrors] = useState<ILoginInputs | null>(null)
  const accessToken = getAccessToken()
  const setToken = (token: string) => localStorage.setItem('accessToken', token)
  const { user, setUser } = useUserState()

  const navigate = useNavigate()
  const handleLogin = useCallback(async (LoginInputs: ILoginInputs) => {
    setIsLoading(true)
    try {
      const { data } = await loginUser(LoginInputs)

      if (!data?.accessToken || !data?.user) return logOut()

      setToken(data.accessToken)
      setUser(data.user)
      navigate(USERS_ROUTES.INDEX)
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
