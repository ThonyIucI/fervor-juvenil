import type { InputHTMLAttributes, ReactNode } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { cn } from '../../utils/cn'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  inputSize?: InputSize
  register?: UseFormRegisterReturn
  fullWidth?: boolean
}

const inputSizes: Record<InputSize, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base'
}

/**
 * Reusable Input component with label, error handling, and icons
 *
 * @example
 * // With react-hook-form
 * <Input
 *   label="Email"
 *   register={register('email')}
 *   error={errors.email?.message}
 *   type="email"
 * />
 *
 * @example
 * // Without react-hook-form
 * <Input
 *   label="Search"
 *   value={search}
 *   onChange={(e) => setSearch(e.target.value)}
 *   leftIcon={<SearchIcon />}
 * />
 */
export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  inputSize = 'md',
  register,
  className,
  fullWidth = true,
  disabled,
  id,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className={cn('flex flex-col gap-1', fullWidth ? 'w-full' : '')}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          {...(register || {})}
          {...props}
          disabled={disabled}
          className={cn(
            'w-full rounded-xl border transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400',
            'placeholder:text-gray-400',
            inputSizes[inputSize],
            leftIcon ? 'pl-10' : '',
            rightIcon ? 'pr-10' : '',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100',
            className
          )}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-1" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && <p className="text-sm text-gray-500 mt-1">{helperText}</p>}
    </div>
  )
}
