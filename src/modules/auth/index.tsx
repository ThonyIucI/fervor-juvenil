import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

import { InputField } from '../../@common/components/InputField'
import { useBoolean } from '../../@common/hooks/useBoolean'
import { USERS_ROUTES } from '../users/routes'

import useLogin from './hooks/useLogin'
import type { ILoginInputs } from './types/Login'

import fervorLogo from '/fj.svg'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginInputs>()
  const { isLoading, handleLogin, loginErros, user } = useLogin()
  const isPasswordType = useBoolean(true)
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(USERS_ROUTES.PROFILE, { replace: true })
    }
  }, [user])

  const onSubmit = async (data: ILoginInputs) => {
    handleLogin(data)
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="w-full flex justify-center mb-8">
          <img src={fervorLogo} alt="Logo Fervor Juvenil" className="w-32" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Bienvenido</h2>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Ingresa tus credenciales para continuar
        </p>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Correo electrónico"
            type="email"
            placeholder="correo@ejemplo.com"
            register={register('email', { required: 'El correo es obligatorio' })}
            error={errors.email?.message || loginErros?.email}
            disabled={isLoading}
          />
          <InputField
            label="Contraseña"
            type={isPasswordType.active ? 'password' : 'text'}
            placeholder="Ingresa tu contraseña"
            register={register('password', { required: 'La contraseña es obligatoria' })}
            error={errors.password?.message || loginErros?.password}
            disabled={isLoading}
            rightIcon={
              isPasswordType.active ? (
                <EyeOff size={18} onClick={isPasswordType.close} className="cursor-pointer" />
              ) : (
                <Eye size={18} onClick={isPasswordType.open} className="cursor-pointer" />
              )
            }
          />
          <button
            disabled={isLoading}
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium py-2.5 rounded-xl transition-all duration-150 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-500">
          ¿No tienes una cuenta?{' '}
          <span className="text-indigo-600 font-medium">Contáctate con un administrador</span>
        </p>
      </div>
    </div>
  )
}
