'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { careerStudyPlan } from '@/src/data/career-content'
import { AnimatedSection } from '@/src/components/ui'
import type { CareerItem } from '@/src/types/content'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function CareerStudyPlan({ career }: { career: CareerItem }) {
  const planImage = career.studyPlanImage?.url || '/images/plan-de-estudios.png'

  return (
    <section id="plan-de-estudios" className="relative w-full bg-[#f8f7f4] py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-[#00152b] md:text-4xl lg:text-5xl">
              {careerStudyPlan.title}
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              {careerStudyPlan.subtitle}
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-700">
              {careerStudyPlan.description}
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-12 flex flex-wrap gap-8 text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#072c57]" />
            <span className="font-medium">{careerStudyPlan.durationLabel}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#072c57]" />
            <span className="font-medium">{careerStudyPlan.structureLabel}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#072c57]" />
            <span className="font-medium">{careerStudyPlan.focusLabel}</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: easing }}
          className="mt-16"
        >
          <div className="group relative mx-auto max-w-5xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-shadow duration-700 hover:shadow-md">
            <div className="relative aspect-[4/3] w-full md:aspect-[16/10]">
              <Image
                src={planImage}
                alt="Plan de estudios Tecnicatura Superior en Desarrollo de Software"
                fill
                className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.02]"
                unoptimized
              />
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Plan de estudios oficial — IFTS 29
          </p>
        </motion.div>
      </div>
    </section>
  )
}
