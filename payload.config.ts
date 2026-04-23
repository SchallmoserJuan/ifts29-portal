import path from 'path'
import { fileURLToPath } from 'url'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Careers } from './src/collections/Careers'
import { Documents } from './src/collections/Documents'
import { Media } from './src/collections/Media'
import { News } from './src/collections/News'
import { Users } from './src/collections/Users'
import { InstitutionalContent } from './src/globals/InstitutionalContent'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - IFTS 29',
    },
  },
  collections: [Users, Media, Careers, News, Documents],
  globals: [SiteSettings, InstitutionalContent],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'desarrollo-super-seguro-cambiar-en-produccion',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: sqliteAdapter({
    push: true,
    client: {
      url: process.env.DATABASE_URL || 'file:./ifts29.db',
      authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
    },
  }),
  sharp,
})
