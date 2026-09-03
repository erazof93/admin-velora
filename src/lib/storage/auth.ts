import type { User } from '@/types'

const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'auth_user'

/** Acceso a la sesión persistida en localStorage (tolerante a modo privado / datos corruptos). */
export const authStorage = {
  setToken: (token: string) => {
    try {
      localStorage.setItem(TOKEN_KEY, token)
    } catch (err) {
      console.warn('No se pudo persistir el token', err)
    }
  },

  getToken: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  },

  setRefreshToken: (token: string) => {
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, token)
    } catch (err) {
      console.warn('No se pudo persistir el refresh token', err)
    }
  },

  getRefreshToken: (): string | null => {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY)
    } catch {
      return null
    }
  },

  setUser: (user: User) => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch (err) {
      console.warn('No se pudo persistir el usuario', err)
    }
  },

  getUser: (): User | null => {
    try {
      const raw = localStorage.getItem(USER_KEY)
      return raw ? (JSON.parse(raw) as User) : null
    } catch {
      return null
    }
  },

  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    } catch (err) {
      console.warn('No se pudo limpiar la sesión', err)
    }
  },
}
