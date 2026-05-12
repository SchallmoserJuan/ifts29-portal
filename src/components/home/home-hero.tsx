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
          "linear-gradient(180deg, #0422444d 0%, #0422448c 54%, #042244c7 100%), url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=80')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {children}
    </section>
  )
}