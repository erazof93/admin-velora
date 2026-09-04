import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '@components/common/ThemeToggle'
import { ROUTES } from '@constants/routes'
import { UserMenu } from './UserMenu'

interface HeaderProps {
  onMenuClick: () => void
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-velora-border bg-velora-bg/80 px-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex size-9 items-center justify-center rounded-lg text-velora-muted transition-colors hover:bg-velora-surface hover:text-velora-text md:hidden"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="size-5" />
        </button>
        <Link to={ROUTES.DASHBOARD} className="text-lg font-bold text-velora-text">
          🏃 Velora
        </Link>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}
