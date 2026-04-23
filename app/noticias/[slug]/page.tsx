import { notFound } from 'next/navigation'

import { PageHero } from '@/src/components/page-hero'
import { PageShell } from '@/src/components/page-shell'
import { RichTextRenderer } from '@/src/components/rich-text-renderer'
import { getNewsBySlug } from '@/src/lib/content'

export const dynamic = 'force-dynamic'

const hasRichTextRoot = (value: unknown): value is { root?: { children?: unknown[] } } =>
  typeof value === 'object' && value !== null && 'root' in value

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await getNewsBySlug(slug)

  if (!item) {
    notFound()
  }

  return (
    <PageShell>
      <PageHero eyebrow="Noticia" title={item.title} description={item.summary} />

      <section className="mx-auto w-full max-w-[1040px] px-4 py-16 sm:px-6 lg:px-10">
        <article className="rounded-3xl border border-[#b8d2f1] bg-white p-8 shadow-sm">
          <div className="flex flex-wrap gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-[#f3f8ff] px-3 py-1">{item.category}</span>
            <span className="rounded-full bg-[#f3f8ff] px-3 py-1">{item.publishedAt}</span>
          </div>
          <div className="mt-8">
            {hasRichTextRoot(item.content) ? (
              <RichTextRenderer content={item.content} />
            ) : (
              <p className="leading-8 text-slate-700">{item.summary}</p>
            )}
          </div>
        </article>
      </section>
    </PageShell>
  )
}
