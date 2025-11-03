import { userEvent } from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { PaginatedResponse } from '@common/types/api'
import { ProfileService } from '@modules/users/services/profile.service'
import type { IUserWithProfile } from '@modules/users/types/Profile'
import UsersView from '@modules/users/views/UsersView'
import { render, screen, waitFor } from '@tests/utils/test-utils'

// Mock ProfileService
vi.mock('@modules/users/services/profile.service', () => ({
  ProfileService: {
    getAllUsersPaginated: vi.fn()
  }
}))

const mockUsers: IUserWithProfile[] = [
  {
    uuid: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    slug: 'john-doe',
    isGoogleAccount: false,
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    profile: {
      uuid: '101',
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
      enrollmentDate: '2023-01-01',
      currentResidence: 'Lima',
      professionalGoal: 'Software Engineer',
      favoriteHero: 'Spider-Man',
      firstNames: 'John Michael',
      lastNames: 'Doe Smith',
      registrationDate: '2024-01-01'
    }
  },
  {
    uuid: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    slug: 'jane-smith',
    isGoogleAccount: false,
    isActive: false,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    profile: {
      uuid: '102',
      gender: 'F',
      age: 28,
      birthDate: '1996-05-20',
      status: 'I',
      alias: 'Janey',
      hasUniform: false,
      shirtSize: 'S',
      pantsSize: '28',
      shoeSize: '8',
      heightMeters: 1.65,
      weightKg: 60,
      healthInsurance: 'Rimac',
      bloodType: 'A+',
      allergies: null,
      disabilityOrDisorder: null,
      enrollmentDate: '2024-01-15',
      currentResidence: 'Arequipa',
      professionalGoal: 'Product Manager',
      favoriteHero: 'Wonder Woman',
      firstNames: 'Jane Marie',
      lastNames: 'Smith Johnson',
      registrationDate: '2024-01-15'
    }
  }
]

const mockPaginatedResponse: PaginatedResponse<IUserWithProfile> = {
  data: mockUsers,
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 2,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false
  }
}

