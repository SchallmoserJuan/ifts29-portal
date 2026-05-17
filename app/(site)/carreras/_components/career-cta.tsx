'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { CareerItem } from '@/src/types/content'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function CareerCta({ career }: { career: CareerItem }) {
  if (!career.ctaTitle) return null

  return (
    <section className="relative w-full bg-[#072c57] py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,194,243,0.06)_0%,_transparent_70%)]" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center px-4 text-center sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: easing }}
          className="max-w-6xl"
        >
          <h2 className="text-3xl font-bold  tracking-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
            {career.ctaTitle}
          </h2>

          {career.ctaSubtitle && (
            <p className="mt-6 text-lg leading-8 text-slate-300 md:text-xl">
              {career.ctaSubtitle}
            </p>
          )}

          {career.ctaLabel && (
            <div className="mt-12">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-3 rounded-sm bg-[#28c2f3] px-8 py-4 text-base font-semibold text-[#072c57] transition md:px-10 md:py-5 md:text-lg"
              >
                <span className='tag-underline'>{career.ctaLabel}</span>
              </Link>
            </div>
          )}
        </motion.div>

        <div className="mt-20 flex w-full max-w-2xl items-center gap-6 text-xs tracking-widest text-white/20">
          <div className="h-px flex-1 bg-white/10" />
          <span>IFTS 29</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>
    </section>
  )
}
