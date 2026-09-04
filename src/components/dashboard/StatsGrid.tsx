import type { LucideIcon } from 'lucide-react'
import { Award, DollarSign, Star, Users } from 'lucide-react'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { useStatsQuery } from '@hooks/useDashboard'
import { formatCurrency, formatNumber } from '@lib/utils/format'

interface StatDef {
  label: string
  value: string
  icon: LucideIcon
}

export const StatsGrid = () => {
  const { data, isLoading, isError, refetch } = useStatsQuery()

  if (isError) {
    return (
      <ErrorState message="No se pudieron cargar las métricas." onRetry={() => void refetch()} />
    )
  }

  const stats: StatDef[] = [
    { label: 'Usuarios', value: data ? formatNumber(data.totalUsers) : '—', icon: Users },
    { label: 'Coaches', value: data ? formatNumber(data.totalCoaches) : '—', icon: Award },
    { label: 'Premium', value: data ? formatNumber(data.premiumUsers) : '—', icon: Star },
    { label: 'MRR', value: data ? formatCurrency(data.mrr) : '—', icon: DollarSign },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) =>
        isLoading ? (
          <Skeleton key={label} className="h-[92px]" />
        ) : (
          <Card key={label} className="flex items-center gap-4 p-5">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-velora-primary/15 text-velora-primary">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-velora-muted">{label}</p>
              <p className="truncate text-xl font-semibold text-velora-text">{value}</p>
            </div>
          </Card>
        ),
      )}
    </div>
  )
}
