import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTokenState } from '@/state/useTokenState'
import { useUserState } from '@/state/useUserState'
import { useToast } from '@common/hooks/useToast'
import { USERS_ROUTES } from '@modules/users/routes'

import { AUTH_ROUTES } from '../routes'
import { loginUser } from '../services'
import type { ILoginInputs } from '../types/Login'

const useLogin = () => {
  const [loginErros, setLoginErrors] = useState<ILoginInputs | null>(null)
  const { accessToken, setToken } = useTokenState()
  const { user, setUser } = useUserState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const handleLogin = useCallback(
    async (loginInputs: ILoginInputs) => {
      setLoginErrors(null)

      try {
        setLoading(true)
        const response = await loginUser(loginInputs)
        const loginData = response.data.data

        if (!loginData?.accessToken || !loginData?.user) {
          toast.error('Respuesta de login inválida')
          return logOut()
        }

        // Map roles array to user.roles
        const userWithRoles = {
          ...loginData?.user,
          roles: loginData?.roles?.map((role) => role.name) || []
        }

        setToken(loginData.accessToken)
        setUser(userWithRoles)
        toast.success('¡Bienvenido Fervorino!')
        navigate(USERS_ROUTES.PROFILE)
      } catch (err: unknown) {
        const error = err as { response?: { data?: { errors?: ILoginInputs } } }
        setLoginErrors(error?.response?.data?.errors ?? null)
      } finally {
        setLoading(false)
      }
    },
    [setToken, setUser, navigate, toast]
  )

  const logOut = useCallback(() => {
    setToken('')
    setUser(null)
    navigate(AUTH_ROUTES.LOGIN)
  }, [setToken, setUser, navigate])

  return { loginErros, isLoading: loading, handleLogin, accessToken, user, logOut }
}

export default useLogin
