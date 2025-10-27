import type { IData } from '@common/types/requests'

import { api } from '../../../config/api'
import type { IUpdateProfilePayload, IUserWithProfile } from '../types/Profile'

/**
 * Profile Service
 * Handles all profile-related API calls
 */
export class ProfileService {
  /**
   * Get current user's profile
   * GET /users/me
   */
  static getMyProfile() {
    return api.FJ_APIv1.get<IData<IUserWithProfile>>('/users/me')
  }

  /**
   * Update current user's profile
   * PUT /users/me
   * @param payload - Partial profile data to update
   */
  static updateMyProfile(payload: IUpdateProfilePayload) {
    return api.FJ_APIv1.put<IData<IUserWithProfile>>('/users/me', payload)
  }

  /**
   * Get user by UUID (admin only)
   * GET /users/:uuid
   * @param uuid - User UUID
   */
  static getUserByUuid(uuid: string) {
    return api.FJ_APIv1.get<IData<IUserWithProfile>>(`/users/${uuid}`)
  }

  /**
   * Get all users (admin only)
   * GET /users
   */
  static getAllUsers() {
    return api.FJ_APIv1.get<IData<IUserWithProfile[]>>('/users')
  }
}
