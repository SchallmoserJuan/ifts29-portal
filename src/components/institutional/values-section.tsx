'use client'

import {AnimatedSection} from '@/src/components/animated-section'
import {SectionLabel} from '@/src/components/section-label'

export function ValuesSection() {
  return (
    <section className="bg-[#072c57] py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
        <AnimatedSection>
          <SectionLabel number="03" label="Propósito" light />
          <h2 className="mt-6 max-w-3xl font-heading text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            Educación técnica con propósito social
          </h2>
        </AnimatedSection>

        <div className="mt-16 flex flex-col divide-y divide-white/10 md:flex-row md:divide-x md:divide-y-0">
          <AnimatedSection className="flex-1 py-10 md:px-10 md:py-0" delay={0}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Misión
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Formar técnicos superiores con competencias sólidas, ética profesional y capacidad de
              adaptación, contribuyendo al desarrollo socioeconómico de la comunidad mediante una
              educación de calidad, inclusiva y vinculada con el sector productivo.
            </p>
          </AnimatedSection>

          <AnimatedSection className="flex-1 py-10 md:px-10 md:py-0" delay={0.15}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Visión
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Ser referentes en educación técnica superior a distancia, reconocidos por la excelencia
              académica, la innovación pedagógica y el impacto social de nuestros egresados en el
              ámbito nacional e internacional.
            </p>
          </AnimatedSection>

          <AnimatedSection className="flex-1 py-10 md:px-10 md:py-0" delay={0.3}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Valores
            </h3>
            <ul className="mt-4 space-y-3 text-base text-white/80">
              <li className="flex items-center gap-3">
                <span className="h-px w-6 bg-white/30" />
                Compromiso social
              </li>
              <li className="flex items-center gap-3">
                <span className="h-px w-6 bg-white/30" />
                Excelencia académica
              </li>
              <li className="flex items-center gap-3">
                <span className="h-px w-6 bg-white/30" />
                Innovación continua
              </li>
              <li className="flex items-center gap-3">
                <span className="h-px w-6 bg-white/30" />
                Comunidad y colaboración
              </li>
            </ul>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
