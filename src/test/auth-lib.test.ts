import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

const {mockGetPayloadClient: mockGPC, mockCookies: mockCk, mockRedirect: mockRd} = vi.hoisted(() => ({
  mockGetPayloadClient: vi.fn(),
  mockCookies: vi.fn(),
  mockRedirect: vi.fn(),
}))

vi.mock('next/headers', () => ({
  cookies: mockCk,
}))

vi.mock('next/navigation', () => ({
  redirect: mockRd,
}))

vi.mock('@/src/lib/payload', () => ({
  getPayloadClient: mockGPC,
}))

import {getCurrentUser, requireApprovedStudent, requireUser} from '@/src/lib/auth'
import type {AppUser} from '@/src/types/app'

const makeUser = (overrides: Partial<AppUser> = {}): AppUser => ({
  id: 1,
  email: 'admin@ifts29.edu.ar',
  role: 'admin',
  dni: '12345678',
  status: 'approved',
  ...overrides,
})

beforeEach(() => {
  mockCk.mockResolvedValue({
    getAll: () => [{name: 'payload-token', value: 'tok_abc123'}],
  })
})

afterEach(() => {
  mockGPC.mockReset()
  mockCk.mockReset()
  mockRd.mockReset()
})

describe('getCurrentUser', () => {
  it('retorna el usuario autenticado cuando payload.auth responde OK', async () => {
    const user = makeUser()
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockResolvedValue({user}),
    })

    const result = await getCurrentUser()

    expect(result).toEqual(user)
    expect(mockCk).toHaveBeenCalledOnce()
    expect(mockGPC).toHaveBeenCalledOnce()
  })

  it('llama a payload.auth con el cookie header', async () => {
    const mockAuth = vi.fn().mockResolvedValue({user: makeUser()})
    mockGPC.mockResolvedValue({auth: mockAuth})

    await getCurrentUser()

    const [[opts]] = mockAuth.mock.calls
    const cookieHeader = (opts as {headers: Headers}).headers.get('cookie')
    expect(cookieHeader).toContain('payload-token=tok_abc123')
  })

  it('retorna null cuando no hay cookie de sesion', async () => {
    mockCk.mockResolvedValue({getAll: () => []})
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockResolvedValue({user: null}),
    })

    const result = await getCurrentUser()

    expect(result).toBeNull()
  })

  it('retorna null cuando payload.auth devuelve null', async () => {
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockResolvedValue({user: null}),
    })

    const result = await getCurrentUser()

    expect(result).toBeNull()
  })

  it('retorna null cuando payload.auth lanza un error', async () => {
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockRejectedValue(new Error('Payload error')),
    })

    const result = await getCurrentUser()

    expect(result).toBeNull()
  })

  it('retorna null cuando getPayloadClient lanza un error', async () => {
    mockGPC.mockRejectedValue(new Error('Connection failed'))

    const result = await getCurrentUser()

    expect(result).toBeNull()
  })
})

describe('requireUser', () => {
  it('retorna el usuario cuando esta autenticado', async () => {
    const user = makeUser()
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockResolvedValue({user}),
    })

    const result = await requireUser()

    expect(result).toEqual(user)
    expect(mockRd).not.toHaveBeenCalled()
  })

  it('redirige a /login cuando no hay usuario', async () => {
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockResolvedValue({user: null}),
    })
    mockRd.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT')
    })

    await expect(requireUser()).rejects.toThrow('NEXT_REDIRECT')
    expect(mockRd).toHaveBeenCalledWith('/login')
  })
})

describe('requireApprovedStudent', () => {
  it('retorna el usuario cuando es admin', async () => {
    const user = makeUser({role: 'admin'})
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockResolvedValue({user}),
    })

    const result = await requireApprovedStudent()

    expect(result).toEqual(user)
    expect(mockRd).not.toHaveBeenCalled()
  })

  it('retorna el usuario cuando es teacher', async () => {
    const user = makeUser({role: 'teacher'})
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockResolvedValue({user}),
    })

    const result = await requireApprovedStudent()

    expect(result).toEqual(user)
    expect(mockRd).not.toHaveBeenCalled()
  })

  it('retorna el usuario student aprobado sin redirigir', async () => {
    const user = makeUser({role: 'student', status: 'approved'})
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockResolvedValue({user}),
    })

    const result = await requireApprovedStudent()

    expect(result).toEqual(user)
    expect(mockRd).not.toHaveBeenCalled()
  })

  it('redirige a /pendiente cuando student tiene status pending', async () => {
    const user = makeUser({role: 'student', status: 'pending'})
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockResolvedValue({user}),
    })
    mockRd.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT')
    })

    await expect(requireApprovedStudent()).rejects.toThrow('NEXT_REDIRECT')
    expect(mockRd).toHaveBeenCalledWith('/pendiente')
  })

  it('redirige a /login cuando student tiene status rejected', async () => {
    const user = makeUser({role: 'student', status: 'rejected'})
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockResolvedValue({user}),
    })
    mockRd.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT')
    })

    await expect(requireApprovedStudent()).rejects.toThrow('NEXT_REDIRECT')
    expect(mockRd).toHaveBeenCalledWith('/login')
  })

  it('redirige a /login cuando no hay usuario autenticado', async () => {
    mockGPC.mockResolvedValue({
      auth: vi.fn().mockResolvedValue({user: null}),
    })
    mockRd.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT')
    })

    await expect(requireApprovedStudent()).rejects.toThrow('NEXT_REDIRECT')
    expect(mockRd).toHaveBeenCalledWith('/login')
  })
})
