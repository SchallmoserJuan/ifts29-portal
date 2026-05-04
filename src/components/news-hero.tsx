import Link from 'next/link'
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

export function NewsHero({ news }: { news: NewsItem }) {
  const imageUrl = news.heroImage?.url || FALLBACK_IMAGE

  return (
    <section
      className="relative min-h-[700px] w-full overflow-hidden text-white"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(7,44,87,0.15) 0%, rgba(7,44,87,0.65) 50%, rgba(7,44,87,0.85) 100%), url('${imageUrl}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/10 via-transparent to-slate-950/20" />
      <div className="relative mx-auto flex min-h-[700px] w-full max-w-[1400px] flex-col px-4 py-16 sm:px-6 lg:px-10">
        <div className="mt-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-[#28c2f3] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#072c57]">
              {categoryLabels[news.category] || news.category}
            </span>
            <time className="text-sm text-slate-200">{formatDate(news.publishedAt)}</time>
          </div>

          <h1 className="mt-6 text-[53px] leading-[64px] font-medium text-white">
            {news.title}
          </h1>

          <p className="mt-6 max-w-2xl text-[22px] leading-[35px] font-normal text-white">
            {news.summary}
          </p>

          <Link
            href={`/noticias/${news.slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#28c2f3] px-6 py-3 text-sm font-semibold text-[#072c57] transition hover:bg-[#52d0f7]"
          >
            Leer noticia completa
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}