import Link from 'next/link'
import { PageShell } from '@/src/components/layout'
import { NewsCard } from '@/src/components/noticias'
import { getNewsList, getCareers } from '@/src/lib/content'
import type { NewsItem } from '@/src/types/content'
import {
  HomeHero,
  SearchBar,
  AnnouncementBar,
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
      {/* ===== 1. HERO REDISEÑADO ===== */}
      <HomeHero>
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/10 via-transparent to-slate-950/40" />

        <div className="relative mx-auto flex min-h-[780px] w-full max-w-[1400px] flex-col px-4 pb-12 pt-24 sm:px-6 lg:px-10">
          <div className="mt-auto max-w-3xl pb-10">
            <p className="text-sm uppercase tracking-[0.34em] text-sky-100/80">
              Educación técnica superior · Buenos Aires · Argentina
            </p>
            <h1 className="font-heading mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
              IFTS N° 29
            </h1>
            <p className="mt-3 text-2xl text-slate-100 sm:text-3xl">
              Instituto de Formación Técnica Superior
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100/80">
              Más de una década formando profesionales técnicos con título oficial de validez
              nacional. Tu camino hacia la excelencia comienza aquí.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/carreras"
                className="inline-flex items-center justify-center rounded-md bg-[#28c2f3] px-8 py-3.5 text-sm font-semibold text-[#072c57] transition hover:bg-[#52d0f7]"
              >
                Conocé la carrera
              </Link>
              <Link
                href="/portal"
                className="inline-flex items-center justify-center rounded-md border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
              >
                Portal estudiantil
              </Link>
            </div>
          </div>

          <div className="rounded-[24px] bg-[#072c57]/90 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-sm sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-md">
                <p className="text-2xl leading-tight text-white sm:text-3xl">
                  ¿Qué estás buscando?
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Navegá rápidamente por todo el portal.
                </p>
              </div>
              <div className="w-full max-w-2xl">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </HomeHero>

      {/* ===== 2. AVISOS IMPORTANTES ===== */}
      <AnnouncementBar />

      {/* ===== 3. ¿POR QUÉ ELEGIRNOS? ===== */}
      <WhyChooseSection />

      {/* ===== 4. CARRERA DESTACADA ===== */}
      {career && <FeaturedCareer career={career} />}

      {/* ===== 5. TESTIMONIOS ===== */}
      <TestimonialsSection />

      {/* ===== 6. NOTICIAS ===== */}
      <section className="bg-[#f8f7f4] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                06 — Novedades
              </p>
              <h2 className="font-heading mt-4 text-4xl font-medium text-[#00152b]">
                Últimas noticias
              </h2>
            </div>
            <Link
              href="/noticias"
              className="inline-flex items-center justify-center rounded-md border border-[#072c57] px-6 py-3 text-sm font-medium text-[#072c57] transition hover:bg-[#072c57] hover:text-white"
            >
              Ver todas
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

      {/* ===== 8. CTA FINAL ===== */}
      <HomeCta />
    </PageShell>
  )
}
