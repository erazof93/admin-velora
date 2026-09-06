import type {
  CoachApplication,
  CoachApplicationStatus,
} from '@/types/coaches'
import { API_ENDPOINTS } from '@constants/api'
import apiClient from './client'
import { USE_MOCKS } from './mock'

const delay = () => new Promise<void>((resolve) => setTimeout(resolve, 220))

// ─── Mocks mutables en memoria ──────────────────────────────────────────
const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString()

const mockApplications: CoachApplication[] = [
  {
    id: 'ca1',
    userId: 'u101',
    name: 'Lucía Prados',
    email: 'lucia.prados@example.com',
    phone: '+34 600 111 222',
    experience:
      '6 años corriendo en club, 2 como monitora de iniciación. Nivel I de la federación.',
    bio: 'Iniciación y 10K. Paciente y metódica con los planes.',
    status: 'pending',
    reviewNote: null,
    createdAt: minutesAgo(180),
    reviewedAt: null,
  },
  {
    id: 'ca2',
    userId: 'u102',
    name: 'Óscar Benítez',
    email: 'oscar.benitez@example.com',
    phone: '+34 611 333 444',
    experience:
      'Preparador físico titulado, 4 años dando planes de fuerza para runners.',
    bio: 'Fuerza y prevención de lesiones para corredores de fondo.',
    status: 'pending',
    reviewNote: null,
    createdAt: minutesAgo(600),
    reviewedAt: null,
  },
  {
    id: 'ca3',
    userId: 'u103',
    name: 'Nerea Gil',
    email: 'nerea.gil@example.com',
    phone: '+34 622 555 666',
    experience: 'Solo he corrido una 10K popular.',
    bio: null,
    status: 'rejected',
    reviewNote: 'Experiencia insuficiente para el marketplace.',
    createdAt: minutesAgo(2880),
    reviewedAt: minutesAgo(2600),
  },
]

function resolve(id: string, status: CoachApplicationStatus, note?: string) {
  const app = mockApplications.find((a) => a.id === id)
  if (!app) return
  app.status = status
  app.reviewNote = note ?? null
  app.reviewedAt = new Date().toISOString()
}

// ─── API ────────────────────────────────────────────────────────────────
export const coachApplicationsAPI = {
  list: async (status?: CoachApplicationStatus): Promise<CoachApplication[]> => {
    if (USE_MOCKS) {
      await delay()
      const rows = status
        ? mockApplications.filter((a) => a.status === status)
        : mockApplications
      return [...rows].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    }
    const { data } = await apiClient.get<CoachApplication[]>(
      API_ENDPOINTS.COACHES.APPLICATIONS,
      { params: { status } },
    )
    return data
  },

  approve: async (id: string, note?: string): Promise<void> => {
    if (USE_MOCKS) {
      await delay()
      resolve(id, 'approved', note)
      return
    }
    await apiClient.post(API_ENDPOINTS.COACHES.APPROVE(id), { note })
  },

  reject: async (id: string, note?: string): Promise<void> => {
    if (USE_MOCKS) {
      await delay()
      resolve(id, 'rejected', note)
      return
    }
    await apiClient.post(API_ENDPOINTS.COACHES.REJECT(id), { note })
  },
}
