import type { ReactNode } from 'react'

import { cn } from '../../utils/cn'

export function IconButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
}) {
  return (
    <button
      {...props}
      className={cn(
        `w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200
                 flex items-center justify-center transition duration-200 
                 cursor-pointer
                 `,
        className
      )}
    >
      {children}
    </button>
  )
}
