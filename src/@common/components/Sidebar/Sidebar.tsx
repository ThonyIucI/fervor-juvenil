import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { LogOut, User, Users } from 'lucide-react'

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
  { label: 'Mi Perfil', path: '/profile', icon: User },
  { label: 'Usuarios', path: '/users', icon: Users }
]

export function Sidebar({ className }: SidebarProps) {
  const { logOut } = useLogin()
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebarState()
  const { status: isDesktop } = useMediaQueryScreen('(min-width: 1280px)')
  const isMobile = !isDesktop

  // Cerrar mobile al presionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        closeMobile()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileOpen, closeMobile])

  // Prevenir scroll del body en mobile cuando está abierto
  useEffect(() => {
    if (isMobileOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen, isMobile])

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && isMobile && (
        <div
          className="fixed inset-0 z-35 bg-black/50 md:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="main-sidebar"
        role="navigation"
        aria-label="Navegación principal"
        className={cn(
          'fixed top-0 left-0 z-40 h-screen flex-shrink-0 w-64',
          'bg-white border-r border-gray-200',
          'transition-transform duration-300 ease-in-out xl:translate-x-0',
          // Desktop: hide/show con translate
          isDesktop ? (!isCollapsed ? 'w-[90px] -translate-x-full' : 'w-[290px] -translate-x-full') : undefined,
          // Mobile: hide/show con translate
          isMobile ? (isMobileOpen ? 'w-[290px] translate-x-0' : 'w-[90px] -translate-x-full') : undefined,
          className
        )}
      >
        <div className={`py-2 flex ${isCollapsed?'xl:justify-center':'justify-start'}`}>
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4">
           <img src={fervorLogo} alt="Logo Fervor Juvenil" className="w-12" />
{isCollapsed&&         <h2 className="text-lg font-bold text-gray-900">Fervor Juvenil</h2>
}          </div>
        </div>
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={isMobile ? closeMobile : undefined}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg',
                          'text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        )
                      }
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                     {isCollapsed&&  isDesktop&& <span>{item.label}</span>}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer - Logout */}
          <div className="border-t border-gray-200 p-4">
            <Button
              onClick={logOut}
              variant="ghost"
              size="sm"
              fullWidth
              leftIcon={<LogOut className="h-5 w-5" />}
              className="text-red-600 hover:bg-red-50 hover:text-red-700 justify-start"
            >
              {isCollapsed&& <span>Cerrar Sesión</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
