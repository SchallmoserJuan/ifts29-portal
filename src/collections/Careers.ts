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
    {
      name: 'resolution',
      label: 'Resolucion oficial',
      type: 'text',
    },
    {
      name: 'heroImage',
      label: 'Imagen de hero',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'floatingImage',
      label: 'Imagen flotante (entre hero e intro)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'studyPlanImage',
      label: 'Imagen del plan de estudios',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'professionalProfile',
      label: 'Perfil del profesional',
      type: 'richText',
    },
    {
      name: 'outcomes',
      label: 'Salidas laborales',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'methodology',
      label: 'Metodologia y experiencia academica',
      type: 'richText',
    },
    {
      name: 'documents',
      label: 'Documentos relacionados',
      type: 'relationship',
      relationTo: 'documents',
      hasMany: true,
    },
    /* NUEVO CAMPO: Articulaciones Universitarias
      Este módulo permite cumplir con la Estrategia de Diferenciación,
      mostrando convenios para que los alumnos continúen sus estudios.
    */
    {
      name: 'articulations',
      label: 'Articulaciones',
      type: 'array',
      admin: {
        description: 'Convenios con facultades/universidades para continuar estudios.',
      },
      fields: [
        { 
          name: 'institution', 
          type: 'text', 
          label: 'Institución', 
          required: true 
        },
        { 
          name: 'description', 
          type: 'textarea', 
          label: 'Descripción del convenio' 
        },
        { 
          name: 'link', 
          type: 'text', 
          label: 'Link externo' 
        }
      ]
    },
  ],
}