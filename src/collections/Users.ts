import type { CollectionConfig } from 'payload'

import {
  canAccessAdmin,
  canManageUsers,
  selfOrAdminRead,
  selfOrAdminUpdate,
} from '@/src/access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'dni', 'role', 'status'],
    group: 'Usuarios y sistema',
    description: 'Administradores, profesores y alumnos registrados en el portal. Se gestionan los permisos y aprobaciones.',
  },
  auth: {
   tokenExpiration: 60 * 60 * 8,
   maxLoginAttempts: 5,
   lockTime: 10 * 60 * 1000,
  },
  access: {
    admin: canAccessAdmin,
    create: canManageUsers,
    read: selfOrAdminRead,
    update: selfOrAdminUpdate,
    delete: canManageUsers,
    unlock: canManageUsers,
  },
  fields: [
    {
      name: 'firstName',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Apellido',
      type: 'text',
      required: true,
    },
    {
      name: 'dni',
      type: 'text',
      required: true,
      unique: true,
      label: 'DNI',
      admin: {
        position: 'sidebar',
      },
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
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      label: 'Estado de aprobacion',
      options: [
        {
          label: 'Pendiente',
          value: 'pending',
        },
        {
          label: 'Aprobado',
          value: 'approved',
        },
        {
          label: 'Rechazado',
          value: 'rejected',
        },
      ],
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData?.role === 'student',
      },
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
