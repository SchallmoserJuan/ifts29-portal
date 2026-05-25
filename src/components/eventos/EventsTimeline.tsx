import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import type { EventItem } from '@/src/types/content'

interface EventsTimelineProps {
  events: EventItem[]
  title?: string
}

function formatEventDate(dateString: string): { day: string; month: string; time: string } {
  const date = new Date(dateString)
  return {
    day: date.getDate().toString(),
    month: date.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase(),
    time: date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
  }
}

export function EventsTimeline({ events, title = 'Próximos eventos' }: EventsTimelineProps) {
  if (events.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            {title}
          </h2>
          <p className="mt-4 text-slate-600">No hay eventos programados en este momento. Volveremos pronto con novedades.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-500 md:text-lg">
            Actividades académicas, charlas y workshops que tenemos preparados.
          </p>
        </div>

        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-[27px] top-3 bottom-3 w-[2px] bg-[#e2e8f0] md:left-1/2 md:-ml-[1px]" />

          <div className="space-y-10">
            {events.map((event, index) => {
              const { day, month, time } = formatEventDate(event.date)
              const isEven = index % 2 === 0

              return (
                <div
                  key={event.id}
                  className={`relative flex items-start gap-4 md:gap-0 md:items-stretch ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Fecha en la línea */}
                  <div className="absolute left-[11px] top-1 z-10 md:left-1/2 md:-ml-[17px]">
                    <div className="flex flex-col items-center justify-center w-9 h-9 rounded-full bg-[#28c2f3] text-white shadow-md md:w-10 md:h-10">
                      <span className="text-xs font-bold leading-none">{day}</span>
                      <span className="text-[8px] uppercase leading-none">{month}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="rounded-2xl border border-slate-200 bg-[#f8f7f4] overflow-hidden hover:shadow-md transition-shadow">
                      {event.image?.url ? (
                        <div className="relative aspect-[21/9] w-full overflow-hidden">
                          <Image
                            src={event.image.url}
                            alt={event.image.alt || event.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : null}

                      <div className="p-5">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#072c57]/10 text-[#072c57] font-medium">
                            <Clock className="h-3 w-3" />
                            {time}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            <MapPin className="h-3 w-3" />
                            {event.location === 'presencial' ? 'Presencial' : event.location === 'virtual' ? 'Virtual' : 'Híbrido'}
                          </span>
                          {event.address ? (
                            <span className="text-slate-500">{event.address}</span>
                          ) : null}
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{event.description}</p>

                        {event.link ? (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#214ca0] hover:underline"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Más información
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Espacio vacío para el otro lado en desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
