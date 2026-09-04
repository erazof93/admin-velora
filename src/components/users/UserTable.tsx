import { useMemo, useState } from 'react'
import {
  type ColumnDef,
  type OnChangeFn,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, ChevronUp, ChevronsUpDown, Eye, Pencil, Trash2 } from 'lucide-react'
import type { AdminUser } from '@/types'
import { StatusBadge, TierBadge } from '@components/common/Badge'
import { Pagination } from '@components/common/Pagination'
import { formatDate } from '@lib/utils/format'
import { cn } from '@lib/utils/helpers'

interface UserTableProps {
  data: AdminUser[]
  rowSelection: RowSelectionState
  onRowSelectionChange: OnChangeFn<RowSelectionState>
  onView: (user: AdminUser) => void
  onEdit: (user: AdminUser) => void
  onDelete: (user: AdminUser) => void
}

const checkboxCls = 'size-4 cursor-pointer accent-velora-primary'
const iconBtnCls =
  'rounded-md p-1.5 text-velora-muted transition-colors hover:bg-velora-surface-2 hover:text-velora-text'

export const UserTable = ({
  data,
  rowSelection,
  onRowSelectionChange,
  onView,
  onEdit,
  onDelete,
}: UserTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        id: 'select',
        enableSorting: false,
        header: ({ table }) => (
          <input
            type="checkbox"
            className={checkboxCls}
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            aria-label="Seleccionar todos"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className={checkboxCls}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label={`Seleccionar ${row.original.name}`}
          />
        ),
      },
      { accessorKey: 'name', header: 'Nombre' },
      { accessorKey: 'email', header: 'Email' },
      {
        accessorKey: 'tier',
        header: 'Tier',
        cell: ({ row }) => <TierBadge tier={row.original.tier} />,
      },
      {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: 'createdAt',
        header: 'Creado',
        cell: ({ row }) => (
          <span className="text-velora-muted">{formatDate(row.original.createdAt)}</span>
        ),
      },
      {
        id: 'actions',
        enableSorting: false,
        header: () => <span className="sr-only">Acciones</span>,
        cell: ({ row }) => (
          <div className="flex justify-end gap-1">
            <button
              type="button"
              className={iconBtnCls}
              onClick={() => onView(row.original)}
              aria-label="Ver"
            >
              <Eye className="size-4" />
            </button>
            <button
              type="button"
              className={iconBtnCls}
              onClick={() => onEdit(row.original)}
              aria-label="Editar"
            >
              <Pencil className="size-4" />
            </button>
            <button
              type="button"
              className={cn(iconBtnCls, 'hover:text-velora-danger')}
              onClick={() => onDelete(row.original)}
              aria-label="Eliminar"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ),
      },
    ],
    [onView, onEdit, onDelete],
  )

  // oxlint-disable-next-line react/incompatible-library -- falso positivo: react-table v8 es un hook headless válido
  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange,
    getRowId: (row) => row.id,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  const { pageIndex } = table.getState().pagination
  const pageCount = table.getPageCount()

  return (
    <div className="rounded-xl border border-velora-border bg-velora-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-velora-border text-xs uppercase text-velora-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortable = header.column.getCanSort()
                  const sorted = header.column.getIsSorted()
                  return (
                    <th key={header.id} className="whitespace-nowrap px-4 py-3 font-medium">
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          disabled={!sortable}
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            'inline-flex items-center gap-1',
                            sortable && 'cursor-pointer hover:text-velora-text',
                          )}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sortable &&
                            (sorted === 'asc' ? (
                              <ChevronUp className="size-3.5" />
                            ) : sorted === 'desc' ? (
                              <ChevronDown className="size-3.5" />
                            ) : (
                              <ChevronsUpDown className="size-3.5 opacity-50" />
                            ))}
                        </button>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-velora-border/60 transition-colors last:border-0 hover:bg-velora-surface-2/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="whitespace-nowrap px-4 py-3 text-velora-text">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-velora-muted">
                  No hay usuarios que coincidan con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-velora-border px-4 py-3 text-sm text-velora-muted">
        <span>
          Página {pageCount === 0 ? 0 : pageIndex + 1} de {pageCount}
        </span>
        <Pagination
          currentPage={pageIndex + 1}
          totalPages={pageCount}
          onPageChange={(page) => table.setPageIndex(page - 1)}
        />
      </div>
    </div>
  )
}
