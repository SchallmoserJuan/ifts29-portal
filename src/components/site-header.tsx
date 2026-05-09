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
import { MenuButton } from './menu-button'

export async function SiteHeader() {
  // Obtención de datos del servidor (CMS)
  const settings = await getSiteSettings()
<<<<<<< HEAD

=======
  
  // Configuración de navegación simplificada según consigna Oxford-style
>>>>>>> 8cd0e674ee3c097631013a5666ac6994dcbabc11
  const links = [
    { href: '/institucional', label: 'Institución' },
    { href: '/carreras', label: 'Carreras' },
    { href: '/noticias', label: 'Noticias' },
  ]

  return (
<<<<<<< HEAD
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
          <SiteBrand dark />

          <nav className="hidden items-center gap-3 lg:flex">
            <NavLinks links={links} />

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
            <MobileMenu links={links} />
          </div>
        </div>

        <div className="border-t border-slate-200/70 bg-[#dcecff]/35">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#214ca0] sm:px-6 lg:px-10">
            {settings.siteTitle}
          </div>
        </div>
      </header>

      <Breadcrumbs />
    </>
=======
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

            <MenuButton />
          </div>

          {/* MENÚ MÓVIL (Solo visible en pantallas chicas) */}
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>




      </div>
      
    </NavbarClient>
>>>>>>> 8cd0e674ee3c097631013a5666ac6994dcbabc11
  )
}