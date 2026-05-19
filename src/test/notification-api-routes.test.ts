import {afterEach, describe, expect, it, vi} from 'vitest'

import type {AppUser} from '@/src/types/app'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('next/server', () => ({
  NextResponse: {
    json: (data: unknown, init?: ResponseInit) => Response.json(data, init),
  },
}))

const mockFind = vi.fn()
const mockFindByID = vi.fn()
const mockUpdate = vi.fn()

vi.mock('@/src/lib/payload', () => ({
  getPayloadClient: vi.fn(() =>
    Promise.resolve({
      find: mockFind,
      findByID: mockFindByID,
      update: mockUpdate,
    })
  ),
}))

const mockGetCurrentUser = vi.fn()

vi.mock('@/src/lib/auth', () => ({
  getCurrentUser: mockGetCurrentUser,
}))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeGetRequest = (url = 'http://localhost/api/notifications') =>
  new Request(url, {method: 'GET'})

const makePatchRequest = () =>
  new Request('http://localhost/', {method: 'PATCH'})

const makePostRequest = (body: unknown = {}) =>
  new Request('http://localhost/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  })

const makeParams = (id: string) => ({params: Promise.resolve({id})})

const makeUser = (role: AppUser['role'] = 'teacher'): AppUser => ({
  id: 1,
  email: `${role}@ifts29.edu.ar`,
  role,
})

const makeNotification = (overrides: Record<string, unknown> = {}) => ({
  id: 1,
  type: 'contact_received',
  title: 'Nuevo contacto: Consulta',
  message: 'Quiero información...',
  status: 'new',
  read: false,
  relatedContact: 10,
  ...overrides,
})

const makeContact = (overrides: Record<string, unknown> = {}) => ({
  id: 10,
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  asunto: 'Consulta',
  mensaje: 'Quiero información.',
  status: 'new',
  respondingBy: null,
  ...overrides,
})

// ---------------------------------------------------------------------------
// GET /api/notifications
// ---------------------------------------------------------------------------

describe('GET /api/notifications', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna 200 con datos vacíos cuando no hay usuario autenticado', async () => {
    mockGetCurrentUser.mockResolvedValue(null)

    const {GET} = await import('@/app/api/notifications/route')
    const res = await GET(makeGetRequest())

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({docs: [], totalDocs: 0, totalPages: 0, page: 1})
  })

  it('retorna 200 con datos vacíos cuando el usuario es student', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('student'))

    const {GET} = await import('@/app/api/notifications/route')
    const res = await GET(makeGetRequest())

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({docs: [], totalDocs: 0, totalPages: 0, page: 1})
  })

  it('retorna las notificaciones paginadas para un teacher', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    const notifications = [makeNotification(), makeNotification({id: 2})]
    mockFind.mockResolvedValue({docs: notifications, totalDocs: 2, totalPages: 1, page: 1})

    const {GET} = await import('@/app/api/notifications/route')
    const res = await GET(makeGetRequest())

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.docs).toHaveLength(2)
    expect(body.totalDocs).toBe(2)
    expect(body.page).toBe(1)
  })

  it('retorna las notificaciones paginadas para un admin', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('admin'))
    mockFind.mockResolvedValue({docs: [], totalDocs: 0, totalPages: 0, page: 2})

    const {GET} = await import('@/app/api/notifications/route')
    const res = await GET(makeGetRequest('http://localhost/api/notifications?page=2&limit=5'))

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.page).toBe(2)
  })

  it('respeta los query params page y limit al llamar a payload.find', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFind.mockResolvedValue({docs: [], totalDocs: 0, totalPages: 0, page: 3})

    const {GET} = await import('@/app/api/notifications/route')
    await GET(makeGetRequest('http://localhost/api/notifications?page=3&limit=10'))

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'notifications',
        page: 3,
        limit: 10,
      })
    )
  })

  it('usa page=1 y limit=5 como valores por defecto', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFind.mockResolvedValue({docs: [], totalDocs: 0, totalPages: 0, page: 1})

    const {GET} = await import('@/app/api/notifications/route')
    await GET(makeGetRequest())

    expect(mockFind).toHaveBeenCalledWith(
      expect.objectContaining({page: 1, limit: 5})
    )
  })

  it('retorna 200 con datos vacíos ante un error de payload', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFind.mockRejectedValue(new Error('DB crash'))

    const {GET} = await import('@/app/api/notifications/route')
    const res = await GET(makeGetRequest())

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({docs: [], totalDocs: 0, totalPages: 0, page: 1})
  })
})

// ---------------------------------------------------------------------------
// GET /api/notifications/[id]
// ---------------------------------------------------------------------------

describe('GET /api/notifications/[id]', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna 401 si no hay usuario autenticado', async () => {
    mockGetCurrentUser.mockResolvedValue(null)

    const {GET} = await import('@/app/api/notifications/[id]/route')
    const res = await GET(makeGetRequest(), makeParams('1'))
    expect(res.status).toBe(401)
  })

  it('retorna 401 si el usuario es student', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('student'))

    const {GET} = await import('@/app/api/notifications/[id]/route')
    const res = await GET(makeGetRequest(), makeParams('1'))
    expect(res.status).toBe(401)
  })

  it('retorna la notificación cuando el usuario es teacher', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    const notification = makeNotification({id: 5})
    mockFindByID.mockResolvedValue(notification)

    const {GET} = await import('@/app/api/notifications/[id]/route')
    const res = await GET(makeGetRequest(), makeParams('5'))

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.id).toBe(5)
  })

  it('retorna 500 ante un error de payload', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('admin'))
    mockFindByID.mockRejectedValue(new Error('DB error'))

    const {GET} = await import('@/app/api/notifications/[id]/route')
    const res = await GET(makeGetRequest(), makeParams('1'))
    expect(res.status).toBe(500)
  })
})

