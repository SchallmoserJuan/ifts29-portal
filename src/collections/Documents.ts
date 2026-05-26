import type { CollectionConfig } from 'payload'

import { canDeleteContent, canManageContent, documentReadAccess } from '@/src/access'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Documento',
    plural: 'Documentos',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'visibility', 'updatedAt'],
    group: 'Archivos y documentos',
    description:
      'Documentos descargables: biblioteca, normativas, guías y bolsa de empleo. Pegá la URL del archivo.',
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
    {
      name: 'url',
      label: 'URL del documento',
      type: 'text',
      required: true,
      admin: {
        description: 'URL pública del archivo (ej. PDF en Google Drive, Cloudinary, etc.)',
      },
    },
  ],
}
