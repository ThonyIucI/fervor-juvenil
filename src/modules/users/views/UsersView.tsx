import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, ChevronsUpDown, Search, Users as UsersIcon } from 'lucide-react'

import { EmptyState } from '@/@common/components/EmptyState'
import { Input } from '@/@common/components/Input'
import { ChangePaginationItems, Pagination, PaginationInfo } from '@/@common/components/Pagination'
import { SortButton } from '@/@common/components/SortButton'
import { SortModal } from '@/@common/components/SortModal'
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
} from '@common/components/Table'
import type { PaginatedResponse } from '@common/types/api'
import {
  getUserFullNameLastFirst,
  getUserInitials,
  getUserSeniority
} from '@common/utils/userUtils'

import { UserCard } from '../Components/UserCard/UserCard'
import { UserCardSkeleton } from '../Components/UserCardSkeleton'
import { UserDetailsContent } from '../Components/UserDetailsContent'
import { UserDetailsModal } from '../Components/UserDetailsModal'
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
  const isSortModalOpen = useBoolean()
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


  const renderErrorState = () => {
    return (
      <Card className='mt-2'>
        <EmptyState
          icon={<AlertCircle className="h-6 w-6" />}
          title="Error al cargar usuarios"
          description="No se pudo cargar la lista de usuarios. Por favor, intenta nuevamente."
          variant="error"
          action={{
            label: 'Reintentar',
            onClick: GetUsers.handler,
            isLoading: GetUsers.loading
          }}
        />
      </Card>
    )
  }
  const renderEmptyState = () => isSearchEmpty ? (
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
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Lista de Usuarios</h1>
        <p className="text-gray-600 mt-0">Gestiona los usuarios del sistema</p>
      </div>
      <div className="overflow-hidden md:p-4 md:bg-white rounded-2xl">
        <div className='flex justify-between bg-white px-4 md:px-0 rounded-2xl py-4 md:py-2 md:pb-4'>
          {meta && !isEmpty && !isSearchEmpty && !hasError && (
            <div className="hidden md:flex">
              <ChangePaginationItems
                meta={meta}
                itemsPerPage={limit}
                onItemsPerPageChange={setLimitPage}
                isMobile={isMobile}
                disabled={GetUsers.loading || hasError}

              />
            </div>
          )}
          <div className="flex-1 md:max-w-md flex gap-2">
            <Input
              type="search"
              placeholder="Buscar por nombre, apellido o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
              disabled={GetUsers.loading || hasError}
              fullWidth={isMobile}
              className='flex-1'
            />
            {isMobile && (
              <SortButton
                onClick={isSortModalOpen.open}
                disabled={GetUsers.loading || hasError}
                active={sortBy !== 'lastName' || sortOrder !== 'ASC'}
              />
            )}
          </div>
        </div>
        {/* Desktop Table - Headers always visible */}
        <div className="bg-white hidden md:block min-h-[600px]">
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
              errorState={renderErrorState()}
              showEmptyState={Boolean(isEmpty || isSearchEmpty)}
              emptyState={renderEmptyState()}
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

        {/* Mobile Cards */}
        {isMobile && <PaginationInfo meta={meta} className='mt-3 ml-3' />}
        {!(hasError || isSearchEmpty) && <div className="md:hidden pt-4 space-y-4 min-h-[600px]">
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
        </div>}

        {/* Error state in pagination area */}
        {hasError && renderErrorState()}

        {/* Empty search state in pagination area */}
        {isSearchEmpty && renderEmptyState()}
        {/* Desktop Pagination - Bottom */}
        {meta && hasUsers && (
          <Pagination
            meta={meta}
            onPreviousPage={prevPage}
            onNextPage={nextPage}
            isLoading={GetUsers.loading}
            isMobile={isMobile}
            disabled={GetUsers.loading || hasError}
            itemsPerPage={limit}
            onItemsPerPageChange={setLimitPage}
            className={isMobile ? 'bg-white mt-4 border-0 rounded-2xl' : ''}
          />
        )}
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

      {/* Sort Modal (Mobile) */}
      <SortModal
        isOpen={isSortModalOpen.active}
        onClose={isSortModalOpen.close}
        title="Ordenar por"
        options={[
          { key: 'lastName', label: 'Nombre' },
          { key: 'email', label: 'Email' },
          { key: 'isActive', label: 'Estado' }
        ]}
        currentSort={sortBy || 'lastName'}
        currentOrder={sortOrder}
        onSortChange={(key, order) => {
          setSortBy(key as GetUsersQueryParams['sortBy'])
          setSortOrder(order)
        }}
      />
    </>
  )
}
