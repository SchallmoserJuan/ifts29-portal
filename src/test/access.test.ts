import {describe, expect, it, vi} from 'vitest'

import {
  allowFirstUserOrAdmin,
  canAccessAdmin,
  canAccessNotifications,
  canDeleteContent,
  canManageContent,
  canManageUsers,
  documentReadAccess,
  isAdmin,
  isStaff,
  isStudent,
  isTeacher,
  publicRead,
  publishedOnlyOrStaff,
  selfOrAdminRead,
  selfOrAdminUpdate,
} from '@/src/access'
import type {AppUser} from '@/src/types/app'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const makeUser = (role: AppUser['role'], id: number | string = 1): AppUser => ({
  id,
  email: `${role}@ifts29.edu.ar`,
  role,
})

const makeReq = (user: Partial<AppUser> | null = null, payloadOverrides = {}) => ({
  user,
  payload: {count: vi.fn().mockResolvedValue({totalDocs: 0}), ...payloadOverrides},
  headers: new Headers(),
})

// ---------------------------------------------------------------------------
// isAdmin / isTeacher / isStudent / isStaff
// ---------------------------------------------------------------------------

describe('isAdmin', () => {
  it('retorna true para usuario con rol admin', () => {
    expect(isAdmin(makeUser('admin'))).toBe(true)
  })

  it('retorna false para teacher', () => {
    expect(isAdmin(makeUser('teacher'))).toBe(false)
  })

  it('retorna false para student', () => {
    expect(isAdmin(makeUser('student'))).toBe(false)
  })

  it('retorna false para null', () => {
    expect(isAdmin(null)).toBe(false)
  })

  it('retorna false para undefined', () => {
    expect(isAdmin(undefined)).toBe(false)
  })
})

describe('isTeacher', () => {
  it('retorna true para usuario con rol teacher', () => {
    expect(isTeacher(makeUser('teacher'))).toBe(true)
  })

  it('retorna false para admin', () => {
    expect(isTeacher(makeUser('admin'))).toBe(false)
  })

  it('retorna false para student', () => {
    expect(isTeacher(makeUser('student'))).toBe(false)
  })

  it('retorna false para null', () => {
    expect(isTeacher(null)).toBe(false)
  })
})

describe('isStudent', () => {
  it('retorna true para usuario con rol student', () => {
    expect(isStudent(makeUser('student'))).toBe(true)
  })

  it('retorna false para admin', () => {
    expect(isStudent(makeUser('admin'))).toBe(false)
  })

  it('retorna false para teacher', () => {
    expect(isStudent(makeUser('teacher'))).toBe(false)
  })

  it('retorna false para null', () => {
    expect(isStudent(null)).toBe(false)
  })
})

