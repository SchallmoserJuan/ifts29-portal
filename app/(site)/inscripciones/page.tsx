import type { Metadata } from 'next'

import { PageShell } from '@/src/components/layout'
import { PageHero } from '@/src/components/ui'
import { AnimatedSection } from '@/src/components/ui'
import { FaqSection } from '@/src/components/shared/FaqSection'
import {
  StepsSection,
  RequirementsSection,
  TimelineMini,
  ContactFormInscripciones,
} from '@/src/components/inscripciones'
import { inscripcionesFAQ } from '@/src/data/faq-data'

export const metadata: Metadata = {
  title: 'Inscripciones',
  description:
    'Proceso de inscripción a la Tecnicatura Superior en Desarrollo de Software del IFTS N° 29. Requisitos, documentación, fechas y consultas.',
}

export const revalidate = 60

export default function InscripcionesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Admisión"
        title={`Inscripciones ${new Date().getFullYear()}`}
        description="Proceso de ingreso a la Tecnicatura Superior en Desarrollo de Software. Educación pública, gratuita y a distancia."
      />

      {/* Intro */}
      <section className="py-16 lg:py-24 bg-[#f8f7f4]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimatedSection>
              <div className="max-w-xl">
                <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
                  Tu camino hacia la tecnología comienza acá
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  La Tecnicatura Superior en Desarrollo de Software del IFTS N° 29 es una carrera
                  <strong> pública, gratuita y a distancia</strong>. Ofrecemos dos llamados de
                  inscripción anuales: <strong>marzo y julio</strong>.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  No se requieren conocimientos previos de programación. La asignación de vacantes se
                  realiza por orden de nota en los exámenes de ingreso.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#28c2f3]/30 bg-[#28c2f3]/5 p-6 text-center">
                  <div className="text-3xl font-bold text-[#072c57]">2</div>
                  <p className="mt-2 text-sm text-slate-600">Llamados por año</p>
                </div>
                <div className="rounded-2xl border border-[#28c2f3]/30 bg-[#28c2f3]/5 p-6 text-center">
                  <div className="text-3xl font-bold text-[#072c57]">100%</div>
                  <p className="mt-2 text-sm text-slate-600">Gratuita y pública</p>
                </div>
                <div className="rounded-2xl border border-[#28c2f3]/30 bg-[#28c2f3]/5 p-6 text-center">
                  <div className="text-3xl font-bold text-[#072c57]">3 años</div>
                  <p className="mt-2 text-sm text-slate-600">Duración de la carrera</p>
                </div>
                <div className="rounded-2xl border border-[#28c2f3]/30 bg-[#28c2f3]/5 p-6 text-center">
                  <div className="text-3xl font-bold text-[#072c57]">A distancia</div>
                  <p className="mt-2 text-sm text-slate-600">Modalidad flexible</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Requisitos + Documentación */}
      <RequirementsSection />

      {/* Pasos del proceso */}
      <StepsSection />

      {/* Fechas importantes */}
      <TimelineMini />

      {/* FAQ de inscripciones */}
      <FaqSection
        id="faq"
        title="Preguntas Frecuentes sobre Inscripciones"
        subtitle="Resolvemos las dudas más comunes sobre el proceso de admisión."
        items={inscripcionesFAQ}
      />

      {/* Formulario de consulta */}
      <ContactFormInscripciones />
    </PageShell>
  )
}
