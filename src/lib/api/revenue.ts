import type { ChurnPoint, RevenueBundle, RevenueCoach } from '@/types/revenue'
import { API_ENDPOINTS } from '@constants/api'
import apiClient from './client'
import {
  USE_MOCKS,
  mockChurn,
  mockMrrBreakdown,
  mockRevenueCoaches,
  mockRevenueSummary,
  mockTierShares,
  mockTieredRevenue,
} from './mock'

const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 250))

export const revenueAPI = {
  getOverview: async (): Promise<RevenueBundle> => {
    if (USE_MOCKS) {
      await delay()
      return {
        summary: mockRevenueSummary,
        tiered: mockTieredRevenue,
        shares: mockTierShares,
        breakdown: mockMrrBreakdown,
      }
    }
    const { data } = await apiClient.get<RevenueBundle>(API_ENDPOINTS.REVENUE.OVERVIEW)
    return data
  },

  getTopCoaches: async (): Promise<RevenueCoach[]> => {
    if (USE_MOCKS) {
      await delay()
      return mockRevenueCoaches
    }
    const { data } = await apiClient.get<RevenueCoach[]>(API_ENDPOINTS.REVENUE.TOP_COACHES)
    return data
  },

  getChurn: async (): Promise<ChurnPoint[]> => {
    if (USE_MOCKS) {
      await delay()
      return mockChurn
    }
    const { data } = await apiClient.get<ChurnPoint[]>(API_ENDPOINTS.REVENUE.CHURN)
    return data
  },
}
