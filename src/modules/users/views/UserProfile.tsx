import { Card } from '../../../@common/components/Card'
import { UserProfileIcon } from '../../../@common/components/UserProfileIcon'
import useLogin from '../../auth/hooks/useLogin'
import { Field } from '../Components/Field'
import { SectionCard } from '../Components/SectionCard'

const getRandomAvatar = () => {
  const MAX_VALUE = 100
  const MIN_VALUE = 1
  const randomId = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE

  return `https://i.pravatar.cc/${randomId}`
}

const UserView = () => {
  const { user } = useLogin()
  // TODO: manejar el user en null
  if (!user) return <div>No tienes acceso a esta página</div>

  return (
    <div className="px-6 py-6 max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
          <p className="text-sm text-gray-500 mt-1">Administra tu información personal</p>
        </div>
      </div>

      <Card variant="elevated">
        <div className="flex items-center space-x-4">
          <UserProfileIcon
            img={{
              alt: user.name ?? `${user.firstName} ${user.lastName}`,
              src: user.imageUrl ?? getRandomAvatar()
            }}
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user.name ?? `${user.firstName} ${user.lastName}`}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Administrador</p>
            <p className="text-sm text-indigo-600 mt-1">{user.email}</p>
          </div>
        </div>
      </Card>

      <SectionCard title="Información personal" onEdit={() => alert('Edit personal info')}>
        <Field label="Nombres" value={user.firstName} />
        <Field label="Apellidos" value={user.lastName} />
        <Field label="Correo electrónico" value={user.email} />
        <Field label="Teléfono/Celular" value={user.phone} />
        <Field label="Procedencia" value="Nueva York" />
      </SectionCard>

      <SectionCard title="Información de residencia" onEdit={() => alert('Edit personal info')}>
        <Field label="Centro poblado" value={user.firstName} />
        <Field label="País" value={user.lastName} />
        <Field label="Correo electrónico" value={user.email} />
        <Field label="Teléfono/Celular" value={user.phone} />
        <Field label="Procedencia" value="Nueva York" />
      </SectionCard>
    </div>
  )
}

export default UserView
