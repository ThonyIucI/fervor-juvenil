import type { SetStateAction } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Estado de una petición asíncrona
 */
export interface RequestState<T> {
  /** Datos retornados por la petición */
  data: T | null
  /** Error si la petición falló */
  error: Error | null
  /** True si la petición está en progreso */
  isLoading: boolean
  /** True si la petición falló */
  isError: boolean
  /** True si la petición completó exitosamente */
  isSuccess: boolean
  /** True si nunca se ha ejecutado */
  isIdle: boolean
}

/**
 * Opciones de configuración para useRequest
 */
export interface UseRequestOptions<T> {
  /**
   * Si true, ejecuta la función automáticamente al montar
   * @default false
   */
  immediate?: boolean

  /**
   * Callback ejecutado cuando hay un error
   * Útil para logging o mostrar toasts
   */
  onError?: (error: Error) => void

  /**
   * Callback ejecutado cuando la petición es exitosa
   * Útil para mostrar toasts de confirmación
   */
  onSuccess?: (data: T) => void

  /**
   * Si true, cancela la petición anterior cuando se ejecuta una nueva
   * Útil para evitar race conditions en búsquedas, tabs, etc.
   * @default false
   */
  cancelPrevious?: boolean
}

/**
 * Valor de retorno del hook useRequest
 */
export interface UseRequestReturn<T, Args extends unknown[]> {
  /** Estado actual de la petición */
  data: T | null
  error: Error | null
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  isIdle: boolean

  /**
   * Ejecuta la función asíncrona con los argumentos dados
   * @returns Promise con el resultado o lanza error
   */
  execute: (...args: Args) => Promise<T>

  /**
   * Reinicia el estado a valores iniciales
   */
  reset: () => void

  /**
   * Actualiza manualmente los datos (para optimistic updates)
   */
  setData: (value: SetStateAction<T | null>) => void

  /**
   * Actualiza manualmente el error
   */
  setError: (value: SetStateAction<Error | null>) => void
}

/**
 * Hook para manejar peticiones asíncronas con estados, cancelación y callbacks
 *
 * @example
 * // Básico
 * const { data, isLoading, execute } = useRequest(fetchUsers)
 * useEffect(() => { execute() }, [])
 *
 * @example
 * // Con argumentos
 * const { data, execute } = useRequest(fetchUserById)
 * const handleClick = () => execute(userId)
 *
 * @example
 * // Immediate + callbacks (sin argumentos)
 * const { data } = useRequest(() => fetchUsers(), {
 *   immediate: true,
 *   onSuccess: (users) => toast.success(`${users.length} users loaded`),
 *   onError: (err) => toast.error(err.message)
 * })
 *
 * @example
 * // Con cancelación (búsqueda)
 * const { data, execute } = useRequest(searchUsers, { cancelPrevious: true })
 * const debouncedSearch = useDebounce(search, 300)
 * useEffect(() => { execute(debouncedSearch) }, [debouncedSearch])
 *
 * @example
 * // Optimistic update
 * const { data, setData, execute } = useRequest(likePost)
 * const handleLike = async () => {
 *   setData(prev => ({ ...prev, liked: true }))
 *   try {
 *     await execute(postId)
 *   } catch {
 *     setData(prev => ({ ...prev, liked: false }))
 *   }
 * }
 */
export function useRequest<T, Args extends unknown[] = []>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseRequestOptions<T> = {}
): UseRequestReturn<T, Args> {
  const { immediate = false, onError, onSuccess, cancelPrevious = false } = options

  // Estado
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isIdle: true
  })

  // Referencias para evitar re-renders y race conditions
  const isMountedRef = useRef(true)
  const abortControllerRef = useRef<AbortController | undefined>(undefined)
  const asyncFunctionRef = useRef(asyncFunction)

  // Actualizar referencia sin causar re-ejecución
  useEffect(() => {
    asyncFunctionRef.current = asyncFunction
  }, [asyncFunction])

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      isMountedRef.current = false
      abortControllerRef.current?.abort()
    }
  }, [])

  /**
   * Ejecuta la función asíncrona con manejo de estados
   */
  const execute = useCallback(
    async (...args: Args): Promise<T> => {
      // Cancelar petición anterior si está configurado
      if (cancelPrevious) {
        abortControllerRef.current?.abort()
        abortControllerRef.current = new AbortController()
      }

      // Actualizar estado a loading
      if (isMountedRef.current) {
        setState({
          data: null,
          error: null,
          isLoading: true,
          isError: false,
          isSuccess: false,
          isIdle: false
        })
      }

      try {
        // Ejecutar función asíncrona
        const result = await asyncFunctionRef.current(...args)

        // Solo actualizar si el componente está montado
        if (isMountedRef.current) {
          setState({
            data: result,
            error: null,
            isLoading: false,
            isError: false,
            isSuccess: true,
            isIdle: false
          })

          // Callback de éxito
          onSuccess?.(result)
        }

        return result
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error))

        // Solo actualizar si el componente está montado
        if (isMountedRef.current) {
          setState({
            data: null,
            error: err,
            isLoading: false,
            isError: true,
            isSuccess: false,
            isIdle: false
          })

          // Callback de error
          onError?.(err)
        }

        // Re-lanzar el error para que el componente pueda manejarlo
        throw err
      }
    },
    [cancelPrevious, onError, onSuccess]
  )

  /**
   * Reinicia el estado a valores iniciales
   */
  const reset = useCallback(() => {
    abortControllerRef.current?.abort()
    setState({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
      isIdle: true
    })
  }, [])

  /**
   * Actualiza manualmente los datos
   */
  const setData = useCallback((dataOrUpdater: SetStateAction<T | null>) => {
    setState((prev) => ({
      ...prev,
      data:
        typeof dataOrUpdater === 'function'
          ? (dataOrUpdater as (prev: T | null) => T | null)(prev.data)
          : dataOrUpdater
    }))
  }, [])

  /**
   * Actualiza manualmente el error
   */
  const setError = useCallback((errorOrUpdater: SetStateAction<Error | null>) => {
    setState((prev) => ({
      ...prev,
      error:
        typeof errorOrUpdater === 'function'
          ? (errorOrUpdater as (prev: Error | null) => Error | null)(prev.error)
          : errorOrUpdater,
      isError: errorOrUpdater !== null
    }))
  }, [])

  // Ejecución inmediata (solo una vez al montar)
  useEffect(() => {
    if (immediate) {
      // @ts-expect-error - immediate solo debe usarse con funciones sin argumentos requeridos
      void execute()
    }
    // Solo al montar, no incluir execute en las dependencias
     
  }, [])

  return {
    ...state,
    execute,
    reset,
    setData,
    setError
  }
}
