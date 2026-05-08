'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Breadcrumbs() {
  const pathname = usePathname()

  if (pathname === '/') return null

  const segments = pathname.split('/').filter(Boolean)

  return (
    <div className="border-t border-slate-200 bg-[#214ca0] text-white">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-2 px-4 py-3 text-sm sm:px-6 lg:px-10">
        <Link href="/" className="hover:underline">
          Home
        </Link>

        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/')

          const label =
            segment.charAt(0).toUpperCase() +
            segment.slice(1).replace(/-/g, ' ')

          return (
            <div key={href} className="flex items-center gap-2">
              <span>{'>'}</span>

              <Link href={href} className="hover:underline">
                {label}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}