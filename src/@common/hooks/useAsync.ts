import { useCallback, useEffect, useState } from 'react'

export interface AsyncState<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

/**
 * Hook to handle async operations with loading, error, and success states
 * @param asyncFunction - Async function to execute
 * @param immediate - Execute immediately on mount (default: true)
 * @returns [state, execute, reset]
 *
 * @example
 * const [state, execute] = useAsync(fetchUser, false)
 *
 * useEffect(() => {
 *   execute(userId)
 * }, [userId])
 */
export function useAsync<T, Args extends unknown[] = []>(
  asyncFunction: (...args: Args) => Promise<T>,
  immediate = true
): [AsyncState<T>, (...args: Args) => Promise<void>, () => void] {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: immediate,
    isError: false,
    isSuccess: false
  })

  const execute = useCallback(
    async (...args: Args) => {
      setState({
        data: null,
        error: null,
        isLoading: true,
        isError: false,
        isSuccess: false
      })

      try {
        const response = await asyncFunction(...args)
        setState({
          data: response,
          error: null,
          isLoading: false,
          isError: false,
          isSuccess: true
        })
      } catch (error) {
        setState({
          data: null,
          error: error as Error,
          isLoading: false,
          isError: true,
          isSuccess: false
        })
      }
    },
    [asyncFunction]
  )

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: false
    })
  }, [])

  useEffect(() => {
    if (immediate) {
      void execute(...([] as unknown as Args))
    }
  }, [immediate, execute])

  return [state, execute, reset]
}
