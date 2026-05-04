'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { CompanyItem } from '@/src/types/content'

const FALLBACK_LOGO = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80'

export function CompaniesCard({ company }: { company: CompanyItem }) {
  const logoUrl = company.logo?.url || FALLBACK_LOGO

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#214ca0]">
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={logoUrl}
            alt={company.name}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-slate-950 truncate">{company.name}</h3>
          <p className="text-sm text-[#214ca0] truncate">{company.practicesArea}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-600 line-clamp-3">{company.description}</p>

      {company.website && (
        <Link
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#214ca0] transition-colors group-hover:text-[#2a5fc7]"
        >
          Visitar sitio web
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </article>
  )
}