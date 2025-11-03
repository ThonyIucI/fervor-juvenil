import { BaseService } from '@common/services/base.service'
import type { PaginatedResponse } from '@common/types/api'

import type { IUpdateProfilePayload, IUserWithProfile } from '../types/Profile'

/**
 * Query parameters for paginated user list
 */
export interface GetUsersQueryParams {
  page?: number
  limit?: number
  sortBy?: 'firstName' | 'lastName' | 'email' | 'createdAt' | 'isActive'
  sortOrder?: 'ASC' | 'DESC'
  isActive?: boolean
  search?: string
}

/**
 * Profile Service
 * Extends BaseService for CRUD operations on users
 * Handles all profile-related API calls
 *
 * Note: BaseService uses httpService which has baseURL = API_URL_V1
 * Endpoints are relative to that base URL with versioning included
 */
class ProfileServiceClass extends BaseService<IUserWithProfile> {
  constructor() {
    super('/users') // Resolves to: {API_URL_V1}/users
  }

  /**
   * Get current user's profile
   * GET {API_URL_V1}/users/me
   */
  async getMyProfile(): Promise<IUserWithProfile> {
    return this.customRequest<IUserWithProfile>('get', '/users/me')
  }

  /**
   * Update current user's profile
   * PUT {API_URL_V1}/users/me
   * @param payload - Partial profile data to update
   */
  async updateMyProfile(payload: IUpdateProfilePayload): Promise<IUserWithProfile> {
    return this.customRequest<IUserWithProfile>('put', '/users/me', payload)
  }

  /**
   * Get user by UUID (admin only)
   * GET {API_URL_V1}/users/:uuid
   * @param uuid - User UUID
   */
  async getUserByUuid(uuid: string): Promise<IUserWithProfile> {
    // Usa el método heredado getByUuid
    return this.getByUuid(uuid)
  }

  /**
   * Get all users (admin only)
   * GET {API_URL_V1}/users
   */
  async getAllUsers(): Promise<IUserWithProfile[]> {
    // Usa el método heredado getAll
    return this.getAll()
  }

  /**
   * Get paginated users with filters and search (admin only)
   * GET {API_URL_V1}/users?page=1&limit=10&search=...
   * @param params - Query parameters for pagination, filtering, and search
   * @returns Paginated response with { data: IUserWithProfile[], meta: PaginationMeta }
   */
  async getAllUsersPaginated(
    params: GetUsersQueryParams = {}
  ): Promise<PaginatedResponse<IUserWithProfile>> {
    // Convert params to plain object for axios
    const queryParams: Record<string, string | number | boolean> = {}

    if (params.page) queryParams.page = params.page
    if (params.limit) queryParams.limit = params.limit
    if (params.sortBy) queryParams.sortBy = params.sortBy
    if (params.sortOrder) queryParams.sortOrder = params.sortOrder
    if (params.isActive !== undefined) queryParams.isActive = params.isActive
    if (params.search) queryParams.search = params.search

    // Use inherited getPaginated method from BaseService
    // This returns { data: T[], meta: PaginationMeta } directly
    return this.getPaginated(queryParams)
  }
}

// Export singleton instance
export const ProfileService = new ProfileServiceClass()
