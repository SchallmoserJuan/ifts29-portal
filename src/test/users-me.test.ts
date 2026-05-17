import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

vi.mock('@/src/lib/auth', () => ({
  getCurrentUser: vi.fn(),
}))

import {getCurrentUser} from '@/src/lib/auth'
import {GET} from '@/app/api/users/me/route'

const mockGetCurrentUser = vi.mocked(getCurrentUser)

beforeEach(() => {
  mockGetCurrentUser.mockReset()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('GET /api/users/me', () => {
  it('returns the authenticated user when a session exists', async () => {
    mockGetCurrentUser.mockResolvedValue({
      id: 1,
      email: 'admin@ifts29.edu.ar',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
    } as any)

    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.user).toMatchObject({
      id: 1,
      email: 'admin@ifts29.edu.ar',
      role: 'admin',
    })
  })

  it('returns user: null when there is no session', async () => {
    mockGetCurrentUser.mockResolvedValue(null)

    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.user).toBeNull()
  })

  it('returns user: null when getCurrentUser throws', async () => {
    mockGetCurrentUser.mockRejectedValue(new Error('DB error'))

    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.user).toBeNull()
  })
})
