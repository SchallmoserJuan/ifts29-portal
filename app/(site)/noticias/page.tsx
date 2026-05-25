import type { Metadata } from 'next'

import { PageShell } from '@/src/components/layout'
import { NewsHero, NewsSection, EventsSection, ProjectsSection, CompaniesSection } from '@/src/components/noticias'
import { getNewsList, getEventsList, getProjectsList, getCompaniesList } from '@/src/lib/content'
import type { NewsItem } from '@/src/types/content'

export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Enterate de las últimas novedades, eventos y proyectos del IFTS N° 29. Noticias académicas e institucionales de nuestra comunidad.',
}

export const revalidate = 60

export default async function NewsPage() {
  const news = await getNewsList()
  const events = await getEventsList()
  const projects = await getProjectsList()
  const companies = await getCompaniesList()

  const featuredNews = news.find((item: NewsItem) => item.featured)
  const heroNews = featuredNews || news[0]
  const sectionNews = news.filter((item: NewsItem) => item.id !== heroNews?.id).slice(0, 4)

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