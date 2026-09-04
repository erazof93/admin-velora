export type * from './api'
export type * from './admin'
export type * from './components'
export type * from './dashboard'
export type * from './forms'
export type * from './health'
export type * from './moderation'
export type * from './revenue'
export type * from './users'

// ─── Auth ───────────────────────────────────────────────────────────────
/** Roles del RBAC del backend (JWT + `/auth/*`). */
export type AdminRole = 'SUPERADMIN' | 'ADMIN' | 'CLIENTE' | 'COACH'

export interface User {
  id: string
  email: string
  name: string
  role: AdminRole
  tier?: 'FREE' | 'PREMIUM' | 'PRO_COACHING'
  /** El backend de auth ya no lo devuelve; queda opcional para datos legacy. */
  createdAt?: string
}

export interface LoginRequest {
  email: string
  password: string
}

/** Payload de `POST /admin/create-admin` (SUPERADMIN). */
export interface CreateAdminRequest {
  email: string
  name: string
  password: string
}

/** Cuenta devuelta al crear/gestionar un admin. */
export type AdminAccount = Pick<User, 'id' | 'email' | 'name' | 'role'>

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
