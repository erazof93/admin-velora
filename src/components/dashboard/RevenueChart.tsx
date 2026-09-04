import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { CHART_COLORS, VELORA_COLORS } from '@constants/colors'
import { useRevenueQuery } from '@hooks/useDashboard'

const tooltipStyle = {
  background: VELORA_COLORS.surface,
  border: `1px solid ${VELORA_COLORS.border}`,
  borderRadius: 8,
  color: VELORA_COLORS.text,
  fontSize: 12,
}

export const RevenueChart = () => {
  const { data, isLoading, isError, refetch } = useRevenueQuery()

  if (isError) {
    return <ErrorState message="No se pudo cargar el revenue." onRetry={() => void refetch()} />
  }

  return (
    <Card>
      <h2 className="mb-4 text-sm font-medium text-velora-muted">Revenue · últimos 12 meses</h2>
      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={256}>
            <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
              <CartesianGrid stroke={VELORA_COLORS.border} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                stroke={VELORA_COLORS.muted}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={VELORA_COLORS.muted}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={48}
              />
              <Tooltip
                cursor={{ fill: VELORA_COLORS.surface2 }}
                contentStyle={tooltipStyle}
                formatter={(value) => [`$${Number(value).toLocaleString('en-US')}`, 'Revenue']}
              />
              <Bar
                dataKey="revenue"
                fill={CHART_COLORS.revenue}
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
