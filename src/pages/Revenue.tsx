import { ErrorBoundary } from '@components/common/ErrorBoundary'
import {
  ChurnAnalysis,
  ExportButton,
  MRRCalculator,
  RevenueOverview,
  TierBreakdown,
  TieredChart,
  TopCoaches,
} from '@components/revenue'
import { useRevenue } from '@hooks/useRevenue'

export default function Revenue() {
  const { overview, coaches, churn } = useRevenue()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-velora-text">Revenue Tracking</h1>

      <ErrorBoundary>
        <RevenueOverview query={overview} />
      </ErrorBoundary>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ErrorBoundary>
            <TieredChart query={overview} />
          </ErrorBoundary>
        </div>
        <ErrorBoundary>
          <TierBreakdown query={overview} />
        </ErrorBoundary>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ErrorBoundary>
          <MRRCalculator query={overview} />
        </ErrorBoundary>
        <div className="lg:col-span-2">
          <ErrorBoundary>
            <ChurnAnalysis query={churn} />
          </ErrorBoundary>
        </div>
      </div>

      <ErrorBoundary>
        <TopCoaches query={coaches} />
      </ErrorBoundary>

      <div className="flex justify-end">
        <ExportButton bundle={overview.data} coaches={coaches.data} churn={churn.data} />
      </div>
    </div>
  )
}
