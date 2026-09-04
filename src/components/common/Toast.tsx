import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import type { ToastItem, ToastOptions, ToastType } from '@/types/components'
import { cn } from '@lib/utils/helpers'

const DEFAULT_DURATION = 3500

const ICON: Record<ToastType, LucideIcon> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const TONE: Record<ToastType, string> = {
  success: 'text-velora-success',
  error: 'text-velora-danger',
  warning: 'text-velora-warning',
  info: 'text-velora-primary',
}

interface ToastContextValue {
  show: (message: string, options?: ToastOptions) => number
  success: (message: string, options?: ToastOptions) => number
  error: (message: string, options?: ToastOptions) => number
  warning: (message: string, options?: ToastOptions) => number
  info: (message: string, options?: ToastOptions) => number
  dismiss: (id: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>')
  return ctx
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const seq = useRef(0)
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>())

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const show = useCallback(
    (message: string, options?: ToastOptions) => {
      seq.current += 1
      const id = seq.current
      const duration = options?.duration ?? DEFAULT_DURATION
      const item: ToastItem = { id, message, type: options?.type ?? 'info', duration }
      setToasts((list) => [...list, item])
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        )
      }
      return id
    },
    [dismiss],
  )

  const value = useMemo<ToastContextValue>(
    () => ({
      show,
      dismiss,
      success: (message, options) => show(message, { ...options, type: 'success' }),
      error: (message, options) => show(message, { ...options, type: 'error' }),
      warning: (message, options) => show(message, { ...options, type: 'warning' }),
      info: (message, options) => show(message, { ...options, type: 'info' }),
    }),
    [show, dismiss],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
          {toasts.map((toast) => {
            const Icon = ICON[toast.type]
            return (
              <div
                key={toast.id}
                role="status"
                className="pointer-events-auto flex animate-velora-slide-in-right items-start gap-3 rounded-xl border border-velora-border bg-velora-surface p-3 text-sm shadow-lg"
              >
                <Icon className={cn('mt-0.5 size-4 shrink-0', TONE[toast.type])} />
                <p className="min-w-0 flex-1 text-velora-text">{toast.message}</p>
                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  aria-label="Cerrar notificación"
                  className="-m-1 shrink-0 rounded-md p-1 text-velora-muted transition-colors hover:text-velora-text"
                >
                  <X className="size-4" />
                </button>
              </div>
            )
          })}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}
