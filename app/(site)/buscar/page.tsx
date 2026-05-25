import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PageShell } from '@/src/components/layout'
import {
  getNewsList,
  getCareers,
  getEventsList,
  getProjectsList,
  getScholarships,
  getCompaniesList,
  getPublicDocuments,
} from '@/src/lib/content'
import { Search, FileText, Home, GraduationCap, Newspaper, CalendarDays, Code2, Award, ClipboardList, FolderOpen, Mail, Building2, User, BookOpen, Shield, LogIn, UserPlus } from 'lucide-react'

interface SitePage {
  title: string
  description: string
  href: string
  keywords: string[]
  icon: React.ElementType
}

const sitePages: SitePage[] = [
  { title: 'Inicio', description: 'Página principal del IFTS 29', href: '/', keywords: ['home', 'inicio', 'principal'], icon: Home },
  { title: 'Carreras', description: 'Todas las carreras del instituto', href: '/carreras', keywords: ['carreras', 'tecnicaturas', 'estudios', 'planes'], icon: GraduationCap },
  { title: 'Tecnicatura en Desarrollo de Software', description: 'Plan de estudios, duración y modalidad', href: '/carreras/tecnicatura-superior-en-desarrollo-de-software', keywords: ['tecnicatura', 'desarrollo', 'software', 'programación', 'plan de estudios'], icon: GraduationCap },
  { title: 'Horarios de cursado', description: 'Horarios y calendario académico', href: '/carreras/horarios', keywords: ['horarios', 'cursado', 'calendario', 'turnos'], icon: CalendarDays },
  { title: 'Noticias', description: 'Novedades y comunicaciones del instituto', href: '/noticias', keywords: ['noticias', 'novedades', 'comunicados', 'actualidad'], icon: Newspaper },
  { title: 'Eventos', description: 'Charlas, talleres y actividades', href: '/eventos', keywords: ['eventos', 'actividades', 'charlas', 'talleres', 'jornadas'], icon: CalendarDays },
  { title: 'Agenda académica', description: 'Calendario de actividades institucionales', href: '/agenda', keywords: ['agenda', 'calendario', 'actividades', 'cronograma'], icon: CalendarDays },
  { title: 'Proyectos de estudiantes', description: 'Trabajos prácticos y proyectos de alumnos', href: '/proyectos', keywords: ['proyectos', 'trabajos', 'alumnos', 'estudiantes', 'prácticas'], icon: Code2 },
  { title: 'Becas', description: 'Programas de financiamiento y becas', href: '/becas', keywords: ['becas', 'financiamiento', 'progresar', 'beca'], icon: Award },
  { title: 'Inscripciones', description: 'Requisitos y pasos para inscribirse', href: '/inscripciones', keywords: ['inscripciones', 'inscribirse', 'requisitos', 'admisión', 'matrícula'], icon: ClipboardList },
  { title: 'Documentación', description: 'Documentos académicos e institucionales', href: '/documentacion', keywords: ['documentación', 'documentos', 'archivos', 'reglamentos'], icon: FolderOpen },
  { title: 'Institucional', description: 'Historia, misión y autoridades', href: '/institucional', keywords: ['institucional', 'historia', 'misión', 'autoridades', 'instituto'], icon: Building2 },
  { title: 'Contacto', description: 'Consultas, ubicación y horarios de atención', href: '/contacto', keywords: ['contacto', 'consultas', 'ubicación', 'teléfono', 'email', 'mail'], icon: Mail },
  { title: 'Portal estudiantil', description: 'Acceso al portal para estudiantes', href: '/portal', keywords: ['portal', 'estudiantes', 'alumnos', 'notas', 'exámenes'], icon: User },
  { title: 'Biblioteca virtual', description: 'Material de lectura y recursos', href: '/portal/biblioteca', keywords: ['biblioteca', 'libros', 'lectura', 'recursos'], icon: BookOpen },
  { title: 'Iniciar sesión', description: 'Acceder al portal del estudiante', href: '/login', keywords: ['login', 'ingresar', 'acceder', 'sesión'], icon: LogIn },
  { title: 'Registro', description: 'Crear cuenta de estudiante', href: '/registro', keywords: ['registro', 'crear cuenta', 'registrarse', 'nuevo usuario'], icon: UserPlus },
  { title: 'Privacidad', description: 'Política de privacidad y protección de datos', href: '/privacidad', keywords: ['privacidad', 'datos personales', 'protección'], icon: Shield },
  { title: 'Accesibilidad', description: 'Compromiso con la accesibilidad web', href: '/accesibilidad', keywords: ['accesibilidad', 'wcag', 'discapacidad'], icon: Shield },
  { title: 'Cookies', description: 'Uso de cookies en el sitio', href: '/cookies', keywords: ['cookies', 'rastreo', 'privacidad'], icon: Shield },
  { title: 'Aviso legal', description: 'Términos y condiciones de uso', href: '/legal', keywords: ['legal', 'términos', 'condiciones', 'ley'], icon: FileText },
  { title: 'Buscar', description: 'Buscar contenido en el portal', href: '/buscar', keywords: ['buscar', 'búsqueda', 'search'], icon: Search },
]

