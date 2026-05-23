import type { GlobalConfig } from 'payload'

import { canManageUsers, publicRead } from '@/src/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuracion del sitio',
  admin: {
    group: 'Usuarios y sistema',
  },
  access: {
    read: publicRead,
    update: canManageUsers,
  },
  fields: [
    {
      name: 'siteTitle',
      label: 'Titulo del sitio',
      type: 'text',
      defaultValue: 'Portal IFTS 29',
    },
    {
      name: 'tagline',
      label: 'Bajada institucional',
      type: 'textarea',
      defaultValue: 'Portal institucional del IFTS 29 para aspirantes, alumnos, docentes y administracion.',
    },
    {
      name: 'contactEmail',
      label: 'Email de contacto',
      type: 'email',
    },
    {
      name: 'address',
      label: 'Direccion',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Telefono',
      type: 'text',
    },
  ],
}
