import { AlertCircle, CheckCircle2, Info,X, XCircle } from 'lucide-react'

import type { IToast } from '@/state/useToastState'
import { useToastState } from '@/state/useToastState'
import { cn } from '@common/utils/cn'

interface ToastProps {
  toast: IToast
}

const toastStyles = {
  success: {
    container: 'bg-green-50 border-green-200',
    icon: 'text-green-600',
    text: 'text-green-900',
    IconComponent: CheckCircle2
  },
  error: {
    container: 'bg-red-50 border-red-200',
    icon: 'text-red-600',
    text: 'text-red-900',
    IconComponent: XCircle
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-600',
    text: 'text-yellow-900',
    IconComponent: AlertCircle
  },
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    text: 'text-blue-900',
    IconComponent: Info
  }
}

export function Toast({ toast }: ToastProps) {
  const { removeToast } = useToastState()
  const style = toastStyles[toast.type]
  const Icon = style.IconComponent

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border p-4 shadow-lg',
        'animate-in slide-in-from-right duration-300',
        'min-w-[300px] max-w-md',
        style.container
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', style.icon)} />

      <p className={cn('flex-1 text-sm font-medium', style.text)}>{toast.message}</p>

      <button
        onClick={() => removeToast(toast.id)}
        className={cn('flex-shrink-0 rounded-lg p-1 transition-colors', 'hover:bg-black/5')}
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
