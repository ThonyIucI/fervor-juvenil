import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, ChevronsUpDown, Search, Users as UsersIcon } from 'lucide-react'

import { EmptyState } from '@/@common/components/EmptyState'
import { useBoolean, useDebounce, useMediaQueryScreen } from '@/@common/hooks'
import { usePagination } from '@/@common/hooks/usePagination'
import { useRequest } from '@/@common/hooks/useRequest'
import { Card } from '@common/components/Card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@common/components/Table/Table'
import type { PaginatedResponse } from '@common/types/api'
import {
  getUserFullNameLastFirst,
  getUserInitials,
  getUserSeniority
} from '@common/utils/userUtils'

import { UserCard } from '../Components/UserCard/UserCard'
import { UserCardSkeleton } from '../Components/UserCardSkeleton/UserCardSkeleton'
import { UserDetailsContent } from '../Components/UserDetailsContent/UserDetailsContent'
import { UserDetailsModal } from '../Components/UserDetailsModal/UserDetailsModal'
import { UsersPagination } from '../Components/UsersPagination/UsersPagination'
import { UsersTableToolbar } from '../Components/UsersTableToolbar/UsersTableToolbar'
import type { GetUsersQueryParams } from '../services/profile.service'
import { ProfileService } from '../services/profile.service'
import type { IUserWithProfile } from '../types/Profile'


