'use client'

import {useState} from 'react'
import {MegaMenu} from './mega-menu'

interface MenuButtonProps {
  latestNews: {slug: string; title: string}[]
  latestEvents: {slug: string; title: string}[]
}

export function MenuButton({latestNews, latestEvents}: MenuButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-1 px-2 py-1 text-sm font-semibold text-white whitespace-nowrap"
      >
        <span className="navbar-underline">Menu</span>
        <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <MegaMenu open={open} onClose={() => setOpen(false)} latestNews={latestNews} latestEvents={latestEvents} />
    </>
  )
}
