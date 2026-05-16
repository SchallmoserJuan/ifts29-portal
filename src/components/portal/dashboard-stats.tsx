'use client'

import { useEffect, useState } from 'react'

interface StatsData {
  totalUsers: number
  pendingCount: number
  approvedCount: number
  rejectedCount: number
}

const statConfig = [
  {
    key: 'totalUsers' as const,
    label: 'Total alumnos',
    description: 'Registrados en el sistema',
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'bg-slate-800 text-white',
    iconBg: 'bg-white/20',
  },
  {
    key: 'pendingCount' as const,
    label: 'Pendientes',
    description: 'Esperando aprobacion',
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'bg-[#214ca0]/20 hover:bg-[#214ca0]/25',
    textColor: 'text-amber-900',
    iconBg: 'bg-amber-100 text-amber-700',
    alert: true,
  },
  {
    key: 'approvedCount' as const,
    label: 'Aprobados',
    description: 'Con acceso al portal',
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'bg-[#214ca0]/20 hover:bg-[#214ca0]/25',
    textColor: 'text-green-900',
    iconBg: 'bg-green-100 text-green-700',
  },
  {
    key: 'rejectedCount' as const,
    label: 'Rechazados',
    description: 'Cuentas denegadas',
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'bg-[#214ca0]/20 hover:bg-[#214ca0]/25',
    textColor: 'text-red-900',
    iconBg: 'bg-red-100 text-red-700',
  },
]

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/users/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statConfig.map((stat) => {
        const value = stats[stat.key]
        const isDark = stat.key === 'totalUsers'

        return (
          <div
            key={stat.key}
            className={`relative overflow-hidden rounded-2xl border p-5 transition hover:shadow-md ${stat.color}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : stat.textColor + '/70'}`}>
                  {stat.label}
                </p>
                <p className={`mt-2 text-3xl font-bold tracking-tight ${isDark ? 'text-white' : stat.textColor}`}>
                  {value}
                </p>
                <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : stat.textColor + '/60'}`}>
                  {stat.description}
                </p>
              </div>
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${isDark ? stat.iconBg : stat.iconBg}`}>
                {stat.icon}
              </div>
            </div>
            {stat.alert && value > 0 && (
              <div className="absolute -right-1 -top-1">
                <span className="flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full bg-amber-500" />
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
