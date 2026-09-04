import { create } from 'zustand'
import type { StatusFilter, TierFilter } from '@/types/users'

interface FiltersState {
  search: string
  tier: TierFilter
  status: StatusFilter
  setSearch: (value: string) => void
  setTier: (value: TierFilter) => void
  setStatus: (value: StatusFilter) => void
  reset: () => void
}

const INITIAL: Pick<FiltersState, 'search' | 'tier' | 'status'> = {
  search: '',
  tier: 'TODOS',
  status: 'TODOS',
}

export const useFiltersStore = create<FiltersState>()((set) => ({
  ...INITIAL,
  setSearch: (search) => set({ search }),
  setTier: (tier) => set({ tier }),
  setStatus: (status) => set({ status }),
  reset: () => set(INITIAL),
}))
