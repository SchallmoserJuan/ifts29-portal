'use client'

import { useState, useEffect } from 'react'
import { Megaphone } from 'lucide-react'

const announcements = [
  'Inscripciones abiertas — Ciclo Lectivo 2026',
  'Tecnicatura Superior en Desarrollo de Software — Título oficial de validez nacional',
  'Inicio de clases: 10 de marzo de 2026',
]

export function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % announcements.length)
        setIsVisible(true)
      }, 400)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#00152b] py-2.5">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-3 px-4 sm:px-6 lg:px-10">
        <Megaphone className="h-4 w-4 shrink-0 text-[#28c2f3]" />
        <p
          className={`text-center text-sm text-white/90 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {announcements[current]}
        </p>
      </div>
    </div>
  )
}
