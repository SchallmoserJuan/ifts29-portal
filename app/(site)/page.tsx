import Link from 'next/link'
import { PageShell } from '@/src/components/layout'
import { NewsCard } from '@/src/components/noticias'
import { getNewsList, getCareers } from '@/src/lib/content'
import type { NewsItem } from '@/src/types/content'
import {
  HomeHero,
  SearchBar,
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
                <span className="navbar-underline">Portal estudiantil</span>
              </Link>
            </div>
          </div>

          {/* Píldora de búsqueda minimalista */}
          <div className="relative">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <div className="max-w-sm shrink-0">
                  <p className="text-lg leading-snug text-white/70 sm:text-xl">
                    ¿Qué estás buscando?
                  </p>
                  <p className="mt-1 text-xs tracking-wide text-white/25">
                    Escribí para ver sugerencias
                  </p>
                </div>
                <div className="w-full max-w-xl">
                  <SearchBar />
                </div>
              </div>
            </div>
            {/* Línea decorativa inferior */}
            <div className="pointer-events-none absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-[#28c2f3]/20 to-transparent" />
          </div>
        </div>
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
