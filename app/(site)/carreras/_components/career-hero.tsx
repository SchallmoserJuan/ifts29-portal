'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { careerHero } from '@/src/data/career-content'
import type { CareerItem } from '@/src/types/content'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function CareerHero({ career }: { career: CareerItem }) {
  return (
    <section className="relative flex min-h-[66vh] w-full flex-col justify-end bg-[#072c57] text-white">
      <div className="relative mx-auto w-full max-w-[1400px] px-4 pb-18 sm:px-6 lg:px-10">
        <motion.div className="max-w-4xl"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.28em] text-[#28c2f3]">
            {careerHero.label}
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {careerHero.headline}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
            {careerHero.paragraph}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#28c2f3]" />
              {career.duration}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#28c2f3]" />
              {career.modality}
            </span>
            {career.resolution && (
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#28c2f3]" />
                {career.resolution}
              </span>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#plan-de-estudios"
              className="inline-flex items-center gap-2 rounded-sm bg-[#28c2f3] px-7 py-3.5 text-sm font-semibold text-[#072c57] transition hover:bg-[#52d0f7]"
            >
              <span className="tag-underline">{careerHero.ctaPrimary}</span>
              <span aria-hidden="true">↓</span>
            </Link>
            <a
              href="/documents/PDF-1.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
            >
              <span className="navbar-underline">{careerHero.ctaSecondary}
              </span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
