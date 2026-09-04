/**
 * Paleta Velora en JS — para librerías que no leen clases de Tailwind
 * (p. ej. Recharts). Debe mantenerse sincronizada con el bloque @theme
 * de src/index.css.
 */
export const VELORA_COLORS = {
  bg: '#0b0b0f',
  surface: '#16171d',
  surface2: '#1f2028',
  border: '#2e303a',
  text: '#e5e4e7',
  muted: '#9ca3af',
  primary: '#aa3bff',
  primaryHover: '#c084fc',
  accent: '#6d28d9',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
} as const

/** Color asignado a cada tier de suscripción. */
export const TIER_COLORS = {
  FREE: '#9ca3af',
  PREMIUM: '#aa3bff',
  PRO_COACHING: '#22c55e',
} as const

/** Colores semánticos para los charts del dashboard (Recharts). */
export const CHART_COLORS = {
  revenue: '#22c55e',
  activity: '#38bdf8',
  accent: '#aa3bff',
} as const

/** Secuencia para series de charts. */
export const CHART_PALETTE = [
  '#aa3bff',
  '#22c55e',
  '#f59e0b',
  '#38bdf8',
  '#ef4444',
  '#c084fc',
] as const
