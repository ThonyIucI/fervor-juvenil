// InputField.tsx
import type { InputHTMLAttributes, ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  register: UseFormRegisterReturn
  error?: string
  rightIcon?: ReactNode
}

export const InputField = ({
  label,
  register,
  error,
  rightIcon,
  className = '',
  ...rest
}: InputFieldProps) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <input
        {...register}
        {...rest}
        className={`w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2
          focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all 
          ${rightIcon ? 'pr-10' : ''}
          ${error ? 'border-red-500' : ''} ${className}
          `}
      />
      {rightIcon && (
        <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">
          {rightIcon}
        </span>
      )}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
)
