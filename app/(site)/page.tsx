import Link from 'next/link'
import { PageShell } from '@/src/components/layout'
import { NewsCard } from '@/src/components/noticias'
import { getNewsList, getCareers } from '@/src/lib/content'
import type { NewsItem } from '@/src/types/content'
import {
  HomeHero,
  HeroContent,
  AnnouncementBar,
  PlatformCards,
  WhyChooseSection,
  FeaturedCareer,
  TestimonialsSection,
  QuickAccessSection,
  HomeCta,
} from '@/src/components/home'

export const revalidate = 60

export default async function HomePage() {
  const [news, careers] = await Promise.all([getNewsList(), getCareers()])
  const latestNews = news.slice(0, 3) as NewsItem[]

  const career =
    careers.find((c) => c.slug === 'tecnicatura-superior-en-desarrollo-de-software') || careers[0]

  return (
    <PageShell>
      {/* ===== 1. HERO ===== */}
      <HomeHero>
        <HeroContent />
      </HomeHero>

      {/* ===== 2. AVISOS IMPORTANTES ===== */}
      <AnnouncementBar />

      {/* ===== 3. PLATAFORMAS ACADÉMICAS ===== */}
      <PlatformCards />

      {/* ===== 4. ¿POR QUÉ ELEGIRNOS? ===== */}
      <WhyChooseSection />

      {/* ===== 4. CARRERA DESTACADA ===== */}
      {career && <FeaturedCareer career={career} />}

      {/* ===== 5. NOTICIAS ===== */}
      <section className="bg-[#f8f7f4] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                05 — Novedades
              </p>
              <h2 className="font-heading mt-4 text-4xl font-medium text-[#00152b]">
                Últimas noticias
              </h2>
            </div>
            <Link
              href="/noticias"
              className="inline-flex items-center justify-center rounded-md border border-[#072c57] px-6 py-3 text-sm font-medium text-[#072c57] transition hover:bg-[#072c57] hover:text-white"
            >
              <span className="tag-underline">Ver todas</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {latestNews.map((item) => (
              <NewsCard key={item.id} news={item} variant="default" />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. ACCESOS RÁPIDOS ===== */}
      <QuickAccessSection />

      {/* ===== 7. TESTIMONIOS ===== */}
      <TestimonialsSection />

      {/* ===== 8. CTA FINAL ===== */}
      <HomeCta />
    </PageShell>
  )
}
