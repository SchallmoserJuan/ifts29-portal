import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageHero } from '@/src/components/ui'
import { PageShell } from '@/src/components/layout'
import { RichTextRenderer } from '@/src/components/ui'
import { getCareerBySlug } from '@/src/lib/content'

import type { RequirementItem, SubjectItem } from '@/src/types/content'

// Definimos la estructura de la articulación para TypeScript
interface ArticulationItem {
  institution: string;
  description?: string;
  link?: string;
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  // Usamos 'as any' para evitar conflictos de tipos en metadata
  const career = await getCareerBySlug(slug) as any

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
  // Forzamos el tipo a 'any' temporalmente para que reconozca .articulations sin errores
  const career = await getCareerBySlug(slug) as any

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

      {/* SECCIÓN DE ARTICULACIONES: Solo se muestra si hay datos cargados */}
      {career.articulations && career.articulations.length > 0 && (
        <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-10">
          <div className="rounded-3xl border border-[#b8d2f1] bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-semibold text-slate-950">Articulaciones Universitarias</h2>
            <p className="mt-2 text-slate-600">Continuá tus estudios en las mejores instituciones con las que tenemos convenio.</p>
            
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {career.articulations.map((art: ArticulationItem, index: number) => (
                <article key={index} className="flex flex-col rounded-2xl border border-slate-100 bg-[#f3f8ff] p-6 transition-all hover:border-[#b8d2f1] hover:shadow-md">
                  {art.link ? (
                    <a 
                      href={art.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xl font-bold text-[#072c57] hover:underline flex items-center gap-2"
                    >
                      {art.institution}
                      <span className="text-sm">↗</span>
                    </a>
                  ) : (
                    <h3 className="text-xl font-bold text-[#072c57]">{art.institution}</h3>
                  )}
                  
                  {art.description && (
                    <p className="mt-3 text-slate-700 text-sm leading-relaxed">
                      {art.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  )
}