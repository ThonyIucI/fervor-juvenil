import type { ReactNode } from 'react'

import { Modal } from '@common/components/Modal'

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
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      position="right"
      showCloseButton={true}
      closeOnOverlayClick={true}
      closeOnEscape={true}
    >
      {children}
    </Modal>
  )
}
