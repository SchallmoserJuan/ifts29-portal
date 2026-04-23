import type { Field } from 'payload'

import { formatSlug } from '@/src/lib/slug'

export const slugField = (source = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Se genera automaticamente desde el titulo o nombre. Solo editar si hace falta.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) {
          return formatSlug(value)
        }

        const sourceValue = data?.[source]

        if (typeof sourceValue === 'string' && sourceValue.length > 0) {
          return formatSlug(sourceValue)
        }

        return value
      },
    ],
    beforeChange: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) {
          return formatSlug(value)
        }

        const sourceValue = data?.[source]

        if (typeof sourceValue === 'string' && sourceValue.length > 0) {
          return formatSlug(sourceValue)
        }

        return value
      },
    ],
  },
})
