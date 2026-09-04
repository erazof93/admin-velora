import type {
  FlaggedComment,
  ModerationActionPayload,
  ModerationHistoryEntry,
  ModerationStats,
  ReportedUser,
} from '@/types/moderation'
import { API_ENDPOINTS } from '@constants/api'
import apiClient from './client'
import { USE_MOCKS } from './mock'

const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 220))
const minutesAgo = (min: number) => new Date(Date.now() - min * 60_000).toISOString()

// ─── Mocks mutables en memoria ──────────────────────────────────────────
const flaggedDb: FlaggedComment[] = [
  {
    id: 'f1',
    author: 'Diego Ortiz',
    authorId: 'u008',
    text: 'Este plan de entrenamiento es una estafa, el coach no responde nunca y encima cobra de más. No lo recomiendo a nadie.',
    createdAt: minutesAgo(180),
    severity: 'MEDIUM',
    flagsCount: 4,
    reportedBy: 'Carla Vidal',
    reportReason: 'Lenguaje ofensivo / difamación',
    reportedAt: minutesAgo(95),
  },
  {
    id: 'f2',
    author: 'Hugo Prieto',
    authorId: 'u010',
    text: 'jajaja menudo inútil, así no vas a correr una maratón en tu vida',
    createdAt: minutesAgo(300),
    severity: 'HIGH',
    flagsCount: 7,
    reportedBy: 'Marta León',
    reportReason: 'Acoso a otro usuario',
    reportedAt: minutesAgo(60),
  },
  {
    id: 'f3',
    author: 'Nora Beltrán',
    authorId: 'u005',
    text: 'Alguien sabe dónde comprar suplementos baratos? paso link por privado si queréis',
    createdAt: minutesAgo(420),
    severity: 'LOW',
    flagsCount: 2,
    reportedBy: 'Pedro Salas',
    reportReason: 'Spam / promoción no autorizada',
    reportedAt: minutesAgo(140),
  },
  {
    id: 'f4',
    author: 'Iván Castro',
    authorId: 'u004',
    text: 'El comentario anterior es totalmente falso, yo entrené con ese coach y fue excelente.',
    createdAt: minutesAgo(90),
    severity: 'LOW',
    flagsCount: 1,
    reportedBy: 'Diego Ortiz',
    reportReason: 'Reporte por venganza',
    reportedAt: minutesAgo(40),
  },
  {
    id: 'f5',
    author: 'Sofía Romero',
    authorId: 'u003',
    text: 'CONTENIDO ELIMINADO POR EL AUTOR — texto original con insultos reiterados',
    createdAt: minutesAgo(600),
    severity: 'HIGH',
    flagsCount: 9,
    reportedBy: 'Elena Gil',
    reportReason: 'Insultos reiterados',
    reportedAt: minutesAgo(30),
  },
]

const reportedUsersDb: ReportedUser[] = [
  { id: 'u010', name: 'Hugo Prieto', reportsCount: 12, status: 'WARNED' },
  { id: 'u003', name: 'Sofía Romero', reportsCount: 9, status: 'WARNED' },
  { id: 'u008', name: 'Diego Ortiz', reportsCount: 6, status: 'ACTIVE' },
  { id: 'u005', name: 'Nora Beltrán', reportsCount: 3, status: 'ACTIVE' },
  { id: 'u002', name: 'Marco Díaz', reportsCount: 1, status: 'ACTIVE' },
]

const historyDb: ModerationHistoryEntry[] = [
  {
    id: 'h1',
    at: minutesAgo(12),
    action: 'reject',
    admin: 'Ana Ruiz',
    target: 'Comentario #f9',
    reason: 'Sin infracción real',
  },
  {
    id: 'h2',
    at: minutesAgo(38),
    action: 'ban',
    admin: 'Ana Ruiz',
    target: 'Kevin Lara',
    reason: 'Acoso reiterado',
  },
  {
    id: 'h3',
    at: minutesAgo(74),
    action: 'delete',
    admin: 'Luis Mora',
    target: 'Comentario #f7',
    reason: 'Spam con enlaces',
  },
  {
    id: 'h4',
    at: minutesAgo(120),
    action: 'approve',
    admin: 'Ana Ruiz',
    target: 'Comentario #f6',
    reason: 'Contenido válido',
  },
  {
    id: 'h5',
    at: minutesAgo(180),
    action: 'reject',
    admin: 'Luis Mora',
    target: 'Comentario #f5',
    reason: 'Reporte improcedente',
  },
  {
    id: 'h6',
    at: minutesAgo(240),
    action: 'delete',
    admin: 'Ana Ruiz',
    target: 'Comentario #f4',
    reason: 'Lenguaje ofensivo',
  },
  {
    id: 'h7',
    at: minutesAgo(320),
    action: 'approve',
    admin: 'Luis Mora',
    target: 'Comentario #f3',
    reason: 'Sin problema',
  },
  {
    id: 'h8',
    at: minutesAgo(410),
    action: 'ban',
    admin: 'Ana Ruiz',
    target: 'Raúl Vega',
    reason: 'Suplantación de identidad',
  },
  {
    id: 'h9',
    at: minutesAgo(520),
    action: 'reject',
    admin: 'Luis Mora',
    target: 'Comentario #f2',
    reason: 'Falso positivo',
  },
  {
    id: 'h10',
    at: minutesAgo(640),
    action: 'delete',
    admin: 'Ana Ruiz',
    target: 'Comentario #f1',
    reason: 'Contenido duplicado',
  },
]

