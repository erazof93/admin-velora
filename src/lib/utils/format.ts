const USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const NUM = new Intl.NumberFormat('es-ES')

export function formatCurrency(value: number): string {
  return USD.format(value)
}

export function formatNumber(value: number): string {
  return NUM.format(value)
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`
}

export function formatDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit' })
}

/** "hace 30s" / "hace 4m" / "hace 2h" a partir de un ISO en el pasado. */
export function formatRelativeTime(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value
  const seconds = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000))
  if (seconds < 60) return `hace ${seconds}s`
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `hace ${minutes}m`
  return `hace ${Math.round(minutes / 60)}h`
}

/** "2h 34m" / "45m" de duración transcurrida desde un ISO. */
export function formatDuration(from: string | Date): string {
  const date = typeof from === 'string' ? new Date(from) : from
  const totalMinutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60_000))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}
