'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink, Calendar, User } from 'lucide-react'
import { RichTextRenderer } from '@/src/components/ui'
import type { ProjectItem } from '@/src/types/content'

interface ProjectCardProps {
  project: ProjectItem
}

const categoryConfig: Record<string, { color: string; bg: string; label: string }> = {
  desarrollo: {
    color: '#2563eb',
    bg: 'bg-blue-50',
    label: 'Desarrollo',
  },
  analisis: {
    color: '#d97706',
    bg: 'bg-amber-50',
    label: 'Análisis',
  },
  infraestructura: {
    color: '#7c3aed',
    bg: 'bg-violet-50',
    label: 'Infraestructura',
  },
  datos: {
    color: '#059669',
    bg: 'bg-emerald-50',
    label: 'Datos',
  },
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const config = categoryConfig[project.category || ''] || {
    color: '#64748b',
    bg: 'bg-slate-50',
    label: project.category || 'General',
  }

  const studentInitials = project.student
    ? `${project.student.firstName?.[0] ?? ''}${project.student.lastName?.[0] ?? ''}`.toUpperCase()
    : ''

  const studentName = project.student
    ? `${project.student.firstName || ''} ${project.student.lastName || ''}`.trim()
    : null

  const hasImage = project.image?.url && !imageError

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl bg-white transition-shadow duration-300 hover:shadow-xl h-full flex flex-col relative ${isOpen ? 'z-20' : 'z-0'}`}
      style={{
        boxShadow: `0 4px 12px ${config.color}15, 0 1px 3px ${config.color}10`,
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex flex-col flex-1"
        aria-expanded={isOpen}
      >
        {/* Image */}
        {hasImage ? (
          <div className="relative w-full overflow-hidden rounded-t-2xl aspect-[4/3]">
            <Image
              src={project.image!.url}
              alt={project.image!.alt || project.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : null}

        {/* Content header */}
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Category badge */}
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-3"
                style={{
                  backgroundColor: `${config.color}15`,
                  color: config.color,
                }}
              >
                {config.label}
              </span>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                {project.title}
              </h3>

              {/* Summary */}
              <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">
                {project.summary}
              </p>
            </div>

            {/* Expand icon */}
            <div
              className={`shrink-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isOpen ? 'rotate-180 bg-[#072c57]' : 'bg-slate-100'
              }`}
            >
              <ChevronDown
                className={`w-4 h-4 transition-colors ${
                  isOpen ? 'text-white' : 'text-[#072c57]'
                }`}
              />
            </div>
          </div>

          {/* Student + tags preview — empujado al fondo */}
          <div className="mt-auto pt-4 flex flex-wrap items-center gap-3">
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

            {!isOpen && project.tags ? (
              <div className="flex flex-wrap gap-1.5">
                {project.tags.split(';').slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md px-2 py-0.5 text-[10px] text-slate-500"
                    style={{ backgroundColor: `${config.color}08` }}
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 w-full bg-white rounded-b-2xl shadow-xl border-t border-slate-100 z-50"
          >
            <div className={`px-5 sm:px-6 pb-6 pt-4 ${config.bg}`}>
              {/* Student info */}
              {studentName ? (
                <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-white/60">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: config.color }}
                  >
                    {studentInitials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{studentName}</p>
                    <p className="text-xs text-slate-500">Estudiante del IFTS 29</p>
                  </div>
                </div>
              ) : null}

              {/* Full summary */}
              <p className="text-slate-700 leading-relaxed mb-5">{project.summary}</p>

              {/* Rich text content */}
              {project.content ? (
                <div className="prose prose-slate max-w-none mb-5">
                  <RichTextRenderer content={project.content} />
                </div>
              ) : null}

              {/* All tags */}
              {project.tags ? (
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.split(';').map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border px-2.5 py-1 text-xs"
                      style={{
                        borderColor: `${config.color}30`,
                        color: config.color,
                        backgroundColor: `${config.color}08`,
                      }}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ backgroundColor: config.color }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver demo
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.898-.015 3.3 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    Ver código
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
