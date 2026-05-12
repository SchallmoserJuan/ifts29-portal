import type { Metadata } from 'next'

import { PageShell } from '@/src/components/layout'

export const metadata: Metadata = {
  title: 'Investigación',
  description: 'Proyectos de investigación y desarrollo del IFTS N° 29. Conocé los avances académicos e innovaciones de nuestra institución.',
}

export default function InvestigacionPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-heading text-4xl font-semibold text-[#072c57]">Investigación</h1>
        <p className="mt-4 text-lg text-slate-600">Próximamente</p>
      </div>
    </PageShell>
  )
}
