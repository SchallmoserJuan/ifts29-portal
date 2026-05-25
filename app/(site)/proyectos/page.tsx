import type { Metadata } from 'next'
import Link from 'next/link'

import { PageShell } from '@/src/components/layout'
import { getProjectsList } from '@/src/lib/content'
import { ProjectsGrid } from '@/src/components/proyectos'

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Proyectos desarrollados por estudiantes de la Tecnicatura Superior en Desarrollo de Software del IFTS N° 29.',
}

export const revalidate = 60

export default async function ProyectosPage() {
  const projects = await getProjectsList()

  return (
    <PageShell>
      {/* Hero con gradiente */}
      <section
        className="relative overflow-hidden py-24 sm:py-32"
        style={{
          background: 'linear-gradient(135deg, #072c57 0%, #0a3d7a 40%, #1e5ba8 100%)',
        }}
      >
        {/* Elementos decorativos */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #28c2f3 0%, transparent 70%)' }}
          />
          <div
            className="absolute -left-10 bottom-0 h-64 w-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #28c2f3 0%, transparent 70%)' }}
          />
          <div
            className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-[#28c2f3] backdrop-blur-sm mb-6">
              <span className="h-2 w-2 rounded-full bg-[#28c2f3] animate-pulse" />
              {projects.length} proyecto{projects.length !== 1 ? 's' : ''} publicado{projects.length !== 1 ? 's' : ''}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Proyectos de estudiantes
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70 max-w-xl">
              Trabajos prácticos, investigaciones y desarrollos realizados por estudiantes de la
              Tecnicatura Superior en Desarrollo de Software.
            </p>
          </div>
        </div>
      </section>

      <ProjectsGrid projects={projects} />

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[#f8f7f4]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="rounded-2xl bg-white border border-slate-200 p-8 lg:p-12 relative overflow-hidden">
            {/* Decoración */}
            <div
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #28c2f3 0%, transparent 70%)' }}
            />

            <div className="relative max-w-2xl">
              <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
                ¿Querés sumar tu proyecto?
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Si sos estudiante del IFTS 29 y tenés un proyecto que querés compartir con la comunidad,
                contactanos y lo publicamos acá.
              </p>
              <div className="mt-8">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-md bg-[#072c57] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a3d7a]"
                >
                  Contactanos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
