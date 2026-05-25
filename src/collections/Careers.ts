import type { CollectionConfig } from 'payload'
import { canDeleteContent, canManageContent, publishedOnlyOrStaff } from '@/src/access'
import { slugField } from '@/src/fields/slug'

export const Careers: CollectionConfig = {
  slug: 'careers',
  labels: {
    singular: 'Carrera',
    plural: 'Carreras',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'duration', 'modality'],
    group: 'Contenido del sitio',
    description: 'Información de las carreras que se ofrecen en el instituto. Cada carrera tiene su propia página pública.',
  },
  access: {
    read: publishedOnlyOrStaff,
    create: canManageContent,
    update: canManageContent,
    delete: canDeleteContent,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informacion basica',
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
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroHeadline',
              label: 'Titular',
              type: 'text',
            },
            {
              name: 'heroParagraph',
              label: 'Parrafo',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Introduccion',
          fields: [
            {
              name: 'introTitle',
              label: 'Titulo',
              type: 'text',
            },
            {
              name: 'introDescription',
              label: 'Descripcion',
              type: 'textarea',
            },
            {
              name: 'introFocus',
              label: 'Enfoque',
              type: 'textarea',
            },
            {
              name: 'introOutcome',
              label: 'Resultado',
              type: 'textarea',
            },
            {
              name: 'introIndustry',
              label: 'Industria',
              type: 'textarea',
            },
            {
              name: 'introImage',
              label: 'Imagen de introduccion',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Perfil Profesional',
          fields: [
            {
              name: 'profileTitle',
              label: 'Titulo',
              type: 'text',
            },
            {
              name: 'profileSubtitle',
              label: 'Subtitulo',
              type: 'text',
            },
            {
              name: 'profileBlocks',
              label: 'Bloques',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            {
              name: 'profileQuote',
              label: 'Cita',
              type: 'textarea',
            },
          ],
        },
        {
          label: 'Plan de Estudios',
          fields: [
            {
              name: 'studyPlanTitle',
              label: 'Titulo',
              type: 'text',
            },
            {
              name: 'studyPlanSubtitle',
              label: 'Subtitulo',
              type: 'text',
            },
            {
              name: 'studyPlanDescription',
              label: 'Descripcion',
              type: 'textarea',
            },
            {
              name: 'studyPlanDurationLabel',
              label: 'Etiqueta duracion',
              type: 'text',
            },
            {
              name: 'studyPlanStructureLabel',
              label: 'Etiqueta estructura',
              type: 'text',
            },
            {
              name: 'studyPlanFocusLabel',
              label: 'Etiqueta enfoque',
              type: 'text',
            },
            {
              name: 'studyPlan',
              label: 'Materias',
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
              name: 'studyPlanImage',
              label: 'Imagen del plan de estudios',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Metodologia',
          fields: [
            {
              name: 'methodologyTitle',
              label: 'Titulo',
              type: 'text',
            },
            {
              name: 'methodologySubtitle',
              label: 'Subtitulo',
              type: 'text',
            },
            {
              name: 'methodologyItems',
              label: 'Items',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            {
              name: 'methodologyImage',
              label: 'Imagen de fondo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Salidas laborales',
          fields: [
            {
              name: 'outcomesTitle',
              label: 'Titulo',
              type: 'text',
            },
            {
              name: 'outcomesSubtitle',
              label: 'Subtitulo',
              type: 'textarea',
            },
            {
              name: 'outcomes',
              label: 'Salidas',
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
          ],
        },
        {
          label: 'Articulaciones',
          fields: [
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
                  label: 'Institucion',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Descripcion del convenio',
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Link externo',
                },
              ],
            },
          ],
        },
        {
          label: 'Documentos',
          fields: [
            {
              name: 'documentsTitle',
              label: 'Titulo',
              type: 'text',
            },
            {
              name: 'documentsSubtitle',
              label: 'Subtitulo',
              type: 'textarea',
            },
            {
              name: 'documents',
              label: 'Documentos relacionados',
              type: 'relationship',
              relationTo: 'documents',
              hasMany: true,
            },
          ],
        },
        {
          label: 'CTA Final',
          fields: [
            {
              name: 'ctaTitle',
              label: 'Titulo',
              type: 'text',
            },
            {
              name: 'ctaSubtitle',
              label: 'Subtitulo',
              type: 'textarea',
            },
            {
              name: 'ctaLabel',
              label: 'Texto del boton',
              type: 'text',
            },
          ],
        },
        {
          label: 'Contenido adicional',
          fields: [
            {
              name: 'graduateProfile',
              label: 'Perfil del egresado',
              type: 'richText',
            },
            {
              name: 'professionalProfile',
              label: 'Perfil del profesional',
              type: 'richText',
            },
            {
              name: 'methodology',
              label: 'Metodologia y experiencia academica',
              type: 'richText',
            },
            {
              name: 'floatingImage',
              label: 'Imagen flotante (entre hero e intro)',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
