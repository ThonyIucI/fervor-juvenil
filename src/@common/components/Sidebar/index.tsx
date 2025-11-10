import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { LogOut, User, Users } from 'lucide-react'

import { USERS_ROUTES } from '@/modules/users/routes'
import { useSidebarState } from '@/state/useSidebarState'
import { Button } from '@common/components/Button'
import { useMediaQueryScreen } from '@common/hooks/useMediaQueryScreen'
import { cn } from '@common/utils/cn'
import useLogin from '@modules/auth/hooks/useLogin'

import fervorLogo from '/fj.svg'

interface SidebarProps {
  className?: string
}

interface NavItem {
  label: string
  path: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { label: 'Mi Perfil', path: USERS_ROUTES.PROFILE, icon: User },
  { label: 'Usuarios', path: USERS_ROUTES.USERS_LIST, icon: Users }
]

export function Sidebar({ className }: SidebarProps) {
  const { logOut } = useLogin()
  const { close, isOpen, open } = useSidebarState()
  const isDesktop = useMediaQueryScreen('(min-width: 1280px)')

  // Sincronizar estado del sidebar cuando cambia el breakpoint
  useEffect(() => {
    if (isDesktop) {
      open() // En desktop, siempre abierto
    } else {
      close() // En mobile, cerrado por defecto
    }
  }, [isDesktop, open, close])

  // Manejar comportamiento mobile: Escape + prevenir scroll
  useEffect(() => {
    if (isDesktop) return

    // Cerrar con Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close()
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, isDesktop, close])

  // Desktop: isOpen = true → expandido (290px), isOpen = false → colapsado (90px)
  // Mobile: isOpen = true → modal (290px), isOpen = false → oculto
  const sidebarWidth = isOpen ? 'w-[290px]' : 'w-[90px]'
  // const showLabels = isOpen

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 z-35 bg-black/50 xl:hidden h-screen"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="main-sidebar"
        role="navigation"
        aria-label="Navegación principal"
        className={cn(
          'fixed top-0 left-0 z-40 h-screen flex-shrink-0',
          'bg-white border-r border-gray-200 flex flex-col',
          'transition-all duration-300 ease-in-out',
          sidebarWidth,
          // Desktop: siempre visible, cambia solo el ancho
          isDesktop ? 'translate-x-0' : '',
          // Mobile: overlay modal, se oculta con translate
          !isDesktop ? (isOpen ? 'translate-x-0' : '-translate-x-full') : '',
          className
        )}
      >
        {/* Header */}
        <div
          className={cn(
            'flex items-center h-18 px-4 transition-all',
            isOpen ? 'justify-start gap-3' : 'justify-center'
          )}
        >
          <img src={fervorLogo} alt="Logo Fervor Juvenil" className="w-12 flex-shrink-0" />
          {isOpen && <h2 className="text-lg font-bold text-gray-900">Fervor Juvenil</h2>}
        </div>

        {/* Navigation - flex-1 permite que ocupe el espacio disponible */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={!isDesktop ? close : undefined}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg',
                        'text-sm font-medium transition-colors',
                        isOpen ? 'justify-start' : 'justify-center',
                        isActive
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      )
                    }
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {isOpen && <span>{item.label}</span>}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer - Logout siempre en la parte inferior */}
        <div className="border-t border-gray-200 p-4 mt-auto">
          <Button
            onClick={logOut}
            variant="ghost"
            size="sm"
            fullWidth
            leftIcon={<LogOut className="h-5 w-5" />}
            className={cn(
              'text-red-600 hover:bg-red-50 hover:text-red-700',
              isOpen ? 'justify-start' : 'justify-center px-0'
            )}
          >
            {isOpen && <span>Cerrar Sesión</span>}
          </Button>
        </div>
      </aside>
    </>
  )
}
