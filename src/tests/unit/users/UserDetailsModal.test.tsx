import { userEvent } from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { UserDetailsModal } from '@/modules/users/Components/UserDetailsModal'
import { render, screen } from '@tests/utils/test-utils'

describe('UserDetailsModal Component', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(
        <UserDetailsModal isOpen={false} onClose={mockOnClose}>
          <div>Modal Content</div>
        </UserDetailsModal>
      )

      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
    })

    it('should render when isOpen is true', () => {
      render(
        <UserDetailsModal isOpen={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </UserDetailsModal>
      )

      expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })

    it('should render with default title', () => {
      render(
        <UserDetailsModal isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </UserDetailsModal>
      )

      expect(screen.getByText('Detalle de Usuario')).toBeInTheDocument()
    })

    it('should render with custom title', () => {
      render(
        <UserDetailsModal isOpen={true} onClose={mockOnClose} title="Custom Title">
          <div>Content</div>
        </UserDetailsModal>
      )

      expect(screen.getByText('Custom Title')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup()

      render(
        <UserDetailsModal isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </UserDetailsModal>
      )

      const closeButton = screen.getByLabelText('Cerrar modal')
      await user.click(closeButton)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when overlay is clicked', async () => {
      const user = userEvent.setup()

      render(
        <UserDetailsModal isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </UserDetailsModal>
      )

      const overlay = document.querySelector('[aria-hidden="true"]')
      if (overlay) {
        await user.click(overlay)
        expect(mockOnClose).toHaveBeenCalledTimes(1)
      }
    })

    it('should call onClose when ESC key is pressed', async () => {
      const user = userEvent.setup()

      render(
        <UserDetailsModal isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </UserDetailsModal>
      )

      await user.keyboard('{Escape}')

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should not call onClose when ESC is pressed and modal is closed', async () => {
      const user = userEvent.setup()

      render(
        <UserDetailsModal isOpen={false} onClose={mockOnClose}>
          <div>Content</div>
        </UserDetailsModal>
      )

      await user.keyboard('{Escape}')

      expect(mockOnClose).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <UserDetailsModal isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </UserDetailsModal>
      )

      const modal = screen.getByRole('dialog')
      expect(modal).toHaveAttribute('aria-modal', 'true')
      expect(modal).toHaveAttribute('aria-labelledby', 'modal-title')
    })

    it('should have close button with accessible label', () => {
      render(
        <UserDetailsModal isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </UserDetailsModal>
      )

      const closeButton = screen.getByLabelText('Cerrar modal')
      expect(closeButton).toBeInTheDocument()
    })
  })

  describe('Body Scroll Management', () => {
    it('should prevent body scroll when modal is open', () => {
      const { rerender } = render(
        <UserDetailsModal isOpen={true} onClose={mockOnClose}>
          <div>Content</div>
        </UserDetailsModal>
      )

      expect(document.body.style.overflow).toBe('hidden')

      rerender(
        <UserDetailsModal isOpen={false} onClose={mockOnClose}>
          <div>Content</div>
        </UserDetailsModal>
      )

      expect(document.body.style.overflow).toBe('unset')
    })
  })
})