export const metadata: Metadata = {
  title: 'Buscar',
  description: 'Buscar en el portal del IFTS N° 29',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q?.trim().toLowerCase()

  if (!query) {
    redirect('/')
  }

  const [news, careers, events, projects, scholarships, companies, documents] = await Promise.all([
    getNewsList(),
    getCareers(),
    getEventsList(),
    getProjectsList(),
    getScholarships(),
    getCompaniesList(),
    getPublicDocuments(),
  ])

  const newsResults = news.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.tags && item.tags.toLowerCase().includes(query))
  )

  const careerResults = careers.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.duration.toLowerCase().includes(query) ||
      item.modality.toLowerCase().includes(query)
  )

  const eventResults = events.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)
  )

  const projectResults = projects.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.tags && item.tags.toLowerCase().includes(query)) ||
      (item.student?.firstName && item.student.firstName.toLowerCase().includes(query)) ||
      (item.student?.lastName && item.student.lastName.toLowerCase().includes(query))
  )

  const scholarshipResults = scholarships.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      (item.requirements &&
        item.requirements.some((r) => r.item.toLowerCase().includes(query)))
  )

  const companyResults = companies.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.practicesArea.toLowerCase().includes(query)
  )

  const documentResults = documents.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      item.category.toLowerCase().includes(query)
  )

  const pageResults = sitePages.filter(
    (page) =>
      page.title.toLowerCase().includes(query) ||
      page.description.toLowerCase().includes(query) ||
      page.keywords.some((k) => k.toLowerCase().includes(query))
  )

  const totalResults =
    pageResults.length +
    newsResults.length +
    careerResults.length +
    eventResults.length +
    projectResults.length +
    scholarshipResults.length +
    companyResults.length +
    documentResults.length

  return (
    <PageShell>
      <section className="bg-[#072c57] py-16 text-white sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Link href="/" className="transition hover:text-white">
              Inicio
            </Link>
            <span>/</span>
            <span>Buscar</span>
          </div>
          <h1 className="font-heading mt-6 text-4xl font-semibold sm:text-5xl">
            Resultados de búsqueda
          </h1>
          <p className="mt-4 text-lg text-white/70">
            {totalResults > 0
              ? `Se encontraron ${totalResults} resultado${totalResults !== 1 ? 's' : ''} para "${params.q}"`
              : `No se encontraron resultados para "${params.q}"`}
          </p>
        </div>
      </section>

      <section className="bg-[#f8f7f4] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          {totalResults === 0 && (
            <div className="py-12 text-center">
              <Search className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-4 text-lg text-slate-500">
                Intentá con otras palabras como &quot;desarrollo&quot;, &quot;noticias&quot; o
                &quot;software&quot;.
              </p>
            </div>
          )}

          {pageResults.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Páginas del sitio
              </h2>
              <div className="space-y-4">
                {pageResults.map((page) => {
                  const PageIcon = page.icon
                  return (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-6 transition hover:border-[#28c2f3]/50 hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#072c57]/5 text-[#072c57]">
                        <PageIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#00152b]">{page.title}</h3>
                        <p className="mt-1 text-slate-600">{page.description}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {careerResults.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Carreras
              </h2>
              <div className="space-y-4">
                {careerResults.map((career) => (
                  <Link
                    key={career.id}
                    href={`/carreras/${career.slug}`}
                    className="block rounded-lg border border-slate-200 bg-white p-6 transition hover:border-[#28c2f3]/50 hover:shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-[#00152b]">{career.name}</h3>
                    <p className="mt-2 text-slate-600">{career.summary}</p>
                    <div className="mt-3 flex gap-4 text-sm text-slate-400">
                      <span>{career.duration}</span>
                      <span>{career.modality}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {newsResults.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Noticias
              </h2>
              <div className="space-y-4">
                {newsResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/noticias/${item.slug}`}
                    className="block rounded-lg border border-slate-200 bg-white p-6 transition hover:border-[#28c2f3]/50 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="rounded bg-[#072c57]/5 px-2 py-0.5 text-[#072c57]">
                        {item.category}
                      </span>
                      <span>{new Date(item.publishedAt).toLocaleDateString('es-AR')}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-[#00152b]">{item.title}</h3>
                    <p className="mt-2 text-slate-600">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {eventResults.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Eventos
              </h2>
              <div className="space-y-4">
                {eventResults.map((event) => (
                  <Link
                    key={event.id}
                    href="/eventos"
                    className="block rounded-lg border border-slate-200 bg-white p-6 transition hover:border-[#28c2f3]/50 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{new Date(event.date).toLocaleDateString('es-AR')}</span>
                      <span>{event.location}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-[#00152b]">{event.title}</h3>
                    <p className="mt-2 text-slate-600">{event.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {projectResults.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Proyectos de estudiantes
              </h2>
              <div className="space-y-4">
                {projectResults.map((project) => (
                  <Link
                    key={project.id}
                    href="/proyectos"
                    className="block rounded-lg border border-slate-200 bg-white p-6 transition hover:border-[#28c2f3]/50 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="rounded bg-[#072c57]/5 px-2 py-0.5 text-[#072c57]">
                        {project.category}
                      </span>
                      {project.student && (
                        <span>
                          {project.student.firstName} {project.student.lastName}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-[#00152b]">{project.title}</h3>
                    <p className="mt-2 text-slate-600">{project.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {scholarshipResults.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Becas
              </h2>
              <div className="space-y-4">
                {scholarshipResults.map((beca) => (
                  <Link
                    key={beca.id}
                    href="/becas"
                    className="block rounded-lg border border-slate-200 bg-white p-6 transition hover:border-[#28c2f3]/50 hover:shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-[#00152b]">{beca.title}</h3>
                    <p className="mt-2 text-slate-600">{beca.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {companyResults.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Empresas convenio
              </h2>
              <div className="space-y-4">
                {companyResults.map((company) => (
                  <Link
                    key={company.id}
                    href="/noticias"
                    className="block rounded-lg border border-slate-200 bg-white p-6 transition hover:border-[#28c2f3]/50 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="rounded bg-[#072c57]/5 px-2 py-0.5 text-[#072c57]">
                        {company.practicesArea}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-[#00152b]">{company.name}</h3>
                    <p className="mt-2 text-slate-600">{company.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {documentResults.length > 0 && (
            <div>
              <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Documentación
              </h2>
              <div className="space-y-4">
                {documentResults.map((doc) => (
                  <Link
                    key={doc.id}
                    href="/documentacion"
                    className="block rounded-lg border border-slate-200 bg-white p-6 transition hover:border-[#28c2f3]/50 hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="rounded bg-[#072c57]/5 px-2 py-0.5 text-[#072c57]">
                        {doc.category}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-[#00152b]">{doc.title}</h3>
                    {doc.description && <p className="mt-2 text-slate-600">{doc.description}</p>}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  )
}
