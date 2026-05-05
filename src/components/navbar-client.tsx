/*
 * Componente de Cliente: NavbarClient
 * Este componente se encarga exclusivamente de la lógica visual dinámica del Navbar.
 * Se separa del SiteHeader (Server Component) para evitar errores de hidratación
 * y conflictos con librerías de servidor como 'sharp' o 'child_process'.
 * 
 * Issue Relacionado: #47 - Sección Inicio/Navbar
 */


'use client'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface NavbarClientProps {
  children: ReactNode
}

export function NavbarClient({ children }: NavbarClientProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Mantenemos la lógica de transparencia para TODO el sitio para que el Navbar se integre con el color del header/hero de cada sección
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent border-none transition-all duration-300">
      {children}
    </header>
  )
}