'use client'

import {useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {motion} from 'framer-motion'
import {Calendar, Clock, ArrowRight} from 'lucide-react'
import type {NewsItem} from '@/src/types/content'
import {useHero} from './hero-context'
import {TechBadge} from './tech-badge'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80'

const categoryLabels: Record<string, string> = {
  general: 'General',
  academic: 'Academica',
  institutional: 'Institucional',
  events: 'Eventos',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function calculateReadTime(content: unknown): string {
  if (!content || typeof content !== 'object') return '5 min'
  const contentStr = JSON.stringify(content)
  const wordCount = contentStr.split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(wordCount / 200))
  return `${minutes} min`
}

export function NewsHero({news}: {news: NewsItem}) {
  const imageUrl = news.heroImage?.url || FALLBACK_IMAGE
  const {setHasImageHero, setHasImageBackground} = useHero()
  const readTime = calculateReadTime(news.content)

  useEffect(() => {
    setHasImageHero(true)
    setHasImageBackground(true)
    return () => {
      setHasImageHero(false)
      setHasImageBackground(false)
    }
  }, [setHasImageHero, setHasImageBackground])

  return (
    <section className="relative flex min-h-[76vh] w-full items-end overflow-hidden text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src={imageUrl} alt={news.title} fill className="object-cover" priority unoptimized />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#072c57]/85 via-[#072c57]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/20" />
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          {/* Badges */}
          <motion.div className="flex flex-wrap items-center gap-2">
            <TechBadge variant="dark">{categoryLabels[news.category] || news.category}</TechBadge>
            {(news.tags ? news.tags.split(';').slice(0, 2) : ['Innovacion', 'Software']).map(
              (tag, i) => (
                <TechBadge key={i} variant="dark">
                  {typeof tag === 'string' ? tag.trim() : tag}
                </TechBadge>
              ),
            )}
          </motion.div>

          {/* Title */}
          <motion.h1 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-white line-clamp-3 sm:text-4xl md:text-5xl lg:text-5xl">
            {news.title}
          </motion.h1>

          {/* Summary */}
          <motion.p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 line-clamp-2 sm:text-lg">
            {news.summary}
          </motion.p>

          {/* Metadata */}
          <motion.div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#28c2f3]" />
              {formatDate(news.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#28c2f3]" />
              {readTime} de lectura
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div className="mt-6">
            <Link
              href={`/noticias/${news.slug}`}
              className="group inline-flex items-center gap-2.5 rounded bg-[#28c2f3] px-6 py-3 text-sm font-semibold text-[#072c57] shadow-lg shadow-cyan-500/20 transition-all hover:bg-[#52d0f7] hover:shadow-cyan-500/30"
            >
              <span className="tag-underline">Leer noticia completa</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
