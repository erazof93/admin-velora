import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ShieldCheck } from 'lucide-react'
import { Alert } from '@components/common/Alert'
import { Button } from '@components/common/Button'
import { Card } from '@components/common/Card'
import { Input } from '@components/common/Input'
import { useToast } from '@components/common/Toast'
import { VALIDATION_MESSAGES } from '@constants/messages'
import { useCreateAdminMutation } from '@lib/api/hooks'
import { getApiErrorMessage } from '@lib/api/errors'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD = 8

interface FormState {
  email: string
  name: string
  password: string
}

type FieldErrors = Partial<Record<keyof FormState, string>>

const EMPTY: FormState = { email: '', name: '', password: '' }

/**
 * Alta de administradores. Sólo accesible para SUPERADMIN
 * (ver `<ProtectedRoute requiredRole="SUPERADMIN">` en `App.tsx`).
 */
export default function AdminManagement() {
  const toast = useToast()
  const { mutateAsync, isPending, error, reset } = useCreateAdminMutation()

  const [form, setForm] = useState<FormState>(EMPTY)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const update = (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, [key]: e.target.value }))
    if (fieldErrors[key]) setFieldErrors((s) => ({ ...s, [key]: undefined }))
    if (error) reset()
  }

  const validate = () => {
    const next: FieldErrors = {}
    if (!form.email) next.email = VALIDATION_MESSAGES.EMAIL_REQUIRED
    else if (!EMAIL_RE.test(form.email)) next.email = VALIDATION_MESSAGES.EMAIL_INVALID

    if (!form.name.trim()) next.name = 'El nombre es requerido'

    if (!form.password) next.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED
    else if (form.password.length < MIN_PASSWORD)
      next.password = `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres`

    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isPending || !validate()) return
    try {
      const admin = await mutateAsync({ ...form, name: form.name.trim() })
      toast.success(`Admin ${admin.email} creado correctamente`)
      setForm(EMPTY)
      setFieldErrors({})
    } catch {
      // El mensaje queda en `error` (react-query) y se muestra en el <Alert>.
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <header className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-velora-primary/15 text-velora-primary">
          <ShieldCheck className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-velora-text">Crear nuevo admin</h1>
          <p className="mt-1 text-velora-muted">
            Da de alta una cuenta con rol <strong>ADMIN</strong>. Sólo un SUPERADMIN puede hacerlo.
          </p>
        </div>
      </header>

      <Card title="Datos del nuevo administrador">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            id="admin-email"
            type="email"
            label="Email"
            autoComplete="off"
            placeholder="admin@velora.com"
            value={form.email}
            disabled={isPending}
            error={fieldErrors.email}
            onChange={update('email')}
          />

          <Input
            id="admin-name"
            type="text"
            label="Nombre"
            autoComplete="off"
            placeholder="Juan Pérez"
            value={form.name}
            disabled={isPending}
            error={fieldErrors.name}
            onChange={update('name')}
          />

          <Input
            id="admin-password"
            type="password"
            label="Contraseña"
            autoComplete="new-password"
            placeholder="••••••••"
            revealable
            hint={`Mínimo ${MIN_PASSWORD} caracteres`}
            value={form.password}
            disabled={isPending}
            error={fieldErrors.password}
            onChange={update('password')}
          />

          {error && <Alert type="error">{getApiErrorMessage(error)}</Alert>}

          <Button type="submit" fullWidth loading={isPending}>
            {isPending ? 'Creando…' : 'Crear admin'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
