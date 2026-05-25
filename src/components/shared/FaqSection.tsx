'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { RichTextRenderer } from '@/src/components/ui'

interface FaqItem {
  question: string
  answer?: unknown
}

interface FaqSectionProps {
  items: FaqItem[]
  title?: string
  subtitle?: string
  id?: string
}

export function FaqSection({ items, title = 'Preguntas Frecuentes', subtitle, id }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!items || items.length === 0) return null

  return (
    <section id={id} className="py-16 lg:py-24 bg-[#f8f7f4]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-base text-slate-500 md:text-lg">{subtitle}</p>
          )}
        </div>

        <div className="max-w-3xl space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span id={`faq-question-${index}`} className="font-medium text-slate-800">{item.question}</span>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-colors">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#072c57]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#072c57]" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                        {item.answer ? <RichTextRenderer content={item.answer} /> : null}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
