import type { CollectionConfig } from 'payload'

import { canAccessNotifications, isStaff } from '@/src/access'

export const Notifications: CollectionConfig = {
  slug: 'notifications',
  labels: {
    singular: 'Notificación',
    plural: 'Notificaciones',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['type', 'title', 'read', 'createdAt'],
    listSearchableFields: ['title', 'message'],
    group: 'Comunicación',
    description: 'Alertas internas del sistema. Por ejemplo: cuando alguien envía una consulta por el formulario de contacto.',
  },
  fields: [
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { label: 'Contacto recibido', value: 'contact_received' },
      ],
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      label: 'Mensaje',
      type: 'text',
      required: false,
    },
    {
      name: 'relatedContact',
      label: 'Contacto relacionado',
      type: 'relationship',
      relationTo: 'contacts',
      required: false,
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'Nuevo', value: 'new' },
        { label: 'Leída', value: 'read' },
        { label: 'Respondida', value: 'replied' },
      ],
    },
    {
      name: 'read',
      label: 'Leída',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'readAt',
      label: 'Fecha de lectura',
      type: 'date',
      required: false,
    },
  ],
  access: {
    create: canAccessNotifications,
    read: canAccessNotifications,
    update: canAccessNotifications,
    delete: ({ req }) => req.user?.role === 'admin',
  },
}