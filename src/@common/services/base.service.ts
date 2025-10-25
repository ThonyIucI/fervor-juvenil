import type { AxiosResponse } from 'axios'

import type { ApiResponse, PaginatedResponse } from '../types/api'

import { httpService } from './http.service'

/**
 * Base service class with common CRUD operations
 * Extend this class to create specific services
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
   */
  async getPaginated(params?: Record<string, unknown>): Promise<PaginatedResponse<T>> {
    const response = await httpService.get<PaginatedResponse<T>>(this.endpoint, { params })

    return response.data.data as PaginatedResponse<T>
  }

  /**
   * Get single item by ID
   */
  async getById(id: string | number): Promise<T> {
    const response = await httpService.get<T>(`${this.endpoint}/${id}`)

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
   * Update existing item
   */
  async update(id: string | number, data: Partial<T>): Promise<T> {
    const response = await httpService.put<T>(`${this.endpoint}/${id}`, data)

    return response.data.data
  }

  /**
   * Partially update existing item
   */
  async patch(id: string | number, data: Partial<T>): Promise<T> {
    const response = await httpService.patch<T>(`${this.endpoint}/${id}`, data)

    return response.data.data
  }

  /**
   * Delete item by ID
   */
  async delete(id: string | number): Promise<void> {
    await httpService.delete(`${this.endpoint}/${id}`)
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
