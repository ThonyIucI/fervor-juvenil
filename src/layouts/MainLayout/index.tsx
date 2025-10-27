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
 */
export const MainLayout = ({ children }: ILayout) => {
  const { isCollapsed } = useSidebarState()

  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar - Fixed en desktop, overlay en mobile */}
      <Sidebar />
      {/* Main Content - Con margin-left solo cuando sidebar está visible */}
      <div
        className={cn(
          'flex-1 transition-all duration-300 ease-in-out',
          // Desktop: margin-left solo cuando sidebar NO está colapsado (visible)
          isCollapsed ? 'xl:ml-[290px] ml-0' : 'xl:ml-[90px]' // 256px cuando visible, 0 cuando oculto
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
