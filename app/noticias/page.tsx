import { PageShell } from '@/src/components/page-shell'
import { NewsHero } from '@/src/components/news-hero'
import { NewsSection } from '@/src/components/news-section'
import { getNewsList } from '@/src/lib/content'
import type { NewsItem } from '@/src/types/content'

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const news = await getNewsList()

  const featuredNews = news.find((item: NewsItem) => item.featured)
  const heroNews = featuredNews || news[0]
  const sectionNews = news.filter((item: NewsItem) => item.id !== heroNews?.id).slice(0, 4)

  return (
    <PageShell>
      {heroNews && <NewsHero news={heroNews} />}

      <NewsSection news={sectionNews} />
    </PageShell>
  )
}