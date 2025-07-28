import { Suspense } from 'react'
import { PageLoader } from './ui/loader/PageLoader'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import LoginForm from './modules/auth'
import { AUTH_ROUTES } from './modules/auth/routes'
import { USERS_ROUTES } from './modules/users/routes'
import PrivateRoute from './routes/PrivateRoutes'

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <BrowserRouter>
        <Routes>
          <Route path={AUTH_ROUTES.LOGIN} element={<LoginForm />} />
          {/* HOME */}
          <Route
            path='/'
            element={<Navigate to={USERS_ROUTES.INDEX} />}
          />
          <Route element={<PrivateRoute />} >
            <Route path={USERS_ROUTES.INDEX} element={<div>Home</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
