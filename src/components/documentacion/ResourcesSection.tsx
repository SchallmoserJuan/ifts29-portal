import { ExternalLink, BookOpen, Code2, GraduationCap, Briefcase, FileText } from 'lucide-react'

const resources = [
  {
    label: 'Plataforma de cursado',
    description: 'Accedé a Moodle, el aula virtual del IFTS 29.',
    href: '#',
    icon: GraduationCap,
  },
  {
    label: 'GitHub',
    description: 'Repositorios de proyectos y código fuente del instituto.',
    href: 'https://github.com',
    icon: Code2,
  },
  {
    label: 'MDN Web Docs',
    description: 'Documentación oficial de tecnologías web para desarrolladores.',
    href: 'https://developer.mozilla.org/es/',
    icon: BookOpen,
  },
  {
    label: 'Visual Studio Code',
    description: 'Editor de código gratuito recomendado para la carrera.',
    href: 'https://code.visualstudio.com/',
    icon: Code2,
  },
  {
    label: 'Figma',
    description: 'Herramienta de diseño de interfaces y prototipado.',
    href: 'https://www.figma.com',
    icon: FileText,
  },
  {
    label: 'Bolsa de trabajo',
    description: 'Oportunidades laborales y convenios con empresas.',
    href: '#',
    icon: Briefcase,
  },
]

export function ResourcesSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            Recursos útiles
          </h2>
          <p className="mt-3 text-base text-slate-500 md:text-lg">
            Herramientas, plataformas y referencias para estudiantes de desarrollo de software.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.label}
              href={resource.href}
              target={resource.href.startsWith('http') ? '_blank' : undefined}
              rel={resource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-[#f8f7f4] p-5 transition hover:border-[#28c2f3]/40 hover:bg-white hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#072c57]/10 text-[#072c57] transition group-hover:bg-[#072c57]/20">
                <resource.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{resource.label}</h3>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-400 opacity-0 transition group-hover:opacity-100" />
                </div>
                <p className="mt-1 text-sm text-slate-600">{resource.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
