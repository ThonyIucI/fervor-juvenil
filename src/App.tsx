import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import NotFoundPage from './@common/views/NotFound'
import LoginForm from './modules/auth'
import { AUTH_ROUTES } from './modules/auth/routes'
import { USERS_ROUTES } from './modules/users/routes'
import PrivateRoute from './routes/PrivateRoutes'
import { PageLoader } from './ui/loader/PageLoader'

const UserProfile = lazy(() => import('./modules/users/views/UserProfile'))

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <BrowserRouter>
        <Routes>
          <Route path={AUTH_ROUTES.LOGIN} element={<LoginForm />} />
          {/* HOME */}
          <Route path="/" element={<Navigate to={USERS_ROUTES.INDEX} />} />
          <Route element={<PrivateRoute />}>
            <Route path={USERS_ROUTES.INDEX} element={<UserProfile />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
