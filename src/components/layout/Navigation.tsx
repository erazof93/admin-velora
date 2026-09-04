import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  HeartPulse,
  LayoutDashboard,
  ShieldAlert,
  TrendingUp,
  Users,
} from 'lucide-react'
import { ROUTES } from '@constants/routes'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

/** Items del sidebar. Fuente única para Sidebar y Breadcrumbs. */
export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Usuarios', to: ROUTES.USERS, icon: Users },
  { label: 'Revenue', to: ROUTES.REVENUE, icon: TrendingUp },
  { label: 'Moderación', to: ROUTES.MODERATION, icon: ShieldAlert },
  { label: 'Health', to: ROUTES.HEALTH, icon: HeartPulse },
  { label: 'Analytics', to: ROUTES.ANALYTICS, icon: BarChart3 },
]
