'use client'

import Link from 'next/link'
import {motion} from 'framer-motion'
import {AnimatedSection} from '../ui/animated-section'
import {SectionLabel} from '../ui/section-label'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

const careers = [
  {
    number: '01',
    title: 'Tecnicatura Superior en Desarrollo de Software',
    description:
      'Modalidad a distancia · Formación integral en tecnologías modernas de desarrollo, programación y gestión de proyectos digitales.',
    href: '/carreras',
  },
]

export function AcademicSection() {
  return (
    <section id="carreras" className="bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
        <AnimatedSection>
          <SectionLabel number="02" label="Carreras" />
          <h2 className="mt-6 font-heading text-3xl font-semibold text-[#00152b] sm:text-4xl md:text-5xl">
            Oferta Académica
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Nuestra propuesta educativa combina rigor académico con flexibilidad, preparando
            profesionales para los desafíos del sector tecnológico.
          </p>
        </AnimatedSection>

        <div className="mt-16">
          {careers.map((career, i) => (
            <motion.div
              key={career.number}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-50px'}}
              transition={{duration: 0.6, delay: i * 0.1, ease: easing}}
            >
              <Link
                href={career.href}
                className="group flex flex-col gap-4 border-t border-[#00152b]/8 py-8 transition hover:bg-[#00152b]/[0.02] md:flex-row md:items-center md:justify-between md:py-10"
              >
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="mt-1 text-xs font-semibold text-slate-400">{career.number}</span>
                  <div>
                    <h3 className="font-heading text-2xl font-semibold text-[#00152b] transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                      {career.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                      {career.description}
                    </p>
                  </div>
                </div>
                <span className="text-2xl text-[#00d4ff] opacity-0 transition-all duration-300 group-hover:opacity-100 md:text-3xl">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
          <div className="border-b border-[#00152b]/8" />
        </div>
      </div>
    </section>
  )
}
