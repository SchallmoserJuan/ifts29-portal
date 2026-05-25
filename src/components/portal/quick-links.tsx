'use client'

import Link from 'next/link'
import { useAuth } from '@/src/context/auth-context'

interface QuickLink {
  href: string
  label: string
  description: string
  icon: React.ReactNode
  bgColor: string
  iconColor: string
  staffOnly?: boolean
  adminOnly?: boolean
}

export function QuickLinks() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const isStaff = user?.role === 'admin' || user?.role === 'teacher'

  const links: QuickLink[] = [
    {
      href: '/portal/biblioteca',
      label: 'Biblioteca',
      description: 'Recursos, guias y documentos',
      icon: (
        <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      bgColor: 'bg-[#214ca0]/5 hover:bg-[#214ca0]/10',
      iconColor: 'text-[#214ca0]',
    },
    {
      href: '/admin',
      label: 'Panel Payload',
      description: 'Gestion de contenido y datos',
      icon: (
        <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgColor: 'bg-slate-100 hover:bg-slate-200',
      iconColor: 'text-slate-600',
      staffOnly: true,
    },
    {
      href: '/admin/collections/users',
      label: 'Gestionar usuarios',
      description: 'Usuarios y configuracion',
      icon: (
        <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgColor: 'bg-amber-50 hover:bg-amber-100',
      iconColor: 'text-amber-600',
      adminOnly: true,
    },
  ]

  const visibleLinks = links.filter(
    (l) =>
      (!l.staffOnly || isStaff) && (!l.adminOnly || isAdmin)
  )

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Accesos rapidos</h3>
      <div className="grid gap-3">
        {visibleLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`group flex items-center gap-4 rounded-2xl border border-transparent p-4 transition ${link.bgColor}`}
          >
            <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ${link.iconColor}`}>
              {link.icon}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900">{link.label}</p>
              <p className="text-xs text-slate-500">{link.description}</p>
            </div>
            <svg
              className="ml-auto size-5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
