import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { InputProps } from '@/types/components'
import { cn } from '@lib/utils/helpers'

const FIELD =
  'w-full rounded-lg border bg-velora-bg px-3 py-2 text-sm text-velora-text transition-colors ' +
  'placeholder:text-velora-muted focus:outline-none focus:ring-2 focus:ring-velora-primary ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

export const Input = ({
  label,
  error,
  hint,
  revealable = false,
  type = 'text',
  id,
  className,
  ...rest
}: InputProps) => {
  const autoId = useId()
  const fieldId = id ?? autoId
  const [revealed, setRevealed] = useState(false)

  const isPassword = type === 'password'
  const showToggle = isPassword && revealable
  const effectiveType = showToggle && revealed ? 'text' : type
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined

  return (
    <div>
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-velora-text">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={fieldId}
          type={effectiveType}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            FIELD,
            error ? 'border-velora-danger' : 'border-velora-border',
            showToggle && 'pr-10',
            className,
          )}
          {...rest}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-velora-muted transition-colors hover:text-velora-text"
          >
            {revealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${fieldId}-error`} className="mt-1 text-xs text-velora-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${fieldId}-hint`} className="mt-1 text-xs text-velora-muted">
            {hint}
          </p>
        )
      )}
    </div>
  )
}
