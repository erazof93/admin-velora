import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { CoachApplication } from '@/types/coaches'
import {
  Badge,
  Button,
  Card,
  ConfirmDialog,
  ErrorState,
  Select,
  Skeleton,
  useToast,
} from '@components/common'
import { useCoachApplications } from '@hooks/useCoachApplications'

type Filter = 'pending' | 'all' | 'approved' | 'rejected'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'pending', label: 'Pendientes' },
  { value: 'all', label: 'Todas' },
  { value: 'approved', label: 'Aprobadas' },
  { value: 'rejected', label: 'Rechazadas' },
]

const STATUS_BADGE = {
  pending: { variant: 'warning' as const, label: 'Pendiente' },
  approved: { variant: 'success' as const, label: 'Aprobada' },
  rejected: { variant: 'danger' as const, label: 'Rechazada' },
}

export default function Coaches() {
  const toast = useToast()
  const [filter, setFilter] = useState<Filter>('pending')
  const { list, approve, reject } = useCoachApplications(
    filter === 'all' ? undefined : filter,
  )
  const [confirm, setConfirm] = useState<{
    app: CoachApplication
    action: 'approve' | 'reject'
  } | null>(null)

  const busy = approve.isPending || reject.isPending

  const run = () => {
    if (!confirm) return
    const { app, action } = confirm
    const mutation = action === 'approve' ? approve : reject
    mutation.mutate(
      { id: app.id },
      {
        onSuccess: () => {
          toast.success(
            action === 'approve'
              ? `${app.name} ahora es coach.`
              : 'Solicitud rechazada.',
          )
          setConfirm(null)
        },
        onError: () => toast.error('No se pudo completar la acción.'),
      },
    )
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-velora-text">
          Solicitudes de Coach
        </h1>
        <div className="w-44">
          <Select
            aria-label="Filtrar solicitudes"
            options={FILTERS}
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
          />
        </div>
      </header>

      {list.isLoading && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      )}

      {list.isError && (
        <ErrorState
          message="No se pudieron cargar las solicitudes."
          onRetry={() => void list.refetch()}
        />
      )}

      {list.isSuccess && list.data.length === 0 && (
        <Card className="text-center text-sm text-velora-muted">
          No hay solicitudes en este filtro.
        </Card>
      )}

      {list.isSuccess &&
        list.data.map((app) => {
          const badge = STATUS_BADGE[app.status]
          return (
            <Card key={app.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-velora-text">
                      {app.name}
                    </h2>
                    <Badge variant={badge.variant} size="sm">
                      {badge.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-velora-muted">
                    {app.email} · {app.phone}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm text-velora-text">
                    {app.experience}
                  </p>
                  {app.bio && (
                    <p className="text-xs text-velora-muted">Bio: {app.bio}</p>
                  )}
                  {app.reviewNote && (
                    <p className="text-xs text-velora-muted">
                      Nota de revisión: {app.reviewNote}
                    </p>
                  )}
                  <p className="text-xs text-velora-muted">
                    Enviada el{' '}
                    {new Date(app.createdAt).toLocaleDateString('es-ES')}
                  </p>
                </div>

                {app.status === 'pending' && (
                  <div className="flex shrink-0 gap-2">
                    <Button
                      size="sm"
                      variant="success"
                      leftIcon={<CheckCircle2 className="size-4" />}
                      disabled={busy}
                      onClick={() => setConfirm({ app, action: 'approve' })}
                    >
                      Aprobar
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      leftIcon={<XCircle className="size-4" />}
                      disabled={busy}
                      onClick={() => setConfirm({ app, action: 'reject' })}
                    >
                      Rechazar
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )
        })}

      <ConfirmDialog
        open={confirm !== null}
        title={
          confirm?.action === 'approve'
            ? 'Aprobar solicitud'
            : 'Rechazar solicitud'
        }
        message={
          confirm
            ? confirm.action === 'approve'
              ? `Se creará el perfil de coach de ${confirm.app.name} y su rol pasará a COACH.`
              : `Se rechazará la solicitud de ${confirm.app.name}. Podrá volver a enviarla.`
            : ''
        }
        confirmLabel={confirm?.action === 'approve' ? 'Aprobar' : 'Rechazar'}
        danger={confirm?.action === 'reject'}
        loading={busy}
        onConfirm={run}
        onClose={() => setConfirm(null)}
      />
    </div>
  )
}
