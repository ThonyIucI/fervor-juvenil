import { Users as UsersIcon } from 'lucide-react'

import { Card } from '@common/components/Card'

export function UsersView() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Lista de Usuarios</h1>
        <p className="text-gray-600 mt-2">Gestiona los usuarios del sistema</p>
      </div>

      <Card variant="elevated" className="p-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-4">
            <UsersIcon className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Listado de Usuarios</h3>
          <p className="text-gray-600 max-w-md">
            La funcionalidad completa de listado de usuarios con tabla, filtros y acciones estará
            disponible próximamente.
          </p>
        </div>
      </Card>
    </div>
  )
}
