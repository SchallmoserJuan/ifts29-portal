import Link from 'next/link'
import { AnimatedSection } from '@/src/components/ui'
import {
  GraduationCap,
  Award,
  FileText,
  Mail,
  HelpCircle,
  CalendarDays,
} from 'lucide-react'

const quickLinks = [
  {
    icon: GraduationCap,
    title: 'Portal estudiantil',
    description: 'Notas, mesas de examen y material de cursado.',
    href: '/portal',
  },
  {
    icon: Award,
    title: 'Becas',
    description: 'Programas nacionales y de la Ciudad para financiar tus estudios.',
    href: '/becas',
  },
  {
    icon: FileText,
    title: 'Documentación',
    description: 'Plan de estudios, calendario académico y normativas.',
    href: '/documentacion',
  },
  {
    icon: CalendarDays,
    title: 'Eventos',
    description: 'Charlas, talleres, jornadas y actividades.',
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
    href: '/inscripciones',
  },
]

export function HomeCta() {
  return (
    <section className="bg-[#072c57] py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
              Sé parte del IFTS 29
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">
              Tu camino hacia la formación técnica superior comienza aquí. Descubrí la Tecnicatura en
              Desarrollo de Software y construí tu futuro profesional.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/carreras/tecnicatura-superior-en-desarrollo-de-software"
                className="inline-flex items-center justify-center rounded-md bg-[#28c2f3] px-10 py-4 text-sm font-semibold text-[#072c57] transition hover:bg-[#52d0f7]"
              >
                Conocé la carrera
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-md border border-white/20 px-10 py-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                <span className="tag-underline">Contactanos</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Accesos rápidos */}
        <AnimatedSection delay={0.2}>
          <div className="mx-auto mt-20 max-w-[1200px]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/5 p-6 transition hover:border-[#28c2f3]/40 hover:bg-white/10"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#28c2f3]/10 text-[#28c2f3] transition group-hover:bg-[#28c2f3]/20">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{link.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{link.description}</p>
                  <div className="mt-auto pt-4">
                    <span className="navbar-underline-inline inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#28c2f3] transition group-hover:gap-2">
                      Acceder
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
