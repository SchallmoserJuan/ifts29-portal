import Link from 'next/link'

import { PageShell } from '@/src/components/page-shell'

export const dynamic = 'force-dynamic'

const communityCards = [
  {
    title: 'Comunidad estudiantil',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Aulas y encuentros',
    image:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Campus y actividades',
    image:
      'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=80',
  },
]

const excellenceCards = [
  {
    title: 'Oferta academica',
    description: 'Explora carreras tecnicas con una presentacion mas clara y accesible.',
    href: '/carreras',
    cta: 'Ver carreras',
  },
  {
    title: 'Biblioteca virtual',
    description: 'Accede a documentos, guias y material del portal segun tu rol y tus permisos.',
    href: '/portal/biblioteca',
    cta: 'Abrir biblioteca',
  },
  {
    title: 'Informacion institucional',
    description: 'Consulta historia, mision y vision del instituto desde una experiencia mas consistente.',
    href: '/institucional',
    cta: 'Conocer mas',
  },
]

const graduateStories = [
  {
    title: 'Trayectorias tecnicas',
    description: 'Historias que muestran como la formacion tecnica se transforma en oportunidades reales.',
  },
  {
    title: 'Practicas y proyectos',
    description: 'Espacios donde la cursada se conecta con experiencias concretas y colaborativas.',
  },
  {
    title: 'Comunidad profesional',
    description: 'Una presencia digital pensada para acompanar desde el ingreso hasta el egreso.',
  },
]

export default function HomePage() {
  return (
    <PageShell>
      <section
        className="relative isolate overflow-hidden bg-slate-950 text-white"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(4,34,68,0.30) 0%, rgba(4,34,68,0.55) 54%, rgba(4,34,68,0.78) 100%), url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/25 via-transparent to-slate-950/35" />
        <div className="relative mx-auto flex min-h-[760px] w-full max-w-[1400px] flex-col px-4 pb-12 pt-20 sm:px-6 lg:px-10">
          <div className="mt-auto max-w-3xl pb-10">
            <p className="text-sm uppercase tracking-[0.34em] text-sky-100/80">Sitio institucional</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">IFTS N° 29</h1>
            <p className="mt-2 text-2xl text-slate-100 sm:text-3xl">Instituto de Formacion Tecnica N°29</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100/90">
              Una portada institucional con el lenguaje visual del nuevo boceto y acceso rapido a las secciones
              principales del sitio.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#072c57] p-6 shadow-2xl shadow-slate-950/30 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-md">
                <p className="text-3xl leading-tight text-white">Busca nuestras opciones ahora.</p>
                <p className="mt-3 text-sm text-slate-200">
                  Navega rapidamente por carreras, noticias, institucional y acceso al portal.
                </p>
              </div>
              <div className="flex w-full max-w-3xl flex-col gap-3 sm:flex-row">
                <input
                  type="search"
                  placeholder="Buscar"
                  className="h-14 flex-1 rounded-md border border-white/15 bg-white px-5 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400"
                />
                <Link
                  href="#home-accesos"
                  className="inline-flex h-14 items-center justify-center rounded-md bg-[#28c2f3] px-8 text-base font-semibold text-[#072c57] transition hover:bg-[#52d0f7]"
                >
                  + Buscar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#072c57] py-16 text-white sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {communityCards.map((card) => (
              <article
                key={card.title}
                className="group relative min-h-[340px] overflow-hidden rounded-md bg-slate-800"
                style={{
                  backgroundImage:
                    `linear-gradient(180deg, rgba(2,12,27,0.08) 0%, rgba(2,12,27,0.18) 50%, rgba(2,12,27,0.72) 100%), url('${card.image}')`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              >
                <div className="absolute inset-0 transition duration-300 group-hover:bg-white/5" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-lg font-medium text-white">{card.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="home-accesos" className="bg-[#dcecff] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-4xl font-medium text-[#214ca0]">Excelencia IFTS</h2>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md border border-[#214ca0] px-6 py-3 text-sm font-medium text-[#214ca0] transition hover:bg-[#214ca0] hover:text-white"
            >
              + Ingresar al portal
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {excellenceCards.map((card) => (
              <article key={card.title} className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="flex h-56 items-center justify-center bg-slate-200">
                  <div className="flex h-16 w-16 items-center justify-center border-4 border-white/80 text-4xl text-white/80">
                    ×
                  </div>
                </div>
                <div className="space-y-4 p-6">
                  <h3 className="text-xl font-semibold text-slate-950">{card.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{card.description}</p>
                  <Link href={card.href} className="inline-flex items-center gap-3 text-base text-slate-700">
                    {card.cta}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#072c57] py-16 text-white sm:py-20">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-4xl font-medium">Historias de graduados</h2>
            <Link
              href="/noticias"
              className="inline-flex items-center justify-center rounded-md border border-[#28c2f3] px-6 py-3 text-sm font-medium text-[#28c2f3] transition hover:bg-[#28c2f3] hover:text-[#072c57]"
            >
              + Ver noticias
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {graduateStories.map((story) => (
              <article key={story.title} className="overflow-hidden rounded-xl bg-white text-slate-950 shadow-sm">
                <div className="flex h-56 items-center justify-center bg-slate-200">
                  <div className="flex h-16 w-16 items-center justify-center border-4 border-white/80 text-4xl text-white/80">
                    ×
                  </div>
                </div>
                <div className="space-y-4 p-6">
                  <h3 className="text-xl font-semibold">{story.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{story.description}</p>
                  <Link href="/noticias" className="inline-flex items-center gap-3 text-base text-slate-700">
                    More Info
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
