import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@constants/routes'
import { VALIDATION_MESSAGES } from '@constants/messages'
import { useAuth } from '@hooks/useAuth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputBase =
  'w-full rounded-lg border bg-velora-bg px-4 py-2 text-velora-text transition-colors ' +
  'placeholder:text-velora-muted focus:outline-none focus:ring-2 focus:ring-velora-primary'

export const LoginForm = () => {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})

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
      navigate(ROUTES.DASHBOARD, { replace: true })
    } catch {
      // El mensaje de error ya quedó en el store (useAuth().error).
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-velora-text">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (fieldErrors.email) setFieldErrors((s) => ({ ...s, email: undefined }))
            if (error) clearError()
          }}
          className={`${inputBase} ${fieldErrors.email ? 'border-velora-danger' : 'border-velora-border'}`}
          placeholder="tu@email.com"
          disabled={isLoading}
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-velora-danger">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-velora-text">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (fieldErrors.password) setFieldErrors((s) => ({ ...s, password: undefined }))
            if (error) clearError()
          }}
          className={`${inputBase} ${fieldErrors.password ? 'border-velora-danger' : 'border-velora-border'}`}
          placeholder="••••••••"
          disabled={isLoading}
        />
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-velora-danger">{fieldErrors.password}</p>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-velora-danger/40 bg-velora-danger/10 p-3 text-sm text-velora-danger"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-velora-primary py-2 font-medium text-white transition-colors hover:bg-velora-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Iniciando sesión…' : 'Iniciar Sesión'}
      </button>

      <p className="text-center text-xs text-velora-muted">
        Usa las credenciales del backend de Velora.
      </p>
    </form>
  )
}
