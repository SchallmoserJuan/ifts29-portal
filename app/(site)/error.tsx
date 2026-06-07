'use client'

import {useEffect} from 'react'

import {PageShell} from '@/src/components/layout'

export default function ErrorPage({error, reset}: {error: Error; reset: () => void}) {
  useEffect(() => {
    console.error('[ErrorBoundary]', error)
  }, [error])

  return (
    <PageShell>
      <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">Error</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-950">
          Algo salio mal
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Ocurrio un error inesperado al cargar esta pagina. Por favor, intenta de nuevo.
        </p>
        <button
          onClick={reset}
          className="mt-8 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Reintentar
        </button>
      </section>
    </PageShell>
  )
}
