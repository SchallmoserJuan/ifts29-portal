'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin, FileText } from 'lucide-react'
import type { CareerItem } from '@/src/types/content'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1800&q=80'

interface CareerCardProps {
  career: CareerItem
  featured?: boolean
}

export function CareerCard({ career, featured = false }: CareerCardProps) {
  const imageUrl = career.heroImage?.url || FALLBACK_IMAGE

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={featured ? 'max-w-5xl mx-auto' : ''}
    >
      <Link
        href={`/carreras/${career.slug}`}
        className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
      >
        <div
          className={`grid ${featured ? 'md:grid-cols-[1.1fr_0.9fr]' : 'md:grid-cols-[1fr_1fr]'} gap-0`}
        >
          {/* Image Area */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden">
            <Image
              src={imageUrl}
              alt={career.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
              priority={featured}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#072c57]/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white/10" />

            {/* Status badge */}
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#072c57] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-[#28c2f3]" />
                Carrera Técnica
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
            {/* Eyebrow */}
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#28c2f3]">
              IFTS N° 29
            </span>

            {/* Title */}
            <h3 className="mt-4 font-heading text-2xl font-semibold leading-snug tracking-tight text-[#072c57] md:text-3xl lg:text-4xl">
              <span className="relative">
                {career.name}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#072c57] transition-all duration-500 group-hover:w-full" />
              </span>
            </h3>

            {/* Summary */}
            <p className="mt-5 text-base leading-relaxed text-slate-500 line-clamp-3">
              {career.summary}
            </p>

            {/* Meta pills */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {career.duration && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
                  <Clock className="h-3.5 w-3.5 text-[#28c2f3]" />
                  {career.duration}
                </span>
              )}
              {career.modality && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
                  <MapPin className="h-3.5 w-3.5 text-[#28c2f3]" />
                  {career.modality}
                </span>
              )}
              {career.resolution && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
                  <FileText className="h-3.5 w-3.5 text-[#28c2f3]" />
                  {career.resolution}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#072c57] transition-colors group-hover:text-[#28c2f3]">
                Conocer la carrera
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
