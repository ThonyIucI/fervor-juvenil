import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

import { cn } from '../../utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm hover:shadow',
  secondary:
    'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 border border-gray-200',
  outline:
    'border border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 bg-white text-gray-700',
  ghost: 'hover:bg-gray-100 active:bg-gray-200 text-gray-700',
  danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm hover:shadow'
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl'
}

/**
 * Reusable Button component with variants, sizes, and loading state
 *
 * @example
 * <Button variant="primary" size="md" isLoading={loading} onClick={handleClick}>
 *   Submit
 * </Button>
 */
export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      {...props}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400',
        'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        buttonVariants[variant],
        buttonSizes[size],
        fullWidth ? 'w-full' : '',
        className
      )}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg">
          <Loader2 className="w-5 h-5 animate-spin" />
        </span>
      )}

      <div className={cn('flex items-center gap-2', isLoading ? 'invisible' : '')}>
        {leftIcon && <span className="flex items-center justify-center">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="flex items-center justify-center">{rightIcon}</span>}
      </div>
    </button>
  )
}
