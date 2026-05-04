import Link from 'next/link'
import Image from 'next/image'
import type { ProjectItem } from '@/src/types/content'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'

const categoryLabels: Record<string, string> = {
  desarrollo: 'Desarrollo de Software',
  analisis: 'Analisis de Sistemas',
  infraestructura: 'Infraestructura',
  datos: 'Datos',
}

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  if (projects.length === 0) return null

  return (
    <section className="bg-[zinc-50] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[53px] leading-[64px] font-medium text-[#1e3e8a]">Proyectos destacados</h2>
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#214ca0] transition hover:text-[#2a5fc7]"
          >
            Ver todos los proyectos
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((item) => {
            const imageUrl = item.image?.url || FALLBACK_IMAGE
            const tags = item.tags ? item.tags.split(';').slice(0, 3) : [categoryLabels[item.category] || item.category]

            return (
              <article key={item.id} className="news-card group flex flex-col overflow-hidden cursor-pointer">
                <Link href={`/proyectos/${item.slug}`} className="flex flex-col h-full">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex flex-1 flex-col pt-4">
                    <h3 className="text-[27px] leading-[33px] font-medium text-[#1e3e8a]">
                      <span className="news-card-underline">{item.title}</span>
                    </h3>

                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">{item.summary}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-[#214ca0]/10 px-3 py-1 text-xs font-medium text-[#214ca0]"
                        >
                          {typeof tag === 'string' ? tag.trim() : tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}