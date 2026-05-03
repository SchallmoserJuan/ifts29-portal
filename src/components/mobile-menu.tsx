'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'

type NavLink = { href: string; label: string }

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      window.addEventListener('keydown', handleKey)
    }
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  const overlay = (
    <>
      <div
        className={`fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 z-[9999] flex h-dvh w-[280px] max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <span className="text-sm font-bold tracking-wide text-[#0a2e57]">
            Menú
          </span>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[#0a2e57] text-white'
                    : 'text-slate-700 hover:bg-[#dcecff]/60 hover:text-[#0a2e57]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-slate-200 px-4 py-4">
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className={`block rounded-md px-5 py-3 text-center text-sm font-semibold transition ${
              pathname.startsWith('/login')
                ? 'bg-[#0a2e57] text-white'
                : 'bg-[#0a2e57] text-white hover:bg-[#0d3a6b]'
            }`}
          >
            Ingresar
          </Link>
        </div>
      </div>
    </>
  )

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md bg-[#0a2e57] transition lg:hidden"
      >
        <span
          className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
            open ? 'translate-y-[7px] rotate-45' : ''
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
            open ? '-translate-y-[7px] -rotate-45' : ''
          }`}
        />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  )
}