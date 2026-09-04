import { Search, X } from 'lucide-react'
import type { SelectOption } from '@/types/components'
import type { StatusFilter, TierFilter } from '@/types/users'
import { Button } from '@components/common/Button'
import { Select } from '@components/common/Select'
import { useFiltersStore } from '@store/filtersStore'

const TIER_OPTS: SelectOption[] = [
  { value: 'TODOS', label: 'Todos los tiers' },
  { value: 'FREE', label: 'Free' },
  { value: 'PREMIUM', label: 'Premium' },
  { value: 'PRO_COACHING', label: 'Pro Coaching' },
]
const STATUS_OPTS: SelectOption[] = [
  { value: 'TODOS', label: 'Todos los estados' },
  { value: 'ACTIVE', label: 'Activos' },
  { value: 'SUSPENDED', label: 'Suspendidos' },
]

interface UserFiltersProps {
  onChange: () => void
}

export const UserFilters = ({ onChange }: UserFiltersProps) => {
  const filters = useFiltersStore()
  const dirty = filters.search !== '' || filters.tier !== 'TODOS' || filters.status !== 'TODOS'

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-velora-muted" />
        <input
          value={filters.search}
          onChange={(e) => {
            filters.setSearch(e.target.value)
            onChange()
          }}
          placeholder="Buscar por nombre o email…"
          className="w-full rounded-lg border border-velora-border bg-velora-bg py-2 pl-9 pr-3 text-sm text-velora-text placeholder:text-velora-muted focus:outline-none focus:ring-2 focus:ring-velora-primary"
        />
      </div>

      <Select
        aria-label="Filtrar por tier"
        options={TIER_OPTS}
        value={filters.tier}
        onChange={(e) => {
          filters.setTier(e.target.value as TierFilter)
          onChange()
        }}
      />

      <Select
        aria-label="Filtrar por estado"
        options={STATUS_OPTS}
        value={filters.status}
        onChange={(e) => {
          filters.setStatus(e.target.value as StatusFilter)
          onChange()
        }}
      />

      {dirty && (
        <Button
          variant="ghost"
          size="md"
          leftIcon={<X className="size-3.5" />}
          onClick={() => {
            filters.reset()
            onChange()
          }}
        >
          Limpiar
        </Button>
      )}
    </div>
  )
}
