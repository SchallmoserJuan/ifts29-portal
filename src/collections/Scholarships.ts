import type { CollectionConfig } from 'payload'

import { canManageContent, publicRead } from '@/src/access'

export const Scholarships: CollectionConfig = {
  slug: 'scholarships',
  access: {
    read: publicRead,
    create: canManageContent,
    update: canManageContent,
    delete: canManageContent,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nombre de la beca',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Resumen',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descripción completa',
    },
    {
      name: 'requirements',
      type: 'array',
      label: 'Requisitos / Pasos a seguir',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: 'Requisito',
        },
      ],
    },
    {
      name: 'externalLink',
      type: 'text',
      label: 'Link externo',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Orden',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      label: 'Estado',
    },
  ],
}
