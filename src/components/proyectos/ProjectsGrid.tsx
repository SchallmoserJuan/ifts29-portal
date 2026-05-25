'use client'

import { useState } from 'react'
import type { ProjectItem } from '@/src/types/content'
import { ProjectCard } from './ProjectCard'

interface ProjectsGridProps {
  projects: ProjectItem[]
}

const categoryLabels: Record<string, string> = {
  desarrollo: 'Desarrollo',
  analisis: 'Análisis',
  infraestructura: 'Infraestructura',
  datos: 'Datos',
}

const categoryConfig: Record<string, { color: string }> = {
  desarrollo: { color: '#2563eb' },
  analisis: { color: '#d97706' },
  infraestructura: { color: '#7c3aed' },
  datos: { color: '#059669' },
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const categories = Array.from(new Set(projects.map((p) => p.category)))

  const filtered = activeFilter
    ? projects.filter((p) => p.category === activeFilter)
    : projects

  if (projects.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="rounded-2xl border border-dashed border-slate-200 bg-[#f8f7f4] p-10 text-center">
            <p className="text-slate-600">No hay proyectos publicados en este momento.</p>
            <p className="mt-2 text-sm text-slate-400">
              Los proyectos se publican desde el panel de administración.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-12">
          <button
            onClick={() => setActiveFilter(null)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
              activeFilter === null
                ? 'bg-[#072c57] text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => {
            const config = categoryConfig[cat] || { color: '#64748b' }
            const isActive = activeFilter === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                style={
                  isActive
                    ? { backgroundColor: config.color }
                    : {}
                }
              >
                {categoryLabels[cat] || cat}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
