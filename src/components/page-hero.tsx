// Versión con imagen — el hero avisa al contexto
'use client'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useHero } from './hero-context'

export function PageHeroImage({
  eyebrow,
  title,
  description,
  backgroundImage, // URL de la imagen
  children,
}: {
  eyebrow: string
  title: string
  description: string
  backgroundImage: string
  children?: ReactNode
}) {
  const { setHasImageHero, setHasImageBackground } = useHero()

  useEffect(() => {
    setHasImageHero(true)
    setHasImageBackground(true)
    return () => {
      setHasImageHero(false)
      setHasImageBackground(false)
    } // cleanup al desmontar
  }, [])

  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay oscuro sobre la imagen */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* El contenido tiene pt grande para compensar el header absolute */}
      <div className="relative mx-auto w-full max-w-[1400px] px-4 pt-36 pb-20 sm:px-6 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-100">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  )
}

// Versión sin imagen — fondo sólido, navbar relativo normal
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-[#072c57] text-white">
      <div className="relative mx-auto w-full min-h-[65vh] max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-100">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  )
}