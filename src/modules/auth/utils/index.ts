import { useTokenState } from '@/state/useTokenState'

export const ACCESS_TOKEN = 'ACCESS_TOKEN'

/**
 * Get access token from Zustand store
 * This function accesses the store directly (outside React component)
 */
export const getAccessToken = () => {
  return useTokenState.getState().accessToken
}

// Re-export role utilities
export { hasAnyRole, hasRole, isAdmin, isSuperAdmin } from './roleUtils'
