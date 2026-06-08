'use client'

import {useCallback, useEffect, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {ArrowUp} from 'lucide-react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 400)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.8}}
          transition={{duration: 0.2}}
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#072c57] text-white shadow-lg transition hover:bg-[#0a3d73] focus:outline-none focus:ring-2 focus:ring-[#28c2f3] focus:ring-offset-2"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
