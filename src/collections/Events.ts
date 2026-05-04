import type { CollectionConfig } from 'payload'

import { canDeleteContent, canManageContent, publishedOnlyOrStaff } from '@/src/access'
import { slugField } from '@/src/fields/slug'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'status'],
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
      name: 'date',
      label: 'Fecha y hora',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'description',
      label: 'Descripcion',
      type: 'textarea',
      required: true,
    },
    {
      name: 'location',
      label: 'Ubicacion',
      type: 'select',
      defaultValue: 'presencial',
      options: [
        { label: 'Presencial', value: 'presencial' },
        { label: 'Virtual', value: 'virtual' },
        { label: 'Hibrido', value: 'hibrido' },
      ],
    },
    {
      name: 'address',
      label: 'Direccion',
      type: 'text',
    },
    {
      name: 'link',
      label: 'Link de registro/info',
      type: 'text',
    },
    {
      name: 'image',
      label: 'Imagen',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
  ],
}