import type { GlobalConfig } from 'payload'

import { canManageUsers, publicRead } from '@/src/access'

export const InstitutionalContent: GlobalConfig = {
  slug: 'institutional-content',
  label: 'Contenido institucional',
  access: {
    read: publicRead,
    update: canManageUsers,
  },
  fields: [
    {
      name: 'history',
      label: 'Historia',
      type: 'richText',
    },
    {
      name: 'mission',
      label: 'Mision',
      type: 'textarea',
    },
    {
      name: 'vision',
      label: 'Vision',
      type: 'textarea',
    },
    {
      name: 'authorities',
      label: 'Autoridades',
      type: 'array',
      fields: [
        {
          name: 'name',
          label: 'Nombre',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          label: 'Cargo',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
