import { notFound } from 'next/navigation'

import { PageShell } from '@/src/components/page-shell'
import { NewsDetailHero } from '@/src/components/news-detail-hero'
import { RichTextRenderer } from '@/src/components/rich-text-renderer'
import { getNewsBySlug } from '@/src/lib/content'

export const dynamic = 'force-dynamic'

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
      <NewsDetailHero news={item} />

      <section className="mx-auto w-full px-4 py-16 sm:px-6 lg:px-10">
        <article className="mx-auto max-w-[1400px]">
          <RichTextRenderer content={item.content} />
        </article>
      </section>
    </PageShell>
  )
}