import { create } from 'zustand'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface IToast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface IToastState {
  toasts: IToast[]
  addToast: (toast: Omit<IToast, 'id'>) => void
  removeToast: (id: string) => void
  clearAll: () => void
}

export const useToastState = create<IToastState>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const newToast: IToast = { id, ...toast }

    set((state) => ({
      toasts: [...state.toasts, newToast]
    }))

    // Auto-remove after duration (default 5 seconds)
    const duration = toast.duration ?? 5000
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }))
    }, duration)
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    })),

  clearAll: () => set({ toasts: [] })
}))
