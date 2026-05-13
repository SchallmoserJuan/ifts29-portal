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
    <section
      className="relative isolate overflow-hidden bg-slate-950 text-white"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(4,34,68,0.7) 0%, rgba(4,34,68,0.82) 50%, rgba(4,34,68,0.96) 100%), url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1800&q=80')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {children}
    </section>
  )
}
