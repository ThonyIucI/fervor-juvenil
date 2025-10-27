import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LogOut,Menu, User, Users, X } from 'lucide-react'

import { useUserState } from '@/state/useUserState'
import { cn } from '@common/utils/cn'
import useLogin from '@modules/auth/hooks/useLogin'

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
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUserState()
  const { logOut } = useLogin()

  const closeSidebar = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed top-4 left-4 z-50 flex items-center justify-center',
          'rounded-lg bg-white p-2 shadow-md',
          'hover:bg-gray-50 transition-colors',
          'md:hidden'
        )}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen',
          'w-64 bg-white border-r border-gray-200',
          'transition-transform duration-300 ease-in-out',
          'md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="text-lg font-bold text-gray-900">Fervor Juvenil</h2>
            <button
              onClick={closeSidebar}
              className="md:hidden rounded-lg p-1 hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2',
                          'text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        )
                      }
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer - Logout */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={logOut}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2',
                'text-sm font-medium text-red-600',
                'hover:bg-red-50 transition-colors'
              )}
            >
              <LogOut className="h-5 w-5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Spacer for desktop to prevent content from going under sidebar */}
      <div className="hidden md:block md:w-64" />
    </>
  )
}
