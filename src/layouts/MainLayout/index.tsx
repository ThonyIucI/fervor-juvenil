import { Sidebar } from '@common/components/Sidebar/Sidebar'
import { ToastContainer } from '@common/components/Toast/ToastContainer'

interface ILayout {
  children: React.ReactNode
}

/**
 * MainLayout
 *
 * Layout principal de la aplicación autenticada.
 * Estructura:
 * - Sidebar lateral collapsable (fixed en desktop, overlay en mobile)
 * - Área de contenido principal con scroll independiente
 * - ToastContainer para notificaciones globales
 *
 * El Sidebar incluye:
 * - Logo y título de la app
 * - Información del usuario
 * - Navegación principal
 * - Botón de logout
 */
export const MainLayout = ({ children }: ILayout) => {
  return (
    <>
      {/* Sidebar con spacer incluido */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="min-h-screen bg-gray-50">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>

      {/* Global Toast Notifications */}
      <ToastContainer />
    </>
  )
}
