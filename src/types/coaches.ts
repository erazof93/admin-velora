export type CoachApplicationStatus = 'pending' | 'approved' | 'rejected'

/** `GET /coach/applications` — solicitud de un usuario para ser coach. */
export interface CoachApplication {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  experience: string
  bio: string | null
  status: CoachApplicationStatus
  reviewNote: string | null
  createdAt: string
  reviewedAt: string | null
}

export interface ReviewApplicationPayload {
  id: string
  note?: string
}
