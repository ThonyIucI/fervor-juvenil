import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { RoleProtectedRoute } from '@/@common/components/RoleProtectedRoute'

import NotFoundPage from './@common/views/NotFound'
import LoginForm from './modules/auth'
import { ADMIN_ROLES } from './modules/auth/constants/roles'
import { AUTH_ROUTES } from './modules/auth/routes'
import { USERS_ROUTES } from './modules/users/routes'
import PrivateRoute from './routes/PrivateRoutes'
import { PageLoader } from './ui/loader/PageLoader'

// Lazy load views
const UserProfile = lazy(() => import('./modules/users/views/UserProfile'))
const ProfileView = lazy(() => import('./modules/users/views/ProfileView'))
const UsersView = lazy(() => import('./modules/users/views/UsersView'))
function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <BrowserRouter>
        <Routes>
          <Route path={AUTH_ROUTES.LOGIN} element={<LoginForm />} />

          {/* Redirect root to profile */}
          <Route path="/" element={<Navigate to={USERS_ROUTES.PROFILE} replace />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            {/* Profile - accessible by all authenticated users */}
            <Route path={USERS_ROUTES.PROFILE} element={<ProfileView />} />

            {/* Users - only admin and superadmin */}
            <Route
              path={USERS_ROUTES.USERS_LIST}
              element={
                <RoleProtectedRoute allowedRoles={ADMIN_ROLES}>
                  <UsersView />
                </RoleProtectedRoute>
              }
            />

            {/* Legacy route - keep for backward compatibility */}
            <Route path={USERS_ROUTES.INDEX} element={<UserProfile />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
