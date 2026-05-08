'use client'

import {useState} from 'react'
import {MegaMenu} from './mega-menu'

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Hamburger button — stays in the header flow */}
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

      <MegaMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
