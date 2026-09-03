import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-velora-bg p-4">
      <div className="w-full max-w-md animate-velora-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-velora-text">🏃 Velora Admin</h1>
          <p className="mt-2 text-velora-muted">Panel de Control</p>
        </div>

        <div className="rounded-xl border border-velora-border bg-velora-surface p-8">
          {children}
        </div>

        <p className="mt-6 text-center text-sm text-velora-muted">
          © 2026 Velora Admin. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}
