import type { BadgeProps, BadgeSize, BadgeVariant } from '@/types/components'
import type { UserStatus, UserTier } from '@/types'
import type { ReportedUserStatus, Severity } from '@/types/moderation'
import { cn } from '@lib/utils/helpers'

const VARIANT_STYLE: Record<BadgeVariant, string> = {
  neutral: 'bg-velora-surface-2 text-velora-muted',
  success: 'bg-velora-success/15 text-velora-success',
  warning: 'bg-velora-warning/15 text-velora-warning',
  danger: 'bg-velora-danger/15 text-velora-danger',
  info: 'bg-velora-primary/15 text-velora-primary',
}

const SIZE_STYLE: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[0.6875rem]',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
}

/** Badge genérico tipo pill. Para tier/status usa los específicos de abajo. */
export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className,
}: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full font-medium',
      VARIANT_STYLE[variant],
      SIZE_STYLE[size],
      className,
    )}
  >
    {icon}
    {children}
  </span>
)

const TIER_STYLE: Record<UserTier, string> = {
  FREE: 'bg-velora-surface-2 text-velora-muted',
  PREMIUM: 'bg-velora-primary/15 text-velora-primary',
  PRO_COACHING: 'bg-velora-success/15 text-velora-success',
}
const TIER_LABEL: Record<UserTier, string> = {
  FREE: 'Free',
  PREMIUM: 'Premium',
  PRO_COACHING: 'Pro Coaching',
}

const STATUS_STYLE: Record<UserStatus, string> = {
  ACTIVE: 'bg-velora-success/15 text-velora-success',
  SUSPENDED: 'bg-velora-danger/15 text-velora-danger',
}
const STATUS_LABEL: Record<UserStatus, string> = {
  ACTIVE: 'Activo',
  SUSPENDED: 'Suspendido',
}

const base = 'inline-flex rounded-full px-2 py-0.5 text-xs font-medium'

export const TierBadge = ({ tier }: { tier: UserTier }) => (
  <span className={cn(base, TIER_STYLE[tier])}>{TIER_LABEL[tier]}</span>
)

export const StatusBadge = ({ status }: { status: UserStatus }) => (
  <span className={cn(base, STATUS_STYLE[status])}>{STATUS_LABEL[status]}</span>
)

const SEVERITY_STYLE: Record<Severity, string> = {
  LOW: 'bg-velora-caution/15 text-velora-caution',
  MEDIUM: 'bg-velora-warning/15 text-velora-warning',
  HIGH: 'bg-velora-danger/15 text-velora-danger',
}
const SEVERITY_LABEL: Record<Severity, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
}

export const SeverityBadge = ({ severity }: { severity: Severity }) => (
  <span className={cn(base, SEVERITY_STYLE[severity])}>{SEVERITY_LABEL[severity]}</span>
)

const REPORTED_STYLE: Record<ReportedUserStatus, string> = {
  ACTIVE: 'bg-velora-success/15 text-velora-success',
  WARNED: 'bg-velora-warning/15 text-velora-warning',
  BANNED: 'bg-velora-danger/15 text-velora-danger',
}
const REPORTED_LABEL: Record<ReportedUserStatus, string> = {
  ACTIVE: 'Activo',
  WARNED: 'Advertido',
  BANNED: 'Baneado',
}

export const ReportedUserBadge = ({ status }: { status: ReportedUserStatus }) => (
  <span className={cn(base, REPORTED_STYLE[status])}>{REPORTED_LABEL[status]}</span>
)
