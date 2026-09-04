import { cn } from '@lib/utils/helpers'

interface SpinnerProps {
  className?: string
  label?: string
}

/** Indicador de carga circular. Hereda el color vía `currentColor`. */
export const Spinner = ({ className, label = 'Cargando' }: SpinnerProps) => (
  <span
    role="status"
    aria-label={label}
    className={cn(
      'inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent',
      className,
    )}
  />
)
