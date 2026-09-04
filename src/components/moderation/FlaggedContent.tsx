import type { UseQueryResult } from '@tanstack/react-query'
import { Eye, Trash2 } from 'lucide-react'
import type { FlaggedComment } from '@/types/moderation'
import { SeverityBadge } from '@components/common/Badge'
import { Card } from '@components/common/Card'
import { ErrorState } from '@components/common/ErrorState'
import { Skeleton } from '@components/common/Skeleton'
import { truncate } from '@lib/utils/helpers'

interface FlaggedContentProps {
  query: UseQueryResult<FlaggedComment[], Error>
  onReview: (comment: FlaggedComment) => void
  onDelete: (comment: FlaggedComment) => void
}

const iconBtn =
  'rounded-md p-1.5 text-velora-muted transition-colors hover:bg-velora-surface-2 hover:text-velora-text'

export const FlaggedContent = ({ query, onReview, onDelete }: FlaggedContentProps) => {
  const { data, isLoading, isError, refetch } = query

  if (isError) {
    return (
      <ErrorState
        message="No se pudo cargar el contenido reportado."
        onRetry={() => void refetch()}
      />
    )
  }

  return (
    <Card>
      <h2 className="mb-4 text-sm font-medium text-velora-muted">Contenido reportado</h2>
      {isLoading ? (
        <Skeleton className="h-72 w-full" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-velora-border text-xs uppercase text-velora-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Autor</th>
                <th className="px-3 py-2 font-medium">Comentario</th>
                <th className="px-3 py-2 font-medium">Severidad</th>
                <th className="px-3 py-2 text-right font-medium">Flags</th>
                <th className="px-3 py-2 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((comment) => (
                <tr
                  key={comment.id}
                  className="cursor-pointer border-b border-velora-border/60 transition-colors last:border-0 hover:bg-velora-surface-2/50"
                  onClick={() => onReview(comment)}
                >
                  <td className="whitespace-nowrap px-3 py-2.5 text-velora-text">
                    {comment.author}
                  </td>
                  <td className="px-3 py-2.5 text-velora-muted">{truncate(comment.text, 80)}</td>
                  <td className="px-3 py-2.5">
                    <SeverityBadge severity={comment.severity} />
                  </td>
                  <td className="px-3 py-2.5 text-right text-velora-text">{comment.flagsCount}</td>
                  <td className="px-3 py-2.5">
                    <div
                      className="flex justify-end gap-1"
                      onClick={(event) => event.stopPropagation()}
                      role="presentation"
                    >
                      <button
                        type="button"
                        className={iconBtn}
                        onClick={() => onReview(comment)}
                        aria-label="Revisar"
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        type="button"
                        className={`${iconBtn} hover:text-velora-danger`}
                        onClick={() => onDelete(comment)}
                        aria-label="Eliminar"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data && data.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-10 text-center text-velora-muted">
                    No hay contenido reportado pendiente. 🎉
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
