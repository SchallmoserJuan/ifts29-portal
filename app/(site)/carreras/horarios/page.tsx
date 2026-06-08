import type {Metadata} from 'next'
import Link from 'next/link'

import {PageShell} from '@/src/components/layout'
import {PageHero} from '@/src/components/ui'
import {getCareers} from '@/src/lib/content'

export const metadata: Metadata = {
  title: 'Horarios',
  description:
    'Modalidad de cursado de la Tecnicatura Superior en Desarrollo de Software del IFTS N° 29. Cursada a distancia con actividades sincrónicas y asincrónicas.',
}

export const revalidate = 60

export default async function HorariosPage() {
  const careers = await getCareers()

  return (
    <PageShell>
      <PageHero
        eyebrow="Carreras"
        title="Modalidad de cursado"
        description="La Tecnicatura Superior en Desarrollo de Software se cursa en modalidad a distancia, combinando instancias sincrónicas y asincrónicas."
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                ¿Cómo se cursa?
              </h2>
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-[#28c2f3]" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Actividades asincrónicas</h3>
                    <p className="mt-1 text-slate-600">
                      Accedé a los contenidos teóricos, videos, lecturas y ejercicios en cualquier
                      momento a través del campus virtual. Avanzá a tu ritmo respetando los plazos
                      de cada unidad.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-[#28c2f3]" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Encuentros sincrónicos</h3>
                    <p className="mt-1 text-slate-600">
                      Clases en vivo semanales con docentes para resolver dudas, trabajar en
                      ejercicios prácticos y participar de debates. Las clases quedan grabadas.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full bg-[#28c2f3]" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Evaluaciones</h3>
                    <p className="mt-1 text-slate-600">
                      Parciales y trabajos prácticos se entregan a través de la plataforma.
                      Los exámenes finales pueden ser presenciales o virtuales según la materia.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#f8f7f4] p-8 lg:p-10">
              <h3 className="text-xl font-semibold text-slate-900">Horarios de referencia</h3>
              <p className="mt-3 text-slate-600">
                Las clases sincrónicas suelen programarse en el turno noche (a partir de las 19 h)
                para facilitar la cursada a quienes trabajan. La frecuencia y días exactos se
                confirman al inicio de cada cuatrimestre.
              </p>
              <div className="mt-8 space-y-4">
                {careers.map((career) => (
                  <Link
                    key={career.slug}
                    href={`/carreras/${career.slug}`}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 transition hover:border-[#28c2f3]/50 hover:shadow-sm"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{career.name}</p>
                      <p className="text-sm text-slate-500">
                        {career.duration} · {career.modality}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-[#072c57]">Ver carrera →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
