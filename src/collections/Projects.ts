import type { CollectionConfig } from 'payload'

import { canDeleteContent, canManageContent, publishedOnlyOrStaff } from '@/src/access'
import { slugField } from '@/src/fields/slug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Proyecto',
    plural: 'Proyectos',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
    group: 'Contenido del sitio',
    description: 'Proyectos realizados por alumnos o docentes que se muestran en la sección de proyectos del portal.',
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
      name: 'student',
      label: 'Estudiante / Autor',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        description: 'Estudiante que realizó el proyecto',
      },
    },
    {
      name: 'githubUrl',
      label: 'URL de GitHub',
      type: 'text',
      required: false,
      admin: {
        description: 'Link al repositorio del proyecto',
      },
    },
    {
      name: 'demoUrl',
      label: 'URL de demo',
      type: 'text',
      required: false,
      admin: {
        description: 'Link a la demo o sitio web del proyecto',
      },
    },
    {
      name: 'content',
      label: 'Contenido',
      type: 'richText',
    },
  ],
}