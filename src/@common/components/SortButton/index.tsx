import { ArrowUpDown } from 'lucide-react'

import { Button, type ButtonSize, type ButtonVariant } from '@common/components/Button'
import { buttonBase, buttonSizes, buttonVariants } from '@common/components/Button/button.styles'
import { cn } from '@common/utils/cn'

interface SortButtonProps {
  onClick: () => void
  disabled?: boolean
  active?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
  className?: string
}

export const SortButton = ({
  onClick,
  disabled = false,
  active = false,
  size = 'md',
  variant = 'outline',
  className
}: SortButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      className={className}
      aria-label="Ordenar"
    >
      <ArrowUpDown className={cn('h-5 w-5', active ? 'text-indigo-600' : 'text-gray-600')} />
    </Button>
  )
}
