import type { CollectionConfig } from 'payload'

import { canDeleteContent, canManageContent, publishedOnlyOrStaff } from '@/src/access'
import { slugField } from '@/src/fields/slug'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Noticia',
    plural: 'Noticias',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    group: 'Contenido del sitio',
    description: 'Artículos informativos y novedades del instituto que se muestran en el portal público.',
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
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Academica', value: 'academic' },
        { label: 'Institucional', value: 'institutional' },
        { label: 'Eventos', value: 'events' },
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
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'featured',
      label: 'Destacada',
      type: 'checkbox',
      defaultValue: false,
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
      name: 'heroImage',
      label: 'Imagen principal',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'author',
      label: 'Autor',
      type: 'relationship',
      relationTo: 'users',
      required: false,
    },
    {
      name: 'content',
      label: 'Contenido',
      type: 'richText',
    },
  ],
}
