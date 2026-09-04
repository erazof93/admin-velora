import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { dashboardAPI } from '@lib/api/dashboard'
import { useDashboardStore } from '@store/dashboardStore'

const STALE = 5 * 60_000
const HEALTH_INTERVAL = 30_000

export const useStatsQuery = () =>
  useQuery({ queryKey: ['dashboard', 'stats'], queryFn: dashboardAPI.getStats, staleTime: STALE })

export const useRevenueQuery = () =>
  useQuery({
    queryKey: ['dashboard', 'revenue'],
    queryFn: dashboardAPI.getRevenue,
    staleTime: STALE,
  })

export const useActivityQuery = () =>
  useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: dashboardAPI.getActivity,
    staleTime: STALE,
  })

export const useTopCoachesQuery = () =>
  useQuery({
    queryKey: ['dashboard', 'coaches'],
    queryFn: dashboardAPI.getTopCoaches,
    staleTime: STALE,
  })

export const useRecentActivityQuery = () =>
  useQuery({
    queryKey: ['dashboard', 'recent-activity'],
    queryFn: dashboardAPI.getRecentActivity,
    staleTime: STALE,
  })

/** Health con auto-refresh cada 30s (según `dashboardStore.autoRefresh`). */
export function useHealthQuery() {
  const autoRefresh = useDashboardStore((s) => s.autoRefresh)
  const setLastRefresh = useDashboardStore((s) => s.setLastRefresh)

  const query = useQuery({
    queryKey: ['dashboard', 'health'],
    queryFn: dashboardAPI.getHealth,
    staleTime: 0,
    refetchInterval: autoRefresh ? HEALTH_INTERVAL : false,
  })

  useEffect(() => {
    if (query.dataUpdatedAt) setLastRefresh(query.dataUpdatedAt)
  }, [query.dataUpdatedAt, setLastRefresh])

  return query
}
