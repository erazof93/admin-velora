import { useState } from 'react'
import { ArrowUpCircle, Ban, Trash2 } from 'lucide-react'
import type { BulkAction } from '@/types/users'
import { Button } from '@components/common/Button'
import { ConfirmDialog } from '@components/common/ConfirmDialog'
import { useToast } from '@components/common/Toast'
import { useUserMutations } from '@hooks/useUsers'

interface BulkActionsProps {
  selectedIds: string[]
  onDone: () => void
}

const CONFIG: Record<
  BulkAction,
  { label: string; message: (n: number) => string; danger?: boolean }
> = {
  ban: { label: 'Suspender', message: (n) => `¿Suspender ${n} usuario(s)?` },
  promote: {
    label: 'Promover',
    message: (n) => `¿Promover ${n} usuario(s) a PREMIUM?`,
  },
  delete: {
    label: 'Eliminar',
    message: (n) => `¿Eliminar ${n} usuario(s)? Esta acción es irreversible.`,
    danger: true,
  },
}

export const BulkActions = ({ selectedIds, onDone }: BulkActionsProps) => {
  const { bulk } = useUserMutations()
  const toast = useToast()
  const [pending, setPending] = useState<BulkAction | null>(null)

  const run = () => {
    if (!pending) return
    const label = CONFIG[pending].label
    bulk.mutate(
      { ids: selectedIds, action: pending },
      {
        onSuccess: () => {
          toast.success(`${label}: ${selectedIds.length} usuario(s).`)
          setPending(null)
          onDone()
        },
      },
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-lg border border-velora-border bg-velora-surface-2 px-3 py-2 text-sm">
      <span className="mr-2 text-velora-muted">{selectedIds.length} seleccionado(s)</span>
      <Button
        variant="ghost"
        size="sm"
        leftIcon={<Ban className="size-3.5" />}
        onClick={() => setPending('ban')}
      >
        Suspender
      </Button>
      <Button
        variant="ghost"
        size="sm"
        leftIcon={<ArrowUpCircle className="size-3.5" />}
        onClick={() => setPending('promote')}
      >
        Promover
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="text-velora-danger hover:text-velora-danger"
        leftIcon={<Trash2 className="size-3.5" />}
        onClick={() => setPending('delete')}
      >
        Eliminar
      </Button>

      <ConfirmDialog
        open={pending !== null}
        title="Acción masiva"
        message={pending ? CONFIG[pending].message(selectedIds.length) : ''}
        confirmLabel={pending ? CONFIG[pending].label : 'Confirmar'}
        danger={pending ? CONFIG[pending].danger === true : false}
        loading={bulk.isPending}
        onConfirm={run}
        onClose={() => setPending(null)}
      />
    </div>
  )
}
