import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { ButtonGroup } from '@/@common/components/ButtonGroup'
import { ITEMS_PER_PAGE_OPTIONS } from '@/@common/constants'
import { cn } from '@/@common/utils/cn'
import { Button } from '@common/components/Button'
import type { PaginationMeta } from '@common/types/api'

/* ========================================
   ChangePaginationItems Component
======================================== */
interface IChangePaginationItems {
    meta?: PaginationMeta
    isMobile?: boolean
    disabled?: boolean
    itemsPerPage: number
    onItemsPerPageChange: (value: number) => void
}

export const ChangePaginationItems = ({
    meta,
    itemsPerPage,
    onItemsPerPageChange,
    isMobile = false,
    disabled = false
}: IChangePaginationItems) => {
    return (
        <div className="flex items-center gap-2">
            {!isMobile && <span className="text-sm text-gray-700 whitespace-nowrap">Mostrar</span>}
            <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                disabled={disabled}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {!isMobile && (
                <span className="text-sm text-gray-700 whitespace-nowrap">
                    de {meta?.totalItems} {meta?.totalItems === 1 ? 'registro' : 'registros'}
                </span>
            )}
        </div>
    )
}
export const PaginationInfo = ({ meta, className }: { meta?: PaginationMeta, className?: string }) => {
    if (!meta) return null
    return <div className={cn("text-sm text-gray-700", className)}>
        página {meta?.currentPage} de {meta?.totalPages} ({meta?.totalItems}
        {meta?.totalItems === 1 ? ' registro' : ' registros'})
    </div>
}
/* ========================================
   Pagination Component
======================================== */
interface IPagination {
    meta?: PaginationMeta
    onPreviousPage: () => void
    onNextPage: () => void
    isLoading?: boolean
    isMobile?: boolean
    disabled?: boolean
    itemsPerPage: number
    onItemsPerPageChange: (value: number) => void
    showItemsPerPage?: boolean
    emptyState?: ReactNode
    showEmptyState?: boolean
    className?: string
}

export const Pagination = ({
    meta,
    onPreviousPage,
    onNextPage,
    isLoading = false,
    itemsPerPage,
    onItemsPerPageChange,
    isMobile = false,
    disabled = false,
    showItemsPerPage = true,
    emptyState,
    showEmptyState = false,
    className = ''
}: IPagination) => {
    // Empty state
    if (showEmptyState && emptyState) {
        return <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">{emptyState}</div>
    }

    // Mobile version
    if (isMobile) {
        return (
            <div className={cn("flex items-center gap-3 justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 md:hidden", className)}>
                {showItemsPerPage && (
                    <ChangePaginationItems
                        meta={meta}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        isMobile={isMobile}
                        disabled={disabled}
                    />
                )}

                <div className="text-xs text-gray-600">
                    Pag.  {meta?.currentPage}/{meta?.totalPages} * ({meta?.totalItems})
                </div>
                {/* <PaginationInfo meta={meta} /> */}

                <ButtonGroup
                    items={[
                        {
                            label: <ChevronLeft className="h-4 w-4" />,
                            onClick: onPreviousPage,
                            disabled: !meta?.hasPreviousPage || isLoading || disabled,
                            ariaLabel: 'Página anterior'
                        },
                        {
                            label: <ChevronRight className="h-4 w-4" />,
                            onClick: onNextPage,
                            disabled: !meta?.hasNextPage || isLoading || disabled,
                            ariaLabel: 'Página siguiente'
                        }
                    ]}
                />
            </div>
        )
    }

    // Desktop version
    return (
        <div className={cn("hidden md:flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50", className)}>
            <PaginationInfo meta={meta} />
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onPreviousPage}
                    disabled={!meta?.hasPreviousPage || isLoading || disabled}
                    leftIcon={<ChevronLeft className="h-4 w-4" />}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onNextPage}
                    disabled={!meta?.hasNextPage || isLoading || disabled}
                    rightIcon={<ChevronRight className="h-4 w-4" />}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}
