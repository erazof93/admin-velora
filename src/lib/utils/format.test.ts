import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  formatCurrency,
  formatDuration,
  formatPercent,
  formatRelativeTime,
} from './format'

describe('formatCurrency', () => {
  it('formatea en USD con dos decimales', () => {
    expect(formatCurrency(9.99)).toBe('$9.99')
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
  })
})

describe('formatPercent', () => {
  it('redondea a 1 decimal por defecto', () => {
    expect(formatPercent(12.3456)).toBe('12.3%')
  })

  it('respeta el número de dígitos indicado', () => {
    expect(formatPercent(50, 0)).toBe('50%')
    expect(formatPercent(33.333, 2)).toBe('33.33%')
  })
})

describe('tiempo relativo y duración (con reloj fijo)', () => {
  const NOW = new Date('2026-09-03T12:00:00.000Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('formatRelativeTime: segundos / minutos / horas', () => {
    expect(formatRelativeTime(new Date(NOW.getTime() - 30_000))).toBe('hace 30s')
    expect(formatRelativeTime(new Date(NOW.getTime() - 5 * 60_000))).toBe(
      'hace 5m',
    )
    expect(formatRelativeTime(new Date(NOW.getTime() - 2 * 3_600_000))).toBe(
      'hace 2h',
    )
  })

  it('formatRelativeTime: nunca es negativo', () => {
    expect(formatRelativeTime(new Date(NOW.getTime() + 10_000))).toBe('hace 0s')
  })

  it('formatDuration: "45m" y "1h 30m"', () => {
    expect(formatDuration(new Date(NOW.getTime() - 45 * 60_000))).toBe('45m')
    expect(formatDuration(new Date(NOW.getTime() - 90 * 60_000))).toBe('1h 30m')
  })
})
