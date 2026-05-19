'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ArrowRight, FileText, GraduationCap, Newspaper, MapPin } from 'lucide-react'

interface SearchSuggestion {
  label: string
  href: string
  category: string
  icon: React.ElementType
}

const categoryColors: Record<string, string> = {
  Carrera: 'bg-[#28c2f3]/15 text-[#28c2f3] border-[#28c2f3]/20',
  Noticias: 'bg-blue-400/15 text-blue-400 border-blue-400/20',
  Eventos: 'bg-amber-400/15 text-amber-400 border-amber-400/20',
  Portal: 'bg-violet-400/15 text-violet-400 border-violet-400/20',
  Instituci\u00f3n: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
}

const allSuggestions: SearchSuggestion[] = [
  { label: 'Tecnicatura en Desarrollo de Software', href: '/carreras/tecnicatura-superior-en-desarrollo-de-software', category: 'Carrera', icon: GraduationCap },
  { label: 'Plan de estudios', href: '/carreras/tecnicatura-superior-en-desarrollo-de-software', category: 'Carrera', icon: GraduationCap },
  { label: 'Noticias del instituto', href: '/noticias', category: 'Noticias', icon: Newspaper },
  { label: 'Eventos y actividades', href: '/eventos', category: 'Eventos', icon: MapPin },
  { label: 'Biblioteca virtual', href: '/portal/library', category: 'Portal', icon: FileText },
  { label: 'Portal estudiantil', href: '/portal', category: 'Portal', icon: FileText },
  { label: 'Informaci\u00f3n institucional', href: '/institucional', category: 'Instituci\u00f3n', icon: FileText },
  { label: 'Contacto y ubicaci\u00f3n', href: '/contacto', category: 'Instituci\u00f3n', icon: FileText },
  { label: 'Documentaci\u00f3n acad\u00e9mica', href: '/institucional', category: 'Instituci\u00f3n', icon: FileText },
]

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const hasQuery = query.trim().length > 0

  const filtered = hasQuery
    ? allSuggestions.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        router.push(`/buscar?q=${encodeURIComponent(query.trim())}`)
        setIsOpen(false)
        setIsFocused(false)
      }
    },
    [query, router],
  )

  const handleSelect = useCallback(
    (href: string) => {
      router.push(href)
      setIsOpen(false)
      setIsFocused(false)
      setQuery('')
    },
    [router],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || filtered.length === 0) {
        if (e.key === 'Enter' && query.trim()) {
          handleSubmit(e as unknown as React.FormEvent)
        }
        return
      }

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
        setIsFocused(false)
        inputRef.current?.blur()
      }
    },
    [isOpen, filtered, highlightedIndex, handleSelect, handleSubmit, query],
  )

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [query])

  useEffect(() => {
    if (!hasQuery) {
      setIsOpen(false)
    }
  }, [hasQuery])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} noValidate>
        <div
          className={`hero-search-glow group relative flex items-center overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
            isFocused
              ? 'border-[#28c2f3]/25 bg-white/[0.07] hero-search-glow-focus'
              : 'border-white/[0.08] bg-white/[0.04]'
          }`}
        >
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-300 ${
              isFocused
                ? 'bg-gradient-to-r from-transparent via-[#28c2f3]/40 to-transparent opacity-100'
                : 'bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0'
            }`}
          />

          <div className="flex shrink-0 items-center pl-5 sm:pl-6">
            <Search
              className={`h-5 w-5 transition-colors duration-300 ${
                isFocused ? 'text-[#28c2f3]' : 'text-white/30'
              }`}
            />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (e.target.value.trim().length > 0) {
                setIsOpen(true)
              }
            }}
            onFocus={() => {
              setIsFocused(true)
              if (hasQuery) {
                setIsOpen(true)
              }
            }}
            onBlur={() => {
              setTimeout(() => {
                if (!containerRef.current?.contains(document.activeElement)) {
                  setIsFocused(false)
                }
              }, 0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Busc&aacute; carreras, noticias, eventos..."
            className="h-16 w-full bg-transparent px-4 text-base text-white placeholder:text-white/30 outline-none sm:h-[72px] sm:px-5 sm:text-lg"
          />

          <div className="flex shrink-0 items-center pr-3 sm:pr-4">
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#28c2f3] px-5 text-sm font-semibold text-[#072c57] transition-all duration-300 hover:bg-[#52d0f7] hover:shadow-[0_0_16px_rgba(40,194,243,0.3)] sm:h-11 sm:px-6"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {isOpen && hasQuery && filtered.length > 0 && (
          <motion.div
            key="search-dropdown"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="absolute left-0 right-0 top-full z-[100] mt-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a1628]/95 shadow-2xl shadow-black/30 backdrop-blur-2xl"
          >
            <div className="custom-scrollbar max-h-[360px] overflow-y-auto py-2">
              {filtered.map((suggestion, index) => {
                const Icon = suggestion.icon
                const isHighlighted = index === highlightedIndex
                const colorClasses =
                  categoryColors[suggestion.category] || 'bg-white/10 text-white/60 border-white/10'

                return (
                  <button
                    key={suggestion.label}
                    type="button"
                    onClick={() => handleSelect(suggestion.href)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors duration-150 sm:gap-4 sm:px-5 ${
                      isHighlighted ? 'bg-white/[0.06]' : 'bg-transparent'
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-white/50">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white/90">
                        {suggestion.label}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`inline-flex rounded-md border px-1.5 py-0.5 text-[10px] font-medium leading-none ${colorClasses}`}
                        >
                          {suggestion.category}
                        </span>
                      </div>
                    </div>
                    {isHighlighted && (
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#28c2f3]/60" />
                    )}
                  </button>
                )
              })}
            </div>

            {query.trim() && (
              <div className="border-t border-white/[0.06] px-5 py-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
                  }
                  className="flex w-full items-center gap-2 text-left text-xs text-white/40 transition hover:text-white/60"
                >
                  <Search className="h-3 w-3" />
                  Ver todos los resultados para &ldquo;{query.trim()}&rdquo;
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}