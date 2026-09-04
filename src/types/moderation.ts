export type Severity = 'LOW' | 'MEDIUM' | 'HIGH'
export type ModerationAction = 'approve' | 'reject' | 'delete' | 'ban'
export type ReportedUserStatus = 'ACTIVE' | 'WARNED' | 'BANNED'

export interface FlaggedComment {
  id: string
  author: string
  authorId: string
  text: string
  createdAt: string
  severity: Severity
  flagsCount: number
  reportedBy: string
  reportReason: string
  reportedAt: string
}

export interface ReportedUser {
  id: string
  name: string
  reportsCount: number
  status: ReportedUserStatus
}

export interface ModerationHistoryEntry {
  id: string
  at: string
  action: ModerationAction
  admin: string
  target: string
  reason: string
}

export interface ModerationStats {
  reported: number
  approved: number
  rejected: number
  banned: number
  reportedToday: number
  resolved: number
  pending: number
}

export interface ModerationActionPayload {
  commentId: string
  action: ModerationAction
  reason?: string
}
