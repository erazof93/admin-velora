import type { CardProps } from '@/types/components'
import { cn } from '@lib/utils/helpers'

export const Card = ({
  children,
  className,
  title,
  actions,
  footer,
  noPadding = false,
}: CardProps) => {
  const structured = title !== undefined || actions !== undefined || footer !== undefined

  if (!structured) {
    return (
      <div
        className={cn(
          'rounded-xl border border-velora-border bg-velora-surface',
          noPadding ? '' : 'p-6',
          className,
        )}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-velora-border bg-velora-surface',
        className,
      )}
    >
      {(title !== undefined || actions !== undefined) && (
        <div className="flex items-center justify-between gap-3 border-b border-velora-border px-5 py-3.5">
          {typeof title === 'string' ? (
            <h2 className="text-sm font-semibold text-velora-text">{title}</h2>
          ) : (
            title
          )}
          {actions}
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>{children}</div>
      {footer !== undefined && (
        <div className="border-t border-velora-border px-5 py-3">{footer}</div>
      )}
    </div>
  )
}
