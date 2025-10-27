import { useSidebarState } from '@/state/useSidebarState'
import { Sidebar } from '@common/components/Sidebar/Sidebar'
import { ToastContainer } from '@common/components/Toast/ToastContainer'
import { Topbar } from '@common/components/Topbar/Topbar'
import { cn } from '@common/utils/cn'

interface ILayout {
  children: React.ReactNode
}

/**
 * MainLayout
 *
 * Layout principal de la aplicación autenticada.
 * - Desktop: El contenido principal ajusta su margin-left según el ancho del sidebar (290px expandido, 90px colapsado)
 * - Mobile: El sidebar es un overlay, por lo que no afecta el layout del contenido principal
 */
export const MainLayout = ({ children }: ILayout) => {
  const { isOpen } = useSidebarState()

  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar - Fixed en desktop, overlay en mobile */}
      <Sidebar />

      {/* Main Content - Con margin-left solo en desktop según el ancho del sidebar */}
      <div
        className={cn(
          'flex-1 transition-all duration-300 ease-in-out',
          // Desktop: margin-left según estado del sidebar
          // isOpen = true → expandido (290px), isOpen = false → colapsado (90px)
          isOpen ? 'xl:ml-[290px]' : 'xl:ml-[90px]'
        )}
      >
        {/* Topbar sticky */}
        <Topbar />

        {/* Main Content Area */}
        <main className="p-4 pb-20 mx-auto max-w-(--breakpoint-2xl) md:p-6 md:pb-24 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  )
}
