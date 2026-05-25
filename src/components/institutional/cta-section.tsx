'use client'

import Link from 'next/link'
import {AnimatedSection} from '../ui/animated-section'

export function CTASection() {
  return (
    <section className="bg-[#072c57] py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            Sé parte del IFTS 29
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">
            Descubrí tu carrera y empezá a construir tu futuro profesional. Tu camino hacia la
            excelencia comienza aquí.
          </p>
          <Link
            href="/carreras/tecnicatura-superior-en-desarrollo-de-software"
            className="mt-10 inline-flex items-center bg-[#00d4ff] px-10 py-4 text-sm font-semibold text-[#00152b] transition hover:brightness-110 rounded-sm"
          >
            Ver carrera
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
