'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useHero } from './hero-context'

export function Breadcrumbs() {
  const pathname = usePathname()
  const { hasImageBackground } = useHero()

  const hideContent = pathname === '/' || hasImageBackground

  if (hideContent) {
    return <div className="border-b border-white/10" />
  }

  const segments = pathname.split('/').filter(Boolean)

  return (
    <div className="border-t border-b border-white/10 bg-[#072c57] text-white">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-2 px-4 py-3 text-sm sm:px-6 lg:px-10">
        <Link href="/" className="hover:underline">
          <span className="navbar-underline">Home</span>
        </Link>

        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/')

          const label =
            segment.charAt(0).toUpperCase() +
            segment.slice(1).replace(/-/g, ' ')

          return (
            <div key={href} className="flex items-center gap-2">
              <span>{'>'}</span>

              <Link href={href} className="navbar-underline hover:underline">
                {label}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}