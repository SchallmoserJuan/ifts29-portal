'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { NewsItem } from '@/src/types/content'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80'

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

function calculateReadTime(content: unknown): string {
  if (!content || typeof content !== 'object') return '5 min'

  const contentStr = JSON.stringify(content)
  const wordCount = contentStr.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 200))
  return `${minutes} min`
}

interface NewsCardProps {
  news: NewsItem
  variant?: 'default' | 'dark'
}

export function NewsCard({ news, variant = 'default' }: NewsCardProps) {
  const imageUrl = news.heroImage?.url || FALLBACK_IMAGE
  const readTime = calculateReadTime(news.content)

  const isDark = variant === 'dark'
  const titleColor = isDark ? 'text-white' : 'text-[#1e3e8a]'
  const tagBg = isDark ? 'bg-white/10' : 'bg-[#214ca0]/10'
  const tagColor = isDark ? 'text-white/80' : 'text-[#214ca0]'

  return (
    <article className="news-card group flex flex-col overflow-hidden cursor-pointer">
      <Link href={`/noticias/${news.slug}`} className="flex flex-col h-full">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-slate-200 rounded-lg">
          <Image
            src={imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-[#f7ee66] px-2.5 py-1.5 text-xs font-medium text-[#002649] backdrop-blur-sm">
            <time>{formatDate(news.publishedAt)}</time>
            <span className="text-[#002649]">•</span>
            <span>{readTime}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <h3 className={`text-[27px] leading-[33px] font-medium ${titleColor}`}>
            <span className={isDark ? 'news-card-underline-dark' : 'news-card-underline'}>{news.title}</span>
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {(news.tags ? news.tags.split(';') : [categoryLabels[news.category] || news.category])
              .slice(0, 3)
              .map((tag, index) => (
                <span
                  key={index}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${tagBg} ${tagColor}`}
                >
                  {typeof tag === 'string' ? tag.trim() : tag}
                </span>
              ))}
          </div>
        </div>
      </Link>
    </article>
  )
}