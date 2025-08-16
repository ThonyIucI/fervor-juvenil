import { Navigate, Outlet } from 'react-router-dom'

import { MainLayout } from '../layouts/MainLayout'
import useLogin from '../modules/auth/hooks/useLogin'
import { AUTH_ROUTES } from '../modules/auth/routes'

const PrivateRoute = () => {
  const { user } = useLogin()

  if(!user)
    return <Navigate to={AUTH_ROUTES.LOGIN} />

  return <MainLayout> <Outlet /></MainLayout>
}

export default PrivateRoute
