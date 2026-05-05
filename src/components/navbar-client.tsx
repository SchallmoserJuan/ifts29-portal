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

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isHome 
        ? 'bg-transparent border-none' 
        : 'bg-[#002147] border-b border-slate-200/20'
    }`}>
      {children}
    </header>
  )
}