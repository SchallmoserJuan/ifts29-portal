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
import { useHero } from './hero-context'

interface NavbarClientProps {
  children: ReactNode
}

export function NavbarClient({ children }: NavbarClientProps) {
  const { hasImageHero } = useHero()

  return (
    <header
      className={`
        top-0 z-50 w-full
        ${hasImageHero
          ? 'absolute bg-transparent'
          : 'relative bg-[#072c57]'
        }
      `}
    >
      {children}
    </header>
  )
}