import { useId } from 'react'
import type { SelectProps } from '@/types/components'
import { cn } from '@lib/utils/helpers'

const FIELD =
  'w-full rounded-lg border bg-velora-bg px-3 py-2 text-sm text-velora-text transition-colors ' +
  'focus:outline-none focus:ring-2 focus:ring-velora-primary disabled:cursor-not-allowed disabled:opacity-60'

export const Select = ({ label, error, options, id, className, ...rest }: SelectProps) => {
  const autoId = useId()
  const fieldId = id ?? autoId

  return (
    <div>
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-velora-text">
          {label}
        </label>
      )}
      <select
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(FIELD, error ? 'border-velora-danger' : 'border-velora-border', className)}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${fieldId}-error`} className="mt-1 text-xs text-velora-danger">
          {error}
        </p>
      )}
    </div>
  )
}
