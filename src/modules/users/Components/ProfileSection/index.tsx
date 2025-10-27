import type { ReactNode } from 'react'

import { Card } from '@common/components/Card'
import { cn } from '@common/utils/cn'

interface ProfileSectionProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  actions?: ReactNode
}

/**
 * Reusable section component for profile
 * Wraps content in a Card with a title and optional icon
 */
export function ProfileSection({ title, icon, children, className, actions }: ProfileSectionProps) {
  return (
    <Card variant="outlined" className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon && <div className="text-indigo-600">{icon}</div>}
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div className="space-y-4">{children}</div>
    </Card>
  )
}
