import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { BulkActionPayload, UserFormValues, UsersFilters } from '@/types/users'
import { usersAPI } from '@lib/api/users'

const KEY = ['users'] as const
const STALE = 2 * 60_000

export function useUsersQuery(filters: UsersFilters) {
  return useQuery({
    queryKey: [...KEY, filters],
    queryFn: () => usersAPI.list(filters),
    staleTime: STALE,
  })
}

export function useUserQuery(id: string | null) {
  return useQuery({
    queryKey: [...KEY, 'detail', id],
    queryFn: () => usersAPI.get(id ?? ''),
    enabled: id !== null,
  })
}

export function useUserMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: KEY })

  const create = useMutation({
    mutationFn: (values: UserFormValues) => usersAPI.create(values),
    onSuccess: invalidate,
  })

  const update = useMutation({
    mutationFn: (input: { id: string; values: Partial<UserFormValues> }) =>
      usersAPI.update(input.id, input.values),
    onSuccess: invalidate,
  })

  const remove = useMutation({
    mutationFn: (id: string) => usersAPI.remove(id),
    onSuccess: invalidate,
  })

  const bulk = useMutation({
    mutationFn: (payload: BulkActionPayload) => usersAPI.bulk(payload),
    onSuccess: invalidate,
  })

  return { create, update, remove, bulk }
}
