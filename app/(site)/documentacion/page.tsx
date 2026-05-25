import type { Metadata } from 'next'

import { PageShell } from '@/src/components/layout'
import { PageHero } from '@/src/components/ui'
import { getPublicDocuments } from '@/src/lib/content'
import { DocumentsSection, ResourcesSection } from '@/src/components/documentacion'

export const metadata: Metadata = {
  title: 'Documentos y Recursos',
  description:
    'Material académico, normativas, guías y herramientas para la comunidad del IFTS N° 29.',
}

export const revalidate = 60

export default async function DocumentacionPage() {
  const documents = await getPublicDocuments()

  return (
    <PageShell>
      <PageHero
        eyebrow="Comunidad"
        title="Documentos y Recursos"
        description="Material académico, normativas, guías y herramientas para estudiantes y docentes del IFTS 29."
      />

      <DocumentsSection documents={documents} />
      <ResourcesSection />
    </PageShell>
  )
}
