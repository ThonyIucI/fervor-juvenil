import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggleCollapsed: () => void
  toggleMobileOpen: () => void
  closeMobile: () => void
}

export const useSidebarState = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: false,
      isMobileOpen: false,
      toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      toggleMobileOpen: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
      closeMobile: () => set({ isMobileOpen: false })
    }),
    {
      name: 'sidebar-state',
      partialize: (state) => ({ isCollapsed: state.isCollapsed }) // Solo persistir collapsed
    }
  )
)
