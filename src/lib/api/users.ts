import type { AdminUser } from '@/types'
import type { BulkActionPayload, UserFormValues, UsersFilters } from '@/types/users'
import { API_ENDPOINTS } from '@constants/api'
import apiClient from './client'
import { USE_MOCKS } from './mock'
import { mockUserDb } from './mockUsers'

const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 250))

function applyFilters(rows: AdminUser[], filters: UsersFilters): AdminUser[] {
  const q = filters.search.trim().toLowerCase()
  return rows.filter((user) => {
    if (q && !user.name.toLowerCase().includes(q) && !user.email.toLowerCase().includes(q)) {
      return false
    }
    if (filters.tier !== 'TODOS' && user.tier !== filters.tier) return false
    if (filters.status !== 'TODOS' && user.status !== filters.status) return false
    return true
  })
}

export const usersAPI = {
  list: async (filters: UsersFilters): Promise<AdminUser[]> => {
    if (USE_MOCKS) {
      await delay()
      return applyFilters(mockUserDb, filters)
    }
    const { data } = await apiClient.get<AdminUser[]>(API_ENDPOINTS.USERS.LIST, {
      params: {
        search: filters.search || undefined,
        tier: filters.tier === 'TODOS' ? undefined : filters.tier,
        status: filters.status === 'TODOS' ? undefined : filters.status,
      },
    })
    return data
  },

  get: async (id: string): Promise<AdminUser> => {
    if (USE_MOCKS) {
      await delay()
      const found = mockUserDb.find((user) => user.id === id)
      if (!found) throw new Error('Usuario no encontrado')
      return found
    }
    const { data } = await apiClient.get<AdminUser>(API_ENDPOINTS.USERS.DETAIL(id))
    return data
  },

  create: async (values: UserFormValues): Promise<AdminUser> => {
    if (USE_MOCKS) {
      await delay()
      const user: AdminUser = {
        id: `u${Date.now().toString(36)}`,
        role: 'athlete',
        createdAt: new Date().toISOString(),
        followers: 0,
        activities: 0,
        ...values,
      }
      mockUserDb.unshift(user)
      return user
    }
    const { data } = await apiClient.post<AdminUser>(API_ENDPOINTS.USERS.LIST, values)
    return data
  },

  update: async (id: string, values: Partial<UserFormValues>): Promise<AdminUser> => {
    if (USE_MOCKS) {
      await delay()
      const idx = mockUserDb.findIndex((user) => user.id === id)
      if (idx === -1) throw new Error('Usuario no encontrado')
      mockUserDb[idx] = { ...mockUserDb[idx], ...values }
      return mockUserDb[idx]
    }
    const { data } = await apiClient.put<AdminUser>(API_ENDPOINTS.USERS.DETAIL(id), values)
    return data
  },

  remove: async (id: string): Promise<void> => {
    if (USE_MOCKS) {
      await delay()
      const idx = mockUserDb.findIndex((user) => user.id === id)
      if (idx !== -1) mockUserDb.splice(idx, 1)
      return
    }
    await apiClient.delete(API_ENDPOINTS.USERS.DETAIL(id))
  },

  bulk: async ({ ids, action }: BulkActionPayload): Promise<void> => {
    if (USE_MOCKS) {
      await delay()
      for (const id of ids) {
        const user = mockUserDb.find((item) => item.id === id)
        if (!user) continue
        if (action === 'ban') user.status = 'SUSPENDED'
        if (action === 'promote') user.tier = 'PREMIUM'
        if (action === 'delete') {
          const idx = mockUserDb.indexOf(user)
          if (idx !== -1) mockUserDb.splice(idx, 1)
        }
      }
      return
    }
    await apiClient.post(API_ENDPOINTS.USERS.BULK_ACTION, { ids, action })
  },
}
