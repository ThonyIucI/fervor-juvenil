import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useDebounce } from '@common/hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500))
    expect(result.current).toBe('test')
  })

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 }
    })

    expect(result.current).toBe('initial')

    // Update value
    act(() => {
      rerender({ value: 'updated', delay: 500 })
    })

    // Value should still be 'initial' immediately
    expect(result.current).toBe('initial')

    // Fast-forward time
    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    // Value should now be updated
    expect(result.current).toBe('updated')
  })

  it('should cancel previous timeout on rapid changes', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'first' }
    })

    expect(result.current).toBe('first')

    // Rapid changes
    act(() => {
      rerender({ value: 'second' })
    })

    await act(async () => {
      await vi.advanceTimersByTimeAsync(250)
    })

    act(() => {
      rerender({ value: 'third' })
    })

    await act(async () => {
      await vi.advanceTimersByTimeAsync(250)
    })

    // Should still be 'first' because timers were cancelled
    expect(result.current).toBe('first')

    // Complete the debounce
    await act(async () => {
      await vi.advanceTimersByTimeAsync(250)
    })

    expect(result.current).toBe('third')
  })

  it('should work with different data types', () => {
    const { result: numberResult } = renderHook(() => useDebounce(123, 100))
    expect(numberResult.current).toBe(123)

    const { result: boolResult } = renderHook(() => useDebounce(true, 100))
    expect(boolResult.current).toBe(true)

    const { result: objectResult } = renderHook(() => useDebounce({ id: 1, name: 'test' }, 100))
    expect(objectResult.current).toEqual({ id: 1, name: 'test' })
  })

  it('should use custom delay', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
      initialProps: { value: 'initial' }
    })

    act(() => {
      rerender({ value: 'updated' })
    })

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })
    expect(result.current).toBe('initial')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
    })

    expect(result.current).toBe('updated')
  })
})
