import type { UseQueryResult } from '@tanstack/react-query'
import type { ModerationAction, ModerationHistoryEntry } from '@/types/moderation'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { formatRelativeTime } from '@lib/utils/format'
import { cn } from '@lib/utils/helpers'

interface HistoryProps {
  query: UseQueryResult<ModerationHistoryEntry[], Error>
}

const ACTION_META: Record<ModerationAction, { label: string; tone: string }> = {
  approve: { label: 'Aprobado', tone: 'text-velora-success' },
  reject: { label: 'Rechazado', tone: 'text-velora-warning' },
  delete: { label: 'Eliminado', tone: 'text-velora-danger' },
  ban: { label: 'Baneado', tone: 'text-velora-danger' },
}

export const History = ({ query }: HistoryProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return <ErrorState message="No se pudo cargar el historial." onRetry={() => void refetch()} />
  }

  const rows = data
    ? [...data].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    : []

  return (
    <Card>
      <h2 className="mb-4 text-sm font-medium text-velora-muted">Historial de moderación</h2>
      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-velora-border text-xs uppercase text-velora-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Cuándo</th>
                <th className="px-3 py-2 font-medium">Acción</th>
                <th className="px-3 py-2 font-medium">Admin</th>
                <th className="px-3 py-2 font-medium">Objetivo</th>
                <th className="px-3 py-2 font-medium">Razón</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-velora-border/60 transition-colors last:border-0"
                >
                  <td className="whitespace-nowrap px-3 py-2.5 text-velora-muted">
                    {formatRelativeTime(entry.at)}
                  </td>
                  <td className={cn('px-3 py-2.5 font-medium', ACTION_META[entry.action].tone)}>
                    {ACTION_META[entry.action].label}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-velora-text">{entry.admin}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-velora-text">{entry.target}</td>
                  <td className="px-3 py-2.5 text-velora-muted">{entry.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
