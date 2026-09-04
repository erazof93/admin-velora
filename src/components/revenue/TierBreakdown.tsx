import type { UseQueryResult } from '@tanstack/react-query'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { UserTier } from '@/types'
import type { RevenueBundle } from '@/types/revenue'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { TIER_COLORS, VELORA_COLORS } from '@constants/colors'

const TIER_LABEL: Record<UserTier, string> = {
  FREE: 'Free',
  PREMIUM: 'Premium',
  PRO_COACHING: 'Pro Coaching',
}

const tooltipStyle = {
  background: VELORA_COLORS.surface,
  border: `1px solid ${VELORA_COLORS.border}`,
  borderRadius: 8,
  color: VELORA_COLORS.text,
  fontSize: 12,
}

interface TierBreakdownProps {
  query: UseQueryResult<RevenueBundle, Error>
}

export const TierBreakdown = ({ query }: TierBreakdownProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return <ErrorState message="No se pudo cargar el reparto." onRetry={() => void refetch()} />
  }

  return (
    <Card>
      <h2 className="mb-4 text-sm font-medium text-velora-muted">Reparto de usuarios por tier</h2>
      {isLoading || !data ? (
        <Skeleton className="h-[250px] w-full" />
      ) : (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.shares}
                dataKey="pct"
                nameKey="tier"
                cx="38%"
                cy="50%"
                outerRadius={82}
                isAnimationActive={false}
                label={({ percent }) => `${Math.round((percent ?? 0) * 100)}%`}
              >
                {data.shares.map((share) => (
                  <Cell key={share.tier} fill={TIER_COLORS[share.tier]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value, name) => [
                  `${Number(value)}%`,
                  TIER_LABEL[name as UserTier] ?? String(name),
                ]}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                wrapperStyle={{ fontSize: 12 }}
                formatter={(value) => TIER_LABEL[value as UserTier] ?? String(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
