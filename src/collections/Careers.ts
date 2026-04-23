import type { CollectionConfig } from 'payload'

import { canDeleteContent, canManageContent, publishedOnlyOrStaff } from '@/src/access'
import { slugField } from '@/src/fields/slug'

export const Careers: CollectionConfig = {
  slug: 'careers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'duration', 'modality'],
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
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    slugField('name'),
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
      name: 'summary',
      label: 'Resumen',
      type: 'textarea',
      required: true,
    },
    {
      name: 'duration',
      label: 'Duracion',
      type: 'text',
      required: true,
    },
    {
      name: 'modality',
      label: 'Modalidad',
      type: 'text',
      required: true,
    },
    {
      name: 'requirements',
      label: 'Requisitos',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'studyPlan',
      label: 'Plan de estudio',
      type: 'array',
      fields: [
        {
          name: 'subject',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'graduateProfile',
      label: 'Perfil del egresado',
      type: 'richText',
    },
  ],
}
