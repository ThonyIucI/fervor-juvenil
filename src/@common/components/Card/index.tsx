import type { ReactNode } from 'react'

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 transition-all duration-300">
      {children}
    </div>
  )
}
