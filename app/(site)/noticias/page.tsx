import type { Metadata } from 'next'

import { PageShell } from '@/src/components/layout'
import { NewsHero, NewsSection, EventsSection, ProjectsSection, CompaniesSection, TagFilterBadge } from '@/src/components/noticias'
import { getNewsListPaginated, getEventsList, getProjectsList, getCompaniesList } from '@/src/lib/content'
import type { NewsItem } from '@/src/types/content'

export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Enterate de las últimas novedades, eventos y proyectos del IFTS N° 29. Noticias académicas e institucionales de nuestra comunidad.',
}

export const revalidate = 60

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag } = await searchParams
  const decodedTag = tag ? decodeURIComponent(tag) : undefined

  const events = await getEventsList()
  const projects = await getProjectsList()
  const companies = await getCompaniesList()

  if (decodedTag) {
    const { docs: allNews } = await getNewsListPaginated(1, 50)
    const filteredNews = allNews.filter((item: NewsItem) =>
      item.tags?.split(';').some((t) => t.trim() === decodedTag)
    )

    const heroNews = filteredNews[0] || null
    const sectionNews = heroNews
      ? filteredNews.filter((item: NewsItem) => item.id !== heroNews.id)
      : filteredNews

    return (
      <PageShell>
        {heroNews && <NewsHero news={heroNews} />}
        <TagFilterBadge tag={tag!} />
        <NewsSection news={sectionNews} />
      </PageShell>
    )
  }

  const { docs: news } = await getNewsListPaginated(1, 50)

  const featuredNews = news.find((item: NewsItem) => item.featured)
  const heroNews = featuredNews || news[0]
  const sectionNews = heroNews
    ? news.filter((item: NewsItem) => item.id !== heroNews.id)
    : news

  return (
    <PageShell>
      {heroNews && <NewsHero news={heroNews} />}

      <NewsSection news={sectionNews} />

      <EventsSection events={events} />

      <ProjectsSection projects={projects} />

      <CompaniesSection companies={companies} />
    </PageShell>
  )
}
