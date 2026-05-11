'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLink = {
  href: string
  label: string
}

export function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href)

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-5 py-3 text-sm font-semibold transition ${
              isActive
                ? 'bg-[#0a2e57] text-white'
                : 'bg-white text-[#0a2e57] border border-[#0a2e57] hover:bg-[#0a2e57] hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        )
      })}
    </>
  )
}