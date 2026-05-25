import type { GlobalConfig } from 'payload'

import { canManageContent } from '@/src/access'

export const BecasPage: GlobalConfig = {
  slug: 'becas-page',
  label: 'Página de Becas',
  access: {
    read: () => true,
    update: canManageContent,
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      required: true,
      defaultValue: 'Becas y Programas de Apoyo',
      label: 'Título de página',
    },
    {
      name: 'pageSubtitle',
      type: 'text',
      defaultValue: 'Información sobre becas disponibles para estudiantes del IFTS N° 29',
      label: 'Subtítulo',
    },
    {
      name: 'introduction',
      type: 'richText',
      label: 'Introducción',
    },
    {
      name: 'scholarshipsTitle',
      type: 'text',
      defaultValue: 'Programas Disponibles',
      label: 'Título de sección de becas',
    },
    {
      name: 'timelineTitle',
      type: 'text',
      defaultValue: 'Fechas Importantes',
      label: 'Título de sección de cronograma',
    },
    {
      name: 'timelineItems',
      type: 'array',
      label: 'Cronograma',
      fields: [
        {
          name: 'date',
          type: 'text',
          required: true,
          label: 'Fecha',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Título del hito',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },
      ],
    },
    {
      name: 'faqTitle',
      type: 'text',
      defaultValue: 'Preguntas Frecuentes',
      label: 'Título de sección FAQ',
    },
    {
      name: 'faqItems',
      type: 'array',
      label: 'Preguntas frecuentes',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Pregunta',
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Respuesta',
        },
      ],
    },
    {
      name: 'contactTitle',
      type: 'text',
      defaultValue: 'Consultá sobre Becas',
      label: 'Título de sección de contacto',
    },
    {
      name: 'contactText',
      type: 'textarea',
      defaultValue: '¿Tenés dudas sobre alguna beca o necesitás ayuda con el proceso de inscripción? Escribinos y te asesoramos.',
      label: 'Texto de contacto',
    },
  ],
}
