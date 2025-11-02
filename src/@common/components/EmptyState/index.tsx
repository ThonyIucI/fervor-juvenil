// @common/components/States/EmptyState.tsx
import type { ReactNode } from 'react'

interface EmptyStateProps {
    icon: ReactNode
    title: string
    description?: string
    variant?: 'default' | 'warning' | 'error' | 'neutral'
}

export const EmptyState = ({
    icon,
    title,
    description,
    variant = 'default'
}: EmptyStateProps) => {
    const variantStyles = {
        default: 'bg-indigo-100 text-indigo-600',
        warning: 'bg-yellow-100 text-yellow-600',
        error: 'bg-red-100 text-red-600',
        neutral: 'bg-gray-100 text-gray-400'
    }

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            {<div className={`flex h-16 w-16 items-center justify-center rounded-full ${variantStyles[variant]} mb-4`}>
                {icon}
            </div>}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            {description && <p className="text-gray-600 max-w-md">{description}</p>}
        </div>
    )
}