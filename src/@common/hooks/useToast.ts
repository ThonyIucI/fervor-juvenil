import { useCallback } from 'react'

import type { ToastType } from '@/state/useToastState'
import { useToastState } from '@/state/useToastState'

/**
 * Helper hook to simplify toast usage
 * Provides convenient methods to show toasts
 *
 * @example
 * const toast = useToast()
 * toast.success('Profile updated!')
 * toast.error('Failed to save changes')
 */
export function useToast() {
  const { addToast } = useToastState()

  const showToast = useCallback(
    (type: ToastType, message: string, duration?: number) => {
      addToast({ type, message, duration })
    },
    [addToast]
  )

  return {
    /**
     * Show a success toast
     * @param message - Success message
     * @param duration - Duration in ms (default 5000)
     */
    success: (message: string, duration?: number) => {
      showToast('success', message, duration)
    },

    /**
     * Show an error toast
     * @param message - Error message
     * @param duration - Duration in ms (default 5000)
     */
    error: (message: string, duration?: number) => {
      showToast('error', message, duration)
    },

    /**
     * Show a warning toast
     * @param message - Warning message
     * @param duration - Duration in ms (default 5000)
     */
    warning: (message: string, duration?: number) => {
      showToast('warning', message, duration)
    },

    /**
     * Show an info toast
     * @param message - Info message
     * @param duration - Duration in ms (default 5000)
     */
    info: (message: string, duration?: number) => {
      showToast('info', message, duration)
    }
  }
}
