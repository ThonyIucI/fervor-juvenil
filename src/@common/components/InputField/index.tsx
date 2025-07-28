import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    register: UseFormRegisterReturn
    error?: string
}

export const InputField = ({ label, register, error, className = '', ...rest }: InputFieldProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                {...register}
                {...rest}
                className={
                    `w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2
                     focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all 
                    ${error ? 'border-red-500' : ''} ${className}
                    `}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}
