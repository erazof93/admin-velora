import { useState } from 'react'
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import type { ModerationStats } from '@/types/moderation'
import { Button } from '@components/common/Button'
import { Card } from '@components/common/Card'
import { ConfirmDialog } from '@components/common/ConfirmDialog'
import { Skeleton } from '@components/common/Skeleton'
import { useToast } from '@components/common/Toast'
import { formatNumber } from '@lib/utils/format'

interface ModerationActionsProps {
  statsQuery: UseQueryResult<ModerationStats, Error>
  bulk: UseMutationResult<void, Error, 'approve' | 'reject'>
}

export const ModerationActions = ({ statsQuery, bulk }: ModerationActionsProps) => {
  const { data, isLoading } = statsQuery
  const toast = useToast()
  const [pending, setPending] = useState<'approve' | 'reject' | null>(null)

  const run = () => {
    if (!pending) return
    const verb = pending === 'approve' ? 'aprobados' : 'rechazados'
    bulk.mutate(pending, {
      onSuccess: () => {
        toast.success(`Comentarios pendientes ${verb}.`)
        setPending(null)
      },
    })
  }

  return (
    <Card className="w-full max-w-md space-y-4">
      <h2 className="text-sm font-medium text-velora-muted">Acciones rápidas</h2>

      {isLoading || !data ? (
        <Skeleton className="h-20 w-full" />
      ) : (
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-semibold text-velora-text">
              {formatNumber(data.reportedToday)}
            </p>
            <p className="text-xs text-velora-muted">Reportados hoy</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-velora-success">
              {formatNumber(data.resolved)}
            </p>
            <p className="text-xs text-velora-muted">Resueltos</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-velora-danger">{formatNumber(data.pending)}</p>
            <p className="text-xs text-velora-muted">Pendientes</p>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          variant="success"
          size="sm"
          onClick={() => setPending('approve')}
          disabled={data?.pending === 0}
        >
          Aprobar todo
        </Button>
        <Button
          variant="warning"
          size="sm"
          onClick={() => setPending('reject')}
          disabled={data?.pending === 0}
        >
          Rechazar todo
        </Button>
      </div>

      <ConfirmDialog
        open={pending !== null}
        title={pending === 'approve' ? 'Aprobar todo' : 'Rechazar todo'}
        message={
          pending
            ? `¿${pending === 'approve' ? 'Aprobar' : 'Rechazar'} los ${data?.pending ?? 0} comentarios pendientes?`
            : ''
        }
        confirmLabel={pending === 'approve' ? 'Aprobar todo' : 'Rechazar todo'}
        danger={pending === 'reject'}
        loading={bulk.isPending}
        onConfirm={run}
        onClose={() => setPending(null)}
      />
    </Card>
  )
}
