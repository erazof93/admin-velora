import type { SystemHealth } from '@/types'
import type { ErrorRatePoint, HealthMetrics, UptimeStats } from '@/types/health'
import { API_ENDPOINTS } from '@constants/api'
import apiClient from './client'
import { USE_MOCKS, makeHealthMetrics, makeHealthStatus, mockErrorRates, mockUptime } from './mock'

const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 200))

/** Dev: `localStorage['velora-sim-db-down'] = '1'` fuerza estado DOWN (sólo en modo mock). */
function simulatedDbDown(): boolean {
  try {
    return localStorage.getItem('velora-sim-db-down') === '1'
  } catch {
    return false
  }
}

export const healthAPI = {
  getStatus: async (): Promise<SystemHealth> => {
    if (USE_MOCKS) {
      await delay()
      return makeHealthStatus(simulatedDbDown())
    }
    const { data } = await apiClient.get<SystemHealth>(API_ENDPOINTS.HEALTH.STATUS)
    return data
  },

  getMetrics: async (): Promise<HealthMetrics> => {
    if (USE_MOCKS) {
      await delay()
      return makeHealthMetrics()
    }
    const { data } = await apiClient.get<HealthMetrics>(API_ENDPOINTS.HEALTH.METRICS)
    return data
  },

  getErrors: async (): Promise<ErrorRatePoint[]> => {
    if (USE_MOCKS) {
      await delay()
      return mockErrorRates
    }
    const { data } = await apiClient.get<ErrorRatePoint[]>(API_ENDPOINTS.HEALTH.ERRORS)
    return data
  },

  getUptime: async (): Promise<UptimeStats> => {
    if (USE_MOCKS) {
      await delay()
      return mockUptime
    }
    const { data } = await apiClient.get<UptimeStats>(API_ENDPOINTS.HEALTH.UPTIME)
    return data
  },
}
