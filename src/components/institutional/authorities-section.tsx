'use client'

import {AnimatedSection} from '@/src/components/animated-section'
import {SectionLabel} from '@/src/components/section-label'

const authorities = [
  {
    name: 'Dra. María Elena Gutiérrez',
    role: 'Directora',
    bio: 'Doctora en Educación con más de 20 años de experiencia en gestión académica y políticas públicas educativas.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Lic. Carlos Alberto Méndez',
    role: 'Vicedirector',
    bio: 'Especialista en administración educativa y planificación estratégica institucional.',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Ing. Ana Paula Rodríguez',
    role: 'Secretaria Académica',
    bio: 'Ingeniera en Sistemas con amplia trayectoria en diseño curricular y evaluación educativa.',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
  },
]

export function AuthoritiesSection() {
  return (
    <section className="bg-[#f8f7f4] py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
        <AnimatedSection>
          <SectionLabel number="04" label="Autoridades" />
          <h2 className="mt-6 font-heading text-3xl font-semibold text-[#00152b] sm:text-4xl md:text-5xl">
            Quienes guían nuestra institución
          </h2>
        </AnimatedSection>

        <div className="mt-16 space-y-16 md:mt-20 md:space-y-24">
          {authorities.map((auth, i) => (
            <AnimatedSection key={auth.name}>
              <div
                className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="w-full md:w-[45%]">
                  <div className="aspect-[4/5] overflow-hidden rounded-sm bg-slate-200">
                    <img
                      src={auth.image}
                      alt={auth.name}
                      className="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="h-px w-12 bg-[#00152b]/20" />
                  <h3 className="mt-6 font-heading text-2xl font-semibold text-[#00152b] md:text-3xl">
                    {auth.name}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {auth.role}
                  </p>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
                    {auth.bio}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
