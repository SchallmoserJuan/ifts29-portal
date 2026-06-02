import Image from 'next/image'
import { ExternalLink, Mail } from 'lucide-react'
import type { CompanyItem } from '@/src/types/content'

const FALLBACK_LOGO = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80'

export function CompanyCard({ company }: { company: CompanyItem }) {
  const logoUrl = company.logo?.url || FALLBACK_LOGO

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#28c2f3]/30 hover:shadow-xl">
      {/* Logo */}
      <div className="flex items-center justify-center p-8">
        <div className="relative h-16 w-40 grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100">
          <Image
            src={logoUrl}
            alt={company.name}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col border-t border-slate-100 p-6">
        <h3 className="text-lg font-semibold text-slate-900">{company.name}</h3>

        <span className="mt-2 inline-flex w-fit items-center rounded-full bg-[#072c57]/5 px-3 py-1 text-xs font-medium text-[#214ca0]">
          {company.practicesArea}
        </span>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
          {company.description}
        </p>

        {/* Links */}
        <div className="mt-5 flex flex-wrap gap-3">
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#072c57] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0a3d7a]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Visitar sitio
            </a>
          )}
          {company.contactEmail && (
            <a
              href={`mailto:${company.contactEmail}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Mail className="h-3.5 w-3.5" />
              Contacto
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
