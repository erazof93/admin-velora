import type { UseQueryResult } from '@tanstack/react-query'
import type { SystemHealth } from '@/types'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { formatDuration, formatRelativeTime } from '@lib/utils/format'
import { cn } from '@lib/utils/helpers'

interface DbStatusProps {
  query: UseQueryResult<SystemHealth, Error>
}

export const DbStatus = ({ query }: DbStatusProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return (
      <ErrorState
        message="No se pudo obtener el estado del sistema."
        onRetry={() => void refetch()}
      />
    )
  }
  if (isLoading || !data) return <Skeleton className="h-40 w-full" />

  const up = data.database === 'up'

  return (
    <div
      className={cn(
        'rounded-xl border p-6',
        up
          ? 'border-velora-success/30 bg-velora-success/10'
          : 'border-velora-danger/40 bg-velora-danger/10',
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-velora-muted">Estado de la base de datos</p>
          <p
            className={cn(
              'mt-1 flex items-center gap-2.5 text-2xl font-semibold',
              up ? 'text-velora-success' : 'text-velora-danger',
            )}
          >
            <span
              className={cn(
                'inline-block size-3 rounded-full',
                up ? 'bg-velora-success' : 'animate-velora-pulse bg-velora-danger',
              )}
            />
            {up ? 'CONECTADA' : 'CAÍDA'}
          </p>
        </div>

        <div className="text-right text-sm">
          {data.startedAt && (
            <span className="inline-block rounded-full bg-velora-surface-2 px-3 py-1 text-velora-text">
              {formatDuration(data.startedAt)} de uptime
            </span>
          )}
          <p className="mt-2 text-velora-muted">
            Última verificación: {formatRelativeTime(data.checkedAt)}
          </p>
        </div>
      </div>
    </div>
  )
}
