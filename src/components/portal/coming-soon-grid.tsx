'use client'

import { useAuth } from '@/src/context/auth-context'

export function ComingSoonGrid() {
  const { user } = useAuth()

  const items = [
    {
      label: 'Mensajes institucionales',
      description: 'Comunicados oficiales del IFTS 29',
      icon: (
        <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Tramites online',
      description: 'Solicitudes y gestiones digitales',
      icon: (
        <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Practicas profesionalizantes',
      description: 'Seguimiento de pasantias y convenios',
      icon: (
        <svg className="size-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#072c57]">
          <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-950">Proximamente en el portal</h3>
          <p className="text-sm text-slate-500">Nuevas funciones que estamos desarrollando</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="group relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:border-slate-200 hover:bg-slate-50"
          >
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition group-hover:bg-slate-200">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-slate-700">{item.label}</p>
                <p className="mt-0.5 text-xs text-slate-400">{item.description}</p>
              </div>
            </div>
            <span className="absolute right-3 top-3 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Proximamente
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
