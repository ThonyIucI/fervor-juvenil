import { Edit, LayoutDashboard, Mail, MoreVertical, Phone } from 'lucide-react'

import type { DropdownItem } from '@/@common/components/Dropdown'
import { Dropdown } from '@/@common/components/Dropdown'
import { Button } from '@common/components/Button'
import { Card } from '@common/components/Card'
import { cn } from '@common/utils/cn'
import { getUserFullNameLastFirst, getUserInitials } from '@common/utils/userUtils'

import type { IUserWithProfile } from '../../types/Profile'

interface UserCardProps {
  user: IUserWithProfile
  onEdit?: (user: IUserWithProfile) => void
  onViewDashboard?: (user: IUserWithProfile) => void
  onCardClick?: (user: IUserWithProfile) => void
  className?: string
}

export function UserCard({ user, onEdit, onViewDashboard, onCardClick, className }: UserCardProps) {
  // Build dropdown items
  const dropdownItems: DropdownItem[] = []

  if (onEdit) {
    dropdownItems.push({
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: () => onEdit(user)
    })
  }

  if (onViewDashboard) {
    dropdownItems.push({
      label: 'Ver Dashboard',
      icon: <LayoutDashboard className="h-4 w-4" />,
      onClick: () => onViewDashboard(user)
    })
  }

  return (
    <div onClick={() => onCardClick?.(user)}>
      <Card
        className={cn(
          'md:hidden relative cursor-pointer hover:shadow-md transition-shadow',
          className
        )}
      >
        {/* Header with avatar, name and menu */}
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <span className="text-sm font-semibold">{getUserInitials(user)}</span>
            </div>
          </div>

          {/* Name and status */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate capitalize">{getUserFullNameLastFirst(user)}</h3>
            <div className="mt-1">
              {user.isActive ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Activo
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Inactivo
                </span>
              )}
            </div>
          </div>

          {/* 3-dot menu */}
          {dropdownItems.length > 0 && (
            <div onClick={(e) => e.stopPropagation()}>
              <Dropdown
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    aria-label="Opciones"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </Button>
                }
                items={dropdownItems}
                align="right"
              />
            </div>
          )}
        </div>

        {/* Contact info */}
        <div className="space-y-2 text-sm">
          {/* Email */}
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{user.email || '-'}</span>
          </div>

          {/* Phone (placeholder) */}
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span>-</span>
          </div>

          {/* Alias */}
          {user.profile?.alias && (
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-xs font-medium text-gray-500">Alias:</span>
              <span className="text-gray-700">{user.profile.alias}</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
