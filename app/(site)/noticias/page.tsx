import { PageShell } from '@/src/components/page-shell'
import { NewsHero } from '@/src/components/news-hero'
import { NewsSection } from '@/src/components/news-section'
import { EventsSection } from '@/src/components/events-section'
import { ProjectsSection } from '@/src/components/projects-section'
import { CompaniesSection } from '@/src/components/companies-section'
import { getNewsList, getEventsList, getProjectsList, getCompaniesList } from '@/src/lib/content'
import type { NewsItem } from '@/src/types/content'

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