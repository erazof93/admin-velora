import axios from 'axios'
import { MESSAGES } from '@constants/messages'

/**
 * Extrae un mensaje legible de un error de API (axios o `Error` genérico).
 * El backend de NestJS devuelve `message` como string o array de strings.
 */
export function getApiErrorMessage(error: unknown, fallback = MESSAGES.errors.generic): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message
    if (typeof message === 'string') return message
    if (Array.isArray(message) && typeof message[0] === 'string') return message[0]
    if (error.code === 'ERR_NETWORK') return MESSAGES.errors.network
    if (error.response?.status === 403) return MESSAGES.errors.unauthorized
  }
  if (error instanceof Error && error.message) return error.message
  return fallback
}
