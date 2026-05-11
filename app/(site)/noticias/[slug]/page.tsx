import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageShell } from '@/src/components/page-shell'
import { NewsDetailHero } from '@/src/components/news-detail-hero'
import { RichTextRenderer } from '@/src/components/rich-text-renderer'
import { getNewsBySlug } from '@/src/lib/content'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const news = await getNewsBySlug(slug)

  if (!news) {
    return {
      title: 'Noticia no encontrada',
    }
  }

  return {
    title: news.title,
    description: news.summary,
    openGraph: {
      title: news.title,
      description: news.summary,
      type: 'article',
      publishedTime: news.publishedAt,
      images: news.heroImage
        ? [
            {
              url: news.heroImage.url,
              alt: news.heroImage.alt || news.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description: news.summary,
      images: news.heroImage ? [news.heroImage.url] : [],
    },
  }
}

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.summary,
    image: item.heroImage?.url,
    datePublished: item.publishedAt,
    dateModified: item.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'IFTS N° 29',
    },
    publisher: {
      '@type': 'Organization',
      name: 'IFTS N° 29',
    },
  }

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <NewsDetailHero news={item} />

      <section className="mx-auto w-full px-4 py-16 sm:px-6 lg:px-10">
        <article className="mx-auto max-w-[1400px]">
          <RichTextRenderer content={item.content} />
        </article>
      </section>
    </PageShell>
  )
}