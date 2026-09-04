import type { RevenueSummary, UserTier } from './admin'

export interface TieredRevenuePoint {
  month: string
  free: number
  premium: number
  pro: number
}

export interface TierShare {
  tier: UserTier
  count: number
  pct: number
}

export interface RevenueCoach {
  id: string
  rank: number
  name: string
  mrr: number
  athletes: number
  rating: number
}

export interface ChurnPoint {
  day: string
  rate: number
}

export interface MrrBreakdown {
  premiumCount: number
  proCount: number
  premiumPrice: number
  proPrice: number
  total: number
  churnRate: number
  projection3m: number
}

export interface RevenueBundle {
  summary: RevenueSummary
  tiered: TieredRevenuePoint[]
  shares: TierShare[]
  breakdown: MrrBreakdown
}
