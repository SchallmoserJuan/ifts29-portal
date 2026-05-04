'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { NewsItem } from '@/src/types/content'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80'

const categoryLabels: Record<string, string> = {
  general: 'General',
  academic: 'Academica',
  institutional: 'Institucional',
  events: 'Eventos',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function NewsDetailHero({ news }: { news: NewsItem }) {
  const imageUrl = news.heroImage?.url || FALLBACK_IMAGE

  const tags = news.tags ? news.tags.split(';').map((t) => t.trim()) : [categoryLabels[news.category] || news.category]

  return (
    <section className="relative">
      <div className="absolute inset-x-0 top-0 bg-[#072c57]" style={{ height: 'calc(50% + 160px)' }} />

      <div className="relative z-10 py-12">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-white">{formatDate(news.publishedAt)}</p>

            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-start">
              <h1 className="max-w-4xl text-[53px] leading-[64px] font-medium text-white">{news.title}</h1>

              <div className="flex flex-shrink-0 flex-wrap gap-2">
                {tags.slice(0, 3).map((tag, index) => (
                  <Link key={index} href={`/noticias?tag=${encodeURIComponent(tag)}`} className="group">
                    <span className="rounded-full bg-[#28c2f3] px-4 py-2 text-sm font-medium text-[#002649] inline-block">
                      <span className="tag-underline">{tag}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative mt-8 aspect-[21/9] w-full overflow-hidden bg-slate-200">
              <Image
                src={imageUrl}
                alt={news.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}