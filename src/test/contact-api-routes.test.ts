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

const mockCreate = vi.fn()
const mockFind = vi.fn()
const mockFindByID = vi.fn()
const mockUpdate = vi.fn()

vi.mock('@/src/lib/payload', () => ({
  getPayloadClient: vi.fn(() =>
    Promise.resolve({
      create: mockCreate,
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

const mockSendReplyEmail = vi.fn()

vi.mock('@/src/lib/email', () => ({
  sendReplyEmail: mockSendReplyEmail,
}))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makePostRequest = (body: unknown) =>
  new Request('http://localhost/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  })

const makeGetRequest = () => new Request('http://localhost/', {method: 'GET'})

const makeParams = (id: string) => ({params: Promise.resolve({id})})

const makeUser = (role: AppUser['role'] = 'teacher'): AppUser => ({
  id: 1,
  email: `${role}@ifts29.edu.ar`,
  role,
})

const makeContact = (id = 1) => ({
  id,
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  asunto: 'Consulta sobre inscripción',
  mensaje: 'Quiero información sobre la carrera.',
  status: 'new',
})

// ---------------------------------------------------------------------------
// POST /api/contact — formulario público
// ---------------------------------------------------------------------------

describe('POST /api/contact', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna 400 si falta el campo nombre', async () => {
    const {POST} = await import('@/app/api/contact/route')
    const res = await POST(makePostRequest({email: 'a@b.com', asunto: 'Hola', mensaje: 'Mensaje'}))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toBeDefined()
  })

  it('retorna 400 si falta el campo email', async () => {
    const {POST} = await import('@/app/api/contact/route')
    const res = await POST(makePostRequest({nombre: 'Juan', asunto: 'Hola', mensaje: 'Mensaje'}))
    expect(res.status).toBe(400)
  })

  it('retorna 400 si falta el campo asunto', async () => {
    const {POST} = await import('@/app/api/contact/route')
    const res = await POST(makePostRequest({nombre: 'Juan', email: 'a@b.com', mensaje: 'Mensaje'}))
    expect(res.status).toBe(400)
  })

  it('retorna 400 si falta el campo mensaje', async () => {
    const {POST} = await import('@/app/api/contact/route')
    const res = await POST(makePostRequest({nombre: 'Juan', email: 'a@b.com', asunto: 'Hola'}))
    expect(res.status).toBe(400)
  })

  it('crea el contacto con status "new"', async () => {
    mockCreate.mockResolvedValueOnce(makeContact(42)).mockResolvedValueOnce({id: 1})

    const {POST} = await import('@/app/api/contact/route')
    await POST(
      makePostRequest({nombre: 'Juan', email: 'juan@example.com', asunto: 'Hola', mensaje: 'Mensaje'})
    )

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'contacts',
        data: expect.objectContaining({status: 'new'}),
      })
    )
  })

  it('retorna success con el contactId al crear correctamente', async () => {
    mockCreate.mockResolvedValueOnce(makeContact(42)).mockResolvedValueOnce({id: 1})

    const {POST} = await import('@/app/api/contact/route')
    const res = await POST(
      makePostRequest({nombre: 'Juan', email: 'juan@example.com', asunto: 'Hola', mensaje: 'Mensaje'})
    )

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({success: true, contactId: 42})
  })

  it('trunca el mensaje a 100 chars en la notificación cuando supera el límite', async () => {
    const mensajeLargo = 'A'.repeat(150)
    mockCreate.mockResolvedValueOnce(makeContact()).mockResolvedValueOnce({id: 1})

    const {POST} = await import('@/app/api/contact/route')
    await POST(
      makePostRequest({nombre: 'Juan', email: 'juan@example.com', asunto: 'Hola', mensaje: mensajeLargo})
    )

    const notificationCall = mockCreate.mock.calls[1][0]
    expect(notificationCall.data.message).toHaveLength(103)
    expect(notificationCall.data.message).toMatch(/\.\.\.$/)

  })

  it('no trunca el mensaje si tiene 100 chars o menos', async () => {
    const mensajeCorto = 'A'.repeat(100)
    mockCreate.mockResolvedValueOnce(makeContact()).mockResolvedValueOnce({id: 1})

    const {POST} = await import('@/app/api/contact/route')
    await POST(
      makePostRequest({nombre: 'Juan', email: 'juan@example.com', asunto: 'Hola', mensaje: mensajeCorto})
    )

    const notificationCall = mockCreate.mock.calls[1][0]
    expect(notificationCall.data.message).toHaveLength(100)
    expect(notificationCall.data.message).not.toMatch(/\.\.\.$/)

  })

  it('retorna success aunque falle la creación de la notificación', async () => {
    mockCreate
      .mockResolvedValueOnce(makeContact(5))
      .mockRejectedValueOnce(new Error('notification DB error'))

    const {POST} = await import('@/app/api/contact/route')
    const res = await POST(
      makePostRequest({nombre: 'Juan', email: 'juan@example.com', asunto: 'Hola', mensaje: 'Mensaje'})
    )

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('retorna 500 si falla la creación del contacto en DB', async () => {
    mockCreate.mockRejectedValueOnce(new Error('DB connection failed'))

    const {POST} = await import('@/app/api/contact/route')
    const res = await POST(
      makePostRequest({nombre: 'Juan', email: 'juan@example.com', asunto: 'Hola', mensaje: 'Mensaje'})
    )

    expect(res.status).toBe(500)
  })
})

// ---------------------------------------------------------------------------
// GET /api/contacts/[id]
// ---------------------------------------------------------------------------

describe('GET /api/contacts/[id]', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna 401 si no hay usuario autenticado', async () => {
    mockGetCurrentUser.mockResolvedValue(null)

    const {GET} = await import('@/app/api/contacts/[id]/route')
    const res = await GET(makeGetRequest(), makeParams('1'))
    expect(res.status).toBe(401)
  })

  it('retorna 401 si el usuario es student', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('student'))

    const {GET} = await import('@/app/api/contacts/[id]/route')
    const res = await GET(makeGetRequest(), makeParams('1'))
    expect(res.status).toBe(401)
  })

  it('retorna el contacto cuando el usuario es teacher', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockResolvedValue(makeContact(1))

    const {GET} = await import('@/app/api/contacts/[id]/route')
    const res = await GET(makeGetRequest(), makeParams('1'))

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual(makeContact(1))
  })

  it('retorna el contacto cuando el usuario es admin', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('admin'))
    mockFindByID.mockResolvedValue(makeContact(7))

    const {GET} = await import('@/app/api/contacts/[id]/route')
    const res = await GET(makeGetRequest(), makeParams('7'))

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.id).toBe(7)
  })

  it('retorna 404 si el contacto no existe', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('admin'))
    mockFindByID.mockResolvedValue(null)

    const {GET} = await import('@/app/api/contacts/[id]/route')
    const res = await GET(makeGetRequest(), makeParams('999'))
    expect(res.status).toBe(404)
  })

  it('retorna 500 si payload lanza un error inesperado', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockRejectedValue(new Error('DB error'))

    const {GET} = await import('@/app/api/contacts/[id]/route')
    const res = await GET(makeGetRequest(), makeParams('1'))
    expect(res.status).toBe(500)
  })
})