describe('isStaff', () => {
  it('retorna true para admin', () => {
    expect(isStaff(makeUser('admin'))).toBe(true)
  })

  it('retorna true para teacher', () => {
    expect(isStaff(makeUser('teacher'))).toBe(true)
  })

  it('retorna false para student', () => {
    expect(isStaff(makeUser('student'))).toBe(false)
  })

  it('retorna false para null', () => {
    expect(isStaff(null)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// canAccessNotifications
// ---------------------------------------------------------------------------

describe('canAccessNotifications', () => {
  it('permite acceso a admin', () => {
    expect(canAccessNotifications({req: makeReq(makeUser('admin'))} as never)).toBe(true)
  })

  it('permite acceso a teacher', () => {
    expect(canAccessNotifications({req: makeReq(makeUser('teacher'))} as never)).toBe(true)
  })

  it('deniega acceso a student', () => {
    expect(canAccessNotifications({req: makeReq(makeUser('student'))} as never)).toBe(false)
  })

  it('deniega acceso a usuario no autenticado', () => {
    expect(canAccessNotifications({req: makeReq(null)} as never)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// canAccessAdmin
// ---------------------------------------------------------------------------

describe('canAccessAdmin', () => {
  it('permite acceso a admin', () => {
    expect(canAccessAdmin({req: makeReq(makeUser('admin'))})).toBe(true)
  })

  it('permite acceso a teacher', () => {
    expect(canAccessAdmin({req: makeReq(makeUser('teacher'))})).toBe(true)
  })

  it('deniega acceso a student', () => {
    expect(canAccessAdmin({req: makeReq(makeUser('student'))})).toBe(false)
  })

  it('deniega acceso a usuario no autenticado', () => {
    expect(canAccessAdmin({req: makeReq(null)})).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// canManageUsers
// ---------------------------------------------------------------------------

describe('canManageUsers', () => {
  it('permite gestión de usuarios solo a admin', () => {
    expect(canManageUsers({req: makeReq(makeUser('admin'))} as never)).toBe(true)
  })

  it('deniega gestión de usuarios a teacher', () => {
    expect(canManageUsers({req: makeReq(makeUser('teacher'))} as never)).toBe(false)
  })

  it('deniega gestión de usuarios a student', () => {
    expect(canManageUsers({req: makeReq(makeUser('student'))} as never)).toBe(false)
  })

  it('deniega gestión de usuarios a no autenticado', () => {
    expect(canManageUsers({req: makeReq(null)} as never)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// canManageContent / canDeleteContent
// ---------------------------------------------------------------------------

describe('canManageContent', () => {
  it('permite a admin', () => {
    expect(canManageContent({req: makeReq(makeUser('admin'))} as never)).toBe(true)
  })

  it('permite a teacher', () => {
    expect(canManageContent({req: makeReq(makeUser('teacher'))} as never)).toBe(true)
  })

  it('deniega a student', () => {
    expect(canManageContent({req: makeReq(makeUser('student'))} as never)).toBe(false)
  })
})

describe('canDeleteContent', () => {
  it('permite a admin', () => {
    expect(canDeleteContent({req: makeReq(makeUser('admin'))} as never)).toBe(true)
  })

  it('permite a teacher', () => {
    expect(canDeleteContent({req: makeReq(makeUser('teacher'))} as never)).toBe(true)
  })

  it('deniega a student', () => {
    expect(canDeleteContent({req: makeReq(makeUser('student'))} as never)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// publicRead
// ---------------------------------------------------------------------------

describe('publicRead', () => {
  it('siempre retorna true independientemente del usuario', () => {
    expect(publicRead({req: makeReq(null)} as never)).toBe(true)
    expect(publicRead({req: makeReq(makeUser('student'))} as never)).toBe(true)
    expect(publicRead({req: makeReq(makeUser('admin'))} as never)).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// publishedOnlyOrStaff
// ---------------------------------------------------------------------------

describe('publishedOnlyOrStaff', () => {
  it('retorna true para admin (ve todo el contenido)', () => {
    expect(publishedOnlyOrStaff({req: makeReq(makeUser('admin'))} as never)).toBe(true)
  })

  it('retorna true para teacher (ve todo el contenido)', () => {
    expect(publishedOnlyOrStaff({req: makeReq(makeUser('teacher'))} as never)).toBe(true)
  })

  it('retorna filtro de publicados para student', () => {
    const result = publishedOnlyOrStaff({req: makeReq(makeUser('student'))} as never)
    expect(result).toEqual({status: {equals: 'published'}})
  })

  it('retorna filtro de publicados para usuario no autenticado', () => {
    const result = publishedOnlyOrStaff({req: makeReq(null)} as never)
    expect(result).toEqual({status: {equals: 'published'}})
  })
})

// ---------------------------------------------------------------------------
// documentReadAccess
// ---------------------------------------------------------------------------

describe('documentReadAccess', () => {
  it('retorna true para admin (accede a todos los documentos)', () => {
    expect(documentReadAccess({req: makeReq(makeUser('admin'))} as never)).toBe(true)
  })

  it('retorna true para teacher (accede a todos los documentos)', () => {
    expect(documentReadAccess({req: makeReq(makeUser('teacher'))} as never)).toBe(true)
  })

  it('retorna filtro de documentos públicos y de estudiantes para student', () => {
    const result = documentReadAccess({req: makeReq(makeUser('student'))} as never)
    expect(result).toEqual({
      or: [
        {visibility: {equals: 'public'}},
        {visibility: {equals: 'students'}},
      ],
    })
  })

  it('retorna solo documentos públicos para usuario no autenticado', () => {
    const result = documentReadAccess({req: makeReq(null)} as never)
    expect(result).toEqual({visibility: {equals: 'public'}})
  })
})

// ---------------------------------------------------------------------------
// selfOrAdminRead / selfOrAdminUpdate
// ---------------------------------------------------------------------------

describe('selfOrAdminRead', () => {
  it('retorna false cuando no hay usuario autenticado', () => {
    expect(selfOrAdminRead({req: makeReq(null)} as never)).toBe(false)
  })

  it('retorna true para admin (puede ver cualquier usuario)', () => {
    expect(selfOrAdminRead({req: makeReq(makeUser('admin', 1))} as never)).toBe(true)
  })

  it('retorna filtro por id propio para teacher', () => {
    const result = selfOrAdminRead({req: makeReq(makeUser('teacher', 7))} as never)
    expect(result).toEqual({id: {equals: 7}})
  })

  it('retorna filtro por id propio para student', () => {
    const result = selfOrAdminRead({req: makeReq(makeUser('student', 42))} as never)
    expect(result).toEqual({id: {equals: 42}})
  })
})

describe('selfOrAdminUpdate', () => {
  it('es un alias de selfOrAdminRead con el mismo comportamiento', () => {
    const req = makeReq(makeUser('student', 5))
    expect(selfOrAdminUpdate({req} as never)).toEqual(selfOrAdminRead({req} as never))
  })
})

// ---------------------------------------------------------------------------
// allowFirstUserOrAdmin
// ---------------------------------------------------------------------------

describe('allowFirstUserOrAdmin', () => {
  it('permite a admin sin consultar la base de datos', async () => {
    const req = makeReq(makeUser('admin'))
    const result = await allowFirstUserOrAdmin({req} as never)
    expect(result).toBe(true)
    expect(req.payload.count).not.toHaveBeenCalled()
  })

  it('permite el registro si no existe ningún usuario (primer usuario)', async () => {
    const req = makeReq(null, {count: vi.fn().mockResolvedValue({totalDocs: 0})})
    const result = await allowFirstUserOrAdmin({req} as never)
    expect(result).toBe(true)
  })

  it('deniega el registro si ya existen usuarios y no es admin', async () => {
    const req = makeReq(null, {count: vi.fn().mockResolvedValue({totalDocs: 3})})
    const result = await allowFirstUserOrAdmin({req} as never)
    expect(result).toBe(false)
  })

  it('deniega a student si ya existen usuarios', async () => {
    const req = makeReq(makeUser('student'), {count: vi.fn().mockResolvedValue({totalDocs: 5})})
    const result = await allowFirstUserOrAdmin({req} as never)
    expect(result).toBe(false)
  })
})
