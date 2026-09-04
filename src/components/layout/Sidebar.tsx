import { NavLink } from 'react-router-dom'
import { ChevronLeft, X } from 'lucide-react'
import { useUIStore } from '@store/uiStore'
import { cn } from '@lib/utils/helpers'
import { NAV_ITEMS } from './Navigation'

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

export const Sidebar = ({ mobileOpen, onMobileClose }: SidebarProps) => {
  const expanded = useUIStore((s) => s.sidebarOpen)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)

  return (
    <>
      {mobileOpen && (
        <div
          role="presentation"
          onClick={onMobileClose}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-velora-border bg-velora-surface transition-all duration-200',
          expanded ? 'md:w-60' : 'md:w-16',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className={cn('text-lg font-bold text-velora-text', !expanded && 'md:hidden')}>
            🏃 Velora
          </span>
          <button
            type="button"
            onClick={onMobileClose}
            className="inline-flex size-8 items-center justify-center rounded-lg text-velora-muted hover:bg-velora-surface-2 hover:text-velora-text md:hidden"
            aria-label="Cerrar menú"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            onClick={toggleSidebar}
            className="hidden size-8 items-center justify-center rounded-lg text-velora-muted hover:bg-velora-surface-2 hover:text-velora-text md:inline-flex"
            aria-label={expanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
          >
            <ChevronLeft className={cn('size-5 transition-transform', !expanded && 'rotate-180')} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-2">
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onMobileClose}
              title={label}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  !expanded && 'md:justify-center md:px-0',
                  isActive
                    ? 'bg-velora-primary/15 text-velora-primary'
                    : 'text-velora-muted hover:bg-velora-surface-2 hover:text-velora-text',
                )
              }
            >
              <Icon className="size-5 shrink-0" />
              <span className={cn(!expanded && 'md:hidden')}>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
