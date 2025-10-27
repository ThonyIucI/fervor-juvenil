import { Mail, Tag, User } from 'lucide-react'

import { useUserState } from '@/state/useUserState'
import { Card } from '@common/components/Card'

export default function ProfileView() {
  const { user } = useUserState()

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">No hay información de usuario disponible</p>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Mi Perfil</h1>

      {/* Profile Card */}
      <Card variant="elevated" className="p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
            <User className="h-10 w-10 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-500 mt-1">@{user.slug}</p>
          </div>
        </div>

        {/* User Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Email</p>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Tag className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Roles</p>
              <div className="flex gap-2 mt-1">
                {user.roles && user.roles.length > 0 ? (
                  user.roles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Sin roles asignados</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 font-medium">ID de Usuario</p>
              <p className="text-sm font-mono text-gray-600">{user.uuid}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Information Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="outlined" className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 font-medium">Nombre</p>
              <p className="text-sm text-gray-900">{user.firstName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Apellido</p>
              <p className="text-sm text-gray-900">{user.lastName}</p>
            </div>
          </div>
        </Card>

        <Card variant="outlined" className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Seguridad</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 font-medium">Email Verificado</p>
              <p className="text-sm text-green-600">✓ Verificado</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Último Acceso</p>
              <p className="text-sm text-gray-900">Hoy</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
