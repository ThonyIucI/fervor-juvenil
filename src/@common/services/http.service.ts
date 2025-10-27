import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { AxiosError } from 'axios'

import { getAccessToken } from '../../modules/auth/utils'
import { API_URL_V1 } from '../env'
import type { ApiErrorResponse, ApiResponse } from '../types/api'

/**
 * Custom headers for API requests
 */
interface CustomHeaders {
  'Content-Type': string
  'ngrok-skip-browser-warning'?: string
  [key: string]: string | undefined
}

/**
 * HTTP Service class for making API requests with proper error handling
 */
export class HttpService {
  private instance: AxiosInstance

  constructor(baseURL: string = API_URL_V1) {
    const headers: CustomHeaders = {
      'Content-Type': 'application/json',
      ...(baseURL.includes('ngrok') && { 'ngrok-skip-browser-warning': 'again' })
    }

    this.instance = axios.create({
      baseURL,
      headers,
      timeout: 30000
    })

    this.setupInterceptors()
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const token = getAccessToken()
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        return response
      },
      async (error: AxiosError<ApiErrorResponse>) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - clear token and redirect to login
          localStorage.removeItem('token')
          window.location.href = '/login'
        }

        if (error.response?.status === 403) {
          // Handle forbidden
          console.error('Access forbidden')
        }

        if (error.response?.status === 500) {
          // Handle server errors
          console.error('Server error:', error.response.data)
        }

        return Promise.reject(error)
      }
    )
  }

  /**
   * GET request
   */
  async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.get<ApiResponse<T>>(url, config)
  }

  /**
   * POST request
   */
  async post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.post<ApiResponse<T>>(url, data, config)
  }

  /**
   * PUT request
   */
  async put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.put<ApiResponse<T>>(url, data, config)
  }

  /**
   * PATCH request
   */
  async patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.patch<ApiResponse<T>>(url, data, config)
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.instance.delete<ApiResponse<T>>(url, config)
  }

  /**
   * Get the axios instance for custom usage
   */
  getInstance(): AxiosInstance {
    return this.instance
  }
}

// Export singleton instance
export const httpService = new HttpService()
