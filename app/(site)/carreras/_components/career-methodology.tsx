'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { careerMethodology } from '@/src/data/career-content'
import { AnimatedSection } from '@/src/components/animated-section'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]
const METHODOLOGY_IMAGE =
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1800&q=80'

export function CareerMethodology() {
  return (
    <section className="relative w-full overflow-hidden bg-[#00152b] text-white">
      <div className="relative min-h-[600px] md:min-h-[700px]">
        <Image
          src={METHODOLOGY_IMAGE}
          alt="Metodologia de formacion IFTS 29"
          fill
          className="object-cover opacity-30"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00152b]/90 via-[#00152b]/70 to-[#00152b]/40" />

        <div className="relative mx-auto flex min-h-[600px] w-full max-w-[1400px] flex-col justify-center px-4 py-24 sm:px-6 md:min-h-[700px] lg:px-10">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
                06 — Experiencia Academica
              </span>
              <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                {careerMethodology.title}
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                {careerMethodology.subtitle}
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {careerMethodology.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: easing }}
              >
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-lg font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-300">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
