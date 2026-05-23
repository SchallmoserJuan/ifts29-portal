import { AnimatedSection, StaggerContainer, StaggerItem } from '@/src/components/ui'
import { Award, Users, Code2, HeartHandshake } from 'lucide-react'

const reasons = [
  {
    icon: Award,
    title: 'Título oficial de validez nacional',
    description:
      'Nuestra Tecnicatura Superior en Desarrollo de Software otorga un título de nivel superior reconocido en todo el país.',
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

export function WhyChooseSection() {
  return (
    <section className="bg-[#f8f7f4] py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <h2 className="font-heading max-w-3xl text-3xl font-semibold text-[#00152b] sm:text-4xl md:text-5xl">
            ¿Por qué elegir el IFTS 29?
          </h2>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
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
  )
}
