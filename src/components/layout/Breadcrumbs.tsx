import { ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@constants/routes'
import { NAV_ITEMS } from './Navigation'

export const Breadcrumbs = () => {
  const { pathname } = useLocation()
  const current = NAV_ITEMS.find((item) => item.to === pathname)
  const label = current?.label ?? (pathname.replace('/', '') || 'Inicio')
  const atDashboard = pathname === ROUTES.DASHBOARD

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-velora-muted">
      <Link to={ROUTES.DASHBOARD} className="transition-colors hover:text-velora-text">
        Inicio
      </Link>
      {!atDashboard && (
        <>
          <ChevronRight className="size-4" />
          <span className="capitalize text-velora-text">{label}</span>
        </>
      )}
    </nav>
  )
}
