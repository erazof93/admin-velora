import { AlertCircle, RotateCw } from 'lucide-react'
import { Card } from './Card'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export const ErrorState = ({ message = 'Algo salió mal.', onRetry }: ErrorStateProps) => (
  <Card className="flex flex-col items-center gap-3 text-center">
    <AlertCircle className="size-6 text-velora-danger" />
    <p className="text-sm text-velora-muted">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg border border-velora-border px-3 py-1.5 text-sm text-velora-text transition-colors hover:border-velora-primary hover:text-velora-primary"
      >
        <RotateCw className="size-4" />
        Reintentar
      </button>
    )}
  </Card>
)
