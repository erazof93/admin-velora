import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { AuthResponse, User } from '@/types'
import { AUTH_MESSAGES } from '@constants/messages'
import { useAuthStore } from './authStore'

const { login, storage } = vi.hoisted(() => ({
  login: vi.fn(),
  storage: {
    getToken: vi.fn(() => null as string | null),
    getUser: vi.fn(() => null as User | null),
    setToken: vi.fn(),
    setRefreshToken: vi.fn(),
    setUser: vi.fn(),
    clear: vi.fn(),
  },
}))

vi.mock('axios', () => ({
  default: {
    isAxiosError: (e: unknown): boolean =>
      typeof e === 'object' && e !== null && 'isAxiosError' in e,
  },
}))
vi.mock('@lib/api/endpoints', () => ({ authAPI: { login } }))
vi.mock('@lib/storage/auth', () => ({ authStorage: storage }))

const user: User = {
  id: 'u1',
  email: 'admin@velora.com',
  name: 'Admin',
  role: 'ADMIN',
  createdAt: '2026-01-01',
}
const authResponse: AuthResponse = {
  token: 'tok',
  refreshToken: 'refresh',
  user,
}

describe('authStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  })

  it('login OK persiste la sesión y marca isAuthenticated', async () => {
    login.mockResolvedValueOnce(authResponse)

    await useAuthStore.getState().login('admin@velora.com', 'secret')

    expect(storage.setToken).toHaveBeenCalledWith('tok')
    expect(storage.setRefreshToken).toHaveBeenCalledWith('refresh')
    expect(storage.setUser).toHaveBeenCalledWith(user)

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(true)
    expect(state.user).toEqual(user)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('login KO deja un mensaje de error, isLoading=false y relanza', async () => {
    login.mockRejectedValueOnce(new Error('boom'))

    await expect(
      useAuthStore.getState().login('admin@velora.com', 'bad'),
    ).rejects.toThrow('boom')

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
    expect(state.error).toBe(AUTH_MESSAGES.LOGIN_ERROR)
    expect(storage.setToken).not.toHaveBeenCalled()
  })

  it('login KO usa el mensaje del backend si viene en la respuesta', async () => {
    login.mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: 'Cuenta bloqueada' } },
    })

    await expect(
      useAuthStore.getState().login('a@b.com', 'x'),
    ).rejects.toBeDefined()

    expect(useAuthStore.getState().error).toBe('Cuenta bloqueada')
  })

  it('login KO traduce ERR_NETWORK a NETWORK_ERROR', async () => {
    login.mockRejectedValueOnce({ isAxiosError: true, code: 'ERR_NETWORK' })

    await expect(
      useAuthStore.getState().login('a@b.com', 'x'),
    ).rejects.toBeDefined()

    expect(useAuthStore.getState().error).toBe(AUTH_MESSAGES.NETWORK_ERROR)
  })

  it('logout limpia storage y estado', () => {
    useAuthStore.setState({ token: 'tok', user, isAuthenticated: true })

    useAuthStore.getState().logout()

    expect(storage.clear).toHaveBeenCalledOnce()
    const state = useAuthStore.getState()
    expect(state).toMatchObject({
      token: null,
      user: null,
      isAuthenticated: false,
      error: null,
    })
  })

  it('clearError borra el error', () => {
    useAuthStore.setState({ error: 'algo' })
    useAuthStore.getState().clearError()
    expect(useAuthStore.getState().error).toBeNull()
  })
})
