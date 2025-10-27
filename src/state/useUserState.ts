import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { IUser } from '../modules/auth/types/User'

interface IUserState {
  user: IUser | null
  setUser: (user: IUser | null) => void
}

export const useUserState = create<IUserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: IUser | null) => set({ user })
    }),
    {
      name: 'user'
    }
  )
)
