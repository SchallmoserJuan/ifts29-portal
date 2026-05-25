import {SiteBrand} from '../ui/site-brand'
import {getSiteSettings} from '@/src/lib/content'
import Link from 'next/link'

const footerLinks = [
  {
    title: 'Explorar',
    links: [
      {label: 'Institucional', href: '/institucional'},
      {label: 'Carreras', href: '/carreras'},
      {label: 'Noticias', href: '/noticias'},
      {label: 'Becas', href: '/becas'},
      {label: 'Alumni', href: '/login'},
    ],
  },
  {
    title: 'Comunidad',
    links: [
      {label: 'Ingreso', href: '/login'},
      {label: 'Portal', href: '/portal'},
      {label: 'Documentación', href: '#'},
      {label: 'Recursos', href: '#'},
    ],
  },
  {
    title: 'Síguenos',
    links: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/school/instituto-de-formaci%C3%B3n-t%C3%A9cnica-superior-29/',
      },
    ],
  },
]

const bottomLinks = [
  {label: 'Privacy', href: '#'},
  {label: 'Accessibility', href: '#'},
  {label: 'Cookies', href: '#'},
  {label: 'Legal', href: '#'},
]

export async function SiteFooter() {
  const settings = await getSiteSettings()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
        <SiteBrand dark />
        <div className="mt-8 border-t border-slate-300" />

        <div className="grid gap-10 py-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 text-sm text-[#002649]">
            <p className="font-semibold text-[#002649]">Instituto</p>
            <p>{settings.siteTitle}</p>
            <p>{settings.address}</p>
            <p>{settings.phone}</p>
            <p>{settings.contactEmail}</p>
            <div className="pt-2">
              <Link
                href="/contacto"
                className="group relative block w-fit font-bold text-blue-800 hover:text-blue-600"
              >
                Escribinos una consulta
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-blue-800 transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>

          {footerLinks.map((column) => (
            <div
              key={column.title}
              className="space-y-3 text-sm text-[#002649] lg:block lg:border-l lg:border-[#002649]/20 lg:pl-10"
            >
              <p className="font-semibold text-[#002649]">{column.title}</p>
              {column.links.map((link) => (
                <a key={link.label} href={link.href} className="group relative block w-fit">
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#002649] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-slate-300 pt-6 text-xs text-slate-500">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[#c7c2bc]">{settings.siteTitle} © 2026. All rights reserved.</p>
            <ul className="flex gap-6">
              {bottomLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="group relative text-[#002649]">
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#002649] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
