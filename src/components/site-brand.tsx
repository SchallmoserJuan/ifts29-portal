/*
 * Componente SiteBrand
 * Refactorizado para el Issue #47: Se elimina el bloque de texto 
 * para dejar únicamente el logo visual.
 */

import Link from 'next/link'

export function SiteBrand({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <div
        className={`grid h-14 w-14 grid-cols-2 overflow-hidden rounded-sm border shadow-lg ${
          dark ? 'border-slate-300 shadow-slate-200/70' : 'border-white/40 shadow-slate-950/30'
        }`}
      >
        <span className="flex items-center justify-center bg-[#1772b7] text-base font-bold text-white">I</span>
        <span className="flex items-center justify-center bg-[#108b63] text-base font-bold text-white">F</span>
        <span className="flex items-center justify-center bg-[#24a34a] text-base font-bold text-white">T</span>
        <span className="relative flex items-center justify-center bg-[#0b5f44] text-base font-bold text-white">
          S
          <span className="absolute -left-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#f3c624] text-[10px] font-bold text-slate-950">
            29
          </span>
        </span>
      </div>
    </Link>
  )
}
