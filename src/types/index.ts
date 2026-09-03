export type * from './api'
export type * from './admin'
export type * from './forms'

// ─── Auth ───────────────────────────────────────────────────────────────
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'coach' | 'athlete'
  tier?: 'FREE' | 'PREMIUM' | 'PRO_COACHING'
  createdAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: User
}

export interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

// ─── API ────────────────────────────────────────────────────────────────
export interface ApiErrorResponse {
  message: string
  statusCode: number
  error?: string
}
