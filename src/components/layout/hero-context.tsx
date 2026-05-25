// src/components/hero-context.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface HeroContextValue {
  hasImageHero: boolean
  setHasImageHero: (value: boolean) => void
  hasImageBackground: boolean
  setHasImageBackground: (value: boolean) => void
}

const HeroContext = createContext<HeroContextValue>({
  hasImageHero: false,
  setHasImageHero: () => {},
  hasImageBackground: false,
  setHasImageBackground: () => {},
})

export function HeroProvider({ children }: { children: ReactNode }) {
  const [hasImageHero, setHasImageHero] = useState(false)
  const [hasImageBackground, setHasImageBackground] = useState(false)
  return (
    <HeroContext.Provider value={{ hasImageHero, setHasImageHero, hasImageBackground, setHasImageBackground }}>
      {children}
    </HeroContext.Provider>
  )
}

export function useHero() {
  return useContext(HeroContext)
}