let approvedCount = 148
let rejectedCount = 63
let bannedCount = 11

function pushHistory(action: ModerationHistoryEntry['action'], target: string, reason: string) {
  historyDb.unshift({
    id: `h${Date.now().toString(36)}`,
    at: new Date().toISOString(),
    action,
    admin: 'Ana Ruiz',
    target,
    reason,
  })
  if (historyDb.length > 30) historyDb.length = 30
}

function applyAction(
  comment: FlaggedComment,
  action: ModerationActionPayload['action'],
  reason: string,
) {
  const idx = flaggedDb.findIndex((item) => item.id === comment.id)
  if (idx !== -1) flaggedDb.splice(idx, 1)

  if (action === 'approve') approvedCount += 1
  if (action === 'reject') rejectedCount += 1
  if (action === 'delete') rejectedCount += 1
  if (action === 'ban') {
    bannedCount += 1
    const reported = reportedUsersDb.find((user) => user.id === comment.authorId)
    if (reported) reported.status = 'BANNED'
  }

  pushHistory(
    action,
    action === 'ban' ? comment.author : `Comentario #${comment.id}`,
    reason || 'Acción de moderación',
  )
}

// ─── API ────────────────────────────────────────────────────────────────
export const moderationAPI = {
  getFlagged: async (): Promise<FlaggedComment[]> => {
    if (USE_MOCKS) {
      await delay()
      return [...flaggedDb]
    }
    const { data } = await apiClient.get<FlaggedComment[]>(API_ENDPOINTS.MODERATION.FLAGGED)
    return data
  },

  getReportedUsers: async (): Promise<ReportedUser[]> => {
    if (USE_MOCKS) {
      await delay()
      return [...reportedUsersDb].sort((a, b) => b.reportsCount - a.reportsCount)
    }
    const { data } = await apiClient.get<ReportedUser[]>(API_ENDPOINTS.MODERATION.USERS)
    return data
  },

  getHistory: async (): Promise<ModerationHistoryEntry[]> => {
    if (USE_MOCKS) {
      await delay()
      return [...historyDb]
        .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
        .slice(0, 10)
    }
    const { data } = await apiClient.get<ModerationHistoryEntry[]>(API_ENDPOINTS.MODERATION.HISTORY)
    return data
  },

  getStats: async (): Promise<ModerationStats> => {
    if (USE_MOCKS) {
      await delay()
      const pending = flaggedDb.length
      return {
        reported: approvedCount + rejectedCount + pending,
        approved: approvedCount,
        rejected: rejectedCount,
        banned: bannedCount,
        reportedToday: pending + 6,
        resolved: approvedCount + rejectedCount,
        pending,
      }
    }
    const { data } = await apiClient.get<ModerationStats>(API_ENDPOINTS.MODERATION.STATS)
    return data
  },

  act: async ({ commentId, action, reason = '' }: ModerationActionPayload): Promise<void> => {
    if (USE_MOCKS) {
      await delay()
      const comment = flaggedDb.find((item) => item.id === commentId)
      if (comment) applyAction(comment, action, reason)
      return
    }
    await apiClient.post(API_ENDPOINTS.MODERATION.ACTION, { commentId, action, reason })
  },

  bulk: async (action: 'approve' | 'reject'): Promise<void> => {
    if (USE_MOCKS) {
      await delay()
      // copia: applyAction hace splice sobre flaggedDb mientras iteramos
      const snapshot = flaggedDb.slice()
      for (const comment of snapshot) {
        applyAction(
          comment,
          action,
          action === 'approve' ? 'Aprobado en lote' : 'Rechazado en lote',
        )
      }
      return
    }
    await apiClient.post(API_ENDPOINTS.MODERATION.ACTION, { action, bulk: true })
  },
}
