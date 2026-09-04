import { useQuery } from '@tanstack/react-query'
import { revenueAPI } from '@lib/api/revenue'

const STALE = 5 * 60_000

export function useRevenue() {
  const overview = useQuery({
    queryKey: ['revenue', 'overview'],
    queryFn: revenueAPI.getOverview,
    staleTime: STALE,
  })

  const coaches = useQuery({
    queryKey: ['revenue', 'coaches'],
    queryFn: revenueAPI.getTopCoaches,
    staleTime: STALE,
  })

  const churn = useQuery({
    queryKey: ['revenue', 'churn'],
    queryFn: revenueAPI.getChurn,
    staleTime: STALE,
  })

  return { overview, coaches, churn }
}