// ---------------------------------------------------------------------------
// POST /api/contacts/[id]/reply
// ---------------------------------------------------------------------------

describe('POST /api/contacts/[id]/reply', () => {
  afterEach(() => vi.clearAllMocks())

  it('retorna 401 si no hay usuario autenticado', async () => {
    mockGetCurrentUser.mockResolvedValue(null)

    const {POST} = await import('@/app/api/contacts/[id]/reply/route')
    const res = await POST(makePostRequest({reply: 'Mi respuesta'}), makeParams('1'))
    expect(res.status).toBe(401)
  })

  it('retorna 401 si el usuario es student', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('student'))

    const {POST} = await import('@/app/api/contacts/[id]/reply/route')
    const res = await POST(makePostRequest({reply: 'Mi respuesta'}), makeParams('1'))
    expect(res.status).toBe(401)
  })

  it('retorna 400 si el reply está vacío', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))

    const {POST} = await import('@/app/api/contacts/[id]/reply/route')
    const res = await POST(makePostRequest({reply: ''}), makeParams('1'))
    expect(res.status).toBe(400)
  })

  it('retorna 400 si el reply no es string', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))

    const {POST} = await import('@/app/api/contacts/[id]/reply/route')
    const res = await POST(makePostRequest({reply: 123}), makeParams('1'))
    expect(res.status).toBe(400)
  })

  it('retorna 404 si el contacto no existe', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockResolvedValue(null)

    const {POST} = await import('@/app/api/contacts/[id]/reply/route')
    const res = await POST(makePostRequest({reply: 'Mi respuesta'}), makeParams('999'))
    expect(res.status).toBe(404)
  })

  it('retorna 500 si el envío de email falla', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockResolvedValue(makeContact(1))
    mockSendReplyEmail.mockResolvedValue(false)

    const {POST} = await import('@/app/api/contacts/[id]/reply/route')
    const res = await POST(makePostRequest({reply: 'Mi respuesta'}), makeParams('1'))
    expect(res.status).toBe(500)
  })

  it('actualiza el contacto a status "replied" y retorna success', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockResolvedValue(makeContact(1))
    mockSendReplyEmail.mockResolvedValue(true)
    mockFind.mockResolvedValue({docs: []})
    mockUpdate.mockResolvedValue({})

    const {POST} = await import('@/app/api/contacts/[id]/reply/route')
    const res = await POST(makePostRequest({reply: 'Mi respuesta'}), makeParams('1'))

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({success: true})
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'contacts',
        data: expect.objectContaining({status: 'replied', reply: 'Mi respuesta'}),
      })
    )
  })

  it('actualiza la notificación relacionada cuando existe', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockResolvedValue(makeContact(1))
    mockSendReplyEmail.mockResolvedValue(true)
    mockFind.mockResolvedValue({docs: [{id: 99}]})
    mockUpdate.mockResolvedValue({})

    const {POST} = await import('@/app/api/contacts/[id]/reply/route')
    await POST(makePostRequest({reply: 'Mi respuesta'}), makeParams('1'))

    expect(mockUpdate).toHaveBeenCalledTimes(2)
    const notifCall = mockUpdate.mock.calls[1][0]
    expect(notifCall).toMatchObject({
      collection: 'notifications',
      id: 99,
      data: expect.objectContaining({status: 'replied', read: true}),
    })
  })

  it('no actualiza notificación si no existe ninguna relacionada', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockResolvedValue(makeContact(1))
    mockSendReplyEmail.mockResolvedValue(true)
    mockFind.mockResolvedValue({docs: []})
    mockUpdate.mockResolvedValue({})

    const {POST} = await import('@/app/api/contacts/[id]/reply/route')
    await POST(makePostRequest({reply: 'Mi respuesta'}), makeParams('1'))

    expect(mockUpdate).toHaveBeenCalledTimes(1)
  })

  it('retorna 500 ante un error inesperado', async () => {
    mockGetCurrentUser.mockResolvedValue(makeUser('teacher'))
    mockFindByID.mockRejectedValue(new Error('DB crash'))

    const {POST} = await import('@/app/api/contacts/[id]/reply/route')
    const res = await POST(makePostRequest({reply: 'Mi respuesta'}), makeParams('1'))
    expect(res.status).toBe(500)
  })
})

// ---------------------------------------------------------------------------
// GET y POST /api/contacts — rutas de redirección
// ---------------------------------------------------------------------------

describe('GET /api/contacts', () => {
  it('retorna 400 indicando que se use /api/contacts/[id]', async () => {
    const {GET} = await import('@/app/api/contacts/route')
    const res = await GET()
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toContain('/api/contacts/[id]')
  })
})

describe('POST /api/contacts', () => {
  it('retorna 400 indicando que se use /api/contacts/[id]/reply', async () => {
    const {POST} = await import('@/app/api/contacts/route')
    const res = await POST()
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toContain('/api/contacts/[id]/reply')
  })
})
