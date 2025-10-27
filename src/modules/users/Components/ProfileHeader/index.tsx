import { Edit2, Mail, User } from 'lucide-react'

import { Button } from '@common/components/Button'
import { Card } from '@common/components/Card'
import { cn } from '@common/utils/cn'

import type { IUserWithProfile } from '../../types/Profile'
import { calculateAge } from '../../utils/dateUtils'

interface ProfileHeaderProps {
  user: IUserWithProfile
  onEdit?: () => void
  className?: string
}

/**
 * Profile header with user basic info and avatar
 */
export function ProfileHeader({ user, onEdit, className }: ProfileHeaderProps) {
  const { firstName, lastName, email, profile } = user
  const fullName =
    profile?.firstNames && profile?.lastNames
      ? `${profile.firstNames} ${profile.lastNames}`
      : `${firstName} ${lastName}`

  const age = profile?.birthDate ? calculateAge(profile.birthDate) : null
  const alias = profile?.alias

  // Generate initials for avatar
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

  return (
    <Card variant="outlined" className={cn('p-6', className)}>
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-3xl font-bold text-indigo-600">{initials}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>

              {alias && (
                <p className="text-sm text-gray-500 mt-1">
                  Alias: <span className="font-medium">{alias}</span>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </div>

                {age !== null && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{age} años</span>
                  </div>
                )}

                {profile?.status && (
                  <span
                    className={cn(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      profile.status === 'A'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    )}
                  >
                    {profile.status === 'A' ? 'Activo' : 'Inactivo'}
                  </span>
                )}
              </div>
            </div>

            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Edit2 className="h-4 w-4" />}
                onClick={onEdit}
              >
                Editar
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
