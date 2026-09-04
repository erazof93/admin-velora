import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { useHealthQuery } from '@hooks/useDashboard'
import { useDashboardStore } from '@store/dashboardStore'
import { formatPercent } from '@lib/utils/format'
import { cn } from '@lib/utils/helpers'

export const HealthStatus = () => {
  const { data, isLoading, isError, refetch, isFetching } = useHealthQuery()
  const autoRefresh = useDashboardStore((s) => s.autoRefresh)
  const toggleAutoRefresh = useDashboardStore((s) => s.toggleAutoRefresh)
  const lastRefresh = useDashboardStore((s) => s.lastRefresh)

  if (isError) {
    return (
      <ErrorState
        message="No se pudo obtener el estado del sistema."
        onRetry={() => void refetch()}
      />
    )
  }

  const dbUp = data?.database === 'up'

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-velora-muted">
          Estado del sistema{isFetching ? ' · actualizando…' : ''}
        </h2>
        <button
          type="button"
          onClick={toggleAutoRefresh}
          className={cn(
            'rounded-full px-2 py-0.5 text-xs transition-colors',
            autoRefresh
              ? 'bg-velora-success/15 text-velora-success'
              : 'bg-velora-surface-2 text-velora-muted',
          )}
        >
          Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
        </button>
      </div>

      {isLoading ? (
        <Skeleton className="h-32 w-full" />
      ) : (
        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <span className="text-sm text-velora-muted">Base de datos</span>
            <span className="inline-flex items-center gap-2 text-sm text-velora-text">
              <span
                className={cn(
                  'size-2.5 rounded-full',
                  dbUp ? 'bg-velora-success' : 'bg-velora-danger',
                )}
              />
              {dbUp ? 'Conectada' : 'Caída'}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-velora-muted">Uptime</span>
            <span className="rounded-full bg-velora-success/15 px-2 py-0.5 text-xs text-velora-success">
              {formatPercent(data?.uptimePct ?? 0, 2)}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-velora-muted">Respuesta (p50)</span>
            <span className="text-sm text-velora-text">{data?.latencyMs.p50 ?? '—'} ms</span>
          </li>
        </ul>
      )}

      {lastRefresh && (
        <p className="mt-4 text-xs text-velora-muted">
          Actualizado: {new Date(lastRefresh).toLocaleTimeString('es-ES')}
        </p>
      )}
    </Card>
  )
}
