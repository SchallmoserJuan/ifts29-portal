'use client'

import {useEffect} from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'
import {useHero} from '@/src/components/hero-context'

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: {opacity: 0, y: 30},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.8, ease: easing},
  },
}

export function InstitutionalHero() {
  const {setHasImageHero} = useHero()

  useEffect(() => {
    setHasImageHero(true)
    return () => setHasImageHero(false)
  }, [setHasImageHero])

  return (
    <section className="relative flex min-h-[65vh] flex-col justify-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-[#072c57]"
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 sm:px-10 md:pb-28 md:pt-48"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60"
        >
          Institución
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="mt-5 max-w-4xl font-heading text-4xl font-semibold text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Formando el futuro desde la excelencia académica
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl"
        >
          El IFTS 29 es una institución de educación técnica superior dedicada a formar profesionales
          con sólidas competencias técnicas y un compromiso ético con la sociedad.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="#historia"
            className="inline-flex items-center bg-[#00d4ff] px-8 py-3.5 text-sm font-semibold text-[#00152b] transition hover:brightness-110 rounded-sm"
          >
            Conocer nuestra historia
          </Link>
          <Link
            href="#carreras"
            className="inline-flex items-center border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 rounded-sm"
          >
            Ver carreras
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
