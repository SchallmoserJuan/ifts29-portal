'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/src/components/ui'
import type { CareerItem, DocumentItem } from '@/src/types/content'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

function isDocumentItem(doc: unknown): doc is DocumentItem {
  return typeof doc === 'object' && doc !== null && 'title' in doc
}

const fallbackDocuments: DocumentItem[] = [
  {
    id: 'pdf-general',
    title: 'Información de la Carrera',
    description:
      'Perfil profesional, incumbencias, contenido academico detallado y objetivos de cada etapa del plan de estudios.',
    category: 'normativas',
    visibility: 'public',
    url: '/documents/PDF-1.pdf',
  },
  {
    id: 'pdf-resoluciones',
    title: 'Validez del Título y Resoluciones',
    description:
      'Resoluciones oficiales, artículos regulatorios y documentación que respalda la validez nacional del título.',
    category: 'normativas',
    visibility: 'public',
    url: '/documents/PDF-2.pdf',
  },
]

export function CareerPdfs({ career }: { career: CareerItem }) {
  const cmsDocs = career.documents?.filter(isDocumentItem)
  const docs = cmsDocs && cmsDocs.length > 0 ? cmsDocs : fallbackDocuments

  if (!docs || docs.length === 0) return null

  return (
    <section className="relative w-full bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-[#00152b] md:text-4xl lg:text-5xl">
              {career.documentsTitle || 'Documentos Institucionales'}
            </h2>
            {career.documentsSubtitle && (
              <p className="mt-4 text-lg text-slate-500">
                {career.documentsSubtitle}
              </p>
            )}
          </div>
        </AnimatedSection>

        <div className="mt-16">
          {docs.map((pdf, i) => (
            <motion.div
              key={pdf.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: easing }}
              className="group"
            >
              <div className="flex flex-col gap-6 border-t border-slate-100 py-10 md:flex-row md:items-center md:justify-between md:py-12">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-slate-200 bg-[#f8f7f4]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#072c57]"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M12 18v-6" />
                      <path d="M9 15l3 3 3-3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#00152b] md:text-xl">
                      {pdf.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-base leading-7 text-slate-600">
                      {pdf.description}
                    </p>
                  </div>
                </div>

                {pdf.url && (
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 self-start border border-[#072c57] px-6 py-3 text-sm font-semibold text-[#072c57] transition hover:bg-[#072c57] hover:text-white md:self-center"
                  >
                    Descargar PDF
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
          <div className="border-t border-slate-100" />
        </div>
      </div>
    </section>
  )
}
