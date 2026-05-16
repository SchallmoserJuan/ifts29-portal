import type { Metadata } from 'next'

import { PageShell } from '@/src/components/layout'

export const metadata: Metadata = {
  title: 'Inscripciones',
  description: 'Información sobre inscripciones al IFTS N° 29.',
}

export default function InscripcionesPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-heading text-4xl font-semibold text-[#072c57]">Inscripciones</h1>
        <p className="mt-4 text-lg text-slate-600">Próximamente</p>
      </div>
    </PageShell>
  )
}
