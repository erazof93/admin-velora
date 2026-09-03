import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { ROUTES } from '@constants/routes'
import { useAuth } from '@hooks/useAuth'

/** Placeholder de FASE 3. Sólo confirma sesión + logout del módulo Auth. */
export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center animate-velora-fade-in">
      <h1 className="text-3xl font-semibold text-velora-text">Dashboard</h1>
      <p className="text-velora-muted">
        Sesión iniciada{user ? ` como ${user.name} (${user.email})` : ''}. El contenido llega en
        FASE 3 — Layout Module.
      </p>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex items-center gap-2 rounded-lg border border-velora-border bg-velora-surface px-4 py-2 text-sm text-velora-text transition-colors hover:border-velora-primary hover:text-velora-primary"
      >
        <LogOut className="size-4" />
        Cerrar sesión
      </button>
    </main>
  )
}
