'use client'

import { useEffect } from 'react'
import { useHero } from '../layout/hero-context'

export function HomeHero({ children }: { children: React.ReactNode }) {
  const { setHasImageHero, setHasImageBackground } = useHero()

  useEffect(() => {
    setHasImageHero(true)
    setHasImageBackground(true)
    return () => {
      setHasImageHero(false)
      setHasImageBackground(false)
    }
  }, [setHasImageHero, setHasImageBackground])

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 20% 20%, rgba(40,194,243,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 70%, rgba(30,62,138,0.12) 0%, transparent 50%),
            linear-gradient(180deg, rgba(4,34,68,0.5) 0%, rgba(4,34,68,0.72) 35%, rgba(2,14,32,0.97) 100%),
            url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')
          `,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div className="hero-dot-pattern absolute inset-0 opacity-[0.03]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden select-none pr-[5%]">
        <span className="font-heading text-[18rem] font-bold leading-none tracking-tighter text-white/[0.03] sm:text-[26rem]">
          29
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      <div className="relative">{children}</div>
    </section>
  )
}