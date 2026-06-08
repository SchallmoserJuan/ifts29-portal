'use client'

import Link from 'next/link'
import {useEffect} from 'react'

export default function ErrorPage({error, reset}: {error: Error; reset: () => void}) {
  useEffect(() => {
    console.error('[ErrorBoundary]', error)
  }, [error])

  return (
    <html lang="es">
      <body className="min-h-screen bg-[#f7fbff] text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[1400px] items-center px-4 py-4 sm:px-6 lg:px-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative grid h-14 w-14 grid-cols-2 overflow-hidden rounded-sm border border-slate-300 shadow-lg shadow-slate-200/70">
                <span className="flex items-center justify-center bg-[#1772b7] text-base font-bold text-white">I</span>
                <span className="flex items-center justify-center bg-[#108b63] text-base font-bold text-white">F</span>
                <span className="flex items-center justify-center bg-[#24a34a] text-base font-bold text-white">T</span>
                <span className="flex items-center justify-center bg-[#0b5f44] text-base font-bold text-white">S</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f3c624] text-xs font-bold text-slate-950">29</span>
                </span>
              </div>
            </Link>
          </div>
        </header>

        <main className="flex min-h-[60vh] items-center">
          <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500">Error</p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-950">
              Algo salio mal
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Ocurrio un error inesperado al cargar esta pagina. Por favor, intenta de nuevo.
            </p>
            <div className="mt-8 flex gap-4">
              <button
                onClick={reset}
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Reintentar
              </button>
              <Link
                href="/"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Volver al inicio
              </Link>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
          IFTS 29 &copy; {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  )
}
