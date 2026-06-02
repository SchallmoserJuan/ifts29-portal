import type { CollectionConfig } from 'payload'

import { canDeleteContent, canManageContent, publicRead } from '@/src/access'

//* Colección para gestionar URLs de imágenes externas

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
    description:
      'Todas las imágenes del portal. Pegá la URL de la imagen (ej. Cloudinary, Imgur, etc.)',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      label: 'URL de la imagen',
      type: 'text',
      required: true,
      admin: {
        description: 'URL pública de la imagen (ej. https://... )',
      },
    },
  ],
}
