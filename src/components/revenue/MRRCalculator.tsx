import type { UseQueryResult } from '@tanstack/react-query'
import type { RevenueBundle } from '@/types/revenue'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { formatCurrency, formatNumber } from '@lib/utils/format'
import { cn } from '@lib/utils/helpers'
import { LEVEL_TEXT, churnLevel } from '@lib/utils/thresholds'

interface MRRCalculatorProps {
  query: UseQueryResult<RevenueBundle, Error>
}

export const MRRCalculator = ({ query }: MRRCalculatorProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return <ErrorState message="No se pudo calcular el MRR." onRetry={() => void refetch()} />
  }
  if (isLoading || !data) return <Skeleton className="h-72 w-full" />

  const b = data.breakdown
  const premiumTotal = Math.round(b.premiumCount * b.premiumPrice)
  const proTotal = b.proCount * b.proPrice

  return (
    <Card className="space-y-4">
      <h2 className="text-sm font-medium text-velora-muted">Cálculo de MRR</h2>

      <p className="rounded-lg bg-velora-surface-2 p-3 font-mono text-xs text-velora-text">
        ({formatNumber(b.premiumCount)} × {formatCurrency(b.premiumPrice)}) + (
        {formatNumber(b.proCount)} × {formatCurrency(b.proPrice)})
      </p>
      <p className="text-2xl font-semibold text-velora-success">= {formatCurrency(b.total)}</p>

      <ul className="space-y-2 text-sm">
        <li className="flex justify-between">
          <span className="text-velora-muted">Premium</span>
          <span className="text-velora-text">{formatCurrency(premiumTotal)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-velora-muted">Pro Coaching</span>
          <span className="text-velora-text">{formatCurrency(proTotal)}</span>
        </li>
        <li className="flex justify-between border-t border-velora-border pt-2">
          <span className="text-velora-muted">Churn rate</span>
          <span className={cn('font-medium', LEVEL_TEXT[churnLevel(b.churnRate)])}>
            {b.churnRate}%
          </span>
        </li>
        <li className="flex justify-between">
          <span className="text-velora-muted">Proyección 3 meses (+5%/mes)</span>
          <span className="text-velora-text">{formatCurrency(b.projection3m)}</span>
        </li>
      </ul>
    </Card>
  )
}
