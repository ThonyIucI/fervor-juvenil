import type { AxiosResponse } from 'axios'

import type { ApiResponse, PaginatedResponse } from '../types/api'

import { httpService } from './http.service'

/**
 * Base service class with common CRUD operations
 * Extend this class to create specific services
 *
 * Note: All methods return unwrapped data (response.data.data)
 * The backend returns data in format: { data: T }
 */
export abstract class BaseService<T = unknown> {
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  /**
   * Get all items (with optional pagination)
   */
  async getAll(params?: Record<string, unknown>): Promise<T[]> {
    const response = await httpService.get<T[]>(this.endpoint, { params })

    return response.data.data
  }

  /**
   * Get paginated items
   * Backend returns: { data: T[], meta: PaginationMeta }
   * This method returns the full response (data + meta)
   */
  async getPaginated(params?: Record<string, unknown>): Promise<PaginatedResponse<T>> {
    const response = await httpService.get(this.endpoint, { params })

    // Para paginado, el backend NO envuelve en ApiResponse
    // Devuelve directamente: { data: T[], meta: PaginationMeta }
    return response.data as unknown as PaginatedResponse<T>
  }

  /**
   * Get single item by UUID
   */
  async getByUuid(uuid: string): Promise<T> {
    const response = await httpService.get<T>(`${this.endpoint}/${uuid}`)

    return response.data.data
  }

  /**
   * Create new item
   */
  async create(data: Partial<T>): Promise<T> {
    const response = await httpService.post<T>(this.endpoint, data)

    return response.data.data
  }

  /**
   * Update existing item by UUID
   */
  async updateByUuid(uuid: string, data: Partial<T>): Promise<T> {
    const response = await httpService.put<T>(`${this.endpoint}/${uuid}`, data)

    return response.data.data
  }

  /**
   * Partially update existing item by UUID
   */
  async patchByUuid(uuid: string, data: Partial<T>): Promise<T> {
    const response = await httpService.patch<T>(`${this.endpoint}/${uuid}`, data)

    return response.data.data
  }

  /**
   * Delete item by UUID
   */
  async deleteByUuid(uuid: string): Promise<void> {
    await httpService.delete(`${this.endpoint}/${uuid}`)
  }

  /**
   * Custom request - for endpoints that don't follow REST conventions
   */
  protected async customRequest<R = unknown>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: unknown,
    config?: Record<string, unknown>
  ): Promise<R> {
    let response: AxiosResponse<ApiResponse<R>>

    if (method === 'get' || method === 'delete') {
      response = await httpService[method](url, config)
    } else {
      response = await httpService[method](url, data, config)
    }

    return response.data.data
  }
}
