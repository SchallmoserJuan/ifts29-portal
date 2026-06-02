import Link from 'next/link'
import { X } from 'lucide-react'

interface TagFilterBadgeProps {
  tag: string
}

export function TagFilterBadge({ tag }: TagFilterBadgeProps) {
  return (
    <div className="bg-[#f8f7f4] pb-4">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">Filtrando por:</span>
          <Link
            href="/noticias"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#072c57] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-[#0a3d7a]"
          >
            {decodeURIComponent(tag)}
            <X className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
