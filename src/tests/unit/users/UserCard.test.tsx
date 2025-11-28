import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { UserCard } from '@modules/users/Components/UserCard/UserCard'
import type { IUserWithProfile } from '@modules/users/types/Profile'
import { render, screen } from '@tests/utils/test-utils'

const mockUser: IUserWithProfile = {
  uuid: '123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  slug: 'john-doe',
  isGoogleAccount: false,
  isActive: true,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  dni: '12345678',
  profile: {
    uuid: '456',
    gender: 'M',
    age: 25,
    birthDate: '1999-01-01',
    status: 'A',
    alias: 'Johnny',
    hasUniform: true,
    shirtSize: 'M',
    pantsSize: '32',
    shoeSize: '10',
    heightMeters: 1.75,
    weightKg: 70,
    healthInsurance: 'EsSalud',
    bloodType: 'O+',
    allergies: null,
    disabilityOrDisorder: null,
    enrollmentDate: '2024-01-01',
    currentResidence: 'Lima',
    professionalGoal: 'Software Engineer',
    favoriteHero: 'Spider-Man',
    firstNames: 'John Michael',
    lastNames: 'Doe Smith',
    registrationDate: '2024-01-01'
  }
}

describe('UserCard Component', () => {
  describe('Rendering', () => {
    it('should render user full name', () => {
      render(<UserCard user={mockUser} />)

      expect(screen.getByText('John Michael Doe Smith')).toBeInTheDocument()
    })

    it('should render email', () => {
      render(<UserCard user={mockUser} />)

      expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })

    it('should show fallback when no email', () => {
      const userWithoutEmail: IUserWithProfile = {
        ...mockUser,
        email: ''
      }

      render(<UserCard user={userWithoutEmail} />)

      const fallbacks = screen.getAllByText('-')
      expect(fallbacks.length).toBeGreaterThan(0)
    })

    it('should show active status badge', () => {
      const activeUser: IUserWithProfile = {
        ...mockUser,
        isActive: true
      }

      render(<UserCard user={activeUser} />)

      expect(screen.getByText('Activo')).toBeInTheDocument()
    })

    it('should show inactive status badge', () => {
      const inactiveUser: IUserWithProfile = {
        ...mockUser,
        isActive: false
      }

      render(<UserCard user={inactiveUser} />)

      expect(screen.getByText('Inactivo')).toBeInTheDocument()
    })
  })

  describe('Actions', () => {
    it('should call onCardClick when card is clicked', async () => {
      const onCardClick = vi.fn()
      const user = userEvent.setup()
      render(<UserCard user={mockUser} onCardClick={onCardClick} />)

      const card = screen.getByText('John Michael Doe Smith').closest('div')
      if (card) {
        await user.click(card)
        expect(onCardClick).toHaveBeenCalledWith(mockUser)
      }
    })

    it('should show menu options when menu button is clicked', async () => {
      const onEdit = vi.fn()
      const onViewDashboard = vi.fn()
      const user = userEvent.setup()
      render(<UserCard user={mockUser} onEdit={onEdit} onViewDashboard={onViewDashboard} />)

      const menuButton = screen.getByLabelText('Opciones')
      await user.click(menuButton)

      expect(screen.getByText('Editar')).toBeInTheDocument()
      expect(screen.getByText('Ver Dashboard')).toBeInTheDocument()
    })

    it('should call onEdit when edit button is clicked in menu', async () => {
      const onEdit = vi.fn()
      const user = userEvent.setup()
      render(<UserCard user={mockUser} onEdit={onEdit} />)

      const menuButton = screen.getByLabelText('Opciones')
      await user.click(menuButton)

      const editButton = screen.getByText('Editar')
      await user.click(editButton)

      expect(onEdit).toHaveBeenCalledWith(mockUser)
    })

    it('should call onViewDashboard when dashboard button is clicked in menu', async () => {
      const onViewDashboard = vi.fn()
      const user = userEvent.setup()
      render(<UserCard user={mockUser} onViewDashboard={onViewDashboard} />)

      const menuButton = screen.getByLabelText('Opciones')
      await user.click(menuButton)

      const dashboardButton = screen.getByText('Ver Dashboard')
      await user.click(dashboardButton)

      expect(onViewDashboard).toHaveBeenCalledWith(mockUser)
    })
  })

  describe('Styling', () => {
    it('should apply custom className to Card', () => {
      const { container } = render(<UserCard user={mockUser} className="custom-class" />)

      const card = container.querySelector('.custom-class')
      expect(card).toBeInTheDocument()
    })

    it('should be hidden on desktop and visible on mobile', () => {
      const { container } = render(<UserCard user={mockUser} />)

      const card = container.querySelector('.md\\:hidden')
      expect(card).toBeInTheDocument()
    })
  })

  describe('Avatar', () => {
    it('should show user initials when no avatar image', () => {
      render(<UserCard user={mockUser} />)

      const avatar = screen.getByText('JD')
      expect(avatar).toBeInTheDocument()
    })
  })
})
