'use client'

import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {motion, AnimatePresence} from 'framer-motion'

interface NavLink {
  href: string
  label: string
}

const menuLinks: NavLink[] = [
  {href: '/institucional', label: 'Institución'},
  {href: '/carreras', label: 'Carreras'},
  {href: '/investigacion', label: 'Investigación'},
  {href: '/portal/biblioteca', label: 'Biblioteca'},
  {href: '/noticias', label: 'Noticias'},
  {href: '/eventos', label: 'Eventos'},
  {href: '/portal', label: 'Portal estudiantil'},
  {href: '/contacto', label: 'Contacto'},
]

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

const panelVariants = {
  hidden: {y: '-100%'},
  visible: {
    y: '0%',
    transition: {
      duration: 0.7,
      ease: easing,
    },
  },
  exit: {
    y: '-100%',
    transition: {
      duration: 0.55,
      ease: easing,
    },
  },
}

const itemVariants = {
  hidden: {opacity: 0, y: 24},
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.25 + i * 0.06,
      duration: 0.5,
      ease: easing,
    },
  }),
}

const rightPanelVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      delay: 0.35,
      duration: 0.6,
      ease: easing,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
}

export function MegaMenu({open, onClose}: {open: boolean; onClose: () => void}) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      window.addEventListener('keydown', handleKey)
    }
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Close on click outside (backdrop only)
  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] flex flex-col overflow-hidden bg-[#00152b]"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          {/* Header bar with close button */}
          <div className="flex w-full shrink-0 items-center justify-end px-6 py-3 sm:px-10">
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={onClose}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-white/30 hover:bg-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:rotate-90"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content grid */}
          <div className="flex h-full flex-1 flex-col overflow-hidden md:flex-row">
            {/* Left column: Navigation links */}
            <div className="flex w-full flex-1 flex-col justify-center bg-[#00152b] px-6 pt-2 sm:px-10 md:w-[60%] md:px-12 md:pt-0 lg:px-20">
              <nav className="flex flex-col">
                {menuLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="border-t border-white/[0.08] last:border-b"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-2 sm:py-3 md:py-4 lg:py-5"
                    >
                      <span className="font-heading text-lg text-white transition-transform duration-300 group-hover:translate-x-3 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        {link.label}
                      </span>
                      <span className="translate-x-4 text-lg text-[#00d4ff] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:text-xl md:text-2xl">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Right column: Editorial image panel */}
            <motion.div
              variants={rightPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative flex h-[26%] w-full shrink-0 flex-col justify-end overflow-hidden sm:h-[28%] md:h-full md:w-[40%]"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2000&auto=format&fit=crop)',
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#00152b]/60" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end p-4 sm:p-6 md:p-6 lg:p-10">
                <h3 className="font-heading text-base font-semibold text-white sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  Formando profesionales del futuro
                </h3>
                <p className="mt-1 max-w-sm text-xs leading-relaxed text-white/80 sm:text-sm md:text-sm lg:text-base">
                  Más de dos décadas de excelencia académica, investigación aplicada y compromiso con la comunidad.
                </p>
                <Link
                  href="/institucional"
                  onClick={onClose}
                  className="mt-3 inline-flex w-fit items-center bg-[#00d4ff] px-4 py-2 text-xs font-semibold text-[#00152b] transition hover:brightness-110 rounded-sm sm:px-5 sm:py-2.5 sm:text-sm md:mt-4 md:px-6 md:py-3 lg:mt-5"
                >
                  Conocer la institución
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  return createPortal(overlay, document.body)
}
