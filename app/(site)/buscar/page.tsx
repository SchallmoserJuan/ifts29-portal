import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PageShell } from '@/src/components/layout'
import { getNewsList, getCareers, getEventsList } from '@/src/lib/content'
import { Search } from 'lucide-react'

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

  const [news, careers, events] = await Promise.all([
    getNewsList(),
    getCareers(),
    getEventsList(),
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

  const totalResults = newsResults.length + careerResults.length + eventResults.length

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
            <div>
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
        </div>
      </section>
    </PageShell>
  )
}
