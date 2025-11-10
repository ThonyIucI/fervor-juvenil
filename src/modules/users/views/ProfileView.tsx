import { useEffect } from 'react'
import { Heart, MapPin, Shirt, Star, User } from 'lucide-react'

import { useRequest } from '@/@common/hooks/useRequest'
import { Loader } from '@common/components/Loader'

import { ProfileFieldDisplay } from '../Components/ProfileFieldDisplay'
import { ProfileHeader } from '../Components/ProfileHeader'
import { ProfileSection } from '../Components/ProfileSection'
import { ProfileService } from '../services/profile.service'
import type { IUserWithProfile } from '../types/Profile'
import { GENDER_LABELS } from '../utils/constants'
import { formatDate, formatDateShort } from '../utils/dateUtils'

export default function ProfileView() {
  const GetProfile = useRequest<IUserWithProfile>(
    false,
    () => ProfileService.getMyProfile()
  )

  useEffect(() => {
    GetProfile.handler()
  }, [])

  if (GetProfile.loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }
  const profile = GetProfile.data
  const userProfile = profile?.profile

  if (!profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No se pudo cargar la información del perfil</p>
          <p className="text-gray-400 text-sm mt-2">Intenta recargar la página</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>

      {/* Header with basic info */}
      <ProfileHeader user={profile} />

      {!userProfile ?
        <div className="mt-8 text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Perfil Incompleto</h3>
          <p className="text-gray-500">Completa tu perfil para que podamos conocerte mejor</p>
        </div> :
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Personal Information */}
          <ProfileSection title="Datos Personales" icon={<User className="h-5 w-5" />}>
            <dl className="grid grid-cols-2 gap-4">
              <ProfileFieldDisplay
                label="Nombres Completos"
                value={userProfile?.firstNames}
                fullWidth
              />
              <ProfileFieldDisplay
                label="Apellidos Completos"
                value={userProfile?.lastNames}
                fullWidth
              />
              <ProfileFieldDisplay label="Alias" value={userProfile?.alias} />
              <ProfileFieldDisplay
                label="Género"
                value={userProfile?.gender ? GENDER_LABELS[userProfile?.gender] : null}
              />
              <ProfileFieldDisplay
                label="Fecha de Nacimiento"
                value={userProfile?.birthDate ? formatDate(userProfile.birthDate) : null}
                fullWidth
              />
              <ProfileFieldDisplay
                label="Fecha de Registro"
                value={
                  userProfile?.enrollmentDate ? formatDateShort(userProfile.enrollmentDate) : null
                }
              />
              <ProfileFieldDisplay
                label="Fecha de Inscripción"
                value={
                  userProfile?.enrollmentDate ? formatDateShort(userProfile.enrollmentDate) : null
                }
              />
            </dl>
          </ProfileSection>

          {/* Contact */}
          <ProfileSection title="Contacto" icon={<MapPin className="h-5 w-5" />}>
            <dl className="grid grid-cols-1 gap-4">
              <ProfileFieldDisplay label="Correo Electrónico" value={profile.email} fullWidth />
              <ProfileFieldDisplay
                label="Residencia Actual"
                value={userProfile?.currentResidence}
                fullWidth
              />
            </dl>
          </ProfileSection>

          {/* Health Information */}
          <ProfileSection title="Información de Salud" icon={<Heart className="h-5 w-5" />}>
            <dl className="grid grid-cols-2 gap-4">
              <ProfileFieldDisplay
                label="Seguro de Salud"
                value={userProfile?.healthInsurance}
                fullWidth
              />
              <ProfileFieldDisplay label="Tipo de Sangre" value={userProfile?.bloodType} />
              <ProfileFieldDisplay
                label="Altura (m)"
                value={userProfile?.heightMeters ? `${userProfile.heightMeters} m` : null}
              />
              <ProfileFieldDisplay
                label="Peso (kg)"
                value={userProfile?.weightKg ? `${userProfile.weightKg} kg` : null}
              />
              <ProfileFieldDisplay label="Alergias" value={userProfile?.allergies} fullWidth />
              <ProfileFieldDisplay
                label="Discapacidad o Trastorno"
                value={userProfile?.disabilityOrDisorder}
                fullWidth
              />
            </dl>
          </ProfileSection>

          {/* Sizes */}
          <ProfileSection title="Tallas" icon={<Shirt className="h-5 w-5" />}>
            <dl className="grid grid-cols-2 gap-4">
              <ProfileFieldDisplay label="¿Tiene Polo?" value={userProfile?.hasUniform} fullWidth />
              <ProfileFieldDisplay label="Talla de Camisa" value={userProfile?.shirtSize} />
              <ProfileFieldDisplay label="Talla de Pantalón" value={userProfile?.pantsSize} />
              <ProfileFieldDisplay label="Talla de Zapato" value={userProfile?.shoeSize} />
            </dl>
          </ProfileSection>

          {/* Additional Information */}
          <ProfileSection
            title="Información Adicional"
            icon={<Star className="h-5 w-5" />}
            className="lg:col-span-2"
          >
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfileFieldDisplay
                label="Meta Profesional"
                value={userProfile?.professionalGoal}
                fullWidth
              />
              <ProfileFieldDisplay
                label="Superhéroe Favorito"
                value={userProfile?.favoriteHero}
                fullWidth
              />
            </dl>
          </ProfileSection>
        </div>}
    </div>
  )
}
