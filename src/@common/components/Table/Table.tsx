import type {
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes
} from 'react'
import { forwardRef } from 'react'

import { cn } from '@common/utils/cn'

/* ========================================
   Table Component
======================================== */
interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /**
   * Hide table on mobile screens
   * Use with card layout for mobile responsive design
   */
  hideMobile?: boolean
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, hideMobile, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', hideMobile ? 'hidden md:table' : '', className)}
        {...props}
      />
    </div>
  )
)
Table.displayName = 'Table'

/* ========================================
   TableHeader Component
======================================== */
const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('border-b border-gray-200 bg-gray-50', className)} {...props} />
  )
)
TableHeader.displayName = 'TableHeader'

/* ========================================
   TableBody Component
======================================== */
const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('divide-y divide-gray-200', className)} {...props} />
  )
)
TableBody.displayName = 'TableBody'

/* ========================================
   TableFooter Component
======================================== */
const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t border-gray-200 bg-gray-50 font-medium', className)}
      {...props}
    />
  )
)
TableFooter.displayName = 'TableFooter'

/* ========================================
   TableRow Component
======================================== */
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Make row clickable with hover effect
   */
  clickable?: boolean
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, clickable, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-gray-200 transition-colors',
        clickable ? 'cursor-pointer hover:bg-gray-50' : '',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

/* ========================================
   TableHead Component
======================================== */
interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right'
}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, align = 'left', ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-semibold text-gray-700',
        align === 'center' ? 'text-center' : '',
        align === 'right' ? 'text-right' : '',
        className
      )}
      {...props}
    />
  )
)
TableHead.displayName = 'TableHead'

/* ========================================
   TableCell Component
======================================== */
interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right'
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = 'left', ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'p-4 align-middle text-gray-900',
        align === 'center' ? 'text-center' : '',
        align === 'right' ? 'text-right' : '',
        className
      )}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

/* ========================================
   TableCaption Component
======================================== */
const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-gray-500', className)} {...props} />
  )
)
TableCaption.displayName = 'TableCaption'

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
