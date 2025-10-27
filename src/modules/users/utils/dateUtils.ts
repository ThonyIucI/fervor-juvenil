import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

import 'dayjs/locale/es'

// Configure dayjs
dayjs.extend(utc)
dayjs.extend(relativeTime)
dayjs.locale('es')

/**
 * Date utilities for profile management using dayjs
 */

/**
 * Calculate age from birth date
 * @param birthDate - Birth date in ISO 8601 format (YYYY-MM-DD or full timestamp)
 * @returns Age in years or null if invalid date
 *
 * @example
 * calculateAge('1999-05-15') // 25 (assuming today is 2025-01-27)
 * calculateAge('1999-05-15T00:00:00.000Z') // 25
 * calculateAge(null) // null
 */
export function calculateAge(birthDate: string | null): number | null {
  if (!birthDate) return null

  const birth = dayjs(birthDate)

  if (!birth.isValid()) {
    return null
  }

  const today = dayjs()

  // Validate that birth date is not in the future
  if (birth.isAfter(today)) {
    return null
  }

  return today.diff(birth, 'year')
}

/**
 * Format ISO date to locale date string
 * @param isoDate - Date in ISO 8601 format
 * @param format - Date format (default: 'D [de] MMMM [de] YYYY')
 * @returns Formatted date string or null if invalid
 *
 * @example
 * formatDate('2024-03-01T00:00:00.000Z') // '1 de marzo de 2024'
 * formatDate('2024-03-01') // '1 de marzo de 2024'
 * formatDate('2024-03-01', 'DD/MM/YYYY') // '01/03/2024'
 */
export function formatDate(isoDate: string | null, format: string = 'D [de] MMMM [de] YYYY'): string | null {
  if (!isoDate) return null

  // Use UTC to avoid timezone issues when formatting
  const date = dayjs.utc(isoDate)

  if (!date.isValid()) {
    return null
  }

  return date.format(format)
}

/**
 * Format ISO date to short format (DD/MM/YYYY)
 * @param isoDate - Date in ISO 8601 format
 * @returns Short formatted date or null if invalid
 *
 * @example
 * formatDateShort('2024-03-01T00:00:00.000Z') // '01/03/2024'
 */
export function formatDateShort(isoDate: string | null): string | null {
  return formatDate(isoDate, 'DD/MM/YYYY')
}

/**
 * Parse date string to ISO format for API
 * @param dateString - Date string in various formats
 * @returns ISO date string (YYYY-MM-DD) or null if invalid
 *
 * @example
 * toISODate('15/05/1999') // '1999-05-15'
 * toISODate('2024-03-01') // '2024-03-01'
 * toISODate('2024-03-01T15:30:00.000Z') // '2024-03-01'
 */
export function toISODate(dateString: string | null): string | null {
  if (!dateString) return null

  const date = dayjs(dateString)

  if (!date.isValid()) {
    return null
  }

  return date.format('YYYY-MM-DD')
}

/**
 * Check if a date string is valid
 * @param dateString - Date string to validate
 * @returns true if valid, false otherwise
 */
export function isValidDate(dateString: string | null): boolean {
  if (!dateString) return false
  return dayjs(dateString).isValid()
}

/**
 * Get relative time from now (e.g., "hace 2 días", "en 3 horas")
 * @param isoDate - Date in ISO 8601 format
 * @returns Relative time string or null if invalid
 *
 * @example
 * getRelativeTime('2025-01-25T00:00:00.000Z') // 'hace 2 días' (if today is 2025-01-27)
 */
export function getRelativeTime(isoDate: string | null): string | null {
  if (!isoDate) return null

  const date = dayjs(isoDate)

  if (!date.isValid()) {
    return null
  }

  return date.fromNow()
}
