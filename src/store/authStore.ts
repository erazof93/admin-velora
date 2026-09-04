import { create } from 'zustand'
import axios from 'axios'
import type { AuthState, User } from '@/types'
import { AUTH_MESSAGES } from '@constants/messages'
import { authAPI } from '@lib/api/endpoints'
import { authStorage } from '@lib/storage/auth'

function toErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data?.message
    if (typeof apiMessage === 'string') return apiMessage
    if (error.code === 'ERR_NETWORK') return AUTH_MESSAGES.NETWORK_ERROR
  }
  return AUTH_MESSAGES.LOGIN_ERROR
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: authStorage.getToken(),
  user: authStorage.getUser(),
  isAuthenticated: !!authStorage.getToken(),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authAPI.login({ email, password })

      // El backend responde plano (id/email/name/role + tokens), no anidado en `user`.
      const user: User = {
        id: response.id,
        email: response.email,
        name: response.name,
        role: response.role,
      }

      authStorage.setToken(response.accessToken)
      authStorage.setRefreshToken(response.refreshToken)
      authStorage.setUser(user)

      set({
        token: response.accessToken,
        user,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      set({ error: toErrorMessage(error), isLoading: false })
      throw error
    }
  },

  logout: () => {
    authStorage.clear()
    set({ token: null, user: null, isAuthenticated: false, error: null })
  },

  clearError: () => set({ error: null }),
}))
