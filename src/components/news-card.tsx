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

export function NewsCard({ news }: { news: NewsItem }) {
  const imageUrl = news.heroImage?.url || FALLBACK_IMAGE
  const readTime = calculateReadTime(news.content)

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
        <Image
          src={imageUrl}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-[#072c57]/90 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <time>{formatDate(news.publishedAt)}</time>
          <span className="text-slate-400">•</span>
          <span>{readTime}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/noticias/${news.slug}`}>
          <h3 className="text-lg font-semibold text-slate-950 transition-colors group-hover:text-[#214ca0]">
            {news.title}
          </h3>
        </Link>

        <div className="mt-3 flex flex-wrap gap-2">
          {news.tags
            ? news.tags.split(';').map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-[#214ca0]/10 px-3 py-1 text-xs font-medium text-[#214ca0]"
                >
                  {tag.trim()}
                </span>
              ))
            : categoryLabels[news.category] || news.category}
        </div>
      </div>
    </article>
  )
}