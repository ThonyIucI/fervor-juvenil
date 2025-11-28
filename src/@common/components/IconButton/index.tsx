import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@common/utils/cn'

export type IconButtonSize = 'sm' | 'md' | 'lg'
export type IconButtonColor = 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon element to display
   */
  children: ReactNode

  /**
   * Button size
   * @default 'md'
   */
  size?: IconButtonSize

  /**
   * Button color scheme
   * @default 'default'
   */
  color?: IconButtonColor

  /**
   * Button variant style
   * @default 'ghost'
   */
  variant?: 'filled' | 'outlined' | 'ghost'

  /**
   * Additional className
   */
  className?: string

  /**
   * Disabled state
   */
  disabled?: boolean
}

// Size-specific dimensions
const iconButtonSizes: Record<IconButtonSize, string> = {
  sm: 'w-8 h-8 p-1',
  md: 'w-9 h-9 p-2',
  lg: 'w-10 h-10 p-3'
}

// Icon sizes to match container
const iconSizes: Record<IconButtonSize, string> = {
  sm: '[&>svg]:w-4 [&>svg]:h-4',
  md: '[&>svg]:w-5 [&>svg]:h-5',
  lg: '[&>svg]:w-6 [&>svg]:h-6'
}

// Color variants for filled style
const filledColors: Record<IconButtonColor, string> = {
  default: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700',
  primary: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white',
  secondary: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white',
  danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white',
  success: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white',
  warning: 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white'
}

// Color variants for outlined style
const outlinedColors: Record<IconButtonColor, string> = {
  default: 'border border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 text-gray-700',
  primary: 'border border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50 active:bg-indigo-100 text-indigo-600',
  secondary: 'border border-purple-300 hover:border-purple-400 hover:bg-purple-50 active:bg-purple-100 text-purple-600',
  danger: 'border border-red-300 hover:border-red-400 hover:bg-red-50 active:bg-red-100 text-red-600',
  success: 'border border-green-300 hover:border-green-400 hover:bg-green-50 active:bg-green-100 text-green-600',
  warning: 'border border-amber-300 hover:border-amber-400 hover:bg-amber-50 active:bg-amber-100 text-amber-600'
}

// Color variants for ghost style
const ghostColors: Record<IconButtonColor, string> = {
  default: 'hover:bg-gray-100 active:bg-gray-200 text-gray-700',
  primary: 'hover:bg-indigo-50 active:bg-indigo-100 text-indigo-600',
  secondary: 'hover:bg-purple-50 active:bg-purple-100 text-purple-600',
  danger: 'hover:bg-red-50 active:bg-red-100 text-red-600',
  success: 'hover:bg-green-50 active:bg-green-100 text-green-600',
  warning: 'hover:bg-amber-50 active:bg-amber-100 text-amber-600'
}

/**
 * IconButton component - Button optimized for displaying icons
 *
 * Follows Material UI design patterns with support for:
 * - 3 sizes (sm, md, lg)
 * - 6 color schemes (default, primary, secondary, danger, success, warning)
 * - 3 variants (filled, outlined, ghost)
 *
 * @example
 * <IconButton size="md" color="primary" variant="outlined">
 *   <EditIcon />
 * </IconButton>
 */
export function IconButton({
  children,
  size = 'md',
  color = 'default',
  variant = 'ghost',
  className,
  disabled = false,
  ...props
}: IconButtonProps) {
  const getColorClasses = () => {
    switch (variant) {
      case 'filled':
        return filledColors[color]
      case 'outlined':
        return outlinedColors[color]
      case 'ghost':
      default:
        return ghostColors[color]
    }
  }

  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-lg cursor-pointer',
        'transition-all duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        // Size
        iconButtonSizes[size],
        iconSizes[size],
        // Color variant
        getColorClasses(),
        className
      )}
    >
      {children}
    </button>
  )
}
