import type { Metadata } from 'next'

import { PageShell } from '@/src/components/layout'
import { NewsHero, NewsSection, EventsSection, ProjectsSection, CompaniesSection, TagFilterBadge } from '@/src/components/noticias'
import { getNewsList, getEventsList, getProjectsList, getCompaniesList } from '@/src/lib/content'
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
  const news = await getNewsList()
  const events = await getEventsList()
  const projects = await getProjectsList()
  const companies = await getCompaniesList()

  const decodedTag = tag ? decodeURIComponent(tag) : undefined
  const filteredNews = decodedTag
    ? news.filter((item: NewsItem) =>
        item.tags?.split(';').some((t) => t.trim() === decodedTag)
      )
    : news

  const featuredNews = filteredNews.find((item: NewsItem) => item.featured)
  const heroNews = decodedTag ? null : (featuredNews || news[0])
  const sectionNews = heroNews
    ? filteredNews.filter((item: NewsItem) => item.id !== heroNews.id)
    : filteredNews

  return (
    <PageShell>
      {heroNews && <NewsHero news={heroNews} />}

      {decodedTag && <TagFilterBadge tag={tag!} />}

      <NewsSection news={sectionNews} limit={decodedTag ? sectionNews.length : 3} />

      {!decodedTag && (
        <>
          <EventsSection events={events} />

          <ProjectsSection projects={projects} />

          <CompaniesSection companies={companies} />
        </>
      )}
    </PageShell>
  )
}