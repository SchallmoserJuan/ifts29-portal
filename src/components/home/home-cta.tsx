import Link from 'next/link'
import { AnimatedSection } from '@/src/components/ui'

export function HomeCta() {
  return (
    <section className="bg-[#f8f7f4] py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-10">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-semibold text-[#00152b] sm:text-4xl md:text-5xl">
            Sé parte del IFTS 29
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600">
            Tu camino hacia la formación técnica superior comienza aquí. Descubrí la Tecnicatura en
            Desarrollo de Software y construí tu futuro profesional.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/carreras"
              className="inline-flex items-center justify-center rounded-md bg-[#28c2f3] px-10 py-4 text-sm font-semibold text-[#072c57] transition hover:bg-[#52d0f7]"
            >
              Conocé la carrera
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-md border border-[#072c57] px-10 py-4 text-sm font-semibold text-[#072c57] transition hover:bg-[#072c57] hover:text-white"
            >
              <span className="tag-underline">Contactanos</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
