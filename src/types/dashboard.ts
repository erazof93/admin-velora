/** Punto del chart de revenue (un mes). */
export interface RevenuePoint {
  month: string
  revenue: number
}

/** Punto del chart de actividad (un día). */
export interface ActivityPoint {
  date: string
  signups: number
}

export interface TopCoach {
  id: string
  rank: number
  name: string
  revenue: number
  athletes: number
}

export interface ActivityItem {
  id: string
  athlete: string
  type: string
  at: string
}
