import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PaginationProps } from '@/types/components'
import { cn } from '@lib/utils/helpers'

/** Devuelve los números a mostrar, con `-1` como marcador de elipsis. */
function pageRange(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, -1, total]
  if (current >= total - 3) return [1, -1, total - 4, total - 3, total - 2, total - 1, total]
  return [1, -1, current - 1, current, current + 1, -1, total]
}

const navBtn =
  'inline-flex items-center gap-1 rounded-lg border border-velora-border px-2.5 py-1 text-sm ' +
  'text-velora-text transition-colors hover:bg-velora-surface-2 disabled:opacity-40 disabled:hover:bg-transparent'

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const go = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages)
    if (clamped !== currentPage) onPageChange(clamped)
  }

  return (
    <nav
      aria-label="Paginación"
      className={cn('flex items-center justify-center gap-1', className)}
    >
      <button
        type="button"
        className={navBtn}
        onClick={() => go(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <ul className="hidden items-center gap-1 sm:flex">
        {pageRange(currentPage, totalPages).map((page, index) =>
          page === -1 ? (
            // oxlint-disable-next-line no-array-index-key -- elipsis sin identidad propia
            <li key={`gap-${index}`} className="px-2 text-sm text-velora-muted">
              …
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                aria-current={page === currentPage ? 'page' : undefined}
                onClick={() => go(page)}
                className={cn(
                  'min-w-8 rounded-lg px-2.5 py-1 text-sm transition-colors',
                  page === currentPage
                    ? 'bg-velora-primary text-white'
                    : 'text-velora-text hover:bg-velora-surface-2',
                )}
              >
                {page}
              </button>
            </li>
          ),
        )}
      </ul>

      <span className="px-2 text-sm text-velora-muted sm:hidden">
        {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        className={navBtn}
        onClick={() => go(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
