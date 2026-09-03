/** Textos de UI centralizados. */

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: '¡Bienvenido al Admin Velora!',
  LOGIN_ERROR: 'Email o contraseña incorrectos',
  LOGIN_REQUIRED: 'Debe iniciar sesión',
  SESSION_EXPIRED: 'Su sesión ha expirado',
  NETWORK_ERROR: 'Error de conexión. Intente nuevamente',
  LOGOUT_SUCCESS: 'Sesión cerrada',
} as const

export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'El email es requerido',
  EMAIL_INVALID: 'Ingrese un email válido',
  PASSWORD_REQUIRED: 'La contraseña es requerida',
  PASSWORD_MIN: 'La contraseña debe tener al menos 6 caracteres',
} as const

/** Mensajes genéricos (usados fuera del flujo de auth). */
export const MESSAGES = {
  errors: {
    generic: 'Algo salió mal. Intenta de nuevo.',
    network: 'No se pudo conectar con el servidor.',
    unauthorized: 'Tu sesión expiró. Inicia sesión de nuevo.',
    notFound: 'Recurso no encontrado.',
  },
  success: {
    saved: 'Cambios guardados.',
    deleted: 'Eliminado correctamente.',
  },
} as const
