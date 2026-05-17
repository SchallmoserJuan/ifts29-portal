'use client'

import { AnimatedSection } from '@/src/components/ui'
import type { CareerItem } from '@/src/types/content'

export function CareerArticulations({ career }: { career: CareerItem }) {
  const arts = career.articulations
  if (!arts || arts.length === 0) return null

  return (
    <section id="articulaciones" className="py-12 bg-[#072c57] border-t border-b border-neutral-100">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight text-center sm:text-left">
            Articulaciones Universitarias
          </h2>
          <p className="text-slate-300 text-lg mb-8 text-center sm:text-left">
            Al finalizar la tecnicatura, podés continuar tus estudios y obtener un título de grado en
            las siguientes instituciones
          </p>
        </AnimatedSection>
        <div className="grid gap-4 sm:grid-cols-3">
          {arts.map((art, index) => (
            <a
              key={index}
              href={art.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                Convenio de Grado
              </span>
              <h3 className="text-lg font-bold text-neutral-800 transition-colors">
                <span className="tag-underline">{art.description || art.institution}</span>
              </h3>
              <p className="text-sm text-neutral-500 mt-1">{art.institution}</p>
              <div className="mt-4 text-xs font-medium text-neutral-400 group-hover:text-blue-500 flex items-center gap-1 transition-colors">
                Ver plan de articulación
                <span className="inline-block transform group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
