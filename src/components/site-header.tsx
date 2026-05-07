/*
 * Componente SiteHeader (Server Component)
 * 
 * Cambios realizados para el Issue #47:
 * 1. Se eliminaron los bloques de 'tagline' y 'siteTitle' para limpiar la interfaz.
 * 2. Se actualizaron los labels de navegación ( 'Institucional' -> 'Institución').
 * 3. Se integró NavbarClient para manejar la estética dinámica (transparencia en Home).
 * 4. Maintained as Server Component to allow use of 'getSiteSettings' without 'child_process' errors.
 * Nota, Se eliminaron intencionalmente los fragmentos de settings.tagline y settings.siteTitle para cumplir con el requerimiento de diseño del Portal Institucional
 */

import Link from 'next/link'
import { MobileMenu } from '@/src/components/mobile-menu'
import { SiteBrand } from '@/src/components/site-brand'
import { getSiteSettings } from '@/src/lib/content'
import { NavbarClient } from './navbar-client'
import { AuthNavLink } from './auth-nav-link'
import { UserNavInfo } from './user-nav-info'
import { PortalNavLink } from './portal-nav-link'

export async function SiteHeader() {
  // Obtención de datos del servidor (CMS)
  const settings = await getSiteSettings()
  
  // Configuración de navegación simplificada según consigna Oxford-style
  const links = [
    { href: '/institucional', label: 'Institución' },
    { href: '/carreras', label: 'Carreras' },
    { href: '/noticias', label: 'Noticias' },
  ]

  return (
    <NavbarClient>
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
        
        {/* SiteBrand: Ahora solo debe mostrar el logo para un look más limpio */}
        <SiteBrand /> 

        {/* BUTTON CONTAINER (right side OF Navbar) */}
        <div className="flex items-center gap-4">
          
          {/* GRUPO 1: Navegación Principal (Fondo azul oscuro) */}
          <nav className="hidden lg:flex items-center gap-2 bg-[#072c57] px-4 py-1.5 rounded-sm shadow-md border border-slate-600">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1 text-sm font-semibold text-white"
              >
                <span className="navbar-underline">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* GRUPO 2: Acciones (Fondo azul oscuro, separado por gap-4) */}
          <div className="hidden lg:flex items-center gap-2 bg-[#072c57] px-2 py-1.5 rounded-sm shadow-md border border-slate-600">
            <PortalNavLink />
            <UserNavInfo />
            <AuthNavLink />

            <Link
              href="/menu"
              className="flex items-center gap-1 px-2 py-1 text-sm font-semibold text-white whitespace-nowrap">
              <span className="navbar-underline">Menu</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </Link>
          </div>

          {/* MENÚ MÓVIL (Solo visible en pantallas chicas) */}
          <div className="lg:hidden">
            <MobileMenu links={links} />
          </div>
        </div>




      </div>
      
    </NavbarClient>
  )
}