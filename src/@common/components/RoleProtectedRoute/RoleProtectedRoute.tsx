import { Navigate } from 'react-router-dom'

import { useUserState } from '@/state/useUserState'
import type { UserRole } from '@modules/auth/types/User'
import { hasAnyRole } from '@modules/auth/utils'

interface RoleProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export function RoleProtectedRoute({
  children,
  allowedRoles,
  redirectTo = '/login'
}: RoleProtectedRouteProps) {
  const { user } = useUserState()

  // If no user, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} replace />
  }

  // Check if user has any of the allowed roles
  if (!hasAnyRole(user, allowedRoles)) {
    // User is logged in but doesn't have permission
    return (
      <div className="flex items-center justify-center bg-gray-50">
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">No tienes permisos para acceder a esta página.</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
