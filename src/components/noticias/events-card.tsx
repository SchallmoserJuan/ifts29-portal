import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock } from 'lucide-react'
import type { EventItem } from '@/src/types/content'
import { TechBadge } from '../ui/tech-badge'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'

const locationLabels: Record<string, string> = {
  presencial: 'Presencial',
  virtual: 'Virtual',
  hibrido: 'Hibrido',
}

const locationBadgeVariant: Record<string, 'default' | 'accent'> = {
  presencial: 'accent',
  virtual: 'default',
  hibrido: 'accent',
}

function formatEventDate(dateString: string): { day: string; month: string; time: string } {
  const date = new Date(dateString)
  return {
    day: date.getDate().toString(),
    month: date.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase(),
    time: date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
  }
}

export function EventsCard({ event }: { event: EventItem }) {
  const imageUrl = event.image?.url || FALLBACK_IMAGE
  const { day, month, time } = formatEventDate(event.date)

  return (
    <article className="news-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 border-l-4 border-l-transparent bg-white shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:border-l-[#28c2f3] sm:flex-row">
      <Link href={event.link || '#'} className="flex h-full flex-col sm:flex-row w-full">
        {/* Date block */}
        <div className="flex items-center justify-center bg-[#072c57] px-6 py-5 sm:w-28 sm:flex-col sm:px-0 sm:py-6 shrink-0">
          <span className="text-3xl font-bold leading-none text-white sm:text-4xl">{day}</span>
          <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-[#28c2f3] sm:ml-0 sm:mt-1.5">
            {month}
          </span>
        </div>

        {/* Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-square sm:w-44 shrink-0">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            unoptimized
          />
          {event.location && (
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#072c57] shadow-sm backdrop-blur-sm">
                {locationLabels[event.location] || event.location}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
          <h3 className="text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
            <span className="news-card-underline">{event.title}</span>
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">
            {event.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {time}
            </span>
            {event.address && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span className="truncate max-w-[180px]">{event.address}</span>
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
