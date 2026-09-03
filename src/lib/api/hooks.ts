import { useMutation, useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { LoginRequest } from '@/types'
import { apiClient } from './client'
import { authAPI } from './endpoints'

/** Helper genérico para GETs con React Query (base para hooks de dominio de fases siguientes). */
export function useApiQuery<T>(
  key: readonly unknown[],
  url: string,
  options?: Omit<UseQueryOptions<T, Error, T, readonly unknown[]>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<T, Error, T, readonly unknown[]>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await apiClient.get<T>(url)
      return data
    },
    ...options,
  })
}

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (credentials: LoginRequest) => authAPI.login(credentials),
    retry: 0,
  })

export const useGetMeQuery = (enabled = true) =>
  useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authAPI.getMe(),
    enabled,
    staleTime: 1000 * 60 * 5,
  })
