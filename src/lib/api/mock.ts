import type { DashboardStats, RevenueSummary, SystemHealth } from '@/types'
import type { ActivityItem, ActivityPoint, RevenuePoint, TopCoach } from '@/types/dashboard'
import type { ErrorRatePoint, HealthMetrics, UptimeStats } from '@/types/health'
import type {
  ChurnPoint,
  MrrBreakdown,
  RevenueCoach,
  TierShare,
  TieredRevenuePoint,
} from '@/types/revenue'

/** Flag global: cuando es true la capa de datos devuelve estos mocks sin tocar el backend. */
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

const MONTHS = ['Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep']

export const mockStats: DashboardStats = {
  totalUsers: 4821,
  totalCoaches: 312,
  premiumUsers: 1094,
  mrr: 18_730,
}

export const mockRevenue: RevenuePoint[] = MONTHS.map((month, i) => ({
  month,
  revenue: 9000 + i * 850 + (i % 3) * 400,
}))

export const mockActivity: ActivityPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: `${String(i + 1).padStart(2, '0')}/09`,
  signups: Math.max(4, 22 + Math.round(14 * Math.sin(i / 3) + i / 3)),
}))

const SERVICE_STARTED_AT = new Date(Date.now() - 2 * 3600_000 - 34 * 60_000).toISOString()

export const mockHealth: SystemHealth = {
  database: 'up',
  api: 'up',
  uptimePct: 99.94,
  latencyMs: { p50: 82, p95: 210, p99: 486 },
  checkedAt: new Date().toISOString(),
  startedAt: SERVICE_STARTED_AT,
}

/** Estado con `checkedAt`/`database` frescos en cada llamada (para el auto-refresh). */
export function makeHealthStatus(databaseDown = false): SystemHealth {
  return {
    ...mockHealth,
    database: databaseDown ? 'down' : 'up',
    api: databaseDown ? 'degraded' : 'up',
    checkedAt: new Date().toISOString(),
  }
}

/** Serie de 60 min con ruido, p50/p95/p99 y success rate. Regenera en cada llamada. */
export function makeHealthMetrics(): HealthMetrics {
  const responseTime = Array.from({ length: 60 }, (_, i) => {
    const minutesAgo = 59 - i
    const base = 70 + 25 * Math.sin(minutesAgo / 7)
    const noise = (Math.random() - 0.5) * 40
    return { minutesAgo, ms: Math.max(35, Math.round(base + noise)) }
  })
  return {
    responseTime,
    p50: 45,
    p95: 120,
    p99: 250,
    successRate: 99.94,
  }
}

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
export const mockErrorRates: ErrorRatePoint[] = WEEKDAYS.map((day, i) => ({
  day,
  rate: Number((0.4 + Math.abs(Math.sin(i * 1.3)) * 2.6).toFixed(2)),
}))

export const mockUptime: UptimeStats = {
  last24h: 99.94,
  last7d: 99.87,
  last30d: 99.92,
  trend: Array.from({ length: 24 }, (_, i) =>
    Number((99.5 + Math.abs(Math.sin(i / 3)) * 0.5).toFixed(3)),
  ),
}

export const mockTopCoaches: TopCoach[] = [
  { id: 'c1', rank: 1, name: 'Lucía Fernández', revenue: 4820, athletes: 38 },
  { id: 'c2', rank: 2, name: 'Marco Díaz', revenue: 4110, athletes: 33 },
  { id: 'c3', rank: 3, name: 'Sofía Romero', revenue: 3670, athletes: 29 },
  { id: 'c4', rank: 4, name: 'Iván Castro', revenue: 3120, athletes: 24 },
  { id: 'c5', rank: 5, name: 'Nora Beltrán', revenue: 2890, athletes: 22 },
]

