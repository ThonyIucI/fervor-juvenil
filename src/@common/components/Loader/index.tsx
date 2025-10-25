import { Loader2 } from 'lucide-react'

import { cn } from '../../utils/cn'

export type LoaderSize = 'sm' | 'md' | 'lg' | 'xl'
export type LoaderVariant = 'primary' | 'secondary' | 'white'

export interface LoaderProps {
  size?: LoaderSize
  variant?: LoaderVariant
  className?: string
  text?: string
}

const loaderSizes: Record<LoaderSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

const loaderVariants: Record<LoaderVariant, string> = {
  primary: 'text-indigo-600',
  secondary: 'text-gray-600',
  white: 'text-white'
}

/**
 * Reusable Loader component with different sizes and variants
 *
 * @example
 * <Loader size="md" variant="primary" text="Loading..." />
 */
export function Loader({ size = 'md', variant = 'primary', className, text }: LoaderProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin', loaderSizes[size], loaderVariants[variant])} />
      {text && (
        <p
          className={cn(
            'text-sm font-medium',
            variant === 'white' ? 'text-white' : 'text-gray-600'
          )}
        >
          {text}
        </p>
      )}
    </div>
  )
}
