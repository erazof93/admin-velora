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
