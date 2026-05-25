'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { AnimatedSection } from '@/src/components/ui'
import type { CareerItem } from '@/src/types/content'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]
const FALLBACK_INTRO_IMAGE =
  'https://plus.unsplash.com/premium_photo-1690303193709-dedfee29c452?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export function CareerIntro({ career }: { career: CareerItem }) {
  if (!career.introTitle && !career.introDescription) return null

  const introImage = career.introImage?.url || FALLBACK_INTRO_IMAGE

  return (
    <section className="relative w-full bg-[#f8f7f4] py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <AnimatedSection>
            <div className="max-w-2xl">

              <h2 className="text-3xl font-medium leading-tight tracking-tight text-[#00152b] md:text-4xl lg:text-5xl">
                {career.introTitle}
              </h2>

              <div className="mt-2 h-px w-16 bg-[#072c57]/20" />

              {career.introDescription && (
                <p className="mt-8 text-lg leading-8 text-slate-700">
                  {career.introDescription}
                </p>
              )}

              {career.introFocus && (
                <p className="mt-6 text-lg leading-8 text-slate-700">
                  {career.introFocus}
                </p>
              )}

              {career.introOutcome && (
                <p className="mt-6 text-lg leading-8 text-slate-700">
                  {career.introOutcome}
                </p>
              )}

              {career.introIndustry && (
                <p className="mt-8 text-base leading-7 text-slate-500 italic">
                  {career.introIndustry}
                </p>
              )}
            </div>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: easing }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#00152b]">
              <Image
                src={introImage}
                alt="Formacion tecnica superior IFTS 29"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                IFTS 29
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="mt-4 flex justify-between text-xs tracking-widest text-slate-400">
              <span>BUENOS AIRES</span>
              <span>ARGENTINA</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
