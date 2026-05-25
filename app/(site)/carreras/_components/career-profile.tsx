'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/src/components/ui'
import type { CareerItem } from '@/src/types/content'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easing },
  },
}

export function CareerProfile({ career }: { career: CareerItem }) {
  if (!career.profileTitle || !career.profileBlocks?.length) return null

  return (
    <section className="relative w-full bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-[#00152b] md:text-4xl lg:text-5xl">
              {career.profileTitle}
            </h2>
            {career.profileSubtitle && (
              <p className="mt-4 text-lg text-slate-500">
                {career.profileSubtitle}
              </p>
            )}
          </div>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-20 grid gap-px bg-slate-100 md:grid-cols-2"
        >
          {career.profileBlocks.map((block, i) => (
            <motion.div
              key={block.title}
              variants={itemVariants}
              className={`group bg-white p-10 md:p-14 ${i === 0 ? 'md:col-span-1' : ''}`}
            >
              <div className="flex items-start gap-6">
                <span className="mt-1 text-xs font-semibold tracking-widest text-slate-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-medium text-[#072c57] md:text-2xl">
                    {block.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
                    {block.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {career.profileQuote && (
          <AnimatedSection delay={0.2} className="mt-24">
            <div className="relative border-l-2 border-[#072c57]/10 pl-8 md:pl-12">
              <blockquote className="text-2xl font-medium italic leading-relaxed text-[#00152b] md:text-3xl lg:text-3xl">
                {career.profileQuote}
              </blockquote>
              <div className="mt-6 h-px w-12 bg-[#28c2f3]" />
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}
