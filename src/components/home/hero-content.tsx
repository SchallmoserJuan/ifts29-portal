'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SearchBar } from './search-bar'
import { GraduationCap, Newspaper, CalendarDays, ArrowRight } from 'lucide-react'

const quickTags = [
  { label: 'Carrera', href: '/carreras/tecnicatura-superior-en-desarrollo-de-software', icon: GraduationCap },
  { label: 'Noticias', href: '/noticias', icon: Newspaper },
  { label: 'Eventos', href: '/eventos', icon: CalendarDays },
]

const trustBadges = [
  'Título oficial',
  'Validez nacional',
  'Desarrollo de Software',
]

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const slideUp = {
  hidden: { y: 16 },
  visible: {
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export function HeroContent() {
  return (
    <motion.div
      className="relative mx-auto flex min-h-[85vh] w-full max-w-[1400px] flex-col items-center justify-center px-4 pb-16 pt-32 sm:px-6 md:min-h-screen md:pb-20 md:pt-44"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <div className="h-px w-8 bg-[#28c2f3]/60" />
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#28c2f3]/80">
          Educaci&oacute;n t&eacute;cnica superior &middot; Buenos Aires
        </p>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="mt-6 text-center font-heading text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
      >
        <span className="text-white">IFTS</span>
        <span className="ml-3 text-[#28c2f3] sm:ml-4">N&deg;&nbsp;29</span>
      </motion.h1>

      <motion.p variants={fadeUp} className="mt-4 text-center text-xl text-slate-100/90 sm:text-2xl">
        Instituto de Formaci&oacute;n T&eacute;cnica Superior
      </motion.p>

      <motion.p
        variants={fadeUp}
        className="mt-6 max-w-3xl text-center text-lg leading-relaxed text-slate-300/90"
      >
        M&aacute;s de una d&eacute;cada formando profesionales t&eacute;cnicos con t&iacute;tulo oficial de validez
        nacional.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/carreras"
          className="group inline-flex items-center gap-2 rounded-md bg-[#28c2f3] px-8 py-3.5 text-sm font-semibold text-[#072c57] transition-all duration-300 hover:bg-[#52d0f7] hover:shadow-[0_0_24px_rgba(40,194,243,0.3)]"
        >
          Conoc&eacute; la carrera
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/portal"
          className="inline-flex items-center justify-center rounded-md border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:shadow-[0_0_16px_rgba(40,194,243,0.08)]"
        >
          Portal estudiantil
        </Link>
      </motion.div>

      <motion.div variants={fadeIn} className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {trustBadges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center gap-1.5 text-xs tracking-wide text-white/60"
          >
            <span className="h-1 w-1 rounded-full bg-[#28c2f3]/60" />
            {badge}
          </span>
        ))}
      </motion.div>

      <motion.div variants={slideUp} className="mt-10 w-full max-w-2xl">
        <SearchBar />
      </motion.div>

      <motion.div variants={slideUp} className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {quickTags.map((tag) => (
          <Link
            key={tag.label}
            href={tag.href}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/70 transition-all duration-200 hover:border-[#28c2f3]/30 hover:bg-[#28c2f3]/10 hover:text-white"
          >
            <tag.icon className="h-3 w-3" />
            {tag.label}
          </Link>
        ))}
      </motion.div>
    </motion.div>
  )
}