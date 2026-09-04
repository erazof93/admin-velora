import { describe, expect, it } from 'vitest'
import { ROLE_LABELS, isAdminRole, isSuperAdmin } from './roles'

describe('roles helpers', () => {
  it('isAdminRole sólo es true para ADMIN y SUPERADMIN', () => {
    expect(isAdminRole('ADMIN')).toBe(true)
    expect(isAdminRole('SUPERADMIN')).toBe(true)
    expect(isAdminRole('CLIENTE')).toBe(false)
    expect(isAdminRole('COACH')).toBe(false)
    expect(isAdminRole(null)).toBe(false)
    expect(isAdminRole(undefined)).toBe(false)
  })

  it('isSuperAdmin sólo es true para SUPERADMIN', () => {
    expect(isSuperAdmin('SUPERADMIN')).toBe(true)
    expect(isSuperAdmin('ADMIN')).toBe(false)
    expect(isSuperAdmin(null)).toBe(false)
  })

  it('ROLE_LABELS cubre los cuatro roles', () => {
    expect(Object.keys(ROLE_LABELS)).toHaveLength(4)
    expect(ROLE_LABELS.SUPERADMIN).toBe('Superadmin')
  })
})
