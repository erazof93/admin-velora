import { useQuery } from '@tanstack/react-query'
import { healthAPI } from '@lib/api/health'

const STATUS_INTERVAL = 30_000
const METRICS_INTERVAL = 60_000
const ERRORS_STALE = 5 * 60_000

export function useHealth() {
  const status = useQuery({
    queryKey: ['health', 'status'],
    queryFn: healthAPI.getStatus,
    staleTime: 0,
    refetchInterval: STATUS_INTERVAL,
  })

  const metrics = useQuery({
    queryKey: ['health', 'metrics'],
    queryFn: healthAPI.getMetrics,
    staleTime: 0,
    refetchInterval: METRICS_INTERVAL,
  })

  const errors = useQuery({
    queryKey: ['health', 'errors'],
    queryFn: healthAPI.getErrors,
    staleTime: ERRORS_STALE,
  })

  const uptime = useQuery({
    queryKey: ['health', 'uptime'],
    queryFn: healthAPI.getUptime,
    staleTime: ERRORS_STALE,
  })

  const refetchAll = () => {
    void status.refetch()
    void metrics.refetch()
    void errors.refetch()
    void uptime.refetch()
  }

  return {
    status,
    metrics,
    errors,
    uptime,
    refetchAll,
    isDbDown: status.data?.database === 'down',
    lastCheck: status.data?.checkedAt ?? null,
  }
}
