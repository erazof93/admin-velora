/**
 * Contratos de props de la librería de componentes base (FASE 9).
 * La implementación vive en `src/components/common/*`.
 */
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react'

// ─── Button ─────────────────────────────────────────────────────────────
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost'
  | 'outline'
  | 'success'
  | 'warning'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Muestra spinner y deshabilita el botón. */
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

// ─── Card ───────────────────────────────────────────────────────────────
export interface CardProps {
  children: ReactNode
  className?: string
  /** Título opcional; renderiza cabecera con borde inferior. */
  title?: ReactNode
  /** Contenido a la derecha de la cabecera (acciones). */
  actions?: ReactNode
  /** Pie opcional; renderiza con borde superior. */
  footer?: ReactNode
  /** Quita el padding del cuerpo (útil para tablas). */
  noPadding?: boolean
}

// ─── Input ──────────────────────────────────────────────────────────────
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode
  error?: string
  /** Texto de ayuda bajo el campo cuando no hay error. */
  hint?: string
  /** Para type="password": muestra botón ojo para revelar. */
  revealable?: boolean
}

// ─── Select ─────────────────────────────────────────────────────────────
export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: ReactNode
  error?: string
  options: SelectOption[]
}

// ─── Badge ──────────────────────────────────────────────────────────────
export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: ReactNode
  className?: string
}

// ─── Modal ──────────────────────────────────────────────────────────────
export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  size?: ModalSize
  /** Si es `false`, click en el backdrop no cierra. Default: `true`. */
  closeOnBackdrop?: boolean
}

// ─── ConfirmDialog ──────────────────────────────────────────────────────
export interface ConfirmDialogProps {
  open: boolean
  title: string
  message: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  loading?: boolean
  onConfirm: () => void
  onClose: () => void
}

// ─── Dropdown ───────────────────────────────────────────────────────────
export interface DropdownItem {
  label: string
  onClick?: () => void
  icon?: ReactNode
  danger?: boolean
  disabled?: boolean
  /** Renderiza un separador; el resto de campos se ignoran. */
  divider?: boolean
}

export interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  /** Alineación del panel respecto al trigger. Default: `end`. */
  align?: 'start' | 'end'
  className?: string
}

// ─── Toast ──────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastOptions {
  type?: ToastType
  /** Milisegundos antes de auto-cerrar. `0` desactiva el auto-cierre. Default: 3500. */
  duration?: number
}

export interface ToastItem extends Required<ToastOptions> {
  id: number
  message: string
}

// ─── Alert ──────────────────────────────────────────────────────────────
export type AlertType = 'success' | 'warning' | 'error' | 'info'

export interface AlertProps {
  type?: AlertType
  title?: ReactNode
  children: ReactNode
  onClose?: () => void
  className?: string
}

// ─── Pagination ─────────────────────────────────────────────────────────
export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

// ─── Skeleton ───────────────────────────────────────────────────────────
export interface SkeletonProps {
  className?: string
}
