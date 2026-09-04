import { Link } from 'react-router-dom'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { ROUTES } from '@constants/routes'
import { useTopCoachesQuery } from '@hooks/useDashboard'
import { formatCurrency } from '@lib/utils/format'

const SKELETON_ROWS = ['1', '2', '3', '4', '5']

export const TopCoaches = () => {
  const { data, isLoading, isError, refetch } = useTopCoachesQuery()

  if (isError) {
    return (
      <ErrorState message="No se pudieron cargar los coaches." onRetry={() => void refetch()} />
    )
  }

  return (
    <Card>
      <h2 className="mb-4 text-sm font-medium text-velora-muted">Top coaches</h2>
      {isLoading ? (
        <div className="space-y-2">
          {SKELETON_ROWS.map((row) => (
            <Skeleton key={row} className="h-9 w-full" />
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-velora-border">
          {data?.slice(0, 5).map((coach) => (
            <li key={coach.id}>
              <Link
                to={ROUTES.USERS}
                className="flex items-center gap-3 py-2.5 text-sm transition-colors hover:text-velora-primary"
              >
                <span className="w-4 text-velora-muted">{coach.rank}</span>
                <span className="flex-1 truncate text-velora-text">{coach.name}</span>
                <span className="text-velora-text">{formatCurrency(coach.revenue)}</span>
                <span className="w-14 text-right text-xs text-velora-muted">
                  {coach.athletes} atl.
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
