export type UserTier = 'FREE' | 'PREMIUM' | 'PRO_COACHING'
export type UserStatus = 'ACTIVE' | 'SUSPENDED'
export type UserRole = 'athlete' | 'coach' | 'admin'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  tier: UserTier
  status: UserStatus
  createdAt: string
  followers?: number
  activities?: number
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface RevenueSummary {
  mrr: number
  growthPct: number
  activeSubscriptions: number
  byTier: Record<UserTier, number>
}

export interface SystemHealth {
  database: 'up' | 'down'
  api: 'up' | 'degraded' | 'down'
  uptimePct: number
  latencyMs: { p50: number; p95: number; p99: number }
  checkedAt: string
  /** Momento desde el que el servicio está arriba (para "2h 34m uptime"). */
  startedAt?: string
}

export interface DashboardStats {
  totalUsers: number
  totalCoaches: number
  premiumUsers: number
  mrr: number
}
