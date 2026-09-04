import type { UseQueryResult } from '@tanstack/react-query'
import type { LucideIcon } from 'lucide-react'
import { Ban, Check, Flag, X } from 'lucide-react'
import type { ModerationStats } from '@/types/moderation'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { formatNumber } from '@lib/utils/format'
import { cn } from '@lib/utils/helpers'

interface StatsProps {
  query: UseQueryResult<ModerationStats, Error>
}

interface Item {
  label: string
  value: number
  icon: LucideIcon
  tone: string
}

export const Stats = ({ query }: StatsProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return <ErrorState message="No se pudieron cargar las stats." onRetry={() => void refetch()} />
  }

  const items: Item[] = [
    { label: 'Reportados', value: data?.reported ?? 0, icon: Flag, tone: 'text-velora-text' },
    { label: 'Aprobados', value: data?.approved ?? 0, icon: Check, tone: 'text-velora-success' },
    { label: 'Rechazados', value: data?.rejected ?? 0, icon: X, tone: 'text-velora-warning' },
    { label: 'Baneados', value: data?.banned ?? 0, icon: Ban, tone: 'text-velora-danger' },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map(({ label, value, icon: Icon, tone }) =>
        isLoading ? (
          <Skeleton key={label} className="h-24" />
        ) : (
          <Card key={label} className="flex items-center gap-4 p-5">
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-velora-surface-2">
              <Icon className={cn('size-5', tone)} />
            </span>
            <div>
              <p className="text-sm text-velora-muted">{label}</p>
              <p className={cn('text-xl font-semibold', tone)}>{formatNumber(value)}</p>
            </div>
          </Card>
        ),
      )}
    </div>
  )
}
