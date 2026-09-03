import axios from 'axios'
import { API_CONFIG } from '@constants/api'
import { ROUTES } from '@constants/routes'
import { authStorage } from '@lib/storage/auth'

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
  timeout: API_CONFIG.TIMEOUT,
})

// Request: adjunta el JWT si existe.
apiClient.interceptors.request.use((config) => {
  const token = authStorage.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response: ante un 401, limpia la sesión y redirige a login.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      authStorage.clear()
      if (typeof window !== 'undefined' && window.location.pathname !== ROUTES.LOGIN) {
        window.location.href = ROUTES.LOGIN
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient
