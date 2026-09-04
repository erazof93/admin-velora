import { useCallback, useState } from 'react'
import type { RowSelectionState } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import type { AdminUser } from '@/types'
import { Button } from '@components/common/Button'
import { ConfirmDialog } from '@components/common/ConfirmDialog'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { useToast } from '@components/common/Toast'
import { useUserMutations, useUsersQuery } from '@hooks/useUsers'
import { useFiltersStore } from '@store/filtersStore'
import { BulkActions } from './BulkActions'
import { UserDetail } from './UserDetail'
import { UserFilters } from './UserFilters'
import { UserForm } from './UserForm'
import { UserTable } from './UserTable'

// undefined = formulario cerrado · null = crear · AdminUser = editar
type FormTarget = AdminUser | null | undefined

const EMPTY_ROWS: AdminUser[] = []

export const UsersList = () => {
  const search = useFiltersStore((s) => s.search)
  const tier = useFiltersStore((s) => s.tier)
  const status = useFiltersStore((s) => s.status)

  const { data, isLoading, isError, refetch } = useUsersQuery({ search, tier, status })
  const { remove } = useUserMutations()
  const toast = useToast()

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [detailId, setDetailId] = useState<string | null>(null)
  const [formTarget, setFormTarget] = useState<FormTarget>(undefined)
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null)

  const selectedIds = Object.keys(rowSelection)
  const clearSelection = useCallback(() => setRowSelection({}), [])

  // Estables para que `columns` (useMemo) de UserTable no se rehaga en cada render.
  const handleView = useCallback((user: AdminUser) => setDetailId(user.id), [])
  const handleEdit = useCallback((user: AdminUser) => setFormTarget(user), [])
  const handleDelete = useCallback((user: AdminUser) => setDeleteTarget(user), [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-velora-text">Usuarios</h1>
        <Button leftIcon={<Plus className="size-4" />} onClick={() => setFormTarget(null)}>
          Crear usuario
        </Button>
      </div>

      <UserFilters onChange={clearSelection} />

      {selectedIds.length > 0 && <BulkActions selectedIds={selectedIds} onDone={clearSelection} />}

      {isError ? (
        <ErrorState message="No se pudieron cargar los usuarios." onRetry={() => void refetch()} />
      ) : isLoading ? (
        <Skeleton className="h-80 w-full" />
      ) : (
        <UserTable
          data={data ?? EMPTY_ROWS}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <UserDetail
        userId={detailId}
        onClose={() => setDetailId(null)}
        onEdit={(user) => {
          setDetailId(null)
          setFormTarget(user)
        }}
      />

      <UserForm
        key={formTarget === undefined ? 'closed' : (formTarget?.id ?? 'create')}
        open={formTarget !== undefined}
        user={formTarget ?? null}
        onClose={() => setFormTarget(undefined)}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Eliminar usuario"
        message={
          deleteTarget ? `¿Eliminar a ${deleteTarget.name}? Esta acción es irreversible.` : ''
        }
        confirmLabel="Eliminar"
        danger
        loading={remove.isPending}
        onConfirm={() => {
          if (!deleteTarget) return
          remove.mutate(deleteTarget.id, {
            onSuccess: () => {
              toast.success('Usuario eliminado.')
              setDeleteTarget(null)
            },
          })
        }}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  )
}
