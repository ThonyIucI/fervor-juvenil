import {
  Calendar,
  Edit,
  Heart,
  Home,
  LayoutDashboard,
  Mail,
  Phone,
  Ruler,
  Scale,
  ShieldCheck,
  Shirt,
  Target,
  User
} from 'lucide-react'

import { Button } from '@common/components/Button'
import { Card } from '@common/components/Card'
import { cn } from '@common/utils/cn'
import { getUserFullName, getUserInitials, getUserSeniority } from '@common/utils/userUtils'
import type { IUserWithProfile } from '@modules/users/types/Profile'

export interface UserDetailsContentProps {
  user: IUserWithProfile
  onEdit?: (user: IUserWithProfile) => void
  onViewDashboard?: (user: IUserWithProfile) => void
}

export function UserDetailsContent({ user, onEdit, onViewDashboard }: UserDetailsContentProps) {
  const fullName = getUserFullName(user)
  const initials = getUserInitials(user)
  const seniority = getUserSeniority(user.profile?.enrollmentDate)

  return (
    <div className="space-y-6">
      {/* User Header */}
      <div className="flex flex-col items-center text-center">
        <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
          <span className="text-2xl font-semibold text-indigo-700">{initials}</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{fullName}</h3>
        <p className="text-sm text-gray-500 mt-1">{user.email}</p>

        {/* Status Badge */}
        <div className="mt-3">
          <span
            className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
              user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            )}
          >
            {user.isActive ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {onEdit && (
          <Button
            variant="primary"
            size="md"
            onClick={() => onEdit(user)}
            leftIcon={<Edit className="h-4 w-4" />}
            className="flex-1"
          >
            Editar
          </Button>
        )}
        {onViewDashboard && (
          <Button
            variant="outline"
            size="md"
            onClick={() => onViewDashboard(user)}
            leftIcon={<LayoutDashboard className="h-4 w-4" />}
            className="flex-1"
          >
            Ver Dashboard
          </Button>
        )}
      </div>

      {/* Contact Information */}
      <Card variant="outlined" className="p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <User className="h-4 w-4" />
          Información de Contacto
        </h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-gray-900 break-words">{user.email || '-'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Teléfono</p>
              <p className="text-sm text-gray-900">-</p>
            </div>
          </div>
          {user.profile?.alias && (
            <div className="flex items-start gap-3">
              <User className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Alias</p>
                <p className="text-sm text-gray-900">{user.profile.alias}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Personal Information */}
      {user.profile && (
        <Card variant="outlined" className="p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Información Personal
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Edad</p>
              <p className="text-sm text-gray-900">
                {user.profile.age ? `${user.profile.age} años` : '-'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Género</p>
              <p className="text-sm text-gray-900">
                {user.profile.gender === 'M'
                  ? 'Masculino'
                  : user.profile.gender === 'F'
                    ? 'Femenino'
                    : '-'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Fecha de Nacimiento</p>
              <p className="text-sm text-gray-900">
                {user.profile.birthDate
                  ? new Date(user.profile.birthDate).toLocaleDateString('es-PE')
                  : '-'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Antigüedad</p>
              <p className="text-sm text-gray-900">{seniority}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Physical Information */}
      {user.profile && (
        <Card variant="outlined" className="p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            Información Física
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Ruler className="h-4 w-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Altura</p>
                <p className="text-sm text-gray-900">
                  {user.profile.heightMeters ? `${user.profile.heightMeters} m` : '-'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Scale className="h-4 w-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Peso</p>
                <p className="text-sm text-gray-900">
                  {user.profile.weightKg ? `${user.profile.weightKg} kg` : '-'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Uniform Information */}
      {user.profile && user.profile.hasUniform && (
        <Card variant="outlined" className="p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Shirt className="h-4 w-4" />
            Información de Uniforme
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">Talla Polo</p>
              <p className="text-sm text-gray-900">{user.profile.shirtSize || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Talla Pantalón</p>
              <p className="text-sm text-gray-900">{user.profile.pantsSize || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Talla Zapato</p>
              <p className="text-sm text-gray-900">{user.profile.shoeSize || '-'}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Health Information */}
      {user.profile && (
        <Card variant="outlined" className="p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Información de Salud
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500">Seguro de Salud</p>
              <p className="text-sm text-gray-900">{user.profile.healthInsurance || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tipo de Sangre</p>
              <p className="text-sm text-gray-900">{user.profile.bloodType || '-'}</p>
            </div>
            {user.profile.allergies && (
              <div>
                <p className="text-xs text-gray-500">Alergias</p>
                <p className="text-sm text-gray-900">{user.profile.allergies}</p>
              </div>
            )}
            {user.profile.disabilityOrDisorder && (
              <div>
                <p className="text-xs text-gray-500">Condiciones Médicas</p>
                <p className="text-sm text-gray-900">{user.profile.disabilityOrDisorder}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Additional Information */}
      {user.profile && (
        <Card variant="outlined" className="p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Información Adicional
          </h4>
          <div className="space-y-3">
            {user.profile.currentResidence && (
              <div className="flex items-start gap-3">
                <Home className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Residencia Actual</p>
                  <p className="text-sm text-gray-900">{user.profile.currentResidence}</p>
                </div>
              </div>
            )}
            {user.profile.professionalGoal && (
              <div className="flex items-start gap-3">
                <Target className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Meta Profesional</p>
                  <p className="text-sm text-gray-900">{user.profile.professionalGoal}</p>
                </div>
              </div>
            )}
            {user.profile.favoriteHero && (
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Héroe Favorito</p>
                  <p className="text-sm text-gray-900">{user.profile.favoriteHero}</p>
                </div>
              </div>
            )}
            {user.profile.enrollmentDate && (
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Fecha de Inscripción</p>
                  <p className="text-sm text-gray-900">
                    {new Date(user.profile.enrollmentDate).toLocaleDateString('es-PE')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
