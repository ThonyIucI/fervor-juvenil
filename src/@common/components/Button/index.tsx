import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

import { cn } from '../../utils/cn'

import { buttonBase, buttonSizes, buttonVariants } from './button.styles'

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
        buttonBase,
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
