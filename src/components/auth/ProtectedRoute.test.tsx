import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { AdminRole } from '@/types'
import { ProtectedRoute } from './ProtectedRoute'

const auth = vi.hoisted(() => ({
  state: {
    isAuthenticated: false,
    isLoading: false,
    user: null as { role: AdminRole } | null,
  },
}))

vi.mock('@hooks/useAuth', () => ({ useAuth: () => auth.state }))

const setAuth = (isAuthenticated: boolean, role?: AdminRole) => {
  auth.state.isAuthenticated = isAuthenticated
  auth.state.user = role ? { role } : null
}

const renderAt = (initialPath: string, element: ReactNode) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path={initialPath} element={element} />
        <Route path="/login" element={<p>login page</p>} />
        <Route path="/dashboard" element={<p>dashboard page</p>} />
      </Routes>
    </MemoryRouter>,
  )

describe('<ProtectedRoute />', () => {
  beforeEach(() => setAuth(false))

  it('redirige a /login si no hay sesión', () => {
    renderAt('/x', <ProtectedRoute>secret</ProtectedRoute>)
    expect(screen.getByText('login page')).toBeInTheDocument()
  })

  it('redirige a /login si el rol no es admin (CLIENTE)', () => {
    setAuth(true, 'CLIENTE')
    renderAt('/x', <ProtectedRoute>secret</ProtectedRoute>)
    expect(screen.getByText('login page')).toBeInTheDocument()
  })

  it('deja pasar a un ADMIN en una ruta de admin', () => {
    setAuth(true, 'ADMIN')
    renderAt('/x', <ProtectedRoute>secret content</ProtectedRoute>)
    expect(screen.getByText('secret content')).toBeInTheDocument()
  })

  it('redirige un ADMIN al dashboard en rutas requiredRole="SUPERADMIN"', () => {
    setAuth(true, 'ADMIN')
    renderAt('/x', <ProtectedRoute requiredRole="SUPERADMIN">secret</ProtectedRoute>)
    expect(screen.getByText('dashboard page')).toBeInTheDocument()
  })

  it('deja pasar a un SUPERADMIN en rutas requiredRole="SUPERADMIN"', () => {
    setAuth(true, 'SUPERADMIN')
    renderAt('/x', <ProtectedRoute requiredRole="SUPERADMIN">superadmin content</ProtectedRoute>)
    expect(screen.getByText('superadmin content')).toBeInTheDocument()
  })
})
