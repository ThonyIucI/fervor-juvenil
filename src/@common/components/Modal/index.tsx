import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

import { Button } from '@common/components/Button'
import { useClickOutside } from '@common/hooks/useClickOutside'
import { cn } from '@common/utils/cn'

export type ModalPosition = 'center' | 'right' | 'left' | 'bottom'
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
  /**
   * Controls modal visibility
   */
  isOpen: boolean

  /**
   * Callback when modal is closed
   */
  onClose: () => void

  /**
   * Modal content
   */
  children: ReactNode

  /**
   * Optional modal title
   */
  title?: string

  /**
   * Modal position
   * @default 'center'
   */
  position?: ModalPosition

  /**
   * Modal size (only applies to center position)
   * @default 'md'
   */
  size?: ModalSize

  /**
   * Show close button
   * @default true
   */
  showCloseButton?: boolean

  /**
   * Close on overlay click
   * @default true
   */
  closeOnOverlayClick?: boolean

  /**
   * Close on ESC key
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * Additional className for modal container
   */
  className?: string

  /**
   * Additional className for modal content
   */
  contentClassName?: string

  /**
   * Additional className for modal header
   */
  headerClassName?: string
}

/**
 * Modal component with smooth transitions
 *
 * Supports multiple positions (center, right, left, bottom) and sizes
 * Mobile-friendly with responsive behavior
 */
export function Modal({
  isOpen,
  onClose,
  children,
  title,
  position = 'center',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  contentClassName,
  headerClassName
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Handle smooth open/close animations
  useEffect(() => {
    if (isOpen) {
      // Mount and trigger animation
      setIsVisible(true)
      // Small delay to ensure DOM is ready for transition
      const timer = setTimeout(() => setIsAnimating(true), 10)
      return () => clearTimeout(timer)
    } else {
      // Start exit animation
      setIsAnimating(false)
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => setIsVisible(false), 350)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Close modal on ESC key press
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEscape])

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

  // Use click outside hook for closing modal (must be before return)
  const modalRef = useClickOutside<HTMLDivElement>(() => {
    if (closeOnOverlayClick && isOpen) {
      onClose()
    }
  })

  // Position-specific styles
  const getPositionStyles = () => {
    switch (position) {
      case 'right':
        return {
          container: 'top-0 right-0 h-full',
          transform: isAnimating ? 'translate-x-0' : 'translate-x-full',
          width: 'w-full md:w-[500px] lg:w-[450px]'
        }
      case 'left':
        return {
          container: 'top-0 left-0 h-full',
          transform: isAnimating ? 'translate-x-0' : '-translate-x-full',
          width: 'w-full md:w-[500px] lg:w-[450px]'
        }
      case 'bottom':
        return {
          container: 'bottom-0 left-0 right-0 w-full',
          transform: isAnimating ? 'translate-y-0' : 'translate-y-full',
          width: 'w-full'
        }
      case 'center':
      default:
        return {
          container: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          transform: isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          width: getSizeWidth(size)
        }
    }
  }

  // Size-specific widths for center position
  const getSizeWidth = (size: ModalSize): string => {
    switch (size) {
      case 'sm':
        return 'w-full max-w-md mx-4'
      case 'md':
        return 'w-full max-w-lg mx-4'
      case 'lg':
        return 'w-full max-w-2xl mx-4'
      case 'xl':
        return 'w-full max-w-4xl mx-4'
      case 'full':
        return 'w-full h-full'
      default:
        return 'w-full max-w-lg mx-4'
    }
  }

  if (!isVisible) return null

  const { container, transform, width } = getPositionStyles()

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 ease-out',
          isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          'fixed bg-white shadow-2xl z-50',
          'transition-all duration-500 ease-out',
          position === 'center' ? 'rounded-xl' : '',
          position === 'right' || position === 'left' ? 'flex flex-col' : '',
          container,
          width,
          transform,
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) ? (
          <div
            className={cn(
              'flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gray-50',
              position === 'right' || position === 'left' ? 'h-[70px]' : '',
              headerClassName
            )}
          >
            {title ? (
              <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
            ) : (
              <div />
            )}

            {showCloseButton ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Cerrar modal"
                className="h-8 w-8 p-0 hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
              </Button>
            ) : null}
          </div>
        ) : null}

        {/* Content */}
        <div
          className={cn(
            'overflow-y-auto',
            (title || showCloseButton) ? 'p-4 md:p-6' : '',
            position === 'right' || position === 'left' ? 'flex-1' : '',
            position === 'bottom' ? 'max-h-[90vh]' : '',
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </>
  )
}
