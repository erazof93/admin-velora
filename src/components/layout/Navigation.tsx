import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  HeartPulse,
  LayoutDashboard,
  ShieldAlert,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react'
import { ROUTES } from '@constants/routes'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

/** Items del sidebar visibles para cualquier admin. Fuente única para Sidebar y Breadcrumbs. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Usuarios', to: ROUTES.USERS, icon: Users },
  { label: 'Revenue', to: ROUTES.REVENUE, icon: TrendingUp },
  { label: 'Moderación', to: ROUTES.MODERATION, icon: ShieldAlert },
  { label: 'Health', to: ROUTES.HEALTH, icon: HeartPulse },
  { label: 'Analytics', to: ROUTES.ANALYTICS, icon: BarChart3 },
]

/** Items sólo para SUPERADMIN. */
export const SUPERADMIN_NAV_ITEMS: NavItem[] = [
  { label: 'Crear admin', to: ROUTES.ADMIN_CREATE, icon: UserPlus },
]

/** Todos los items (para resolver breadcrumbs sin importar el rol). */
export const ALL_NAV_ITEMS: NavItem[] = [...NAV_ITEMS, ...SUPERADMIN_NAV_ITEMS]
