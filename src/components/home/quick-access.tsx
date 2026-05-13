import Link from 'next/link'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/src/components/ui'
import { GraduationCap, BookOpen, FileText, Mail, HelpCircle, CalendarDays } from 'lucide-react'

const quickLinks = [
  {
    icon: GraduationCap,
    title: 'Portal estudiantil',
    description: 'Accedé a tus notas, mesas de examen y material de cursado.',
    href: '/portal',
  },
  {
    icon: BookOpen,
    title: 'Biblioteca virtual',
    description: 'Recursos digitales, apuntes y bibliografía de las materias.',
    href: '/portal/library',
  },
  {
    icon: FileText,
    title: 'Documentación',
    description: 'Plan de estudios, calendario académico y normativas.',
    href: '/institucional',
  },
  {
    icon: CalendarDays,
    title: 'Eventos',
    description: 'Charlas, talleres, jornadas y actividades del instituto.',
    href: '/eventos',
  },
  {
    icon: Mail,
    title: 'Contacto',
    description: 'Consultas, ubicación y horarios de atención.',
    href: '/contacto',
  },
  {
    icon: HelpCircle,
    title: 'Preguntas frecuentes',
    description: 'Respuestas sobre inscripción, aranceles y trámites.',
    href: '/institucional',
  },
]

export function QuickAccessSection() {
  return (
    <section className="bg-[#072c57] py-24 text-white md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
            06 — Accesos directos
          </p>
          <h2 className="font-heading mt-6 max-w-3xl text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            Todo lo que necesitás en un solo lugar
          </h2>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
          {quickLinks.map((link) => (
            <StaggerItem key={link.title}>
              <Link
                href={link.href}
                className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/5 p-6 transition hover:border-[#28c2f3]/40 hover:bg-white/10"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#28c2f3]/10 text-[#28c2f3] transition group-hover:bg-[#28c2f3]/20">
                  <link.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{link.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{link.description}</p>
                <div className="mt-auto pt-4">
                  <span className="navbar-underline-inline items-center gap-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#28c2f3] transition group-hover:gap-2">
                    Acceder
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
