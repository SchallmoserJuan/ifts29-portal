// app/(site)/careers/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageHero } from '@/src/components/ui'
import { PageShell } from '@/src/components/layout'
import { RichTextRenderer } from '@/src/components/ui'
import { getCareerBySlug } from '@/src/lib/content'
import type { RequirementItem, SubjectItem } from '@/src/types/content'

// Importamos el nuevo componente de horarios
import ScheduleTable from '@/app/(site)/carreras/_components/ScheduleTable'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const career = await getCareerBySlug(slug)

  if (!career) {
    return {
      title: 'Carrera no encontrada',
    }
  }

  return {
    title: career.name,
    description: career.summary,
    openGraph: {
      title: career.name,
      description: career.summary,
      images: career.heroImage
        ? [
            {
              url: career.heroImage.url,
              alt: career.heroImage.alt || career.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: career.name,
      description: career.summary,
      images: career.heroImage ? [career.heroImage.url] : [],
    },
  }
}

const hasRichTextRoot = (value: unknown): value is { root?: { children?: unknown[] } } =>
  typeof value === 'object' && value !== null && 'root' in value

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const career = await getCareerBySlug(slug)

  if (!career) {
    notFound()
  }

  return (
    <PageShell>
      <PageHero eyebrow="Carrera" title={career.name} description={career.summary} />

      <section className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_0.8fr] lg:px-10">
        <article className="rounded-3xl border border-[#b8d2f1] bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-950">Perfil del egresado</h2>
          <div className="mt-6">
            {hasRichTextRoot(career.graduateProfile) ? (
              <RichTextRenderer content={career.graduateProfile} />
            ) : (
              <p className="leading-8 text-slate-700">{String(career.graduateProfile || '')}</p>
            )}
          </div>
        </article>
        <aside className="space-y-6">
          <article className="rounded-3xl bg-[#072c57] p-8 text-white">
            <h2 className="text-2xl font-semibold">Datos clave</h2>
            <p className="mt-4 text-slate-300">Duracion: {career.duration}</p>
            <p className="mt-2 text-slate-300">Modalidad: {career.modality}</p>
          </article>
          <article className="rounded-3xl border border-[#b8d2f1] bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Requisitos</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              {(career.requirements || []).map((requirement: RequirementItem, index: number) => (
                <li key={`${requirement.item}-${index}`} className="rounded-2xl bg-[#f3f8ff] px-4 py-3">
                  {requirement.item}
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </section>

      {/* Sección Plan de estudio */}
      <section className="mx-auto w-full max-w-[1400px] px-4 pb-8 sm:px-6 lg:px-10">
        <div className="rounded-3xl border border-[#b8d2f1] bg-white p-8">
          <h2 className="text-3xl font-semibold text-slate-950">Plan de estudio</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(career.studyPlan || []).map((subject: SubjectItem, index: number) => (
              <article key={`${subject.subject}-${index}`} className="rounded-2xl bg-[#f3f8ff] p-4 text-slate-700">
                {subject.subject}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: Horarios de cursada */}
      <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-10">
        <div className="rounded-3xl border border-[#b8d2f1] bg-white p-8">
          {/* Invocamos la tabla pasando el slug resuelto */}
          <ScheduleTable carreraSlug={slug} />
        </div>
      </section>
      
    </PageShell>
  );
}