export const mockRecentActivity: ActivityItem[] = [
  { id: 'a1', athlete: 'Pedro Salas', type: 'Carrera 10 km', at: minutesAgo(8) },
  { id: 'a2', athlete: 'Marta León', type: 'Plan semanal creado', at: minutesAgo(23) },
  { id: 'a3', athlete: 'Diego Ortiz', type: 'Suscripción PREMIUM', at: minutesAgo(51) },
  { id: 'a4', athlete: 'Carla Vidal', type: 'Comentario reportado', at: minutesAgo(96) },
  { id: 'a5', athlete: 'Hugo Prieto', type: 'Registro nuevo', at: minutesAgo(140) },
]

function minutesAgo(min: number): string {
  return new Date(Date.now() - min * 60_000).toISOString()
}

// ─── Revenue (FASE 6) ───────────────────────────────────────────────────
const PREMIUM_PRICE = 9.99
const PRO_PRICE = 199
const PREMIUM_COUNT = 1180
const PRO_COUNT = 35
const MRR_TOTAL = Math.round(PREMIUM_COUNT * PREMIUM_PRICE + PRO_COUNT * PRO_PRICE)

export const mockMrrBreakdown: MrrBreakdown = {
  premiumCount: PREMIUM_COUNT,
  proCount: PRO_COUNT,
  premiumPrice: PREMIUM_PRICE,
  proPrice: PRO_PRICE,
  total: MRR_TOTAL,
  churnRate: 2.1,
  projection3m: Math.round(MRR_TOTAL * 1.05 ** 3),
}

export const mockRevenueSummary: RevenueSummary = {
  mrr: MRR_TOTAL,
  growthPct: 5.2,
  activeSubscriptions: PREMIUM_COUNT + PRO_COUNT,
  byTier: {
    FREE: 0,
    PREMIUM: Math.round(PREMIUM_COUNT * PREMIUM_PRICE),
    PRO_COACHING: PRO_COUNT * PRO_PRICE,
  },
}

export const mockTieredRevenue: TieredRevenuePoint[] = MONTHS.map((month, i) => ({
  month,
  free: 0,
  premium: Math.round((820 + i * 34) * PREMIUM_PRICE),
  pro: Math.round((22 + i * 1.3) * PRO_PRICE),
}))

export const mockTierShares: TierShare[] = [
  { tier: 'FREE', count: 2893, pct: 60 },
  { tier: 'PREMIUM', count: 1446, pct: 30 },
  { tier: 'PRO_COACHING', count: 482, pct: 10 },
]

export const mockRevenueCoaches: RevenueCoach[] = [
  { id: 'c1', rank: 1, name: 'Lucía Fernández', mrr: 4820, athletes: 38, rating: 4.9 },
  { id: 'c2', rank: 2, name: 'Marco Díaz', mrr: 4110, athletes: 33, rating: 4.8 },
  { id: 'c3', rank: 3, name: 'Sofía Romero', mrr: 3670, athletes: 29, rating: 4.8 },
  { id: 'c4', rank: 4, name: 'Iván Castro', mrr: 3120, athletes: 24, rating: 4.7 },
  { id: 'c5', rank: 5, name: 'Nora Beltrán', mrr: 2890, athletes: 22, rating: 4.6 },
  { id: 'c6', rank: 6, name: 'Hugo Prieto', mrr: 2540, athletes: 20, rating: 4.6 },
  { id: 'c7', rank: 7, name: 'Elena Gil', mrr: 2210, athletes: 18, rating: 4.5 },
  { id: 'c8', rank: 8, name: 'Raúl Mora', mrr: 1980, athletes: 16, rating: 4.5 },
  { id: 'c9', rank: 9, name: 'Bea Ríos', mrr: 1670, athletes: 14, rating: 4.4 },
  { id: 'c10', rank: 10, name: 'Tomás Vega', mrr: 1420, athletes: 12, rating: 4.3 },
]

export const mockChurn: ChurnPoint[] = Array.from({ length: 30 }, (_, i) => ({
  day: `${String(i + 1).padStart(2, '0')}/09`,
  rate: Number(Math.max(0.3, 1.2 + Math.sin(i / 4) * 0.9 + (i > 27 ? 1.1 : 0)).toFixed(2)),
}))
