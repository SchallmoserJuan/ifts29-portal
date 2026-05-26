import path from 'path'
import { fileURLToPath } from 'url'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
// Storage plugins removed - using direct Vercel Blob or external URLs
import { es } from '@payloadcms/translations/languages/es'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Careers } from './src/collections/Careers'
import { Companies } from './src/collections/Companies'
import { Contacts } from './src/collections/Contacts'
import { Documents } from './src/collections/Documents'
import { Events } from './src/collections/Events'
import { Media } from './src/collections/Media'
import { News } from './src/collections/News'
import { Notifications } from './src/collections/Notifications'
import { Projects } from './src/collections/Projects'
import { Scholarships } from './src/collections/Scholarships'
import { Users } from './src/collections/Users'
import { BecasPage } from './src/globals/BecasPage'
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
    components: {
      afterNavLinks: ['/src/components/admin/back-to-portal#BackToPortalButton'],
      beforeDashboard: [
        '/src/components/admin/widgets/dashboard-stats#DashboardStatsWidget',
        '/src/components/admin/widgets/recent-news#RecentNewsWidget',
        '/src/components/admin/widgets/upcoming-events#UpcomingEventsWidget',
      ],
    },
  },
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: 'es',
  },
  collections: [Users, Media, Careers, News, Documents, Events, Projects, Companies, Contacts, Notifications, Scholarships],
  globals: [SiteSettings, InstitutionalContent, BecasPage],
  plugins: [],
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
