import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '@store/authStore'

/**
 * Acceso a la sesión. Usa `useShallow` porque el selector devuelve un objeto
 * nuevo en cada render (obligatorio en Zustand v5 para evitar renders en bucle).
 */
export const useAuth = () =>
  useAuthStore(
    useShallow((state) => ({
      token: state.token,
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      error: state.error,
      login: state.login,
      logout: state.logout,
      clearError: state.clearError,
    })),
  )
