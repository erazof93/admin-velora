export type HealthLevel = 'good' | 'warn' | 'bad'

export const responseTimeLevel = (ms: number): HealthLevel =>
  ms < 100 ? 'good' : ms <= 200 ? 'warn' : 'bad'

export const errorRateLevel = (pct: number): HealthLevel =>
  pct < 1 ? 'good' : pct <= 3 ? 'warn' : 'bad'

/** Mismo criterio que error rate: <1% ok, 1-3% aviso, >3% crítico. */
export const churnLevel = errorRateLevel

export const uptimeLevel = (pct: number): HealthLevel =>
  pct > 99 ? 'good' : pct > 95 ? 'warn' : 'bad'

export const successRateLevel = (pct: number): HealthLevel =>
  pct >= 99 ? 'good' : pct >= 95 ? 'warn' : 'bad'

export const LEVEL_TEXT: Record<HealthLevel, string> = {
  good: 'text-velora-success',
  warn: 'text-velora-warning',
  bad: 'text-velora-danger',
}

export const LEVEL_BG: Record<HealthLevel, string> = {
  good: 'bg-velora-success/15 text-velora-success',
  warn: 'bg-velora-warning/15 text-velora-warning',
  bad: 'bg-velora-danger/15 text-velora-danger',
}

/** Para Recharts (fill/stroke). */
export const LEVEL_HEX: Record<HealthLevel, string> = {
  good: '#22c55e',
  warn: '#f59e0b',
  bad: '#ef4444',
}
