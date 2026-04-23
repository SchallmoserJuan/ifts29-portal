import Link from 'next/link'

import { PageHero } from '@/src/components/page-hero'
import { PageShell } from '@/src/components/page-shell'
import { getNewsList } from '@/src/lib/content'
import type { NewsItem } from '@/src/types/content'

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const news = await getNewsList()

  return (
    <PageShell>
      <PageHero
        eyebrow="Novedades"
        title="Noticias y comunicados"
        description="Publicaciones institucionales, academicas y de eventos administradas desde Payload."
      />

      <section className="mx-auto grid w-full max-w-[1400px] gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-10">
        {news.map((item: NewsItem) => (
          <article key={item.id} className="rounded-3xl border border-[#b8d2f1] bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-[#214ca0]">{item.category}</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">{item.title}</h2>
            <p className="mt-4 leading-8 text-slate-600">{item.summary}</p>
            <p className="mt-6 text-sm text-slate-500">{item.publishedAt}</p>
            <Link href={`/noticias/${item.slug}`} className="mt-6 inline-flex text-sm font-semibold text-[#214ca0]">
              Leer noticia
            </Link>
          </article>
        ))}
      </section>
    </PageShell>
  )
}
