import type { ButtonProps, ButtonSize, ButtonVariant } from '@/types/components'
import { cn } from '@lib/utils/helpers'
import { Spinner } from './Spinner'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-velora-primary focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-velora-bg disabled:cursor-not-allowed disabled:opacity-50'

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-velora-primary text-white hover:bg-velora-primary-hover',
  secondary: 'bg-velora-surface-2 text-velora-text hover:bg-velora-border',
  danger: 'bg-velora-danger text-white hover:opacity-90',
  ghost: 'text-velora-muted hover:bg-velora-surface-2 hover:text-velora-text',
  outline:
    'border border-velora-border text-velora-text hover:border-velora-primary hover:text-velora-primary',
  success: 'bg-velora-success/15 text-velora-success hover:bg-velora-success/25',
  warning: 'bg-velora-warning/15 text-velora-warning hover:bg-velora-warning/25',
}

const SIZE: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2.5 text-base',
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  children,
  type,
  ...rest
}: ButtonProps) => (
  <button
    type={type ?? 'button'}
    disabled={disabled ?? loading}
    aria-busy={loading || undefined}
    className={cn(BASE, VARIANT[variant], SIZE[size], fullWidth && 'w-full', className)}
    {...rest}
  >
    {loading ? <Spinner className="size-4" /> : leftIcon}
    {children}
    {!loading && rightIcon}
  </button>
)
