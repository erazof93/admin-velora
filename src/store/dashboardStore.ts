import { create } from 'zustand'

interface DashboardState {
  autoRefresh: boolean
  lastRefresh: number | null
  setAutoRefresh: (value: boolean) => void
  toggleAutoRefresh: () => void
  setLastRefresh: (timestamp: number) => void
}

/** Estado transitorio del dashboard (no persistido). */
export const useDashboardStore = create<DashboardState>()((set) => ({
  autoRefresh: true,
  lastRefresh: null,
  setAutoRefresh: (value) => set({ autoRefresh: value }),
  toggleAutoRefresh: () => set((state) => ({ autoRefresh: !state.autoRefresh })),
  setLastRefresh: (timestamp) => set({ lastRefresh: timestamp }),
}))
