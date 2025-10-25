import { AxiosError } from 'axios'

/**
 * Generic API Response structure
 */
export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
}

/**
 * Paginated API Response
 */
export interface PaginatedResponse<T = unknown> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  message: string
  errors?: Record<string, string[]>
  statusCode: number
}

/**
 * Type guard for API errors
 */
export const isApiError = (error: unknown): error is AxiosError<ApiErrorResponse> => {
  return (error as AxiosError).isAxiosError === true
}

/**
 * Extract error message from API error
 */
export const getApiErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.response?.data?.message || error.message || 'An unexpected error occurred'
  }

  return 'An unexpected error occurred'
}

/**
 * Extract field errors from API error
 */
export const getApiFieldErrors = (error: unknown): Record<string, string> | null => {
  if (isApiError(error) && error.response?.data?.errors) {
    const errors = error.response.data.errors

    return Object.keys(errors).reduce(
      (acc, key) => {
        acc[key] = errors[key][0] || 'Invalid field'

        return acc
      },
      {} as Record<string, string>
    )
  }

  return null
}
