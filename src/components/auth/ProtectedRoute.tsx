import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '@constants/routes'
import { useAuth } from '@hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth()

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

  return <>{children}</>
}
