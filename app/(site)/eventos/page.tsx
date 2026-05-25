import type { Metadata } from 'next'
import Link from 'next/link'

import { PageShell } from '@/src/components/layout'
import { PageHero } from '@/src/components/ui'
import { getEventsList } from '@/src/lib/content'
import {
  EventsTimeline,
  PastEventsSection,
  EventTypesSection,
  EventStatsSection,
  EventParticipationSection,
} from '@/src/components/eventos'

export const metadata: Metadata = {
  title: 'Eventos',
  description:
    'Próximos eventos, actividades académicas e institucionales del IFTS N° 29. Charlas, talleres, jornadas y workshops.',
}

export const revalidate = 60

export default async function EventosPage() {
  const events = await getEventsList()

  const now = new Date()

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastEvents = events
    .filter((event) => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <PageShell>
      <PageHero
        eyebrow="Comunidad"
        title="Eventos"
        description="Charlas, talleres, jornadas de puertas abiertas y actividades académicas del IFTS 29."
      />

      {/* Tipos de actividades */}
      <EventTypesSection />

      {/* Stats */}
      <EventStatsSection />

      {/* Cómo participar */}
      <EventParticipationSection />

      {/* Próximos eventos */}
      <EventsTimeline events={upcomingEvents} />

      {/* Eventos anteriores */}
      <PastEventsSection events={pastEvents} />

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                ¿Tenés una propuesta de evento?
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Si querés proponer una charla, workshop o actividad para la comunidad del IFTS 29,
                contactanos. Evaluamos propuestas de ex-alumnos, docentes, estudiantes y profesionales
                de la industria.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-md bg-[#28c2f3] px-8 py-3 text-sm font-semibold text-[#072c57] transition hover:bg-[#52d0f7]"
                >
                  Contactanos
                </Link>
                <Link
                  href="/inscripciones"
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Conocer la carrera
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-[#072c57] p-8 text-white lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#28c2f3]">
                Próximo evento destacado
              </p>
              <h3 className="mt-3 text-2xl font-semibold">
                Jornada de Puertas Abiertas 2026
              </h3>
              <p className="mt-3 text-white/70">
                Vení a conocer nuestras instalaciones, conversá con docentes y estudiantes, y descubrí
                todo lo que ofrece la Tecnicatura en Desarrollo de Software.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                <span className="h-2 w-2 rounded-full bg-[#28c2f3]" />
                Presencial — 15 de mayo de 2026
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
