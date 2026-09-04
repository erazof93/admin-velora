export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_URL || 'https://backend-running-production.up.railway.app/api/v1',
  TIMEOUT: 10_000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
} as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh-token',
    ME: '/auth/me',
  },
  USERS: {
    LIST: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    ACTIVITIES: (id: string) => `/users/${id}/activities`,
    BULK_ACTION: '/users/bulk-action',
  },
  DASHBOARD: {
    STATS: '/stats',
    REVENUE: '/revenue',
    ACTIVITY: '/users/activity',
    ACTIVITY_RECENT: '/users/activity/recent',
    HEALTH: '/health',
    COACHES_TOP: '/coach/top',
  },
  HEALTH: {
    STATUS: '/health',
    METRICS: '/health/metrics',
    ERRORS: '/health/errors',
    UPTIME: '/health/uptime',
  },
  REVENUE: {
    OVERVIEW: '/revenue',
    TOP_COACHES: '/revenue/top-coaches',
    CHURN: '/revenue/churn',
  },
  MODERATION: {
    FLAGGED: '/moderation/flagged',
    USERS: '/moderation/users',
    HISTORY: '/moderation/history',
    STATS: '/moderation/stats',
    ACTION: '/moderation/action',
  },
  ADMIN: {
    CREATE_ADMIN: '/admin/create-admin',
    REVOKE_ADMIN: '/admin/revoke-admin',
  },
} as const
