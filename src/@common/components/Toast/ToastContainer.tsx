import { useToastState } from '@/state/useToastState'

import { Toast } from '.'

export function ToastContainer() {
  const { toasts } = useToastState()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
