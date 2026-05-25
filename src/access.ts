import type { Access, Where } from 'payload'

import type { AppUser } from '@/src/types/app'

export const isAdmin = (user?: Partial<AppUser> | null) => user?.role === 'admin'
export const isTeacher = (user?: Partial<AppUser> | null) => user?.role === 'teacher'
export const isStudent = (user?: Partial<AppUser> | null) => user?.role === 'student'
export const isStaff = (user?: Partial<AppUser> | null) => isAdmin(user) || isTeacher(user)

export const canAccessNotifications: Access = ({ req }) => {
  const user = req.user as Partial<AppUser> | null
  return isStaff(user)
}

export const canAccessAdmin = ({ req }: { req: { user?: unknown } }) =>
  isStaff(req.user as Partial<AppUser> | null)

export const canManageUsers: Access = ({ req }) => isAdmin(req.user as Partial<AppUser> | null)

export const canManageContent: Access = ({ req }) => isStaff(req.user as Partial<AppUser> | null)

export const canDeleteContent: Access = ({ req }) => isStaff(req.user as Partial<AppUser> | null)

export const publicRead: Access = () => true

export const publishedOnlyOrStaff: Access = ({ req }) => {
  const user = req.user as Partial<AppUser> | null

  if (isStaff(user)) {
    return true
  }

  return {
    status: {
      equals: 'published',
    },
  } satisfies Where
}

export const documentReadAccess: Access = ({ req }) => {
  const user = req.user as Partial<AppUser> | null

  if (isStaff(user)) {
    return true
  }

  if (isStudent(user) && user?.status === 'approved') {
    return {
      or: [
        {
          visibility: {
            equals: 'public',
          },
        },
        {
          visibility: {
            equals: 'students',
          },
        },
      ],
    } as Where
  }

  return {
    visibility: {
      equals: 'public',
    },
  } as Where
}

export const selfOrAdminRead: Access = ({ req }) => {
  const user = req.user as Partial<AppUser> | null

  if (!user) {
    return false
  }

  if (isAdmin(user)) {
    return true
  }

  return {
    id: {
      equals: user.id,
    },
  } satisfies Where
}

export const selfOrAdminUpdate: Access = selfOrAdminRead

export const allowFirstUserOrAdmin: Access = async ({ req }) => {
  const user = req.user as Partial<AppUser> | null

  if (isAdmin(user)) {
    return true
  }

  const existingUsers = await req.payload.count({
    collection: 'users',
    overrideAccess: true,
  })

  return existingUsers.totalDocs === 0
}
