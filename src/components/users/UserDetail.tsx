import { useState } from 'react'
import { ArrowUpCircle, Ban, Pencil, Trash2 } from 'lucide-react'
import type { AdminUser, UserTier } from '@/types'
import { StatusBadge, TierBadge } from '@components/common/Badge'
import { Button } from '@components/common/Button'
import { ConfirmDialog } from '@components/common/ConfirmDialog'
import { Modal } from '@components/common/Modal'
import { Skeleton } from '@components/common/Skeleton'
import { useToast } from '@components/common/Toast'
import { useUserMutations, useUserQuery } from '@hooks/useUsers'
import { formatDate, formatNumber } from '@lib/utils/format'
import { cn } from '@lib/utils/helpers'

type Tab = 'profile' | 'activities' | 'stats'
const TABS: { id: Tab; label: string }[] = [
  { id: 'profile', label: 'Perfil' },
  { id: 'activities', label: 'Actividades' },
  { id: 'stats', label: 'Stats' },
]

const NEXT_TIER: Record<UserTier, UserTier> = {
  FREE: 'PREMIUM',
  PREMIUM: 'PRO_COACHING',
  PRO_COACHING: 'PRO_COACHING',
}

interface UserDetailProps {
  userId: string | null
  onClose: () => void
  onEdit: (user: AdminUser) => void
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4 py-2 text-sm">
    <span className="text-velora-muted">{label}</span>
    <span className="text-right text-velora-text">{value}</span>
  </div>
)

export const UserDetail = ({ userId, onClose, onEdit }: UserDetailProps) => {
  const { data: user, isLoading, isError } = useUserQuery(userId)
  const { update, remove } = useUserMutations()
  const toast = useToast()
  const [tab, setTab] = useState<Tab>('profile')
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <Modal open={userId !== null} onClose={onClose} title="Detalle de usuario" size="lg">
      {isLoading && <Skeleton className="h-56 w-full" />}
      {isError && <p className="text-sm text-velora-danger">No se pudo cargar el usuario.</p>}

      {user && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-velora-text">{user.name}</p>
              <p className="text-sm text-velora-muted">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <TierBadge tier={user.tier} />
              <StatusBadge status={user.status} />
            </div>
          </div>

          <div className="flex gap-1 border-b border-velora-border">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  '-mb-px border-b-2 px-3 py-2 text-sm transition-colors',
                  tab === item.id
                    ? 'border-velora-primary text-velora-primary'
                    : 'border-transparent text-velora-muted hover:text-velora-text',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === 'profile' && (
            <div className="divide-y divide-velora-border">
              <Row label="ID" value={user.id} />
              <Row label="Nombre" value={user.name} />
              <Row label="Email" value={user.email} />
              <Row label="Rol" value={user.role} />
              <Row label="Creado" value={formatDate(user.createdAt)} />
            </div>
          )}

          {tab === 'activities' && (
            <p className="py-4 text-sm text-velora-muted">
              {formatNumber(user.activities ?? 0)} actividades registradas. El detalle llega en una
              fase próxima.
            </p>
          )}

          {tab === 'stats' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-velora-border bg-velora-surface-2 p-4">
                <p className="text-xs text-velora-muted">Seguidores</p>
                <p className="mt-1 text-lg font-semibold text-velora-text">
                  {formatNumber(user.followers ?? 0)}
                </p>
              </div>
              <div className="rounded-lg border border-velora-border bg-velora-surface-2 p-4">
                <p className="text-xs text-velora-muted">Actividades</p>
                <p className="mt-1 text-lg font-semibold text-velora-text">
                  {formatNumber(user.activities ?? 0)}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 border-t border-velora-border pt-4">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Pencil className="size-3.5" />}
              onClick={() => onEdit(user)}
            >
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Ban className="size-3.5" />}
              disabled={user.status === 'SUSPENDED' || update.isPending}
              onClick={() =>
                update.mutate(
                  { id: user.id, values: { status: 'SUSPENDED' } },
                  { onSuccess: () => toast.success('Usuario suspendido.') },
                )
              }
            >
              Suspender
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ArrowUpCircle className="size-3.5" />}
              disabled={user.tier === 'PRO_COACHING' || update.isPending}
              onClick={() =>
                update.mutate(
                  { id: user.id, values: { tier: NEXT_TIER[user.tier] } },
                  { onSuccess: () => toast.success('Tier actualizado.') },
                )
              }
            >
              Subir tier
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-velora-danger hover:border-velora-danger hover:text-velora-danger"
              leftIcon={<Trash2 className="size-3.5" />}
              onClick={() => setConfirmDelete(true)}
            >
              Eliminar
            </Button>
          </div>

          <ConfirmDialog
            open={confirmDelete}
            title="Eliminar usuario"
            message={`¿Eliminar a ${user.name}? Esta acción es irreversible.`}
            confirmLabel="Eliminar"
            danger
            loading={remove.isPending}
            onConfirm={() =>
              remove.mutate(user.id, {
                onSuccess: () => {
                  toast.success('Usuario eliminado.')
                  setConfirmDelete(false)
                  onClose()
                },
              })
            }
            onClose={() => setConfirmDelete(false)}
          />
        </div>
      )}
    </Modal>
  )
}
