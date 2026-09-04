import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import type { AlertProps, AlertType } from '@/types/components'
import { cn } from '@lib/utils/helpers'

const STYLE: Record<AlertType, { wrap: string; icon: LucideIcon }> = {
  success: {
    wrap: 'border-velora-success/40 bg-velora-success/10 text-velora-success',
    icon: CheckCircle2,
  },
  warning: {
    wrap: 'border-velora-warning/40 bg-velora-warning/10 text-velora-warning',
    icon: AlertTriangle,
  },
  error: {
    wrap: 'border-velora-danger/40 bg-velora-danger/10 text-velora-danger',
    icon: XCircle,
  },
  info: {
    wrap: 'border-velora-primary/40 bg-velora-primary/10 text-velora-primary',
    icon: Info,
  },
}

export const Alert = ({ type = 'info', title, children, onClose, className }: AlertProps) => {
  const { wrap, icon: Icon } = STYLE[type]

  return (
    <div
      role="alert"
      className={cn('flex gap-3 rounded-xl border p-4 text-sm', wrap, className)}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className={cn('text-velora-text', Boolean(title) && 'mt-0.5')}>{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="-m-1 shrink-0 rounded-md p-1 transition-opacity hover:opacity-70"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
