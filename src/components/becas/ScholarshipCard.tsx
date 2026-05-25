'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink, CheckCircle2 } from 'lucide-react'
import { RichTextRenderer } from '@/src/components/ui'
import type { ScholarshipItem } from '@/src/types/content'

export function ScholarshipCard({ scholarship }: { scholarship: ScholarshipItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[#072c57]">{scholarship.title}</h3>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">{scholarship.summary}</p>
        </div>
        <div
          className={`shrink-0 mt-1 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <ChevronDown className="w-4 h-4 text-[#072c57]" />
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
            <div className="px-6 pb-6 pt-2 border-t border-slate-100">
              {scholarship.description ? (
                <div className="prose prose-slate max-w-none mb-4 text-slate-700 text-sm leading-relaxed">
                  <RichTextRenderer content={scholarship.description} />
                </div>
              ) : null}

              {scholarship.requirements && scholarship.requirements.length > 0 && (
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-[#072c57] uppercase tracking-wider mb-3">
                    Requisitos y pasos a seguir
                  </h4>
                  <ul className="space-y-2">
                    {scholarship.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-[#28c2f3] shrink-0 mt-0.5" />
                        <span>{req.item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {scholarship.externalLink && (
                <a
                  href={scholarship.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#072c57] text-white text-sm font-medium rounded-lg hover:bg-[#0a3d7a] transition-colors"
                >
                  Más información
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
