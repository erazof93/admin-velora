import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from '@components/common/Alert'
import { Button } from '@components/common/Button'
import { Input } from '@components/common/Input'
import { ROUTES } from '@constants/routes'
import { isAdminRole } from '@constants/roles'
import { AUTH_MESSAGES, VALIDATION_MESSAGES } from '@constants/messages'
import { useAuth } from '@hooks/useAuth'
import { useAuthStore } from '@store/authStore'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const LoginForm = () => {
  const navigate = useNavigate()
  const { login, logout, isLoading, error, clearError } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [accessError, setAccessError] = useState('')

  const validate = () => {
    const next: { email?: string; password?: string } = {}
    if (!email) next.email = VALIDATION_MESSAGES.EMAIL_REQUIRED
    else if (!EMAIL_RE.test(email)) next.email = VALIDATION_MESSAGES.EMAIL_INVALID

    if (!password) next.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED
    else if (password.length < 6) next.password = VALIDATION_MESSAGES.PASSWORD_MIN

    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isLoading || !validate()) return
    try {
      await login(email, password)
      // El store ya tiene el `user` con su `role` tras el login.
      const role = useAuthStore.getState().user?.role
      if (isAdminRole(role)) {
        navigate(ROUTES.DASHBOARD, { replace: true })
      } else {
        // CLIENTE / COACH no tienen sitio en el panel: se cierra la sesión.
        logout()
        setAccessError(AUTH_MESSAGES.NO_ADMIN_ACCESS)
      }
    } catch {
      // El mensaje de error ya quedó en el store (useAuth().error).
    }
  }

  const resetErrors = () => {
    if (accessError) setAccessError('')
    if (error) clearError()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Input
        id="email"
        type="email"
        label="Email"
        autoComplete="email"
        placeholder="tu@email.com"
        value={email}
        disabled={isLoading}
        error={fieldErrors.email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (fieldErrors.email) setFieldErrors((s) => ({ ...s, email: undefined }))
          resetErrors()
        }}
      />

      <Input
        id="password"
        type="password"
        label="Contraseña"
        autoComplete="current-password"
        placeholder="••••••••"
        revealable
        value={password}
        disabled={isLoading}
        error={fieldErrors.password}
        onChange={(e) => {
          setPassword(e.target.value)
          if (fieldErrors.password) setFieldErrors((s) => ({ ...s, password: undefined }))
          resetErrors()
        }}
      />

      {(error || accessError) && <Alert type="error">{accessError || error}</Alert>}

      <Button type="submit" fullWidth loading={isLoading}>
        {isLoading ? 'Iniciando sesión…' : 'Iniciar Sesión'}
      </Button>

      <p className="text-center text-xs text-velora-muted">
        Usa las credenciales del backend de Velora.
      </p>
    </form>
  )
}
