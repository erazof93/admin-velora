/** Rutas de la aplicación (single source of truth para react-router). */
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  REVENUE: '/revenue',
  MODERATION: '/moderation',
  HEALTH: '/health',
  ANALYTICS: '/analytics',
  ADMIN_CREATE: '/admin/create-admin',
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]
