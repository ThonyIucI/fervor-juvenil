import axios, { AxiosHeaders, type AxiosInstance } from 'axios'

import { API_URL_V1 } from '../../@common/env'
import { getAccessToken } from '../../modules/auth/utils'

interface CustomHeaders extends Partial<AxiosHeaders> {
    'Content-Type': string;
    'ngrok-skip-browser-warning'?: string;
}

/**
 * Crea una instancia de Axios con la URL base especificada y configura los interceptores.
 *
 * @param {string} baseUrl - La URL base para la instancia de Axios.
 * @returns {AxiosInstance} La instancia de Axios configurada con interceptores.
 *
 * @example
 * // Crear una instancia de Axios para la versión v1
 * const apiV1 = createApiClient(env.BASE_API);
 *
 * // Realizar una solicitud GET usando la instancia creada
 * apiV1.get('/ruta').then(response => console.log(response.data));
 */
const createApiClient = (baseUrl: string): AxiosInstance => {
  const headers: CustomHeaders = {
    'Content-Type': 'application/json',
    ...(baseUrl.includes('ngrok') && { 'ngrok-skip-browser-warning': 'again' })
  }

  const instance = axios.create({
    baseURL: baseUrl,
    headers
  })

  instance.interceptors.request.use((config) => {
    const token = getAccessToken()
    if(token && config.headers instanceof axios.AxiosHeaders)
      config.headers.set('Authorization', `Bearer ${token}`)

    // TODO: Evaluar diferencia entre headers 1 y 2
    // config.headers.Authorization = `Bearer ${getAccessToken()}`;
    // config.headers = {
    //     ...axios.defaults.headers.common,
    //     ...config.headers,
    // };
    return config
  })

  return instance
}

type ApiVersion = 'FJ_APIv1';
type ApiClient = { [key in ApiVersion]: AxiosInstance };

/**
 * Objeto que contiene instancias de Axios configuradas para diferentes versiones de la API.
 *
 * @type {ApiClient}
 * @property {AxiosInstance} v1 - Instancia de Axios configurada para la versión 1 de la API.
 *
 * @example
 * // Obtener datos de un usuario usando la versión 4 de la API
 * api.FJ_APIv1.get('/users/123').then(response => console.log(response.data));
 *
 * @example
 * // Crear un nuevo usuario usando la versión 5 de la API
 * api.FJ_APIv1.post('/users', { name: 'John Doe' }).then(response => console.log(response.data));
 *
 */
export const api: ApiClient = {
  FJ_APIv1: createApiClient(API_URL_V1)
}