export default function UsersView() {
  const navigate = useNavigate()

  // State
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<GetUsersQueryParams['sortBy']>('lastName')
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC')
  const [selectedUser, setSelectedUser] = useState<IUserWithProfile | null>(null)
  const isModalOpen = useBoolean()
  const isMobile = useMediaQueryScreen('(max-width: 767px)')
  const debouncedSearch = useDebounce(search, 500)

  // API Request
  const GetUsers = useRequest<PaginatedResponse<IUserWithProfile>>(false, async () => {
    return await ProfileService.getAllUsersPaginated({
      page,
      limit,
      sortBy,
      sortOrder,
      ...(debouncedSearch && { search: debouncedSearch })
    })
  })
  const meta = GetUsers.data?.meta
  const { page, limit, nextPage, prevPage, setPage, setLimitPage } = usePagination(meta)

  // Reset to page 1 when search or limit changes
  useEffect(() => {
    setPage(1)
  }, [search, limit])

  // Fetch users when dependencies change
  useEffect(() => {
    GetUsers.handler()
  }, [page, limit, debouncedSearch, sortBy, sortOrder])

  // Handlers
  const handleViewProfile = (user: IUserWithProfile) => {
    setSelectedUser(user)
    isModalOpen.open()
  }

  const handleCloseModal = () => {
    isModalOpen.close()
    setSelectedUser(null)
  }

  const handleEditUser = (user: IUserWithProfile) => {
    // TODO: Navigate to edit page or open edit modal
    navigate(`/users/${user.slug}/edit`)
  }

  const handleViewDashboard = (user: IUserWithProfile) => {
    // TODO: Navigate to user dashboard
    navigate(`/users/${user.slug}/dashboard`)
  }

  const handleSort = (column: GetUsersQueryParams['sortBy']) => {
    if (sortBy === column) {
      setSortOrder((order) => (order === 'ASC' ? 'DESC' : 'ASC'))
    } else {
      setSortBy(column)
      setSortOrder('ASC')
    }
  }

  const users = GetUsers.data?.data || []

  // Table columns definition
  const tableColumns = [
    { key: 'name', label: 'Nombre', sortKey: 'lastName' as const },
    { key: 'email', label: 'Email', sortKey: 'email' as const },
    { key: 'status', label: 'Estado', sortKey: 'isActive' as const },
    { key: 'seniority', label: 'Antigüedad', sortKey: null },
    { key: 'actions', label: 'Acciones', sortKey: null, align: 'right' as const }
  ]

  // Determine table states
  const hasUsers = users.length > 0
  const hasError = Boolean(GetUsers.error)
  const isEmpty = !hasUsers && !search && !GetUsers.loading && !hasError
  const isSearchEmpty = !hasUsers && search && !GetUsers.loading && !hasError

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Lista de Usuarios</h1>
        <p className="text-gray-600 mt-0">Gestiona los usuarios del sistema</p>
      </div>
      <Card variant="elevated" className="overflow-hidden">
        {/* Toolbar - Always visible and persistent */}
        <UsersTableToolbar
          search={search}
          onSearchChange={setSearch}
          itemsPerPage={limit}
          onItemsPerPageChange={setLimitPage}
          totalItems={meta?.totalItems || 0}
          disabled={GetUsers.loading || hasError}
        />

        {/* Mobile Pagination - Top */}
        {meta && !isEmpty && !isSearchEmpty && !hasError && (
          <div className="md:hidden p-2 md:p-4 border-b border-gray-200">
            <UsersPagination
              meta={meta}
              onPreviousPage={prevPage}
              onNextPage={nextPage}
              isLoading={GetUsers.loading}
              isMobile={isMobile}
            />
          </div>
        )}

        {/* Desktop Table - Headers always visible */}
        <div className="hidden md:block min-h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                {tableColumns.map((column) => (
                  <TableHead key={column.key} align={column.align} className={column.align === 'right' ? 'text-right' : ''}>
                    {column.sortKey ? (
                      <div className='flex align-middle justify-between'>
                        {column.label}
                        <button
                          onClick={() => handleSort(column.sortKey)}
                          className="hover:cursor-pointer hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={GetUsers.loading || hasError}
                        >
                          <ChevronsUpDown className={`h-4 w-4 ${sortBy === column.sortKey ? 'text-gray-800' : 'text-gray-400'}`} />
                        </button>
                      </div>
                    ) : (
                      column.label
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody
              isLoading={GetUsers.loading}
              skeletonRows={limit}
              columnCount={tableColumns.length}
              showErrorState={hasError}
              errorState={
                <EmptyState
                  icon={<AlertCircle className="h-8 w-8" />}
                  title="Error al cargar usuarios"
                  description="No se pudo cargar la lista de usuarios. Por favor, intenta nuevamente."
                  variant="error"
                  action={{
                    label: 'Reintentar',
                    onClick: GetUsers.handler,
                    isLoading: GetUsers.loading
                  }}
                />
              }
              showEmptyState={Boolean(isEmpty || isSearchEmpty)}
              emptyState={
                isSearchEmpty ? (
                  <EmptyState
                    icon={<Search className="h-8 w-8" />}
                    title="No se encontraron resultados"
                    description={`No hay usuarios que coincidan con "${search}". Intenta con otro término de búsqueda.`}
                    variant="neutral"
                  />
                ) : (
                  <EmptyState
                    icon={<UsersIcon className="h-8 w-8" />}
                    title="No hay usuarios registrados"
                    description="Aún no hay usuarios en el sistema. Los usuarios aparecerán aquí una vez que se registren."
                  />
                )
              }
            >
              {users.map((user) => (
                <TableRow
                  key={user.uuid}
                  onClick={() => handleViewProfile(user)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <span className="text-sm font-semibold">{getUserInitials(user)}</span>
                      </div>
                      <span className="font-medium capitalize">
                        {getUserFullNameLastFirst(user)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email || '-'}</TableCell>
                  <TableCell>
                    {user.isActive ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Inactivo
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{getUserSeniority(user.profile?.enrollmentDate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditUser(user)
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                      >
                        Editar
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewDashboard(user)
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                      >
                        Ver Dashboard
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Desktop Pagination - Bottom */}
        {meta && hasUsers && (
          <UsersPagination
            meta={meta}
            onPreviousPage={prevPage}
            onNextPage={nextPage}
            isLoading={GetUsers.loading}
          />
        )}
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden pt-4 space-y-4 min-h-[600px]">
        {GetUsers.loading
          ? Array.from({ length: limit }).map((_, i) => <UserCardSkeleton key={i} />)
          : users.map((user) => (
            <UserCard
              key={user.uuid}
              user={user}
              onEdit={handleEditUser}
              onViewDashboard={handleViewDashboard}
              onCardClick={handleViewProfile}
            />
          ))}
      </div>

      {/* User Details Modal */}
      <UserDetailsModal isOpen={isModalOpen.active} onClose={handleCloseModal}>
        {selectedUser && (
          <UserDetailsContent
            user={selectedUser}
            onEdit={handleEditUser}
            onViewDashboard={handleViewDashboard}
          />
        )}
      </UserDetailsModal>
    </div>
  )
}
