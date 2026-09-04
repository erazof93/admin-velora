import type { DashboardStats, SystemHealth } from '@/types'
import type { ActivityItem, ActivityPoint, RevenuePoint, TopCoach } from '@/types/dashboard'
import { API_ENDPOINTS } from '@constants/api'
import apiClient from './client'
import {
  USE_MOCKS,
  mockActivity,
  mockHealth,
  mockRecentActivity,
  mockRevenue,
  mockStats,
  mockTopCoaches,
} from './mock'

/** GET tipado con fallback a mock cuando VITE_USE_MOCKS=true. */
async function fetchOrMock<T>(url: string, fallback: T): Promise<T> {
  if (USE_MOCKS) return fallback
  const { data } = await apiClient.get<T>(url)
  return data
}

export const dashboardAPI = {
  getStats: () => fetchOrMock<DashboardStats>(API_ENDPOINTS.DASHBOARD.STATS, mockStats),
  getRevenue: () => fetchOrMock<RevenuePoint[]>(API_ENDPOINTS.DASHBOARD.REVENUE, mockRevenue),
  getActivity: () => fetchOrMock<ActivityPoint[]>(API_ENDPOINTS.DASHBOARD.ACTIVITY, mockActivity),
  getHealth: () => fetchOrMock<SystemHealth>(API_ENDPOINTS.DASHBOARD.HEALTH, mockHealth),
  getTopCoaches: () => fetchOrMock<TopCoach[]>(API_ENDPOINTS.DASHBOARD.COACHES_TOP, mockTopCoaches),
  getRecentActivity: () =>
    fetchOrMock<ActivityItem[]>(API_ENDPOINTS.DASHBOARD.ACTIVITY_RECENT, mockRecentActivity),
}
