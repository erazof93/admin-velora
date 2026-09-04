import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import type { AdminRole } from '@/types'
import { ROUTES } from '@constants/routes'
import { isAdminRole, isSuperAdmin } from '@constants/roles'
import { useAuth } from '@hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
  /**
   * Rol mínimo exigido. Por defecto basta con ADMIN/SUPERADMIN (acceso al panel).
   * `SUPERADMIN` restringe la ruta a la gestión de admins.
   */
  requiredRole?: Extract<AdminRole, 'ADMIN' | 'SUPERADMIN'>
}

export const ProtectedRoute = ({ children, requiredRole = 'ADMIN' }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-velora-bg">
        <div className="size-12 animate-spin rounded-full border-2 border-velora-border border-t-velora-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  // Sólo ADMIN/SUPERADMIN pueden entrar al panel; el resto va al login.
  if (!isAdminRole(user?.role)) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  // Rutas marcadas SUPERADMIN: un ADMIN normal se redirige al dashboard.
  if (requiredRole === 'SUPERADMIN' && !isSuperAdmin(user?.role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <>{children}</>
}
