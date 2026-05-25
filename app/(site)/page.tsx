import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/src/components/layout'
import { NewsCard } from '@/src/components/noticias'
import { getNewsList, getCareers, getProjectsList } from '@/src/lib/content'
import type { NewsItem, ProjectItem } from '@/src/types/content'
import {
  HomeHero,
  HeroContent,
  AnnouncementBar,
  PlatformCards,
  ValueAndCareerSection,
  HomeProjectsSection,
  HomeCta,
} from '@/src/components/home'

export const metadata: Metadata = {
  title: 'IFTS N° 29 - Instituto de Formación Técnica Superior',
  description:
    'Tecnicatura Superior en Desarrollo de Software. Título oficial de validez nacional. Más de una década formando profesionales técnicos en Buenos Aires.',
}

export const revalidate = 60

export default async function HomePage() {
  const [news, careers, projects] = await Promise.all([
    getNewsList(),
    getCareers(),
    getProjectsList(),
  ])
  const latestNews = news.slice(0, 3) as NewsItem[]
  const latestProjects = projects.slice(0, 3) as ProjectItem[]

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

      {/* ===== 4. VALOR DIFERENCIAL + CARRERA DESTACADA ===== */}
      {career && <ValueAndCareerSection career={career} />}

      {/* ===== 5. PROYECTOS DESTACADOS ===== */}
      {latestProjects.length > 0 && <HomeProjectsSection projects={latestProjects} />}

      {/* ===== 6. NOTICIAS ===== */}
      <section className="bg-[#f8f7f4] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-4xl font-medium text-[#00152b]">
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

      {/* ===== 7. CTA FINAL + ACCESOS RÁPIDOS ===== */}
      <HomeCta />
    </PageShell>
  )
}
