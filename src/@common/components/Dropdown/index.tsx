import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import { useClickOutside } from '@common/hooks/useClickOutside'
import { cn } from '@common/utils/cn'

export interface DropdownItem {
  label: string
  icon?: ReactNode
  onClick: () => void
  disabled?: boolean
  className?: string
}

export interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
  dropdownClassName?: string
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

export function Dropdown({
  trigger,
  items,
  align = 'right',
  className,
  dropdownClassName,
  isOpen: controlledIsOpen,
  onOpenChange
}: DropdownProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)

  // Use controlled or internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || setInternalIsOpen

  // Close on click outside
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  })

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, setIsOpen])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick()
      setIsOpen(false)
    }
  }

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      {/* Trigger */}
      <div onClick={handleToggle}>{trigger}</div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 min-w-[160px] overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            align === 'left' ? 'left-0' : 'right-0',
            dropdownClassName
          )}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150',
                  item.disabled
                    ? 'cursor-not-allowed text-gray-400'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100',
                  item.className
                )}
                role="menuitem"
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
