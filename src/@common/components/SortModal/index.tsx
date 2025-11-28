import type { ReactNode } from 'react'
import { X } from 'lucide-react'

import { cn } from '@common/utils/cn'

interface SortOption<T = string> {
  key: T
  label: string
}

interface SortModalProps<T = string> {
  isOpen: boolean
  onClose: () => void
  title?: string
  options: SortOption<T>[]
  currentSort: T
  currentOrder: 'ASC' | 'DESC'
  onSortChange: (key: T, order: 'ASC' | 'DESC') => void
}

export const SortModal = <T extends string = string>({
  isOpen,
  onClose,
  title = 'Ordenar por',
  options,
  currentSort,
  currentOrder,
  onSortChange
}: SortModalProps<T>) => {
  if (!isOpen) return null

  const handleOptionClick = (key: T, order: 'ASC' | 'DESC') => {
    onSortChange(key, order)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 md:hidden transform transition-transform duration-300 ease-out">
        <div className="bg-white rounded-t-2xl shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-4">
            <div className="space-y-3">
              {options.map((option) => (
                <div key={option.key} className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">{option.label}</p>
                  <div className="flex gap-2">
                    <SortChip
                      label="ASC"
                      icon="↑"
                      active={currentSort === option.key && currentOrder === 'ASC'}
                      onClick={() => handleOptionClick(option.key, 'ASC')}
                    />
                    <SortChip
                      label="DESC"
                      icon="↓"
                      active={currentSort === option.key && currentOrder === 'DESC'}
                      onClick={() => handleOptionClick(option.key, 'DESC')}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

interface SortChipProps {
  label: string
  icon: ReactNode
  active: boolean
  onClick: () => void
}

const SortChip = ({ label, icon, active, onClick }: SortChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200',
        'flex items-center justify-center gap-2',
        active
          ? 'bg-indigo-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      )}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}
