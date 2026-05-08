import Link from 'next/link'

import { PageHero } from '@/src/components/page-hero'
import { PageShell } from '@/src/components/page-shell'
import { getCareers } from '@/src/lib/content'
import type { CareerItem } from '@/src/types/content'

export const dynamic = 'force-dynamic'

export default async function CareersPage() {
  const careers = await getCareers()

  return (
    <PageShell>
      <PageHero
        eyebrow="Carreras"
        title="Oferta academica del IFTS 29"
        description="Explora las tecnicaturas, requisitos de ingreso y perfiles de egreso publicados desde el panel institucional."
      />

      <section className="mx-auto grid w-full max-w-[1400px] gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-10">
        {careers.map((career: CareerItem) => (
          <article key={career.id} className="rounded-3xl border border-[#b8d2f1] bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-[#214ca0]">{career.modality}</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">{career.name}</h2>
            <p className="mt-4 leading-8 text-slate-600">{career.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
              <span className="rounded-full bg-[#f3f8ff] px-3 py-1">Duracion: {career.duration}</span>
              <span className="rounded-full bg-[#f3f8ff] px-3 py-1">
                {career.requirements?.length || 0} requisitos publicados
              </span>
            </div>
            <Link href={`/carreras/${career.slug}`} className="mt-8 inline-flex text-sm font-semibold text-[#214ca0]">
              Ver detalle
            </Link>
          </article>
        ))}
      </section>
    </PageShell>
  )
}
