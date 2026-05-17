'use client'

import Link from 'next/link'
import {useEffect, useMemo, useRef, useState, useSyncExternalStore} from 'react'
import {createPortal} from 'react-dom'
import {motion, AnimatePresence} from 'framer-motion'

interface MenuItem {
  label: string
  href?: string
  items?: MenuItem[]
}

interface MegaMenuProps {
  open: boolean
  onClose: () => void
  latestNews: {slug: string; title: string}[]
  latestEvents: {slug: string; title: string}[]
}

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]
const easeOutQuad: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const panelVariants = {
  hidden: {y: '-100%'},
  visible: {
    y: '0%',
    transition: {
      duration: 0.5,
      ease: easing,
    },
  },
  exit: {
    y: '-100%',
    transition: {
      duration: 0.45,
      ease: easing,
    },
  },
}

const itemVariants = {
  hidden: {opacity: 0, y: 20},
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 + i * 0.04,
      duration: 0.35,
      ease: easeOutQuad,
    },
  }),
}

const rightPanelVariants = {
  hidden: {opacity: 0, scale: 1.02},
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: easeOutQuad,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.01,
    transition: {
      duration: 0.3,
    },
  },
}

const levelVariants = {
  enter: {x: 32, opacity: 0},
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 32,
      mass: 0.8,
    },
  },
  exit: {
    x: -24,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: easeOutQuad,
    },
  },
}

const noop = () => () => {}
const getServerSnapshot = () => false
const getClientSnapshot = () => true

export function MegaMenu({open, onClose, latestNews, latestEvents}: MegaMenuProps) {
  const mounted = useSyncExternalStore(noop, getClientSnapshot, getServerSnapshot)
  const [stack, setStack] = useState<MenuItem[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset stack when menu opens/closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setStack([]), 600)
      return () => clearTimeout(timer)
    }
  }, [open])

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
      if (e.key === 'Escape') {
        if (stack.length > 0) {
          setStack((s) => s.slice(0, -1))
        } else {
          onClose()
        }
      }
    }
    if (open) {
      window.addEventListener('keydown', handleKey)
    }
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose, stack.length])

  // Close on click outside (backdrop only)
  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const menuItems = useMemo<MenuItem[]>(
    () => [
      {label: 'Institución', href: '/institucional'},
      {
        label: 'Carreras',
        items: [
          {label: 'Información general', href: '/carreras'},
          {label: 'Inscripciones', href: '/inscripciones'},
          {label: 'Becas', href: '/becas'},
          {label: 'Articulaciones', href: '/carreras/tecnicatura-superior-en-desarrollo-de-software#articulaciones'},
          {label: 'Agenda académica', href: '/agenda'},
          {label: 'Horarios', href: '/carreras/horarios'},
        ],
      },
      {
        label: 'Noticias',
        items: [
          {label: 'Ver todas las noticias', href: '/noticias'},
          ...latestNews.map((n) => ({label: n.title, href: `/noticias/${n.slug}`})),
        ],
      },
      {
        label: 'Eventos',
        items: [
          {label: 'Ver todos los eventos', href: '/eventos'},
          ...latestEvents.map((e) => ({label: e.title, href: `/eventos/${e.slug}`})),
        ],
      },
      {
        label: 'Portal estudiantil',
        items: [
          {label: 'Ingresar al portal', href: '/login'},
          {label: 'Biblioteca virtual', href: '/portal/biblioteca'},
        ],
      },
      {label: 'Contacto', href: '/contacto'},
    ],
    [latestNews, latestEvents],
  )

  const currentLevel = stack.length === 0 ? menuItems : (stack[stack.length - 1].items ?? [])
  const currentTitle = stack.length === 0 ? null : stack[stack.length - 1].label

  function handlePush(item: MenuItem) {
    if (item.items && item.items.length > 0) {
      setStack((s) => [...s, item])
    }
  }

  function handleBack() {
    setStack((s) => s.slice(0, -1))
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
                className="transition-transform duration-200 group-hover:rotate-90"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Content grid */}
          <div className="flex h-full flex-1 flex-col overflow-hidden md:flex-row">
            {/* Left column: Navigation links */}
            <div className="relative flex w-full flex-1 flex-col justify-center bg-[#00152b] px-6 pt-2 sm:px-10 md:w-[60%] md:px-12 md:pt-0 lg:px-20">
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stack.length}
                    variants={levelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col"
                  >
                    {/* Back button */}
                    {stack.length > 0 && (
                      <div className="border-t border-white/[0.08]">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="group flex w-full items-center gap-3 py-3 text-left md:py-4 lg:py-5"
                        >
                          <span className="text-lg text-[#00d4ff] transition-transform duration-300 sm:text-xl md:text-2xl">
                            ←
                          </span>
                          <span className="font-heading text-base text-white/70 sm:text-lg md:text-xl lg:text-2xl">
                            {currentTitle}
                          </span>
                        </button>
                      </div>
                    )}

                    <nav className="flex flex-col">
                      {currentLevel.map((item, i) => (
                        <motion.div
                          key={item.label + (item.href ?? '')}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="border-t border-white/[0.08] last:border-b"
                        >
                          {item.href ? (
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="group flex items-center justify-between py-2 sm:py-3 md:py-4 lg:py-5"
                            >
                              <span className="mega-menu-underline font-heading text-lg text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                                {item.label}
                              </span>
                              <span className="translate-x-4 text-lg text-[#00d4ff] opacity-0 transition-all duration-300 group-hover:opacity-100 sm:text-xl md:text-2xl">
                                →
                              </span>
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handlePush(item)}
                              className="group flex w-full items-center justify-between py-2 text-left sm:py-3 md:py-4 lg:py-5"
                            >
                              <span className="mega-menu-underline font-heading text-lg text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                                {item.label}
                              </span>
                              <span className="translate-x-4 text-lg text-[#00d4ff] opacity-0 transition-all duration-300 group-hover:opacity-100 sm:text-xl md:text-2xl">
                                →
                              </span>
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </nav>
                  </motion.div>
                </AnimatePresence>
              </div>
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
                  Más de dos décadas de excelencia académica, investigación aplicada y compromiso
                  con la comunidad.
                </p>
                <Link
                  href="/institucional"
                  onClick={onClose}
                  className="mt-3 inline-flex w-fit items-center rounded-sm bg-[#00d4ff] px-4 py-2 text-xs font-semibold text-[#00152b] transition hover:brightness-110 sm:px-5 sm:py-2.5 sm:text-sm md:mt-4 md:px-6 md:py-3 lg:mt-5"
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
