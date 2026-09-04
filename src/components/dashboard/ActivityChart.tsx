import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { CHART_COLORS, VELORA_COLORS } from '@constants/colors'
import { useActivityQuery } from '@hooks/useDashboard'

const tooltipStyle = {
  background: VELORA_COLORS.surface,
  border: `1px solid ${VELORA_COLORS.border}`,
  borderRadius: 8,
  color: VELORA_COLORS.text,
  fontSize: 12,
}

export const ActivityChart = () => {
  const { data, isLoading, isError, refetch } = useActivityQuery()

  if (isError) {
    return <ErrorState message="No se pudo cargar la actividad." onRetry={() => void refetch()} />
  }

  return (
    <Card>
      <h2 className="mb-4 text-sm font-medium text-velora-muted">
        Altas de usuarios · últimos 30 días
      </h2>
      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={256}>
            <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -12 }}>
              <CartesianGrid stroke={VELORA_COLORS.border} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                stroke={VELORA_COLORS.muted}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                interval={4}
              />
              <YAxis
                stroke={VELORA_COLORS.muted}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => [Number(value), 'Altas']}
              />
              <Line
                type="monotone"
                dataKey="signups"
                stroke={CHART_COLORS.activity}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
