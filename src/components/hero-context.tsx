// src/components/hero-context.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface HeroContextValue {
  hasImageHero: boolean
  setHasImageHero: (value: boolean) => void
}

const HeroContext = createContext<HeroContextValue>({
  hasImageHero: false,
  setHasImageHero: () => {},
})

export function HeroProvider({ children }: { children: ReactNode }) {
  const [hasImageHero, setHasImageHero] = useState(false)
  return (
    <HeroContext.Provider value={{ hasImageHero, setHasImageHero }}>
      {children}
    </HeroContext.Provider>
  )
}

export function useHero() {
  return useContext(HeroContext)
}