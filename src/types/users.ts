import type { UserStatus, UserTier } from './admin'

export type TierFilter = UserTier | 'TODOS'
export type StatusFilter = UserStatus | 'TODOS'

export interface UsersFilters {
  search: string
  tier: TierFilter
  status: StatusFilter
}

export interface UserFormValues {
  name: string
  email: string
  tier: UserTier
  status: UserStatus
}

export type BulkAction = 'ban' | 'promote' | 'delete'

export interface BulkActionPayload {
  ids: string[]
  action: BulkAction
}
