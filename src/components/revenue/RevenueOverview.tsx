import type { UseQueryResult } from '@tanstack/react-query'
import type { RevenueBundle } from '@/types/revenue'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { formatCurrency, formatNumber } from '@lib/utils/format'
import { cn } from '@lib/utils/helpers'

interface RevenueOverviewProps {
  query: UseQueryResult<RevenueBundle, Error>
}

export const RevenueOverview = ({ query }: RevenueOverviewProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return <ErrorState message="No se pudo cargar el revenue." onRetry={() => void refetch()} />
  }

  const summary = data?.summary
  const cards = [
    {
      label: 'MRR Total',
      value: summary ? formatCurrency(summary.mrr) : '—',
      tone: 'text-velora-success',
    },
    {
      label: 'Crecimiento',
      value: summary ? `+${summary.growthPct.toFixed(1)}%` : '—',
      tone: 'text-velora-warning',
    },
    {
      label: 'Suscripciones activas',
      value: summary ? formatNumber(summary.activeSubscriptions) : '—',
      tone: 'text-velora-primary',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) =>
        isLoading ? (
          <Skeleton key={card.label} className="h-24" />
        ) : (
          <Card key={card.label}>
            <p className="text-sm text-velora-muted">{card.label}</p>
            <p className={cn('mt-2 text-2xl font-semibold', card.tone)}>{card.value}</p>
          </Card>
        ),
      )}
    </div>
  )
}
