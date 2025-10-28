import { BaseService } from '@common/services/base.service'

import type { IUpdateProfilePayload, IUserWithProfile } from '../types/Profile'

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
}

// Export singleton instance
export const ProfileService = new ProfileServiceClass()
