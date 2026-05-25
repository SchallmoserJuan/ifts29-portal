import { NewsCard } from './news-card'
import { SectionHeader } from '../ui/section-header'
import { StaggerContainer, StaggerItem } from '../ui/animated-section'
import type { NewsItem } from '@/src/types/content'

export function NewsSection({ news }: { news: NewsItem[] }) {
  if (news.length === 0) return null

  return (
    <section className="bg-[#f8f7f4] py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeader
          title="Ultimas noticias e investigaciones"
          href="/noticias"
          linkText="Ver todas las noticias"
        />

        <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map((item) => (
            <StaggerItem key={item.id}>
              <NewsCard news={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
