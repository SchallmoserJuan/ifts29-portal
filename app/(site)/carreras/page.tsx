import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {PageShell} from '@/src/components/layout'
import {getCareers} from '@/src/lib/content'

export const metadata: Metadata = {
  title: 'Carreras',
  description:
    'Explorá nuestra oferta académica en el IFTS N° 29. Carreras técnicas con sólida formación profesional y salida laboral garantizada.',
}

import {CareerHero} from './_components/career-hero'
import {CareerIntro} from './_components/career-intro'
import {CareerProfile} from './_components/career-profile'
import {CareerStudyPlan} from './_components/career-study-plan'
import {CareerPdfs} from './_components/career-pdfs'
import {CareerOutcomes} from './_components/career-outcomes'
import {CareerMethodology} from './_components/career-methodology'
import {CareerCta} from './_components/career-cta'

export const revalidate = 60

// Data hardcodeada para las articulaciones de TDS
const ARTICULACIONES_DATA = [
  {
    institucion: 'Universidad Nacional de Quilmes (UNQ)',
    carrera: 'Licenciatura en Informática',
    link: '#',
  },
  {
    institucion: 'Universidad Tecnológica Nacional (UTN)',
    carrera: 'Licenciatura en Sistemas de Información',
    link: '#',
  },
  {
    institucion: 'Universidad Tecnológica Nacional (UTN)',
    carrera: 'Ingenieria en Computación',
    link: '#',
  },
]

export default async function CareersPage() {
  const careers = await getCareers()

  const career =
    careers.find((c) => c.slug === 'tecnicatura-superior-en-desarrollo-de-software') || careers[0]

  if (!career) {
    notFound()
  }

  return (
    <PageShell>
      <CareerHero career={career} />
      <CareerIntro />
      <CareerProfile />
      <CareerStudyPlan career={career} />

      {/* Sección de articulaciones hardcodeada */}
      <CareerArticulations />

      <CareerPdfs />
      <CareerOutcomes career={career} />
      <CareerMethodology />
      <CareerCta />
    </PageShell>
  )
}

function CareerArticulations() {
  return (
    <section id="articulaciones" className="py-12 bg-[#072c57] border-t border-b border-neutral-100">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2 className="text-4xl font-bold text-white mb-6 tracking-tight text-center sm:text-left">
          Articulaciones Universitarias
        </h2>
        <p className="text-slate-300 text-lg mb-8 text-center sm:text-left">
          Al finalizar la tecnicatura, podés continuar tus estudios y obtener un título de grado en
          las siguientes instituciones
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {ARTICULACIONES_DATA.map((art, index) => (
            <a
              key={index}
              href={art.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all group"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                Convenio de Grado
              </span>
              <h3 className="text-lg font-bold text-neutral-800 transition-colors">
                <span className="tag-underline">{art.carrera}</span>
              </h3>
              <p className="text-sm text-neutral-500 mt-1">{art.institucion}</p>
              <div className="mt-4 text-xs font-medium text-neutral-400 group-hover:text-blue-500 flex items-center gap-1 transition-colors">
                Ver plan de articulación
                <span className="inline-block transform group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
