import type { CollectionConfig } from 'payload'

import {
  allowFirstUserOrAdmin,
  canAccessAdmin,
  canManageUsers,
  selfOrAdminRead,
  selfOrAdminUpdate,
} from '@/src/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'role'],
  },
  auth: {
    tokenExpiration: 60 * 60 * 8,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    admin: canAccessAdmin,
    create: allowFirstUserOrAdmin,
    read: selfOrAdminRead,
    update: selfOrAdminUpdate,
    delete: canManageUsers,
    unlock: canManageUsers,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'student',
      options: [
        {
          label: 'Administrador',
          value: 'admin',
        },
        {
          label: 'Profesor',
          value: 'teacher',
        },
        {
          label: 'Alumno',
          value: 'student',
        },
      ],
    },
    {
      name: 'career',
      label: 'Carrera',
      type: 'relationship',
      relationTo: 'careers',
      required: false,
      admin: {
        condition: (_, siblingData) => siblingData?.role === 'student',
      },
    },
  ],
}
