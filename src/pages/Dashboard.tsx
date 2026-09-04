import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@components/common/ErrorBoundary'
import { Skeleton } from '@components/common/Skeleton'
import { HealthStatus, RecentActivity, StatsGrid, TopCoaches } from '@components/dashboard'
import { useAuth } from '@hooks/useAuth'

// Recharts es pesado → se carga en su propio chunk, después del shell.
const RevenueChart = lazy(() =>
  import('@components/dashboard/RevenueChart').then((m) => ({ default: m.RevenueChart })),
)
const ActivityChart = lazy(() =>
  import('@components/dashboard/ActivityChart').then((m) => ({ default: m.ActivityChart })),
)

const ChartFallback = () => <Skeleton className="h-[344px] w-full" />

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-velora-text">
          Bienvenido{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="mt-1 text-velora-muted">Panel administrativo de Velora — resumen general.</p>
      </header>

      <ErrorBoundary>
        <StatsGrid />
      </ErrorBoundary>

      <div className="grid gap-4 lg:grid-cols-2">
        <ErrorBoundary>
          <Suspense fallback={<ChartFallback />}>
            <RevenueChart />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <HealthStatus />
        </ErrorBoundary>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<ChartFallback />}>
          <ActivityChart />
        </Suspense>
      </ErrorBoundary>

      <div className="grid gap-4 lg:grid-cols-2">
        <ErrorBoundary>
          <TopCoaches />
        </ErrorBoundary>
        <ErrorBoundary>
          <RecentActivity />
        </ErrorBoundary>
      </div>
    </div>
  )
}
