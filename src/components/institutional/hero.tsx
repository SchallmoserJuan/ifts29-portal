'use client'

import {useEffect} from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'
import {useHero} from '@/src/components/hero-context'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function InstitutionalHero() {
  const {setHasImageHero} = useHero()

  useEffect(() => {
    setHasImageHero(true)
    return () => setHasImageHero(false)
  }, [setHasImageHero])

  return (
    <section className="relative flex min-h-[65vh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-[#072c57]" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 sm:px-10 md:pb-28 md:pt-48">
        <motion.div className="max-w-4xl">
          <h1 className="mt-5 font-heading text-4xl font-semibold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Formando el futuro desde la excelencia académica
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            El IFTS 29 es una institución de educación técnica superior dedicada a formar profesionales
            con sólidas competencias técnicas y un compromiso ético con la sociedad.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}