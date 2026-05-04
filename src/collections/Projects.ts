import type { CollectionConfig } from 'payload'

import { canDeleteContent, canManageContent, publishedOnlyOrStaff } from '@/src/access'
import { slugField } from '@/src/fields/slug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: publishedOnlyOrStaff,
    create: canManageContent,
    update: canManageContent,
    delete: canDeleteContent,
  },
  fields: [
    {
      name: 'title',
      label: 'Titulo',
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'status',
      label: 'Estado',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      required: true,
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'select',
      defaultValue: 'desarrollo',
      options: [
        { label: 'Desarrollo de Software', value: 'desarrollo' },
        { label: 'Analisis de Sistemas', value: 'analisis' },
        { label: 'Infraestructura', value: 'infraestructura' },
        { label: 'Datos', value: 'datos' },
      ],
      required: true,
    },
    {
      name: 'summary',
      label: 'Resumen',
      type: 'textarea',
      required: true,
    },
    {
      name: 'publishedAt',
      label: 'Fecha de publicacion',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'text',
      admin: {
        description: 'Separados por punto y coma (;)',
      },
    },
    {
      name: 'image',
      label: 'Imagen',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'content',
      label: 'Contenido',
      type: 'richText',
    },
  ],
}