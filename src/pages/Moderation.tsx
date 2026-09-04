import { useState } from 'react'
import type { FlaggedComment } from '@/types/moderation'
import { ConfirmDialog } from '@components/common/ConfirmDialog'
import { ErrorBoundary } from '@components/common/ErrorBoundary'
import { RefreshCountdown } from '@components/common/RefreshCountdown'
import { useToast } from '@components/common/Toast'
import {
  CommentReview,
  FlaggedContent,
  History,
  ModerationActions,
  Stats,
  UserReports,
} from '@components/moderation'
import { useModeration } from '@hooks/useModeration'

export default function Moderation() {
  const { flagged, reportedUsers, history, stats, act, bulk } = useModeration()
  const toast = useToast()
  const [reviewing, setReviewing] = useState<FlaggedComment | null>(null)
  const [deleting, setDeleting] = useState<FlaggedComment | null>(null)

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-velora-text">Content Moderation</h1>
        <span className="text-sm text-velora-muted">
          <RefreshCountdown key={flagged.dataUpdatedAt} seconds={120} />
        </span>
      </header>

      <ErrorBoundary>
        <Stats query={stats} />
      </ErrorBoundary>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ErrorBoundary>
            <FlaggedContent query={flagged} onReview={setReviewing} onDelete={setDeleting} />
          </ErrorBoundary>
        </div>
        <ErrorBoundary>
          <UserReports query={reportedUsers} />
        </ErrorBoundary>
      </div>

      <ErrorBoundary>
        <History query={history} />
      </ErrorBoundary>

      <div className="flex justify-end">
        <ErrorBoundary>
          <ModerationActions statsQuery={stats} bulk={bulk} />
        </ErrorBoundary>
      </div>

      <CommentReview comment={reviewing} onClose={() => setReviewing(null)} act={act} />

      <ConfirmDialog
        open={deleting !== null}
        title="Eliminar comentario"
        message={
          deleting
            ? `¿Eliminar el comentario de ${deleting.author}? Esta acción es irreversible.`
            : ''
        }
        confirmLabel="Eliminar"
        danger
        loading={act.isPending}
        onConfirm={() => {
          if (!deleting) return
          act.mutate(
            { commentId: deleting.id, action: 'delete' },
            {
              onSuccess: () => {
                toast.success('Comentario eliminado.')
                setDeleting(null)
              },
            },
          )
        }}
        onClose={() => setDeleting(null)}
      />
    </div>
  )
}
