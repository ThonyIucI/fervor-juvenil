import { describe, expect, it } from 'vitest'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@common/components/Table'
import { render, screen } from '@tests/utils/test-utils'

describe('Table Component', () => {
  describe('Structure', () => {
    it('should render table with headers and rows', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })

    it('should render multiple rows', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('should render empty message when no rows', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={1} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      expect(screen.getByText('No data available')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should apply custom className to Table', () => {
      const { container } = render(
        <Table className="custom-table">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Test</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const table = container.querySelector('table')
      expect(table).toHaveClass('custom-table')
    })

    it('should hide on mobile when hideMobile is true', () => {
      render(
        <Table hideMobile>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Test</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const table = screen.getByRole('table')
      expect(table).toHaveClass('hidden')
      expect(table).toHaveClass('md:table')
    })
  })

  describe('Accessibility', () => {
    it('should have proper table structure for screen readers', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const table = screen.getByRole('table')
      expect(table.querySelector('thead')).toBeInTheDocument()
      expect(table.querySelector('tbody')).toBeInTheDocument()
      expect(table.querySelectorAll('th')).toHaveLength(2)
      expect(table.querySelectorAll('td')).toHaveLength(2)
    })
  })
})
