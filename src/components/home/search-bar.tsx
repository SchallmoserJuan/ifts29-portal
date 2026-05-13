'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const suggestions = ['Noticias', 'Carrera', 'Biblioteca', 'Eventos']

export function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar noticias, carreras, eventos..."
            className="h-14 w-full rounded-md border border-white/15 bg-white pl-12 pr-5 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-400 transition focus:border-[#28c2f3] focus:ring-2 focus:ring-[#28c2f3]/20"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-md bg-[#28c2f3] px-8 text-base font-semibold text-[#072c57] transition hover:bg-[#52d0f7]"
        >
          <Search className="h-5 w-5" />
          Buscar
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => router.push(`/buscar?q=${encodeURIComponent(suggestion)}`)}
            className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70 transition hover:border-white/40 hover:text-white"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  )
}
