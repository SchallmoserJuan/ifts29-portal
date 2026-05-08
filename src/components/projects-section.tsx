import Link from 'next/link'
import Image from 'next/image'
import type { ProjectItem } from '@/src/types/content'
import { SectionHeader } from './section-header'
import { StaggerContainer, StaggerItem } from './animated-section'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'

const categoryLabels: Record<string, string> = {
  desarrollo: 'Desarrollo de Software',
  analisis: 'Analisis de Sistemas',
  infraestructura: 'Infraestructura',
  datos: 'Datos',
}

const categoryAccentColors: Record<string, string> = {
  desarrollo: 'from-cyan-400 to-blue-500',
  analisis: 'from-emerald-400 to-teal-500',
  infraestructura: 'from-violet-400 to-purple-500',
  datos: 'from-amber-400 to-orange-500',
}

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  if (projects.length === 0) return null

  return (
    <section className="bg-[#f8f7f4] py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeader
          title="Proyectos destacados"
          href="/proyectos"
          linkText="Ver todos los proyectos"
          description="Vitrina de innovacion estudiantil. Soluciones reales construidas con tecnologias de vanguardia."
        />

        <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((item) => {
            const imageUrl = item.image?.url || FALLBACK_IMAGE
            const tags = item.tags ? item.tags.split(';').slice(0, 4) : [categoryLabels[item.category] || item.category]
            const accentGradient = categoryAccentColors[item.category] || 'from-cyan-400 to-blue-500'

            return (
              <StaggerItem key={item.id}>
                <article className="news-card group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <Link href={`/proyectos/${item.slug}`} className="flex flex-col h-full">
                    {/* Top accent bar */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${accentGradient}`} />

                    {/* Image with overlay and tech stack */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

                      {/* Tech stack tags */}
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md"
                          >
                            {typeof tag === 'string' ? tag.trim() : tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-xl font-semibold leading-snug text-slate-900">
                        <span className="news-card-underline">{item.title}</span>
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">
                        {item.summary}
                      </p>
                    </div>
                  </Link>
                </article>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
