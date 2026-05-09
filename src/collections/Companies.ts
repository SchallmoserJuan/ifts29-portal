import type { CollectionConfig } from 'payload'

import { canDeleteContent, canManageContent, publishedOnlyOrStaff } from '@/src/access'

export const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'practicesArea', 'status'],
  },
  access: {
    read: publishedOnlyOrStaff,
    create: canManageContent,
    update: canManageContent,
    delete: canDeleteContent,
  },
  fields: [
    {
      name: 'name',
      label: 'Nombre de la empresa',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Activo', value: 'active' },
        { label: 'Inactivo', value: 'inactive' },
      ],
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'description',
      label: 'Descripcion',
      type: 'textarea',
      required: true,
    },
    {
      name: 'practicesArea',
      label: 'Area de practicas',
      type: 'text',
      required: true,
    },
    {
      name: 'website',
      label: 'Sitio web',
      type: 'text',
      required: false,
    },
    {
      name: 'contactEmail',
      label: 'Email de contacto',
      type: 'text',
      required: false,
    },
  ],
}