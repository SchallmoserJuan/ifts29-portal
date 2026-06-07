'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { NewsCard } from './news-card'
import { StaggerContainer, StaggerItem } from '../ui/animated-section'
import type { NewsItem } from '@/src/types/content'

interface NewsSectionProps {
  news: NewsItem[]
}

const ITEMS_PER_PAGE = 3

export function NewsSection({ news }: NewsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)

  if (news.length === 0) return null

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const pageItems = news.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const canGoPrev = currentPage > 0
  const canGoNext = currentPage < totalPages - 1

  return (
    <section className="bg-[#f8f7f4] py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
              Ultimas noticias e investigaciones
            </h2>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={!canGoPrev}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="text-sm tabular-nums text-slate-500">
                {currentPage + 1} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={!canGoNext}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <StaggerContainer
          key={currentPage}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pageItems.map((item) => (
            <StaggerItem key={item.id}>
              <NewsCard news={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
