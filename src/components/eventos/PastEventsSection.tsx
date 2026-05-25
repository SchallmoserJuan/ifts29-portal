import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import type { EventItem } from '@/src/types/content'

interface PastEventsSectionProps {
  events: EventItem[]
  title?: string
}

function formatPastDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function PastEventsSection({ events, title = 'Eventos anteriores' }: PastEventsSectionProps) {
  if (events.length === 0) return null

  return (
    <section className="py-16 lg:py-24 bg-[#f8f7f4]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-500 md:text-lg">
            Actividades que ya realizamos en el IFTS 29.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm transition-shadow"
            >
              {event.image?.url ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={event.image.url}
                    alt={event.image.alt || event.title}
                    fill
                    className="object-cover opacity-80"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                    {formatPastDate(event.date)}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-100 px-5 py-3 text-xs text-slate-500">
                  {formatPastDate(event.date)}
                </div>
              )}

              <div className="p-5">
                <h3 className="font-semibold text-slate-900">{event.title}</h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{event.description}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location === 'presencial' ? 'Presencial' : event.location === 'virtual' ? 'Virtual' : 'Híbrido'}
                  </span>
                  {event.address ? (
                    <span className="truncate max-w-[150px]">{event.address}</span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
