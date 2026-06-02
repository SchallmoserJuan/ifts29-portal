import { NewsCard } from './news-card'
import { SectionHeader } from '../ui/section-header'
import { StaggerContainer, StaggerItem } from '../ui/animated-section'
import type { NewsItem } from '@/src/types/content'

interface NewsSectionProps {
  news: NewsItem[]
  limit?: number
}

export function NewsSection({ news, limit = 3 }: NewsSectionProps) {
  if (news.length === 0) return null

  return (
    <section className="bg-[#f8f7f4] py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeader
          title="Ultimas noticias e investigaciones"
        />

        <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, limit).map((item) => (
            <StaggerItem key={item.id}>
              <NewsCard news={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
