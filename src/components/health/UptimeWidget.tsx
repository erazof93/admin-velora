import type { UseQueryResult } from '@tanstack/react-query'
import { Line, LineChart, ResponsiveContainer } from 'recharts'
import type { UptimeStats } from '@/types/health'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { formatPercent } from '@lib/utils/format'
import { cn } from '@lib/utils/helpers'
import { LEVEL_BG, LEVEL_HEX, uptimeLevel } from '@lib/utils/thresholds'

interface UptimeWidgetProps {
  query: UseQueryResult<UptimeStats, Error>
}

export const UptimeWidget = ({ query }: UptimeWidgetProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return <ErrorState message="No se pudo cargar el uptime." onRetry={() => void refetch()} />
  }
  if (isLoading || !data) return <Skeleton className="h-64 w-full" />

  const spark = data.trend.map((value, i) => ({ i, value }))
  const rows = [
    { label: 'Uptime 24h', value: data.last24h },
    { label: 'Uptime 7 días', value: data.last7d },
    { label: 'Uptime 30 días', value: data.last30d },
  ]

  return (
    <Card className="flex h-full flex-col gap-3">
      {rows.map((row) => {
        const level = uptimeLevel(row.value)
        return (
          <div
            key={row.label}
            className="flex items-center justify-between gap-3 rounded-lg border border-velora-border bg-velora-surface-2 p-3"
          >
            <div>
              <p className="text-xs text-velora-muted">{row.label}</p>
              <p className={cn('mt-0.5 rounded-full px-2 text-sm font-semibold', LEVEL_BG[level])}>
                {formatPercent(row.value, 2)}
              </p>
            </div>
            <div className="h-9 w-24">
              <ResponsiveContainer width="100%" height={36}>
                <LineChart data={spark}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={LEVEL_HEX[level]}
                    strokeWidth={1.5}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      })}
    </Card>
  )
}
