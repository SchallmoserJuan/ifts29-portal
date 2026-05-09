'use client'

import {AnimatedSection} from '@/src/components/animated-section'
import {SectionLabel} from '@/src/components/section-label'

const milestones = [
  {year: '2019', text: 'Fundación del instituto con la primera cohorte de estudiantes'},
  {year: '2021', text: 'Expansión de la oferta académica y nueva sede equipada'},
  {year: '2024', text: 'Reconocimiento por excelencia en formación técnica a distancia'},
]

export function HistorySection() {
  return (
    <section id="historia" className="bg-white py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1400px] gap-16 px-6 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <AnimatedSection>
          <SectionLabel number="01" label="Historia" />
          <h2 className="mt-6 font-heading text-3xl font-semibold text-[#00152b] sm:text-4xl md:text-5xl">
            Un legado de transformación educativa
          </h2>
          <div className="mt-6 h-px w-16 bg-[#00152b]/20" />
          <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-600">
            <p>
              Fundado con la convicción de que la educación técnica superior es el motor del
              desarrollo social y económico, el IFTS 29 ha construido una trayectoria sólida marcada
              por la innovación pedagógica y el vínculo permanente con el sector productivo.
            </p>
            <p>
              A lo largo de nuestra historia, hemos formado a miles de profesionales que hoy ocupan
              posiciones clave en empresas, organizaciones y proyectos de impacto. Nuestro modelo
              educativo combina rigor académico con práctica profesional, preparando a nuestros
              egresados para los desafíos de un mundo en constante transformación.
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {milestones.map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-[#00152b]" />
                  {i < milestones.length - 1 && <div className="mt-2 h-full w-px bg-[#00152b]/15" />}
                </div>
                <div className="pb-8">
                  <span className="text-sm font-semibold text-[#00152b]">{item.year}</span>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="relative">
          <div className="aspect-[3/4] overflow-hidden rounded-sm bg-slate-200 lg:mt-12">
            <img
              src="https://images.unsplash.com/photo-1653990603052-17a7198a9a99?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Estudiantes en ceremonia de graduación"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-4 text-xs text-slate-400">Ceremonia de graduación 2023</p>
        </AnimatedSection>
      </div>
    </section>
  )
}
