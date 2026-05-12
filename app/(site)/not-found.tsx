import Link from 'next/link'

import { PageShell } from '@/src/components/layout'

export default function NotFound() {
  return (
    <PageShell>
      <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">404</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-950">Pagina no encontrada</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          La ruta que buscabas no existe o todavia no fue publicada.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Volver al inicio
        </Link>
      </section>
    </PageShell>
  )
}
