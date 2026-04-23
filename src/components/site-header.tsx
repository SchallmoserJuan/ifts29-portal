import Link from 'next/link'

import { SiteBrand } from '@/src/components/site-brand'
import { getSiteSettings } from '@/src/lib/content'

export async function SiteHeader() {
  const settings = await getSiteSettings()
  const links = [
    { href: '/institucional', label: 'Institucional' },
    { href: '/carreras', label: 'Carreras' },
    { href: '/noticias', label: 'Noticias' },
    { href: '/portal/biblioteca', label: 'Biblioteca' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
        <SiteBrand dark />
        <nav className="hidden items-center gap-3 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md bg-[#0a2e57] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d3a6b]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-md border border-[#0a2e57] px-5 py-3 text-sm font-semibold text-[#0a2e57] transition hover:bg-[#0a2e57] hover:text-white"
          >
            Ingresar
          </Link>
        </nav>
        <div className="hidden max-w-sm text-right text-xs text-slate-500 xl:block">
          <p>{settings.tagline}</p>
        </div>
        <div className="lg:hidden">
          <Link
            href="/login"
            className="rounded-md bg-[#0a2e57] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0d3a6b]"
          >
            Menu
          </Link>
        </div>
      </div>
      <div className="border-t border-slate-200/70 bg-[#dcecff]/35">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#214ca0] sm:px-6 lg:px-10">
          {settings.siteTitle}
        </div>
      </div>
    </header>
  )
}
