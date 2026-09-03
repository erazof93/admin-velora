import { useCallback, useState } from 'react'

interface AsyncState<T> {
  data: T | null
  error: Error | null
  loading: boolean
}

/** Ejecuta una promesa exponiendo estados de carga/error (para acciones puntuales). */
export function useAsync<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
) {
  const [state, setState] = useState<AsyncState<TResult>>({
    data: null,
    error: null,
    loading: false,
  })

  const run = useCallback(
    async (...args: TArgs) => {
      setState({ data: null, error: null, loading: true })
      try {
        const data = await fn(...args)
        setState({ data, error: null, loading: false })
        return data
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setState({ data: null, error, loading: false })
        throw error
      }
    },
    [fn],
  )

  return { ...state, run }
}
