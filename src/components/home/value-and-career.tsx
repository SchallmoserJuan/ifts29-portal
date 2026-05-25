import Image from 'next/image'
import Link from 'next/link'
import { Award, Users, Code2, HeartHandshake, ArrowRight } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/src/components/ui'
import type { CareerItem } from '@/src/types/content'

interface ValueAndCareerProps {
  career: CareerItem
}

const reasons = [
  {
    icon: Award,
    title: 'Título oficial de validez nacional',
    description:
      'Nuestra Tecnicatura Superior otorga un título de nivel superior reconocido en todo el país.',
    accent: '#e11d48',
  },
  {
    icon: Users,
    title: 'Docentes especializados en activo',
    description:
      'Nuestro equipo docente está compuesto por profesionales que trabajan en el sector IT, aportando experiencia real.',
    accent: '#2563eb',
  },
  {
    icon: Code2,
    title: 'Formación práctica orientada al sector',
    description:
      'El plan de estudios se actualiza constantemente para responder a las demandas del mercado laboral tecnológico.',
    accent: '#16a34a',
  },
  {
    icon: HeartHandshake,
    title: 'Comunidad de apoyo y networking',
    description:
      'Formá parte de una comunidad activa de estudiantes y egresados que comparten oportunidades y conocimiento.',
    accent: '#ea580c',
  },
]

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'

export function ValueAndCareerSection({ career }: ValueAndCareerProps) {
  return (
    <>
      {/* ===== Razones para elegirnos ===== */}
      <section className="bg-[#f8f7f4] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <AnimatedSection>
            <h2 className="font-heading max-w-3xl text-3xl font-semibold text-[#00152b] sm:text-4xl md:text-5xl">
              ¿Por qué elegir el IFTS 29?
            </h2>
          </AnimatedSection>

          <StaggerContainer
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.1}
          >
            {reasons.map((reason) => (
              <StaggerItem key={reason.title}>
                <div className="group relative">
                  <div
                    className="mb-6 inline-flex rounded-lg bg-white p-3 shadow-sm"
                    style={{ color: reason.accent }}
                  >
                    <reason.icon className="h-6 w-6" />
                  </div>
                  <div
                    className="mb-4 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-12"
                    style={{ backgroundColor: reason.accent }}
                  />
                  <h3 className="text-lg font-semibold text-[#00152b]">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {reason.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== Carrera destacada ===== */}
      <section className="bg-[#072c57] py-24 text-white md:py-32">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <AnimatedSection>
              <div className="max-w-2xl">
                <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
                  {career.name}
                </h2>

                <div className="mt-4 h-px w-16 bg-white/20" />

                <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-300">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#28c2f3]" />
                    {career.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#28c2f3]" />
                    {career.modality}
                  </span>
                  {career.resolution && (
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#28c2f3]" />
                      {career.resolution}
                    </span>
                  )}
                </div>

                <p className="mt-8 text-lg leading-8 text-white/80">{career.summary}</p>

                <Link
                  href={`/carreras/${career.slug}`}
                  className="mt-10 inline-flex items-center gap-2 rounded-md bg-[#28c2f3] px-10 py-4 text-sm font-semibold text-[#072c57] transition hover:bg-[#52d0f7]"
                >
                  Ver plan de estudios
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection className="relative" delay={0.15}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#00152b]">
                <Image
                  src={career.heroImage?.url || FALLBACK_IMAGE}
                  alt={career.heroImage?.alt || career.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
