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
        title="Inscripciones 2026"
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
        items={[
          {
            question: '¿Cuándo se abren las inscripciones?',
            answer: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'Hay dos llamados de inscripción por año: marzo y julio. El primer llamado para el ciclo lectivo 2026 abre el 1° de marzo. El segundo llamado abre en julio. Te recomendamos consultar las fechas exactas en esta página ya que pueden variar cada año.',
                        type: 'text',
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            question: '¿Cuáles son los requisitos de ingreso?',
            answer: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'El único requisito académico es contar con el título secundario completo. No se requieren conocimientos previos de programación ni de informática. También debés presentar tu DNI y constancia de CUIL.',
                        type: 'text',
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            question: '¿Es necesario tener conocimientos previos de programación?',
            answer: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'No. La carrera está diseñada para que cualquier persona con título secundario pueda iniciar, independientemente de su formación previa. Los contenidos se desarrollan desde cero, con una progresión gradual que permite acompañar a estudiantes sin experiencia previa.',
                        type: 'text',
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            question: '¿La carrera tiene costo?',
            answer: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'No. La Tecnicatura Superior en Desarrollo de Software del IFTS N° 29 es una carrera pública y gratuita. No hay aranceles de matriculación ni cuotas mensuales. Es posible que existan costos simbólicos asociados a seguros estudiantiles o materiales, pero la cursada en sí no tiene costo.',
                        type: 'text',
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            question: '¿Cómo funciona el sorteo de vacantes?',
            answer: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'Las vacantes se asignan por orden de nota según los resultados de los exámenes de ingreso. Cuanto mejor tu desempeño en los exámenes, mayores son tus chances de obtener una vacante. El examen evalúa conocimientos generales y no requiere preparación específica en programación.',
                        type: 'text',
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            question: '¿Qué pasa si no obtengo vacante en el sorteo?',
            answer: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'Si no obtenés vacante en el primer llamado (marzo), podés volver a inscribirte en el segundo llamado de julio del mismo año con la misma documentación. También podés anotarte para el ciclo lectivo siguiente.',
                        type: 'text',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ]}
      />

      {/* Formulario de consulta */}
      <ContactFormInscripciones />
    </PageShell>
  )
}
