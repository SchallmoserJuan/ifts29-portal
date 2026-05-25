import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import type { CompanyItem } from '@/src/types/content'

const FALLBACK_LOGO = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80'

export function CompaniesCard({ company }: { company: CompanyItem }) {
  const logoUrl = company.logo?.url || FALLBACK_LOGO

  return (
    <article className="group flex h-full flex-col items-center rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#28c2f3]/30 hover:shadow-lg">
      {/* Logo */}
      <div className="relative flex h-20 w-full items-center justify-center overflow-hidden transition-all duration-500">
        <div className="relative h-16 w-40 grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105">
          <Image
            src={logoUrl}
            alt={company.name}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Divider */}
      <div className="mt-5 h-px w-12 bg-slate-200 transition-all duration-500 group-hover:w-20 group-hover:bg-[#28c2f3]" />

      {/* Name */}
      <h3 className="mt-5 text-base font-semibold text-slate-800 line-clamp-1">
        {company.name}
      </h3>

      {/* Practices area badge */}
      <span className="mt-2 inline-flex items-center rounded-full bg-[#072c57]/5 px-3 py-1 text-xs font-medium text-[#214ca0]">
        {company.practicesArea}
      </span>

      {/* Description */}
      <p className="mt-3 text-xs leading-relaxed text-slate-500 line-clamp-2">
        {company.description}
      </p>

      {/* Website link */}
      {company.website && (
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#214ca0] transition-colors hover:text-[#2a5fc7]"

        >
          <span className="relative">
            Visitar sitio
            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
          </span>
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </article>
  )
}
