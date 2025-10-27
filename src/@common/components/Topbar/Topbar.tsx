import { useState } from 'react'
import { Bell, Menu, Moon, Search, Sun, X } from 'lucide-react'

import { useSidebarState } from '@/state/useSidebarState'
import { useUserState } from '@/state/useUserState'
import { Button } from '@common/components/Button'
import { useMediaQueryScreen } from '@common/hooks/useMediaQueryScreen'
import { cn } from '@common/utils/cn'

export function Topbar() {
  const { user } = useUserState()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { isOpen, toggle } = useSidebarState()
  const { status: isDesktop } = useMediaQueryScreen('(min-width: 1280px)')

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // TODO: Implement actual dark mode toggle with class on html element
  }

  const getMenuAriaLabel = () => {
    if (!isDesktop) {
      return isOpen ? 'Cerrar menú' : 'Abrir menú'
    }
    return isOpen ? 'Colapsar sidebar' : 'Expandir sidebar'
  }

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-40 xl:border-b" style={{ height: '64px' }}>
      <div className="flex flex-col items-center justify-between grow xl:flex-row xl:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 sm:gap-4 xl:justify-normal xl:border-b-0 xl:px-0 lg:py-4">
          <Button
            onClick={toggle}
            variant="ghost"
            size="sm"
            aria-label={getMenuAriaLabel()}
            aria-expanded={isOpen}
            aria-controls="main-sidebar"
            className={cn('h-9 w-9 p-0', !isDesktop && isOpen ? 'bg-gray-100' : '')}
          >
            {!isDesktop && isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className={cn(
                'w-[220px] rounded-lg border border-gray-200 bg-gray-50',
                'py-2 pl-10 pr-4 text-sm',
                'focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500',
                'transition-colors'
              )}
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="hidden items-center justify-between w-full gap-4 px-5 py-4 xl:flex shadow-theme-md xl:justify-end xl:px-0 xl:shadow-none">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-lg',
              'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              'transition-colors cursor-pointer'
            )}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <button
            className={cn(
              'relative flex h-9 w-9 items-center justify-center rounded-lg',
              'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              'transition-colors cursor-pointer'
            )}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {/* Notification badge */}
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* User Avatar */}
          {user && (
            <div className="flex items-center gap-2 md:gap-3 ml-2">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.roles?.[0] || 'Usuario'}</p>
              </div>
              <button
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full',
                  'bg-indigo-100 text-indigo-600 hover:bg-indigo-200',
                  'transition-colors cursor-pointer'
                )}
                aria-label="User menu"
              >
                <span className="text-sm font-semibold">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
