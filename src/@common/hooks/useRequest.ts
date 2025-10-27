import { useCallback, useRef, useState } from 'react'
import axios from 'axios'

import { useToast } from './useToast'

interface ErrorResponse {
  title?: string
  message?: string
  reason?: string
  errors?: Record<string, string[]>
}

interface ErrorObject {
  title: string
  message: string
  reason?: string
  active: boolean
  status?: number
}
export const CANCEL_MESSAGE = 'canceled due to new request'

const getKeysOfObject = (obj: Record<string, unknown>): string[] => {
  const keys: string[] = []
  for (const k in obj) {
    keys.push(k)
  }
  return keys
}

const getMessageString = (error: {
  response: { data: { errors: Record<string, string[]> } }
}): string => {
  let aux = ''
  getKeysOfObject(error.response.data.errors).map((k) => {
    return error.response.data.errors[k].map((i) => {
      aux += `${i} `
    })
  })
  return aux
}

const getErrorFromError = (error: unknown): ErrorObject => {
  switch (typeof error) {
    case 'object':
      if (error && 'response' in error) {
        const axiosError = error as { response?: { data?: ErrorResponse; status?: number } }
        if (axiosError.response) {
          if (axiosError.response.data) {
            const title = axiosError.response.data.title
              ? axiosError.response.data.title
              : 'Ocurrió un error'
            const message = axiosError.response.data.errors
              ? getMessageString(
                  error as { response: { data: { errors: Record<string, string[]> } } }
                )
              : axiosError.response.data.message || ''
            const reason = axiosError.response.data.reason ? axiosError.response.data.reason : ''
            return { title, message, reason, active: true, status: axiosError.response.status }
          }
        }
      } else {
        if (!navigator.onLine) {
          return {
            title: 'No tienes conexión a internet',
            message: 'Conéctate a internet para continuar.',
            active: true
          }
        }
        const err = error as Error
        return { title: err.message, message: err.message, active: true }
      }
      break
    case 'string':
      return { title: 'Ocurrió un error', message: error, active: true }
  }

  return { title: 'Error desconocido', message: 'Ocurrió un error inesperado', active: true }
}

export const useRequest = <T = unknown, Args extends unknown[] = unknown[]>(
  initiallyLoading?: boolean | null,
  func?: (...args: Args) => Promise<T>,
  onError?: (errMessage?: string, err?: unknown) => void
) => {
  const notHandleLoading = initiallyLoading === null
  const [loading, setLoading] = useState(initiallyLoading || false)
  const [error, setError] = useState<unknown>(null)
  const [data, setData] = useState<T | null>(null)
  const cancelToken = useRef(axios.CancelToken.source())
  const toast = useToast()

  const handleRequest = useCallback(
    async (
      func: (axiosCancelToken?: unknown) => Promise<T>,
      onError?: (errMessage?: string, err?: unknown) => void
    ) => {
      cancelToken.current.cancel(CANCEL_MESSAGE)
      cancelToken.current = axios.CancelToken.source()

      if (!notHandleLoading) setLoading(true)
      setError(null)
      try {
        const result = await func(cancelToken.current)
        setData(result)
        return result
      } catch (err) {
        const { message, title } = getErrorFromError(err)
        if (message === CANCEL_MESSAGE) return

        // Mostrar toast de error automáticamente
        toast.error(message || title)

        if (onError) {
          onError(message || title, err)
        }
        setError(err)
        throw err
      } finally {
        if (!notHandleLoading) setLoading(false)
      }
    },
    [notHandleLoading, toast]
  )

  const handler = async (...args: Args) => {
    if (func) return await handleRequest(() => func(...args), onError)
  }

  return { loading, error, data, handleRequest, handler, setData, cancelTokenRef: cancelToken }
}
