import { create } from 'zustand'

interface SidebarState {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

// Detectar si es desktop (≥1280px) al inicializar
const getInitialSidebarState = (): boolean => {
  if (typeof window === 'undefined') return false
  // Abrir en desktop, cerrar en mobile
  return window.innerWidth >= 1280
}

export const useSidebarState = create<SidebarState>()(
  (set) => ({
    isOpen: getInitialSidebarState(),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
  })
)
