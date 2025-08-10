import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

import { InputField } from '../../@common/components/InputField'
import { useBoolean } from '../../@common/hooks/useBoolean'

import useLogin from './hooks/useLogin'
import type { ILoginInputs } from './types/Login'

import fervorLogo from '/fj.svg'

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginInputs>()
  const { isLoading, handleLogin, loginErros } = useLogin()
  const isPasswordType = useBoolean(true)
  const onSubmit = async (data: ILoginInputs) => {
    handleLogin(data)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 animate-fadeIn">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="w-full flex justify-center">
          <img src={fervorLogo} alt="Logo Fervor Juvenil" className="w-40 mb-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Iniciar sesión</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} >
          <InputField
            label='Correo'
            type='email'
            placeholder='Ingresa tu correo'
            register={register('email', { required: 'El correo es obligatorio' })}
            error={errors.email?.message || loginErros?.email}
            disabled={isLoading}
          />
          <InputField
            label='Contraseña'
            type={isPasswordType.active ? 'password' : 'text'}
            placeholder='••••••••'
            register={register('password', { required: 'La contraseña es obligatoria' })}
            error={errors.password?.message || loginErros?.password}
            disabled={isLoading}
            rightIcon={
              isPasswordType.active ?
                <EyeOff size={20} onClick={isPasswordType.close} /> :
                <Eye size={20} onClick={isPasswordType.open} />
            }
          />

          <button
            disabled={isLoading}
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                        Ingresar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
                    Si no tiene una cuenta contáctese con un administrador
        </div>
      </div>
    </div>
  )
}
