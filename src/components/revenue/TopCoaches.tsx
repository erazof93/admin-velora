import type { UseQueryResult } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import type { RevenueCoach } from '@/types/revenue'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { ROUTES } from '@constants/routes'
import { formatCurrency, formatNumber } from '@lib/utils/format'

interface TopCoachesProps {
  query: UseQueryResult<RevenueCoach[], Error>
}

export const TopCoaches = ({ query }: TopCoachesProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return (
      <ErrorState message="No se pudieron cargar los coaches." onRetry={() => void refetch()} />
    )
  }

  const rows = data ? [...data].sort((a, b) => b.mrr - a.mrr) : []

  return (
    <Card>
      <h2 className="mb-4 text-sm font-medium text-velora-muted">Top 10 coaches por MRR</h2>
      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-velora-border text-xs uppercase text-velora-muted">
              <tr>
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Coach</th>
                <th className="px-3 py-2 text-right font-medium">MRR</th>
                <th className="px-3 py-2 text-right font-medium">Atletas</th>
                <th className="px-3 py-2 text-right font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((coach) => (
                <tr
                  key={coach.id}
                  className="border-b border-velora-border/60 transition-colors last:border-0 hover:bg-velora-surface-2/50"
                >
                  <td className="px-3 py-2.5 text-velora-muted">{coach.rank}</td>
                  <td className="px-3 py-2.5">
                    <Link
                      to={`${ROUTES.USERS}?coach=${coach.id}`}
                      className="text-velora-text transition-colors hover:text-velora-primary"
                    >
                      {coach.name}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-right text-velora-text">
                    {formatCurrency(coach.mrr)}
                  </td>
                  <td className="px-3 py-2.5 text-right text-velora-muted">
                    {formatNumber(coach.athletes)}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="inline-flex items-center gap-1 text-velora-text">
                      {coach.rating.toFixed(1)}
                      <Star className="size-3.5 fill-velora-warning text-velora-warning" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
