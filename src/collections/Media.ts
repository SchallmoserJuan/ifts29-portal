import type { CollectionConfig } from 'payload'

import { canDeleteContent, canManageContent, publicRead } from '@/src/access'
 
//* Aquí es donde Payload gestiona las imágenes.


export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Imagen',
    plural: 'Imágenes',
  },
  access: {
    read: publicRead,
    create: canManageContent,
    update: canManageContent,
    delete: canDeleteContent,
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Archivos y documentos',
    description: 'Todas las imágenes del portal. Se usan en noticias, eventos, proyectos y carreras.',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'card',
        width: 960,
        height: 640,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
}
