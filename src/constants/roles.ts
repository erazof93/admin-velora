import type { AdminRole } from '@/types'

/** Etiquetas legibles para mostrar el rol en la UI. */
export const ROLE_LABELS: Record<AdminRole, string> = {
  SUPERADMIN: 'Superadmin',
  ADMIN: 'Admin',
  CLIENTE: 'Cliente',
  COACH: 'Coach',
}

/** Roles con acceso al panel de administración. */
export const ADMIN_PANEL_ROLES: readonly AdminRole[] = ['SUPERADMIN', 'ADMIN']

/** `true` si el rol puede entrar al panel (ADMIN o SUPERADMIN). */
export const isAdminRole = (role?: AdminRole | null): boolean =>
  role === 'ADMIN' || role === 'SUPERADMIN'

/** `true` sólo para SUPERADMIN (gestión de admins). */
export const isSuperAdmin = (role?: AdminRole | null): boolean => role === 'SUPERADMIN'
