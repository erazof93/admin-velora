import { useState } from 'react'
import type { UseMutationResult } from '@tanstack/react-query'
import type { FlaggedComment, ModerationAction, ModerationActionPayload } from '@/types/moderation'
import { SeverityBadge } from '@components/common/Badge'
import { Button } from '@components/common/Button'
import { Modal } from '@components/common/Modal'
import { useToast } from '@components/common/Toast'
import { formatDate } from '@lib/utils/format'

interface CommentReviewProps {
  comment: FlaggedComment | null
  onClose: () => void
  act: UseMutationResult<void, Error, ModerationActionPayload>
}

const CONFIRM_COPY: Record<
  'delete' | 'ban',
  { title: string; message: (c: FlaggedComment) => string }
> = {
  delete: {
    title: 'Eliminar comentario',
    message: (c) => `¿Eliminar el comentario de ${c.author}? Esta acción es irreversible.`,
  },
  ban: {
    title: 'Banear usuario',
    message: (c) => `¿Banear a ${c.author}? No podrá volver a publicar.`,
  },
}

const TOAST_COPY: Record<ModerationAction, string> = {
  approve: 'Comentario aprobado.',
  reject: 'Comentario rechazado.',
  delete: 'Comentario eliminado.',
  ban: 'Usuario baneado.',
}

export const CommentReview = ({ comment, onClose, act }: CommentReviewProps) => {
  const toast = useToast()
  const [confirm, setConfirm] = useState<'delete' | 'ban' | null>(null)

  const run = (action: ModerationAction) => {
    if (!comment) return
    act.mutate(
      { commentId: comment.id, action },
      {
        onSuccess: () => {
          toast.success(TOAST_COPY[action])
          setConfirm(null)
          onClose()
        },
      },
    )
  }

  const closeAll = () => {
    setConfirm(null)
    onClose()
  }

  return (
    <Modal
      open={comment !== null}
      onClose={confirm ? () => setConfirm(null) : closeAll}
      title="Revisar comentario reportado"
      size="lg"
    >
      {comment && confirm && (
        <div className="space-y-4">
          <p className="text-sm text-velora-muted">{CONFIRM_COPY[confirm].message(comment)}</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setConfirm(null)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              size="sm"
              loading={act.isPending}
              onClick={() => run(confirm)}
            >
              {CONFIRM_COPY[confirm].title}
            </Button>
          </div>
        </div>
      )}

      {comment && !confirm && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-velora-text">{comment.author}</p>
              <p className="text-xs text-velora-muted">{formatDate(comment.createdAt)}</p>
            </div>
            <SeverityBadge severity={comment.severity} />
          </div>

          <blockquote className="rounded-lg border border-velora-border bg-velora-bg p-3 text-sm text-velora-text">
            {comment.text}
          </blockquote>

          <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-velora-muted">Reportado por</dt>
              <dd className="text-velora-text">{comment.reportedBy}</dd>
            </div>
            <div>
              <dt className="text-velora-muted">Razón</dt>
              <dd className="text-velora-text">{comment.reportReason}</dd>
            </div>
            <div>
              <dt className="text-velora-muted">Reportes</dt>
              <dd className="text-velora-text">{comment.flagsCount} reportes</dd>
            </div>
            <div>
              <dt className="text-velora-muted">Fecha del reporte</dt>
              <dd className="text-velora-text">{formatDate(comment.reportedAt)}</dd>
            </div>
          </dl>

          <div className="grid grid-cols-2 gap-2 border-t border-velora-border pt-4 sm:grid-cols-4">
            <Button
              variant="success"
              size="md"
              loading={act.isPending}
              onClick={() => run('approve')}
            >
              ✅ Aprobar
            </Button>
            <Button
              variant="warning"
              size="md"
              loading={act.isPending}
              onClick={() => run('reject')}
            >
              ❌ Rechazar
            </Button>
            <Button
              variant="ghost"
              size="md"
              className="bg-velora-danger/15 text-velora-danger hover:bg-velora-danger/25"
              onClick={() => setConfirm('delete')}
            >
              🗑️ Eliminar
            </Button>
            <Button variant="danger" size="md" onClick={() => setConfirm('ban')}>
              🚫 Ban usuario
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
