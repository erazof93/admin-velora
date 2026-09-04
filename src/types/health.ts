/** Serie de tiempo de respuesta (un punto por minuto, últimos 60). */
export interface ResponseTimePoint {
  minutesAgo: number
  ms: number
}

export interface HealthMetrics {
  responseTime: ResponseTimePoint[]
  p50: number
  p95: number
  p99: number
  successRate: number
}

/** Error rate por día (últimos 7). */
export interface ErrorRatePoint {
  day: string
  rate: number
}

export interface UptimeStats {
  last24h: number
  last7d: number
  last30d: number
  /** Puntos para el sparkline de tendencia (últimas 24h). */
  trend: number[]
}
