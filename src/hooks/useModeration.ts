import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ModerationActionPayload } from '@/types/moderation'
import { moderationAPI } from '@lib/api/moderation'

const KEY = ['moderation'] as const
const STALE = 60_000
const AUTO_REFRESH = 120_000

export function useModeration() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: KEY })

  const flagged = useQuery({
    queryKey: [...KEY, 'flagged'],
    queryFn: moderationAPI.getFlagged,
    staleTime: STALE,
    refetchInterval: AUTO_REFRESH,
  })

  const reportedUsers = useQuery({
    queryKey: [...KEY, 'users'],
    queryFn: moderationAPI.getReportedUsers,
    staleTime: STALE,
  })

  const history = useQuery({
    queryKey: [...KEY, 'history'],
    queryFn: moderationAPI.getHistory,
    staleTime: STALE,
  })

  const stats = useQuery({
    queryKey: [...KEY, 'stats'],
    queryFn: moderationAPI.getStats,
    staleTime: STALE,
  })

  const act = useMutation({
    mutationFn: (payload: ModerationActionPayload) => moderationAPI.act(payload),
    onSuccess: invalidate,
  })

  const bulk = useMutation({
    mutationFn: (action: 'approve' | 'reject') => moderationAPI.bulk(action),
    onSuccess: invalidate,
  })

  return { flagged, reportedUsers, history, stats, act, bulk }
}
