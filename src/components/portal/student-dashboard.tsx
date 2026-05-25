'use client'

import Link from 'next/link'
import {useAuth} from '@/src/context/auth-context'

export function StudentDashboard() {
  const {user} = useAuth()

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ')
  const displayName = fullName || user?.email
  const initials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()

  const resources = [
    {
      label: 'Biblioteca',
      description: 'Accede a recursos, guias y documentos de la carrera',
      href: '/portal/biblioteca',
      active: true,
      icon: (
        <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      bgColor: 'bg-[#214ca0]/5 hover:bg-[#214ca0]/10 border-[#214ca0]/20',
      iconBg: 'bg-[#214ca0]/10 text-[#214ca0]',
      textColor: 'text-[#214ca0]',
    },
    {
      label: 'Calendario academico',
      description: 'Fechas importantes del ciclo lectivo',
      href: '#',
      active: false,
      icon: (
        <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      bgColor: 'bg-slate-50 hover:bg-slate-100 border-slate-100',
      iconBg: 'bg-slate-100 text-slate-400',
      textColor: 'text-slate-400',
    },
    {
      label: 'Mis materias',
      description: 'Plan de estudio y correlatividades',
      href: '#',
      active: false,
      icon: (
        <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      bgColor: 'bg-slate-50 hover:bg-slate-100 border-slate-100',
      iconBg: 'bg-slate-100 text-slate-400',
      textColor: 'text-slate-400',
    },
    {
      label: 'Notas y evaluaciones',
      description: 'Seguimiento de tus calificaciones',
      href: '#',
      active: false,
      icon: (
        <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      bgColor: 'bg-slate-50 hover:bg-slate-100 border-slate-100',
      iconBg: 'bg-slate-100 text-slate-400',
      textColor: 'text-slate-400',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Perfil academico */}
      <div className="rounded-2xl border border-[#b8d2f1] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-[#072c57] text-2xl font-bold text-white">
            {initials || displayName?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-950">{displayName}</h2>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg
                  className="size-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
                DNI: {user?.dni}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="size-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {user?.email}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="size-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                Tecnicatura en Desarrollo de Software
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mis recursos */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Mis recursos
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {resources.map((resource) => {
            const CardWrapper = resource.active ? Link : 'div'
            return (
              <CardWrapper
                key={resource.label}
                href={resource.href}
                className={`group flex items-center gap-4 rounded-2xl border p-5 transition ${resource.bgColor} ${
                  resource.active ? '' : 'cursor-default'
                }`}
              >
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${resource.iconBg}`}
                >
                  {resource.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={`font-semibold ${resource.active ? 'text-slate-900' : 'text-slate-400'}`}
                    >
                      {resource.label}
                    </p>
                    {!resource.active && (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Proximamente
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-0.5 text-xs ${resource.active ? 'text-slate-500' : 'text-slate-400'}`}
                  >
                    {resource.description}
                  </p>
                </div>
                {resource.active && (
                  <svg
                    className="size-5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </CardWrapper>
            )
          })}
        </div>
      </div>
    </div>
  )
}
