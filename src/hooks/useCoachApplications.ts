import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CoachApplicationStatus } from '@/types/coaches'
import { coachApplicationsAPI } from '@lib/api/coaches'

const KEY = ['coach-applications'] as const
const STALE = 60_000

export function useCoachApplications(status?: CoachApplicationStatus) {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: KEY })

  const list = useQuery({
    queryKey: [...KEY, status ?? 'all'],
    queryFn: () => coachApplicationsAPI.list(status),
    staleTime: STALE,
  })

  const approve = useMutation({
    mutationFn: (input: { id: string; note?: string }) =>
      coachApplicationsAPI.approve(input.id, input.note),
    onSuccess: invalidate,
  })

  const reject = useMutation({
    mutationFn: (input: { id: string; note?: string }) =>
      coachApplicationsAPI.reject(input.id, input.note),
    onSuccess: invalidate,
  })

  return { list, approve, reject }
}
