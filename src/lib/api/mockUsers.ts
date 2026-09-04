import type { AdminUser, UserRole, UserStatus, UserTier } from '@/types'

const FIRST = [
  'Lucía',
  'Marco',
  'Sofía',
  'Iván',
  'Nora',
  'Pedro',
  'Marta',
  'Diego',
  'Carla',
  'Hugo',
  'Elena',
  'Raúl',
  'Bea',
  'Tomás',
  'Alba',
  'Nico',
  'Rosa',
  'Gael',
  'Vera',
  'Bruno',
  'Julia',
  'Óscar',
  'Emma',
  'Mateo',
  'Ruth',
  'César',
  'Ana',
  'Pau',
  'Iris',
  'Leo',
  'Sara',
  'Dani',
  'Noa',
  'Aitor',
  'Cloe',
  'Marc',
  'Nuria',
  'Adrián',
  'Lola',
  'Héctor',
  'Alex',
  'Chloe',
  'Guille',
  'Marina',
  'Kevin',
  'Ines',
  'Pablo',
]
const LAST = [
  'Fernández',
  'Díaz',
  'Romero',
  'Castro',
  'Beltrán',
  'Salas',
  'León',
  'Ortiz',
  'Vidal',
  'Prieto',
  'Gil',
  'Mora',
  'Ríos',
  'Vega',
  'Cano',
  'Bravo',
  'Nieto',
  'Pardo',
  'Lara',
  'Cruz',
]
const TIERS: UserTier[] = ['FREE', 'FREE', 'FREE', 'PREMIUM', 'PREMIUM', 'PRO_COACHING']
const ROLES: UserRole[] = ['athlete', 'athlete', 'athlete', 'coach']
const STATUSES: UserStatus[] = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'SUSPENDED']

const ACCENTS: Record<string, string> = {
  á: 'a',
  é: 'e',
  í: 'i',
  ó: 'o',
  ú: 'u',
  ü: 'u',
  ñ: 'n',
}

const slug = (value: string) => value.toLowerCase().replace(/[áéíóúüñ]/g, (ch) => ACCENTS[ch] ?? ch)

function seed(): AdminUser[] {
  return FIRST.map((first, i) => {
    const last = LAST[i % LAST.length]
    return {
      id: `u${String(i + 1).padStart(3, '0')}`,
      name: `${first} ${last}`,
      email: `${slug(first)}.${slug(last)}@velora.io`,
      role: ROLES[i % ROLES.length],
      tier: TIERS[i % TIERS.length],
      status: STATUSES[i % STATUSES.length],
      createdAt: new Date(Date.UTC(2025, i % 12, (i % 27) + 1)).toISOString(),
      followers: (i * 37) % 900,
      activities: (i * 13) % 300,
    }
  })
}

/** Lista mutable en memoria: create/update/delete se reflejan en la UI cuando USE_MOCKS. */
export const mockUserDb: AdminUser[] = seed()
