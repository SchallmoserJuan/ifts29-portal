'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { EventItem } from '@/src/types/content'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'

const locationLabels: Record<string, string> = {
  presencial: 'Presencial',
  virtual: 'Virtual',
  hibrido: 'Hibrido',
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
    <article className="group flex flex-col overflow-hidden cursor-pointer">
      <Link href={event.link || '#'} className="flex flex-col h-full">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-200">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute left-3 top-3 flex flex-col items-center rounded-md bg-[#072c57] px-3 py-2 text-center text-white backdrop-blur-sm">
            <span className="text-xl font-bold leading-none">{day}</span>
            <span className="text-xs font-medium leading-none">{month}</span>
          </div>
          {event.location && (
            <div className="absolute right-3 top-3 rounded-full bg-[#28c2f3] px-3 py-1 text-xs font-medium text-[#072c57]">
              {locationLabels[event.location] || event.location}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <h3 className="text-[27px] leading-[33px] font-medium text-[#1e3e8a]">
            <span className="news-card-underline">{event.title}</span>
          </h3>

          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{event.description}</p>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{time}</span>
            {event.address && (
              <>
                <span className="text-slate-300">|</span>
                <span className="truncate">{event.address}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}