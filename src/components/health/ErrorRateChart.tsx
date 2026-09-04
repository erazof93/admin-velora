import type { UseQueryResult } from '@tanstack/react-query'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ErrorRatePoint } from '@/types/health'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { VELORA_COLORS } from '@constants/colors'
import { LEVEL_HEX, errorRateLevel } from '@lib/utils/thresholds'

const tooltipStyle = {
  background: VELORA_COLORS.surface,
  border: `1px solid ${VELORA_COLORS.border}`,
  borderRadius: 8,
  color: VELORA_COLORS.text,
  fontSize: 12,
}

interface ErrorRateChartProps {
  query: UseQueryResult<ErrorRatePoint[], Error>
}

export const ErrorRateChart = ({ query }: ErrorRateChartProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return <ErrorState message="No se pudo cargar el error rate." onRetry={() => void refetch()} />
  }

  return (
    <Card>
      <h2 className="mb-4 text-sm font-medium text-velora-muted">Error rate · últimos 7 días</h2>
      {isLoading || !data ? (
        <Skeleton className="h-56 w-full" />
      ) : (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={224}>
            <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid stroke={VELORA_COLORS.border} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                stroke={VELORA_COLORS.muted}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 5]}
                stroke={VELORA_COLORS.muted}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={40}
                tickFormatter={(value: number) => `${value}%`}
              />
              <Tooltip
                cursor={{ fill: VELORA_COLORS.surface2 }}
                contentStyle={tooltipStyle}
                formatter={(value) => [`${Number(value)}%`, 'Errores']}
              />
              <Bar dataKey="rate" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                {data.map((point) => (
                  <Cell key={point.day} fill={LEVEL_HEX[errorRateLevel(point.rate)]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
