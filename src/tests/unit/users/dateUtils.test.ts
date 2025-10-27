import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  calculateAge,
  formatDate,
  formatDateShort,
  toISODate
} from '@modules/users/utils/dateUtils'

describe('dateUtils', () => {
  describe('calculateAge', () => {
    beforeEach(() => {
      // Mock current date to 2025-01-27 for consistent test results
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2025-01-27'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should calculate age correctly for a birth date', () => {
      const birthDate = '1999-05-15'
      const age = calculateAge(birthDate)
      expect(age).toBe(25)
    })

    it('should calculate age correctly for a birth date with full timestamp', () => {
      const birthDate = '1999-05-15T00:00:00.000Z'
      const age = calculateAge(birthDate)
      expect(age).toBe(25)
    })

    it('should handle birthday not yet occurred this year', () => {
      const birthDate = '1999-02-15' // Birthday is in February, current mock date is January
      const age = calculateAge(birthDate)
      expect(age).toBe(25) // Still 25 because birthday hasn't happened yet
    })

    it('should handle birthday already occurred this year', () => {
      const birthDate = '1999-01-01' // Birthday was in January
      const age = calculateAge(birthDate)
      expect(age).toBe(26)
    })

    it('should return null for null input', () => {
      const age = calculateAge(null)
      expect(age).toBeNull()
    })

    it('should return null for invalid date string', () => {
      const age = calculateAge('invalid-date')
      expect(age).toBeNull()
    })

    it('should return null for future date', () => {
      const futureDate = '2030-01-01'
      const age = calculateAge(futureDate)
      expect(age).toBeNull()
    })

    it('should handle age 0 for recent birth', () => {
      const recentBirth = '2024-06-15'
      const age = calculateAge(recentBirth)
      expect(age).toBe(0)
    })
  })

  describe('formatDate', () => {
    it('should format ISO date to Spanish locale by default', () => {
      const isoDate = '2024-03-01T00:00:00.000Z'
      const formatted = formatDate(isoDate)
      expect(formatted).toBeTruthy()
      expect(formatted).toBe('1 de marzo de 2024')
    })

    it('should format date without timestamp', () => {
      const isoDate = '2024-03-01'
      const formatted = formatDate(isoDate)
      expect(formatted).toBeTruthy()
      expect(formatted).toContain('marzo')
      expect(formatted).toContain('2024')
    })

    it('should return null for null input', () => {
      const formatted = formatDate(null)
      expect(formatted).toBeNull()
    })

    it('should return null for invalid date', () => {
      const formatted = formatDate('invalid-date')
      expect(formatted).toBeNull()
    })

    it('should respect custom format', () => {
      const isoDate = '2024-03-01'
      const formatted = formatDate(isoDate, 'MMMM YYYY')
      expect(formatted).toBeTruthy()
      expect(formatted).toBe('marzo 2024')
    })

    it('should format with DD/MM/YYYY format', () => {
      const isoDate = '2024-03-01'
      const formatted = formatDate(isoDate, 'DD/MM/YYYY')
      expect(formatted).toBe('01/03/2024')
    })
  })

  describe('formatDateShort', () => {
    it('should format date to DD/MM/YYYY', () => {
      const isoDate = '2024-03-01T00:00:00.000Z'
      const formatted = formatDateShort(isoDate)
      expect(formatted).toBe('01/03/2024')
    })

    it('should return null for null input', () => {
      const formatted = formatDateShort(null)
      expect(formatted).toBeNull()
    })

    it('should return null for invalid date', () => {
      const formatted = formatDateShort('invalid')
      expect(formatted).toBeNull()
    })
  })

  describe('toISODate', () => {
    it('should convert date string to ISO format (YYYY-MM-DD)', () => {
      const dateString = '2024-03-01'
      const iso = toISODate(dateString)
      expect(iso).toBe('2024-03-01')
    })

    it('should handle full ISO timestamp and return only date part', () => {
      const dateString = '2024-03-01T15:30:00.000Z'
      const iso = toISODate(dateString)
      expect(iso).toBe('2024-03-01')
    })

    it('should return null for null input', () => {
      const iso = toISODate(null)
      expect(iso).toBeNull()
    })

    it('should return null for invalid date', () => {
      const iso = toISODate('invalid-date')
      expect(iso).toBeNull()
    })

    it('should pad single digit months and days with zero', () => {
      const dateString = '2024-03-05'
      const iso = toISODate(dateString)
      expect(iso).toBe('2024-03-05')
    })
  })
})
