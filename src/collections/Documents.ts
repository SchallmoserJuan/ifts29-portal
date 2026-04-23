import type { CollectionConfig } from 'payload'

import { canDeleteContent, canManageContent, documentReadAccess } from '@/src/access'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'visibility', 'updatedAt'],
    description: 'Para crear un documento tenes que completar titulo, descripcion y adjuntar un archivo.',
  },
  access: {
    read: documentReadAccess,
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
    {
      name: 'description',
      label: 'Descripcion',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'select',
      required: true,
      defaultValue: 'biblioteca',
      options: [
        { label: 'Biblioteca', value: 'biblioteca' },
        { label: 'Guias', value: 'guias' },
        { label: 'Normativas', value: 'normativas' },
        { label: 'Bolsa de empleo', value: 'empleo' },
      ],
    },
    {
      name: 'visibility',
      label: 'Visibilidad',
      type: 'select',
      required: true,
      defaultValue: 'students',
      options: [
        { label: 'Publico', value: 'public' },
        { label: 'Solo alumnos', value: 'students' },
        { label: 'Solo staff', value: 'staff' },
      ],
    },
    {
      name: 'career',
      label: 'Carrera relacionada',
      type: 'relationship',
      relationTo: 'careers',
      required: false,
    },
  ],
  upload: {
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
}
