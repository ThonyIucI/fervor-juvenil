import type { ReactNode } from 'react'

import { cn } from '../../utils/cn'

export interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'outlined' | 'elevated'
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-white rounded-2xl shadow-sm border border-gray-100',
    outlined: 'bg-white rounded-2xl border-2 border-gray-200',
    elevated: 'bg-white rounded-2xl shadow-md border border-gray-50'
  }

  return (
    <div className={cn('p-6 transition-all duration-200', variants[variant], className)}>
      {children}
    </div>
  )
}