// ---------------------------------------------------------------------------
// PATCH /api/notifications/[id]
// ---------------------------------------------------------------------------

describe('PATCH /api/notifications/[id]', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna 401 si no hay usuario autenticado', async () => {
    mockGetCurrentUser.mockResolvedValue(null)

    const {PATCH} = await import('@/app/api/notifications/[id]/route')
    const res = await PATCH(makePatchRequest(), makeParams('1'))
    expect(res.status).toBe(401)
  })

  it('retorna 401 si el usuario es student', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('student'))

    const {PATCH} = await import('@/app/api/notifications/[id]/route')
    const res = await PATCH(makePatchRequest(), makeParams('1'))
    expect(res.status).toBe(401)
  })

  it('retorna 404 si la notificación no existe', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockResolvedValue(null)

    const {PATCH} = await import('@/app/api/notifications/[id]/route')
    const res = await PATCH(makePatchRequest(), makeParams('999'))
    expect(res.status).toBe(404)
  })

  it('actualiza la notificación a status "read" y retorna success', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockResolvedValue(makeNotification())
    mockUpdate.mockResolvedValue({})

    const {PATCH} = await import('@/app/api/notifications/[id]/route')
    const res = await PATCH(makePatchRequest(), makeParams('1'))

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({success: true})
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'notifications',
        data: expect.objectContaining({status: 'read', read: true}),
      })
    )
  })

  it('retorna 500 ante un error de payload', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockRejectedValue(new Error('DB error'))

    const {PATCH} = await import('@/app/api/notifications/[id]/route')
    const res = await PATCH(makePatchRequest(), makeParams('1'))
    expect(res.status).toBe(500)
  })
})

// ---------------------------------------------------------------------------
// POST /api/notifications/[id]/respond
// ---------------------------------------------------------------------------

describe('POST /api/notifications/[id]/respond', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna 401 si no hay usuario autenticado', async () => {
    mockGetCurrentUser.mockResolvedValue(null)

    const {POST} = await import('@/app/api/notifications/[id]/respond/route')
    const res = await POST(makePostRequest(), makeParams('1'))
    expect(res.status).toBe(401)
  })

  it('retorna 401 si el usuario es student', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('student'))

    const {POST} = await import('@/app/api/notifications/[id]/respond/route')
    const res = await POST(makePostRequest(), makeParams('1'))
    expect(res.status).toBe(401)
  })

  it('retorna 404 si la notificación no existe', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockResolvedValue(null)

    const {POST} = await import('@/app/api/notifications/[id]/respond/route')
    const res = await POST(makePostRequest(), makeParams('999'))
    expect(res.status).toBe(404)
  })

  it('retorna 400 si la notificación no tiene contacto relacionado', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockResolvedValue(makeNotification({relatedContact: null}))

    const {POST} = await import('@/app/api/notifications/[id]/respond/route')
    const res = await POST(makePostRequest(), makeParams('1'))
    expect(res.status).toBe(400)
  })

  it('retorna 409 si el contacto ya está siendo respondido por otro usuario', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID
      .mockResolvedValueOnce(makeNotification())
      .mockResolvedValueOnce(makeContact({status: 'responding', respondingBy: 99}))

    const {POST} = await import('@/app/api/notifications/[id]/respond/route')
    const res = await POST(makePostRequest(), makeParams('1'))
    expect(res.status).toBe(409)
  })

  it('no retorna 409 si el contacto está siendo respondido por el mismo usuario', async () => {
    const user = makeUser('teacher')
    mockGetCurrentUser.mockResolvedValue(user)
    mockFindByID
      .mockResolvedValueOnce(makeNotification())
      .mockResolvedValueOnce(makeContact({status: 'responding', respondingBy: user.id}))
    mockUpdate.mockResolvedValue({})

    const {POST} = await import('@/app/api/notifications/[id]/respond/route')
    const res = await POST(makePostRequest(), makeParams('1'))
    expect(res.status).toBe(200)
  })

  it('actualiza el contacto a status "responding" y la notificación a "read"', async () => {
    const user = makeUser('teacher')
    mockGetCurrentUser.mockResolvedValue(user)
    mockFindByID
      .mockResolvedValueOnce(makeNotification({relatedContact: 10}))
      .mockResolvedValueOnce(makeContact())
    mockUpdate.mockResolvedValue({})

    const {POST} = await import('@/app/api/notifications/[id]/respond/route')
    const res = await POST(makePostRequest(), makeParams('1'))

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toMatchObject({success: true, contactId: 10})

    const [contactUpdate, notifUpdate] = mockUpdate.mock.calls
    expect(contactUpdate[0]).toMatchObject({
      collection: 'contacts',
      data: expect.objectContaining({status: 'responding'}),
    })
    expect(notifUpdate[0]).toMatchObject({
      collection: 'notifications',
      data: expect.objectContaining({status: 'read', read: true}),
    })
  })

  it('resuelve el contactId cuando relatedContact es un objeto', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID
      .mockResolvedValueOnce(makeNotification({relatedContact: {id: 10}}))
      .mockResolvedValueOnce(makeContact())
    mockUpdate.mockResolvedValue({})

    const {POST} = await import('@/app/api/notifications/[id]/respond/route')
    const res = await POST(makePostRequest(), makeParams('1'))

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.contactId).toBe(10)
  })

  it('retorna 500 ante un error inesperado', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockRejectedValue(new Error('DB crash'))

    const {POST} = await import('@/app/api/notifications/[id]/respond/route')
    const res = await POST(makePostRequest(), makeParams('1'))
    expect(res.status).toBe(500)
  })
})
