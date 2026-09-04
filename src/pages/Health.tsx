import { RefreshCw } from 'lucide-react'
import { Alert } from '@components/common/Alert'
import { Button } from '@components/common/Button'
import { ErrorBoundary } from '@components/common/ErrorBoundary'
import { RefreshCountdown } from '@components/common/RefreshCountdown'
import {
  DbStatus,
  ErrorRateChart,
  Metrics,
  ResponseTimeChart,
  UptimeWidget,
} from '@components/health'
import { useHealth } from '@hooks/useHealth'
import { formatRelativeTime } from '@lib/utils/format'

export default function Health() {
  const { status, metrics, errors, uptime, refetchAll, isDbDown, lastCheck } = useHealth()

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-velora-text">System Health</h1>
        <div className="flex items-center gap-3 text-sm text-velora-muted">
          <RefreshCountdown key={status.dataUpdatedAt} seconds={30} />
          <Button
            variant="outline"
            size="sm"
            onClick={refetchAll}
            leftIcon={<RefreshCw className="size-3.5" />}
          >
            Refrescar
          </Button>
        </div>
      </header>

      {isDbDown && (
        <Alert type="error" title="Base de datos caída">
          El servicio puede estar degradado. Revisa el estado del backend.
        </Alert>
      )}

      <ErrorBoundary>
        <DbStatus query={status} />
      </ErrorBoundary>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ErrorBoundary>
            <ResponseTimeChart query={metrics} />
          </ErrorBoundary>
        </div>
        <ErrorBoundary>
          <UptimeWidget query={uptime} />
        </ErrorBoundary>
      </div>

      <ErrorBoundary>
        <ErrorRateChart query={errors} />
      </ErrorBoundary>

      <ErrorBoundary>
        <Metrics query={metrics} />
      </ErrorBoundary>

      <p className="text-xs text-velora-muted">
        Última verificación: {lastCheck ? formatRelativeTime(lastCheck) : '—'}
      </p>
    </div>
  )
}
