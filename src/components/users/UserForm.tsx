import { useState, type FormEvent } from 'react'
import type { AdminUser, UserStatus, UserTier } from '@/types'
import type { SelectOption } from '@/types/components'
import type { UserFormValues } from '@/types/users'
import { Button } from '@components/common/Button'
import { Input } from '@components/common/Input'
import { Modal } from '@components/common/Modal'
import { Select } from '@components/common/Select'
import { useToast } from '@components/common/Toast'
import { useUserMutations } from '@hooks/useUsers'
import { isEmail, isNotEmpty } from '@lib/utils/validation'

const TIER_OPTS: SelectOption[] = [
  { value: 'FREE', label: 'Free' },
  { value: 'PREMIUM', label: 'Premium' },
  { value: 'PRO_COACHING', label: 'Pro Coaching' },
]
const STATUS_OPTS: SelectOption[] = [
  { value: 'ACTIVE', label: 'Activo' },
  { value: 'SUSPENDED', label: 'Suspendido' },
]
const EMPTY: UserFormValues = { name: '', email: '', tier: 'FREE', status: 'ACTIVE' }

interface UserFormProps {
  open: boolean
  onClose: () => void
  user?: AdminUser | null
}

/**
 * Se monta con `key` distinta por objetivo (ver UsersList), así `useState`
 * arranca con los valores correctos sin sincronizar vía efecto.
 */
export const UserForm = ({ open, onClose, user }: UserFormProps) => {
  const { create, update } = useUserMutations()
  const toast = useToast()
  const [values, setValues] = useState<UserFormValues>(() =>
    user ? { name: user.name, email: user.email, tier: user.tier, status: user.status } : EMPTY,
  )
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  const isEdit = Boolean(user)
  const pending = create.isPending || update.isPending

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const next: { name?: string; email?: string } = {}
    if (!isNotEmpty(values.name)) next.name = 'El nombre es requerido'
    if (!isEmail(values.email)) next.email = 'Email inválido'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const done = () => {
      toast.success(isEdit ? 'Usuario actualizado.' : 'Usuario creado.')
      onClose()
    }

    if (user) {
      update.mutate({ id: user.id, values }, { onSuccess: done })
    } else {
      create.mutate(values, { onSuccess: done })
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar usuario' : 'Crear usuario'}
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="user-form" size="sm" loading={pending}>
            Guardar
          </Button>
        </>
      }
    >
      <form id="user-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          id="uf-name"
          label="Nombre"
          placeholder="Nombre y apellido"
          value={values.name}
          error={errors.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        />

        <Input
          id="uf-email"
          type="email"
          label="Email"
          placeholder="usuario@velora.io"
          value={values.email}
          error={errors.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            id="uf-tier"
            label="Tier"
            options={TIER_OPTS}
            value={values.tier}
            onChange={(e) => setValues((v) => ({ ...v, tier: e.target.value as UserTier }))}
          />
          <Select
            id="uf-status"
            label="Estado"
            options={STATUS_OPTS}
            value={values.status}
            onChange={(e) => setValues((v) => ({ ...v, status: e.target.value as UserStatus }))}
          />
        </div>
      </form>
    </Modal>
  )
}
