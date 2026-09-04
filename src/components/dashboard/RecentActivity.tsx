import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { useRecentActivityQuery } from '@hooks/useDashboard'

const SKELETON_ROWS = ['1', '2', '3', '4', '5']

const timeShort = (iso: string) =>
  new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })

export const RecentActivity = () => {
  const { data, isLoading, isError, refetch } = useRecentActivityQuery()

  if (isError) {
    return (
      <ErrorState
        message="No se pudo cargar la actividad reciente."
        onRetry={() => void refetch()}
      />
    )
  }

  return (
    <Card>
      <h2 className="mb-4 text-sm font-medium text-velora-muted">Actividad reciente</h2>
      {isLoading ? (
        <div className="space-y-2">
          {SKELETON_ROWS.map((row) => (
            <Skeleton key={row} className="h-9 w-full" />
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-velora-border">
          {data?.slice(0, 5).map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <span className="min-w-0">
                <span className="block truncate text-velora-text">{item.athlete}</span>
                <span className="block truncate text-xs text-velora-muted">{item.type}</span>
              </span>
              <span className="shrink-0 text-xs text-velora-muted">{timeShort(item.at)}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
