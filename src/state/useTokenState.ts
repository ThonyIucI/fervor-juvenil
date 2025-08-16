import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ITokenState{
    accessToken: string,
    setToken: (accessToken: string) => void
}

export const useTokenState = create<ITokenState>()(
  persist(
    (set) => ({
      accessToken: '',
      setToken   : (accessToken: string) => set({ accessToken })
    }),
    {
      name: 'accessToken'
    }
  )
)
