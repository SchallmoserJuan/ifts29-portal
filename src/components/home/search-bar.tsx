'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, FileText, GraduationCap, Newspaper, MapPin } from 'lucide-react'

interface SearchSuggestion {
  label: string
  href: string
  category: string
  icon: React.ElementType
}

const allSuggestions: SearchSuggestion[] = [
  { label: 'Tecnicatura en Desarrollo de Software', href: '/carreras/tecnicatura-superior-en-desarrollo-de-software', category: 'Carrera', icon: GraduationCap },
  { label: 'Plan de estudios', href: '/carreras/tecnicatura-superior-en-desarrollo-de-software', category: 'Carrera', icon: GraduationCap },
  { label: 'Noticias del instituto', href: '/noticias', category: 'Noticias', icon: Newspaper },
  { label: 'Eventos y actividades', href: '/eventos', category: 'Eventos', icon: MapPin },
  { label: 'Biblioteca virtual', href: '/portal/library', category: 'Portal', icon: FileText },
  { label: 'Portal estudiantil', href: '/portal', category: 'Portal', icon: FileText },
  { label: 'Información institucional', href: '/institucional', category: 'Institución', icon: FileText },
  { label: 'Contacto y ubicación', href: '/contacto', category: 'Institución', icon: FileText },
  { label: 'Documentación académica', href: '/institucional', category: 'Institución', icon: FileText },
]

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const filtered = query.trim()
    ? allSuggestions.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase())
      )
    : allSuggestions

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        router.push(`/buscar?q=${encodeURIComponent(query.trim())}`)
        setIsOpen(false)
      }
    },
    [query, router]
  )

  const handleSelect = useCallback(
    (href: string) => {
      router.push(href)
      setIsOpen(false)
      setQuery('')
    },
    [router]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev + 1) % filtered.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
          handleSelect(filtered[highlightedIndex].href)
        } else {
          handleSubmit(e as unknown as React.FormEvent)
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    },
    [filtered, highlightedIndex, handleSelect, handleSubmit]
  )

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [query])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div
          className="relative flex items-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-colors duration-300 focus-within:border-[#28c2f3]/30 focus-within:bg-white/[0.06]"
        >
          {/* Línea decorativa inferior */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#28c2f3]/30 to-transparent opacity-0 transition-opacity duration-300 focus-within:opacity-100" />

          <div className="flex shrink-0 items-center pl-4 sm:pl-5">
            <Search className="h-4 w-4 text-white/30 transition-colors duration-300 focus-within:text-[#28c2f3]/60" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar noticias, carrera, eventos..."
            className="h-14 w-full bg-transparent px-3 text-sm text-white placeholder:text-white/25 outline-none sm:h-16 sm:px-4 sm:text-base"
          />

          <div className="flex shrink-0 items-center pr-2 sm:pr-3">
            <button
              type="submit"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#28c2f3]/10 text-[#28c2f3] transition hover:bg-[#28c2f3]/20 sm:h-10 sm:w-10"
              aria-label="Buscar"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Dropdown de sugerencias */}
      {isOpen && filtered.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a1f3d]/95 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="custom-scrollbar max-h-[320px] overflow-y-auto py-2">
            {filtered.map((suggestion, index) => {
              const Icon = suggestion.icon
              const isHighlighted = index === highlightedIndex

              return (
                <button
                  key={suggestion.label}
                  type="button"
                  onClick={() => handleSelect(suggestion.href)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`flex w-full cursor-pointer items-center gap-4 px-4 py-3 text-left transition-colors duration-150 ${
                    isHighlighted ? 'bg-white/[0.06]' : 'bg-transparent'
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.04] text-white/40">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white/90">
                      {suggestion.label}
                    </p>
                    <p className="text-xs text-white/30">{suggestion.category}</p>
                  </div>
                  {isHighlighted && (
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#28c2f3]/60" />
                  )}
                </button>
              )
            })}
          </div>

          {query.trim() && (
            <div className="border-t border-white/[0.04] px-4 py-2.5">
              <button
                type="button"
                onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                className="flex w-full items-center gap-2 text-left text-xs text-white/30 transition hover:text-white/50"
              >
                <Search className="h-3 w-3" />
                Ver todos los resultados para &quot;{query.trim()}&quot;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
