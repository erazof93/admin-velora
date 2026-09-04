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
import type { ChurnPoint } from '@/types/revenue'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { VELORA_COLORS } from '@constants/colors'
import { LEVEL_HEX, churnLevel } from '@lib/utils/thresholds'

const tooltipStyle = {
  background: VELORA_COLORS.surface,
  border: `1px solid ${VELORA_COLORS.border}`,
  borderRadius: 8,
  color: VELORA_COLORS.text,
  fontSize: 12,
}

interface ChurnAnalysisProps {
  query: UseQueryResult<ChurnPoint[], Error>
}

export const ChurnAnalysis = ({ query }: ChurnAnalysisProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return <ErrorState message="No se pudo cargar el churn." onRetry={() => void refetch()} />
  }

  const latest = data?.at(-1)?.rate ?? 0
  const stroke = LEVEL_HEX[churnLevel(latest)]

  return (
    <Card>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-medium text-velora-muted">
          Análisis de churn · últimos 30 días
        </h2>
        {latest > 2 && (
          <span className="rounded-full bg-velora-danger/15 px-2 py-0.5 text-xs font-medium text-velora-danger">
            Churn alto hoy: {latest}%
          </span>
        )}
      </div>
      {isLoading || !data ? (
        <Skeleton className="h-56 w-full" />
      ) : (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={224}>
            <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
              <CartesianGrid stroke={VELORA_COLORS.border} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                stroke={VELORA_COLORS.muted}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval={4}
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
                contentStyle={tooltipStyle}
                labelFormatter={(value) => `Día ${value}`}
                formatter={(value) => [`${Number(value)}%`, 'Churn']}
              />
              <Line
                type="monotone"
                dataKey="rate"
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
