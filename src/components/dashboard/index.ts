export * from './HealthStatus'
export * from './RecentActivity'
export * from './StatsGrid'
export * from './TopCoaches'

// RevenueChart y ActivityChart NO se re-exportan aquí: se cargan con lazy()
// en pages/Dashboard.tsx para aislar Recharts en su propio chunk.
