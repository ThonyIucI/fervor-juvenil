import type { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

import { cn } from '../../utils/cn'

export function Button({
  children,
  className,
  isLoading,
  leftIcon,
  rightIcon,
  fullWidth,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    isLoading?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    fullWidth?: boolean
}) {
  return (
    <button
      disabled={props.disabled || isLoading}
      {...props}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
        'bg-gray-100 hover:bg-gray-200 text-gray-900 cursor-pointer',
        'disabled:opacity-80 disabled:cursor-not-allowed',
        fullWidth ? 'w-full' : 'w-fit',
        className
      )}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full transition-opacity duration-300">
          <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
        </span>
      )}

      <div className={cn('flex items-center gap-2', isLoading ? 'opacity-50' : '')}>
        {leftIcon && (
          <span className="w-4 h-4 flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {rightIcon && (
          <span className="w-4 h-4 flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </div>
    </button>
  )
}
