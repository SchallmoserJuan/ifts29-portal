'use client'

import { motion } from 'framer-motion'
import type { CareerItem } from '@/src/types/content'
import { defaultCareers } from '@/src/data/defaults'
import { AnimatedSection } from '@/src/components/ui'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fallbackOutcomes = defaultCareers[0]?.outcomes || []

export function CareerOutcomes({ career }: { career: CareerItem }) {
  const outcomes = career.outcomes && career.outcomes.length > 0
    ? career.outcomes
    : fallbackOutcomes

  return (
    <section className="relative w-full bg-[#072c57] py-24 text-white md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              Campos de desempeño
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              La industria tecnológica ofrece múltiples vertientes de especialización para el egresado.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-20">
          {outcomes.map((outcome, i) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: easing }}
            >
              <div className="group flex items-start gap-6 border-t border-white/10 py-10 md:gap-10 md:py-12">
                <span className="mt-1 text-4xl font-light text-white/5 md:text-6xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-white md:text-2xl">
                    {outcome.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
                    {outcome.description}
                  </p>
                </div>
                <div className="hidden h-2 w-2 shrink-0 rounded-full bg-[#28c2f3] opacity-0 transition-opacity group-hover:opacity-100 md:block" />
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  )
}
