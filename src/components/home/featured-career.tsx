import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/src/components/ui'
import type { CareerItem } from '@/src/types/content'

interface FeaturedCareerProps {
  career: CareerItem
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'

export function FeaturedCareer({ career }: FeaturedCareerProps) {
  return (
    <section className="relative bg-[#072c57] py-24 text-white md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
            02 — Oferta académica
          </p>
        </AnimatedSection>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <AnimatedSection>
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                {career.name}
              </h2>

              <div className="mt-4 h-px w-16 bg-white/20" />

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28c2f3]" />
                  {career.duration}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28c2f3]" />
                  {career.modality}
                </span>
                {career.resolution && (
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#28c2f3]" />
                    {career.resolution}
                  </span>
                )}
              </div>

              <p className="mt-8 text-lg leading-8 text-white/80">{career.summary}</p>

              <Link
                href={`/carreras/${career.slug}`}
                className="mt-10 inline-flex items-center gap-2 rounded-sm bg-[#00d4ff] px-10 py-4 text-sm font-semibold text-[#00152b] transition hover:brightness-110"
              >
                Ver plan de estudios
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection className="relative" delay={0.15}>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#00152b]">
              <Image
                src={career.heroImage?.url || FALLBACK_IMAGE}
                alt={career.heroImage?.alt || career.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                IFTS 29
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="mt-4 flex justify-between text-xs tracking-widest text-white/40">
              <span>BUENOS AIRES</span>
              <span>ARGENTINA</span>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
