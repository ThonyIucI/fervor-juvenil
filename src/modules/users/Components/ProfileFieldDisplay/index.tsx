import { cn } from '@common/utils/cn'

interface ProfileFieldDisplayProps {
  label: string
  value: string | number | boolean | null | undefined
  className?: string
  fullWidth?: boolean
}

/**
 * Display a single profile field with label and value
 * Shows "-" when value is null/undefined
 */
export function ProfileFieldDisplay({
  label,
  value,
  className,
  fullWidth = false
}: ProfileFieldDisplayProps) {
  // Format value for display
  const displayValue = () => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-400 italic">No especificado</span>
    }

    if (typeof value === 'boolean') {
      return (
        <span className={cn(value ? 'text-green-600' : 'text-red-600')}>{value ? 'Sí' : 'No'}</span>
      )
    }

    return value
  }

  return (
    <div className={cn('flex flex-col gap-1', fullWidth ? 'col-span-2' : '', className)}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="text-sm text-gray-900">{displayValue()}</dd>
    </div>
  )
}
