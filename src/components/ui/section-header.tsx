import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  href?: string
  linkText?: string
  description?: string
}

export function SectionHeader({ title, href, linkText = 'Ver todos', description }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base text-slate-500 md:text-lg">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#214ca0] transition-colors hover:text-[#2a5fc7] shrink-0"
        >
          <span className="relative">
            {linkText}
            <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
          </span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
