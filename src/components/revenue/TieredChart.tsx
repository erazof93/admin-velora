import type { UseQueryResult } from '@tanstack/react-query'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { RevenueBundle } from '@/types/revenue'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { TIER_COLORS, VELORA_COLORS } from '@constants/colors'

const tooltipStyle = {
  background: VELORA_COLORS.surface,
  border: `1px solid ${VELORA_COLORS.border}`,
  borderRadius: 8,
  color: VELORA_COLORS.text,
  fontSize: 12,
}

interface TieredChartProps {
  query: UseQueryResult<RevenueBundle, Error>
}

export const TieredChart = ({ query }: TieredChartProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return <ErrorState message="No se pudo cargar el desglose." onRetry={() => void refetch()} />
  }

  return (
    <Card>
      <h2 className="mb-4 text-sm font-medium text-velora-muted">
        Revenue por tier · últimos 12 meses
      </h2>
      {isLoading || !data ? (
        <Skeleton className="h-[250px] w-full" />
      ) : (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.tiered} margin={{ top: 4, right: 8, bottom: 0, left: -4 }}>
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
                width={52}
                tickFormatter={(value: number) => `$${Math.round(value / 1000)}k`}
              />
              <Tooltip
                cursor={{ fill: VELORA_COLORS.surface2 }}
                contentStyle={tooltipStyle}
                formatter={(value) => `$${Number(value).toLocaleString('en-US')}`}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar
                dataKey="free"
                stackId="tiers"
                name="Free"
                fill={TIER_COLORS.FREE}
                isAnimationActive={false}
              />
              <Bar
                dataKey="premium"
                stackId="tiers"
                name="Premium"
                fill={TIER_COLORS.PREMIUM}
                isAnimationActive={false}
              />
              <Bar
                dataKey="pro"
                stackId="tiers"
                name="Pro Coaching"
                fill={TIER_COLORS.PRO_COACHING}
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
