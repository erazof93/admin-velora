import { useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, UserRound } from 'lucide-react'
import { Dropdown } from '@components/common/Dropdown'
import { ROUTES } from '@constants/routes'
import { useAuth } from '@hooks/useAuth'

export const UserMenu = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <Dropdown
      align="end"
      items={[
        { label: user?.email ?? 'Sin email', disabled: true },
        { divider: true, label: 'sep' },
        {
          label: 'Cerrar sesión',
          icon: <LogOut className="size-4" />,
          danger: true,
          onClick: handleLogout,
        },
      ]}
      trigger={
        <span className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-velora-text transition-colors hover:bg-velora-surface">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-velora-primary/20 text-velora-primary">
            <UserRound className="size-4" />
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block">{user?.name ?? 'Usuario'}</span>
            <span className="block text-xs capitalize text-velora-muted">{user?.role ?? ''}</span>
          </span>
          <ChevronDown className="size-4 text-velora-muted" />
        </span>
      }
    />
  )
}
