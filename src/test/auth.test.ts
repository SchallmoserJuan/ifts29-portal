import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import type {AppUser} from '@/src/types/app'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

const mockCookieGetAll = vi.fn()

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => Promise.resolve({getAll: mockCookieGetAll})),
}))

const mockRedirect = vi.fn()

vi.mock('next/navigation', () => ({
  redirect: (url: string) => {
    mockRedirect(url)
    throw new Error(`NEXT_REDIRECT:${url}`)
  },
}))

const mockPayloadAuth = vi.fn()

vi.mock('@/src/lib/payload', () => ({
  getPayloadClient: vi.fn(() =>
    Promise.resolve({
      auth: mockPayloadAuth,
    }),
  ),
}))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeUser = (overrides: Partial<AppUser> = {}): AppUser => ({
  id: 1,
  email: 'user@ifts29.edu.ar',
  role: 'student',
  ...overrides,
})

// ---------------------------------------------------------------------------
// getCurrentUser
// ---------------------------------------------------------------------------

describe('getCurrentUser', () => {
  beforeEach(() => {
    mockCookieGetAll.mockReturnValue([])
    mockPayloadAuth.mockResolvedValue({user: null})
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('retorna null cuando no hay sesión activa', async () => {
    const {getCurrentUser} = await import('@/src/lib/auth')

    const result = await getCurrentUser()

    expect(result).toBeNull()
  })

  it('retorna el usuario cuando payload.auth resuelve con un user válido', async () => {
    const user = makeUser({role: 'admin'})
    mockPayloadAuth.mockResolvedValue({user})

    const {getCurrentUser} = await import('@/src/lib/auth')
    const result = await getCurrentUser()

    expect(result).toEqual(user)
  })

  it('construye el cookie header correctamente a partir de las cookies del store', async () => {
    mockCookieGetAll.mockReturnValue([
      {name: 'payload-token', value: 'abc123'},
      {name: 'csrftoken', value: 'xyz789'},
    ])
    mockPayloadAuth.mockResolvedValue({user: null})

    const {getCurrentUser} = await import('@/src/lib/auth')
    await getCurrentUser()

    const [[{headers}]] = mockPayloadAuth.mock.calls
    expect(headers.get('cookie')).toBe('payload-token=abc123; csrftoken=xyz789')
  })

  it('retorna null cuando payload.auth lanza un error', async () => {
    mockPayloadAuth.mockRejectedValue(new Error('DB connection failed'))

    const {getCurrentUser} = await import('@/src/lib/auth')
    const result = await getCurrentUser()

    expect(result).toBeNull()
  })

  it('retorna null cuando payload.auth devuelve user como undefined', async () => {
    mockPayloadAuth.mockResolvedValue({user: undefined})

    const {getCurrentUser} = await import('@/src/lib/auth')
    const result = await getCurrentUser()

    expect(result).toBeNull()
  })

  it('retorna null cuando no hay cookies en el store', async () => {
    mockCookieGetAll.mockReturnValue([])
    mockPayloadAuth.mockResolvedValue({user: null})

    const {getCurrentUser} = await import('@/src/lib/auth')
    const result = await getCurrentUser()

    expect(result).toBeNull()
  })

  it('preserva todos los campos del usuario retornado por payload', async () => {
    const user = makeUser({
      id: 42,
      email: 'docente@ifts29.edu.ar',
      role: 'teacher',
      firstName: 'Juan',
      lastName: 'Pérez',
    })
    mockPayloadAuth.mockResolvedValue({user})

    const {getCurrentUser} = await import('@/src/lib/auth')
    const result = await getCurrentUser()

    expect(result).toMatchObject({
      id: 42,
      email: 'docente@ifts29.edu.ar',
      role: 'teacher',
      firstName: 'Juan',
      lastName: 'Pérez',
    })
  })
})

// ---------------------------------------------------------------------------
// requireUser
// ---------------------------------------------------------------------------

describe('requireUser', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('retorna el usuario cuando hay sesión activa', async () => {
    const user = makeUser({role: 'student'})
    mockCookieGetAll.mockReturnValue([])
    mockPayloadAuth.mockResolvedValue({user})

    const {requireUser} = await import('@/src/lib/auth')
    const result = await requireUser()

    expect(result).toEqual(user)
  })

  it('llama a redirect("/login") cuando no hay sesión', async () => {
    mockCookieGetAll.mockReturnValue([])
    mockPayloadAuth.mockResolvedValue({user: null})

    const {requireUser} = await import('@/src/lib/auth')

    await expect(requireUser()).rejects.toThrow('NEXT_REDIRECT:/login')
    expect(mockRedirect).toHaveBeenCalledWith('/login')
  })

  it('llama a redirect("/login") cuando payload.auth lanza un error', async () => {
    mockCookieGetAll.mockReturnValue([])
    mockPayloadAuth.mockRejectedValue(new Error('timeout'))

    const {requireUser} = await import('@/src/lib/auth')

    await expect(requireUser()).rejects.toThrow('NEXT_REDIRECT:/login')
    expect(mockRedirect).toHaveBeenCalledWith('/login')
  })

  it('no llama a redirect cuando el usuario es admin', async () => {
    const user = makeUser({role: 'admin'})
    mockCookieGetAll.mockReturnValue([])
    mockPayloadAuth.mockResolvedValue({user})

    const {requireUser} = await import('@/src/lib/auth')
    const result = await requireUser()

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(result).toEqual(user)
  })

  it('no llama a redirect cuando el usuario es teacher', async () => {
    const user = makeUser({role: 'teacher'})
    mockCookieGetAll.mockReturnValue([])
    mockPayloadAuth.mockResolvedValue({user})

    const {requireUser} = await import('@/src/lib/auth')
    const result = await requireUser()

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(result).toEqual(user)
  })
})
