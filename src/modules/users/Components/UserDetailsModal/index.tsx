import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { X } from 'lucide-react'

import { Button } from '@common/components/Button'
import { cn } from '@common/utils/cn'

export interface UserDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export function UserDetailsModal({
  isOpen,
  onClose,
  children,
  title = 'Detalle de Usuario'
}: UserDetailsModalProps) {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full md:w-[500px] lg:w-[600px] bg-white shadow-2xl z-50',
          'transform transition-opacity duration-400 ease-in-out',
          'flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gray-50">
          <h2 id="modal-title" className="text-lg md:text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="h-8 w-8 p-0 hover:bg-gray-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
      </div>
    </>
  )
}
