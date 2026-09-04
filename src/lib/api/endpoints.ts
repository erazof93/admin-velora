import type {
  AdminAccount,
  AuthResponse,
  CreateAdminRequest,
  LoginRequest,
  User,
} from '@/types'
import { API_ENDPOINTS } from '@constants/api'
import { authStorage } from '@lib/storage/auth'
import apiClient from './client'

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)
    return data
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
  },

  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME)
    return data
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = authStorage.getRefreshToken()
    const { data } = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    })
    return data
  },
}

/** Gestión de administradores. Requiere SUPERADMIN (guard en el backend). */
export const adminAPI = {
  createAdmin: async (payload: CreateAdminRequest): Promise<AdminAccount> => {
    const { data } = await apiClient.post<AdminAccount>(
      API_ENDPOINTS.ADMIN.CREATE_ADMIN,
      payload,
    )
    return data
  },

  revokeAdmin: async (userId: string): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.ADMIN.REVOKE_ADMIN, { userId })
  },
}