describe('UsersView Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Loading State', () => {
    it('should show loader while fetching users', () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockImplementation(
        () => new Promise(() => {}) // Never resolves
      )

      render(<UsersView />)

      // Check for loader by looking for the heading and absence of table
      expect(screen.getByText('Lista de Usuarios')).toBeInTheDocument()
      expect(screen.queryByRole('table')).not.toBeInTheDocument()
      // The loader is visible (animated spinning icon)
      const loader = document.querySelector('.animate-spin')
      expect(loader).toBeInTheDocument()
    })
  })

  describe('Success State', () => {
    it('should render table with users on desktop', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue(mockPaginatedResponse)

      render(<UsersView />)

      await waitFor(() => {
        expect(screen.getByRole('table')).toBeInTheDocument()
      })

      // Check headers are present
      expect(screen.getByText('Nombre')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Estado')).toBeInTheDocument()
      expect(screen.getByText('Antigüedad')).toBeInTheDocument()

      // Check user data is displayed with last name first
      expect(screen.getAllByText(/Doe Smith, John Michael/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText('john@example.com')[0]).toBeInTheDocument()
    })

    it('should display active status badge', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue(mockPaginatedResponse)

      render(<UsersView />)

      await waitFor(() => {
        expect(screen.getByText('Activo')).toBeInTheDocument()
        expect(screen.getByText('Inactivo')).toBeInTheDocument()
      })
    })

    it('should display user seniority based on enrollment date', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue(mockPaginatedResponse)

      render(<UsersView />)

      await waitFor(() => {
        // John enrolled in 2023, should show ~2 years
        const seniorityElements = screen.getAllByText(/año/i)
        expect(seniorityElements.length).toBeGreaterThan(0)
      })
    })

    it('should render user cards on mobile', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue(mockPaginatedResponse)

      render(<UsersView />)

      await waitFor(() => {
        // UserCards should be present (they have md:hidden class)
        const cards = screen.getAllByText('Ver perfil')
        expect(cards.length).toBeGreaterThan(0)
      })
    })

    it('should display user initials in cards', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue(mockPaginatedResponse)

      render(<UsersView />)

      await waitFor(() => {
        // Initials appear in both table and cards
        expect(screen.getAllByText('JD')[0]).toBeInTheDocument() // John Doe
        expect(screen.getAllByText('JS')[0]).toBeInTheDocument() // Jane Smith
      })
    })
  })

  describe('Empty State', () => {
    it('should show empty state when no users exist', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue({
        data: [],
        meta: {
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false
        }
      })

      render(<UsersView />)

      await waitFor(() => {
        expect(screen.getByText('No hay usuarios registrados')).toBeInTheDocument()
      })
    })

    it('should not show table when no users', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue({
        data: [],
        meta: {
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false
        }
      })

      render(<UsersView />)

      await waitFor(() => {
        expect(screen.queryByRole('table')).not.toBeInTheDocument()
      })
    })
  })

  describe('Error State', () => {
    it('should show error message when fetch fails', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockRejectedValue(new Error('Network error'))

      render(<UsersView />)

      await waitFor(() => {
        expect(screen.getByText(/error al cargar usuarios/i)).toBeInTheDocument()
      })
    })
  })

  describe('Pagination', () => {
    it('should show pagination controls when there are multiple pages', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue({
        ...mockPaginatedResponse,
        meta: {
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: 25,
          totalPages: 3,
          hasNextPage: true,
          hasPreviousPage: false
        }
      })

      render(<UsersView />)

      await waitFor(() => {
        expect(screen.getByText(/Página 1 de 3/i)).toBeInTheDocument()
        expect(screen.getByText(/25 usuarios/i)).toBeInTheDocument()
      })
    })

    it('should disable previous button on first page', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue({
        ...mockPaginatedResponse,
        meta: {
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: 25,
          totalPages: 3,
          hasNextPage: true,
          hasPreviousPage: false
        }
      })

      render(<UsersView />)

      await waitFor(() => {
        const prevButton = screen.getByRole('button', { name: /anterior/i })
        expect(prevButton).toBeDisabled()
      })
    })

    it('should disable next button on last page', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue({
        ...mockPaginatedResponse,
        meta: {
          currentPage: 3,
          itemsPerPage: 10,
          totalItems: 25,
          totalPages: 3,
          hasNextPage: false,
          hasPreviousPage: true
        }
      })

      render(<UsersView />)

      await waitFor(() => {
        const nextButton = screen.getByRole('button', { name: /siguiente/i })
        expect(nextButton).toBeDisabled()
      })
    })

    it('should call API with correct page when next is clicked', async () => {
      const user = userEvent.setup()
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue({
        ...mockPaginatedResponse,
        meta: {
          currentPage: 1,
          itemsPerPage: 10,
          totalItems: 25,
          totalPages: 3,
          hasNextPage: true,
          hasPreviousPage: false
        }
      })

      render(<UsersView />)

      await waitFor(() => {
        expect(screen.getByText(/Página 1 de 3/i)).toBeInTheDocument()
      })

      const nextButton = screen.getByRole('button', { name: /siguiente/i })
      await user.click(nextButton)

      // Should call API with page 2
      expect(ProfileService.getAllUsersPaginated).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2 })
      )
    })
  })

  describe('Search', () => {
    it('should render search input', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue(mockPaginatedResponse)

      render(<UsersView />)

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/buscar usuario/i)).toBeInTheDocument()
      })
    })

    it('should call API with search term when typing', async () => {
      const user = userEvent.setup()
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue(mockPaginatedResponse)

      render(<UsersView />)

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/buscar usuario/i)).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/buscar usuario/i)
      await user.type(searchInput, 'John')

      // Should call API with search term (debounced)
      await waitFor(
        () => {
          expect(ProfileService.getAllUsersPaginated).toHaveBeenCalledWith(
            expect.objectContaining({ search: 'John' })
          )
        },
        { timeout: 1000 }
      )
    })

    it('should reset to page 1 when searching', async () => {
      const user = userEvent.setup()
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue({
        ...mockPaginatedResponse,
        meta: {
          currentPage: 2,
          itemsPerPage: 10,
          totalItems: 25,
          totalPages: 3,
          hasNextPage: true,
          hasPreviousPage: true
        }
      })

      render(<UsersView />)

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/buscar usuario/i)).toBeInTheDocument()
      })

      const searchInput = screen.getByPlaceholderText(/buscar usuario/i)
      await user.type(searchInput, 'test')

      // Should reset to page 1
      await waitFor(
        () => {
          expect(ProfileService.getAllUsersPaginated).toHaveBeenCalledWith(
            expect.objectContaining({ page: 1, search: 'test' })
          )
        },
        { timeout: 1000 }
      )
    })
  })

  describe('Actions', () => {
    it('should navigate to user profile when "Ver perfil" is clicked', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue(mockPaginatedResponse)
      const user = userEvent.setup()

      render(<UsersView />)

      await waitFor(() => {
        expect(screen.getAllByText(/Doe Smith, John Michael/i)[0]).toBeInTheDocument()
      })

      const viewButtons = screen.getAllByText('Ver perfil')
      await user.click(viewButtons[0])

      // Navigation should be triggered (we'll verify this with router mock later)
      // For now, just verify button is clickable
      expect(viewButtons[0]).toBeInTheDocument()
    })
  })

  describe('Data Display', () => {
    it('should call ProfileService.getAllUsersPaginated on mount', async () => {
      vi.mocked(ProfileService.getAllUsersPaginated).mockResolvedValue(mockPaginatedResponse)

      render(<UsersView />)

      expect(ProfileService.getAllUsersPaginated).toHaveBeenCalledTimes(1)
      expect(ProfileService.getAllUsersPaginated).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
          limit: 10
        })
      )
    })
  })
})
