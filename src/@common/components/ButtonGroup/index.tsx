import type { ReactNode } from 'react'

import type { ButtonSize, ButtonVariant } from '@common/components/Button'
import { buttonBase, buttonSizes, buttonVariants } from '@common/components/Button/button.styles'
import { cn } from '@common/utils/cn'

interface ButtonGroupItem {
  label: ReactNode
  onClick: () => void
  disabled?: boolean
  ariaLabel?: string
}

interface ButtonGroupProps {
  items: ButtonGroupItem[]
  size?: ButtonSize
  variant?: ButtonVariant
  className?: string
}

export const ButtonGroup = ({
  items,
  size = 'sm',
  variant = 'outline',
  className
}: ButtonGroupProps) => {
  return (
    <div className={cn('inline-flex overflow-hidden', className)}>
      {items.map((item, index) => {
        const isFirst = index === 0
        const isLast = index === items.length - 1

        return (
          <button
            key={index}
            onClick={item.onClick}
            disabled={item.disabled}
            aria-label={item.ariaLabel}
            className={cn(
              buttonBase,
              buttonVariants[variant],
              buttonSizes[size],
              index > 0 ? 'border-l-0' : '',
              isFirst ? 'rounded-l-lg' : '',
              isLast ? 'rounded-r-lg' : '',
              !isFirst && !isLast ? 'rounded-none' : '',
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
