import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import type { NewsItem } from '@/src/types/content'
import { TechBadge } from './tech-badge'

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

  return (
    <article className="news-card group flex flex-col overflow-hidden transition-all duration-500">
      <Link href={`/noticias/${news.slug}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[3/2] w-full rounded overflow-hidden">
          <Image
            src={imageUrl}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            unoptimized
          />
          {/* Date & read time badge */}
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded bg-[#f7ee66] px-2.5 py-1.5 text-xs font-medium text-[#002649] shadow-sm">
            <Calendar className="h-3 w-3" />
            <time>{formatDate(news.publishedAt)}</time>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col mt-4">
          <h3 className={`text-2xl font-miedum leading-snug ${titleColor}`}>
            <span className={isDark ? 'news-card-underline-dark' : 'news-card-underline'}>
              {news.title}
            </span>
          </h3>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(news.tags ? news.tags.split(';') : [categoryLabels[news.category] || news.category])
              .slice(0, 3)
              .map((tag, index) => (
                <TechBadge key={index} variant="default">
                  {typeof tag === 'string' ? tag.trim() : tag}
                </TechBadge>
              ))}
          </div>
        </div>
      </Link>
    </article>
  )
}
