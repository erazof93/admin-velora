import type { UseQueryResult } from '@tanstack/react-query'
import type { HealthMetrics } from '@/types/health'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { formatPercent } from '@lib/utils/format'
import { cn } from '@lib/utils/helpers'
import { LEVEL_TEXT, responseTimeLevel, successRateLevel } from '@lib/utils/thresholds'

interface MetricsProps {
  query: UseQueryResult<HealthMetrics, Error>
}

export const Metrics = ({ query }: MetricsProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return (
      <ErrorState message="No se pudieron cargar las métricas." onRetry={() => void refetch()} />
    )
  }
  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {['a', 'b', 'c', 'd'].map((k) => (
          <Skeleton key={k} className="h-20" />
        ))}
      </div>
    )
  }

  const items = [
    { label: 'P50 Respuesta', value: `${data.p50} ms`, level: responseTimeLevel(data.p50) },
    { label: 'P95 Respuesta', value: `${data.p95} ms`, level: responseTimeLevel(data.p95) },
    { label: 'P99 Respuesta', value: `${data.p99} ms`, level: responseTimeLevel(data.p99) },
    {
      label: 'Tasa de éxito',
      value: formatPercent(data.successRate, 2),
      level: successRateLevel(data.successRate),
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-velora-border bg-velora-surface p-4"
        >
          <p className="text-xs text-velora-muted">{item.label}</p>
          <p className={cn('mt-1 text-lg font-semibold', LEVEL_TEXT[item.level])}>{item.value}</p>
        </div>
      ))}
    </div>
  )
}
