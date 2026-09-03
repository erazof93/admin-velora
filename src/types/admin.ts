export type UserTier = 'FREE' | 'PREMIUM' | 'PRO'
export type UserStatus = 'active' | 'suspended' | 'deleted'
export type UserRole = 'athlete' | 'coach' | 'admin'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  tier: UserTier
  status: UserStatus
  createdAt: string
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
}

export interface DashboardStats {
  totalUsers: number
  totalCoaches: number
  premiumUsers: number
  mrr: number
}
