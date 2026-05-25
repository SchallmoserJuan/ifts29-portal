'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Code, ExternalLink } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/src/components/ui'
import type { ProjectItem } from '@/src/types/content'

interface HomeProjectsSectionProps {
  projects: ProjectItem[]
}

const categoryConfig: Record<string, { color: string; label: string }> = {
  desarrollo: { color: '#2563eb', label: 'Desarrollo' },
  analisis: { color: '#d97706', label: 'Análisis' },
  infraestructura: { color: '#7c3aed', label: 'Infraestructura' },
  datos: { color: '#059669', label: 'Datos' },
}

export function HomeProjectsSection({ projects }: HomeProjectsSectionProps) {
  if (projects.length === 0) return null

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#28c2f3]">
                Proyectos de estudiantes
              </span>
              <h2 className="font-heading mt-3 max-w-2xl text-3xl font-semibold text-[#00152b] sm:text-4xl md:text-5xl">
                Lo que construyen nuestros alumnos
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
                Desde aplicaciones web hasta herramientas de datos: acá se ve la formación técnica en acción.
              </p>
            </div>
            <Link
              href="/proyectos"
              className="inline-flex items-center justify-center rounded-md border border-[#072c57] px-6 py-3 text-sm font-medium text-[#072c57] transition hover:bg-[#072c57] hover:text-white"
            >
              <span className="tag-underline">Ver todos los proyectos</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>

        {/* Grid */}
        <StaggerContainer className="mt-16 grid gap-6 lg:grid-cols-3" staggerDelay={0.1}>
          {projects.map((project) => {
            const config = categoryConfig[project.category || ''] || {
              color: '#64748b',
              label: project.category || 'General',
            }

            const studentInitials = project.student
              ? `${project.student.firstName?.[0] ?? ''}${project.student.lastName?.[0] ?? ''}`.toUpperCase()
              : ''

            const studentName = project.student
              ? `${project.student.firstName || ''} ${project.student.lastName || ''}`.trim()
              : null

            const hasImage = project.image?.url

            return (
              <StaggerItem key={project.id} className="h-full">
                <Link
                  href="/proyectos"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#28c2f3]/30 hover:shadow-xl"
                  style={{
                    boxShadow: `0 2px 8px ${config.color}08`,
                  }}
                >
                  {/* Image */}
                  {hasImage ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={project.image!.url}
                        alt={project.image!.alt || project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <span
                        className="absolute left-4 top-4 inline-block rounded-full px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm"
                        style={{ backgroundColor: `${config.color}cc` }}
                      >
                        {config.label}
                      </span>
                    </div>
                  ) : null}

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-lg font-semibold text-[#00152b] transition-colors group-hover:text-[#072c57]">
                      {project.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Student + tags */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {studentName ? (
                        <div className="flex items-center gap-2">
                          <span
                            className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
                            style={{ backgroundColor: config.color }}
                          >
                            {studentInitials}
                          </span>
                          <span className="text-xs text-slate-600">{studentName}</span>
                        </div>
                      ) : null}

                      {project.tags ? (
                        <div className="ml-auto flex flex-wrap gap-1.5">
                          {project.tags.split(';').slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md px-2 py-0.5 text-[10px] text-slate-500"
                              style={{ backgroundColor: `${config.color}10` }}
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {/* Links */}
                    <div className="mt-4 flex gap-3">
                      {project.demoUrl ? (
                        <span
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition group-hover:text-[#214ca0]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3" />
                          Demo
                        </span>
                      ) : null}
                      {project.githubUrl ? (
                        <span
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition group-hover:text-[#214ca0]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Code className="h-3 w-3" />
                          Código
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
