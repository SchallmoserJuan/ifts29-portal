'use client'

import { motion } from 'framer-motion'
import type { CareerItem } from '@/src/types/content'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function CareerHero({ career }: { career: CareerItem }) {
  if (!career.heroHeadline && !career.heroParagraph) return null

  return (
    <section className="relative flex min-h-[45vh] w-full flex-col justify-end bg-[#072c57] text-white">
      <div className="relative mx-auto w-full max-w-[1400px] px-4 pb-18 sm:px-6 lg:px-10">
        <motion.div className="max-w-4xl"
        >
          <h1 className="mt-5 text-4xl font-heading leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {career.heroHeadline || career.name}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
            {career.heroParagraph}
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
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
