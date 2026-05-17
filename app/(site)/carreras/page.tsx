import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {PageShell} from '@/src/components/layout'
import {PageHero, SectionHeader, AnimatedSection} from '@/src/components/ui'
import {getCareers} from '@/src/lib/content'
import {CareerCard} from './_components/career-card'

export const metadata: Metadata = {
  title: 'Carreras — IFTS N° 29',
  description:
    'Conocé nuestra oferta académica en el IFTS N° 29. Formación técnica superior con proyección profesional y salida laboral garantizada.',
  openGraph: {
    title: 'Carreras — IFTS N° 29',
    description: 'Formación técnica superior con proyección profesional.',
  },
}

export const revalidate = 60

export default async function CareersListingPage() {
  const careers = await getCareers()

  // Solo mostrar carreras publicadas
  const publishedCareers = careers.filter((c) => 'status' in c && (c as any).status === 'published')

  const careersToShow = publishedCareers.length > 0 ? publishedCareers : careers

  if (!careersToShow || careersToShow.length === 0) {
    notFound()
  }

  const featuredCareer = careersToShow[0]
  const hasMultipleCareers = careersToShow.length > 1

  return (
    <PageShell>
      {/* Hero Institucional */}
      <PageHero
        eyebrow="Oferta Académica"
        title="Carreras del IFTS N° 29"
        description="Formación técnica superior de excelencia, pensada para insertarte en el mundo laboral con herramientas actualizadas y una sólida base profesional."
      />

      {/* Sección de carreras destacadas */}
      <section className="relative w-full bg-[#f8f7f4] py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <SectionHeader
              title="Nuestra oferta académica"
              description="Carreras técnicas diseñadas para responder a las demandas del mercado laboral actual."
            />
          </AnimatedSection>

          <div className="mt-16">
            {hasMultipleCareers ? (
              // Grid para múltiples carreras
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {careersToShow.map((career) => (
                  <CareerCard key={career.id} career={career} />
                ))}
              </div>
            ) : (
              // Tarjeta destacada única, centrada y prominente
              <CareerCard career={featuredCareer} featured />
            )}
          </div>
        </div>
      </section>

      {/* Sección institucional de valor */}
      <section className="relative w-full bg-white py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#28c2f3]">
                ¿Por qué elegirnos?
              </span>
              <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-[#072c57] md:text-4xl lg:text-[42px]">
                Educación pública con excelencia técnica
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-500">
                El IFTS N° 29 es una institución pública de trayectoria, comprometida con la
                formación de técnicos superiores que respondan a las necesidades del sector
                productivo.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Formación práctica',
                text: 'Más del 60% de las horas curriculares se dedican a laboratorios, proyectos y resolución de problemas reales.',
              },
              {
                number: '02',
                title: 'Salida laboral directa',
                text: 'Diseñamos nuestros planes de estudio en conjunto con empresas del sector para asegurar una inserción laboral inmediata.',
              },
              {
                number: '03',
                title: 'Articulación universitaria',
                text: 'Convenios con universidades de prestigio que permiten continuar estudios y obtener títulos de grado con reconocimiento de materias.',
              },
            ].map((item) => (
              <AnimatedSection key={item.number} delay={parseInt(item.number) * 0.1}>
                <div className="group relative rounded-2xl border border-slate-100 bg-[#f8f7f4] p-8 transition-all duration-500 hover:border-[#28c2f3]/30 hover:shadow-lg">
                  <span className="text-5xl font-light text-[#072c57]/10 transition-colors group-hover:text-[#072c57]/20">
                    {item.number}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-[#072c57]">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-500">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
