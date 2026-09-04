import type { UseQueryResult } from '@tanstack/react-query'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { HealthMetrics } from '@/types/health'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { VELORA_COLORS } from '@constants/colors'
import { LEVEL_HEX, responseTimeLevel } from '@lib/utils/thresholds'

const tooltipStyle = {
  background: VELORA_COLORS.surface,
  border: `1px solid ${VELORA_COLORS.border}`,
  borderRadius: 8,
  color: VELORA_COLORS.text,
  fontSize: 12,
}

interface ResponseTimeChartProps {
  query: UseQueryResult<HealthMetrics, Error>
}

export const ResponseTimeChart = ({ query }: ResponseTimeChartProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return (
      <ErrorState
        message="No se pudo cargar el tiempo de respuesta."
        onRetry={() => void refetch()}
      />
    )
  }

  const latest = data?.responseTime.at(-1)?.ms ?? 0
  const stroke = LEVEL_HEX[responseTimeLevel(latest)]

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-velora-muted">
          Tiempo de respuesta · últimos 60 min
        </h2>
        {data && <span className="text-sm font-semibold text-velora-text">{latest} ms</span>}
      </div>
      {isLoading || !data ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={256}>
            <LineChart data={data.responseTime} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
              <CartesianGrid stroke={VELORA_COLORS.border} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="minutesAgo"
                stroke={VELORA_COLORS.muted}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval={9}
                tickFormatter={(value: number) => `${value}m`}
              />
              <YAxis
                domain={[0, 500]}
                stroke={VELORA_COLORS.muted}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelFormatter={(value) => `${Number(value)} min atrás`}
                formatter={(value) => [`${Number(value)} ms`, 'Respuesta']}
              />
              <Line
                type="monotone"
                dataKey="ms"
                stroke={stroke}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
