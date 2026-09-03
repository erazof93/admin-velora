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
  },
} as const
