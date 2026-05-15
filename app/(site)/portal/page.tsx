import type { Metadata } from 'next'

import { NotificationsCard } from '@/src/components/portal'
import { DashboardStats } from '@/src/components/portal'
import { PendingUsersTable } from '@/src/components/portal'
import { QuickLinks } from '@/src/components/portal'
import { PageShell } from '@/src/components/layout'
import { requireApprovedStudent } from '@/src/lib/auth'

export const metadata: Metadata = {
  title: 'Portal',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function PortalPage() {
  const user = await requireApprovedStudent()

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ')
  const displayName = fullName || user.email

  const roleLabel = {
    admin: 'Administrador',
    teacher: 'Profesor',
    student: 'Alumno',
  }[user.role]

  const roleColor = {
    admin: 'bg-amber-100 text-amber-700',
    teacher: 'bg-sky-100 text-sky-700',
    student: 'bg-green-100 text-green-700',
  }[user.role]

  const isStaff = user.role === 'admin' || user.role === 'teacher'

  return (
    <PageShell>
      <div className="min-h-screen bg-slate-50/50">
        {/* Header */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                  Bienvenido, {displayName}
                </h1>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${roleColor}`}>
                  {roleLabel}
                </span>
              </div>
              <p className="mt-2 text-slate-500">
                Panel de control del IFTS 29. Desde aqui podes gestionar alumnos, acceder a recursos y
                administrar el contenido del portal.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#072c57]">
                <span className="text-xs font-bold text-white">{displayName[0]?.toUpperCase()}</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">{displayName}</p>
                <p className="text-xs">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
          {/* Stats */}
          {isStaff && (
            <section className="mb-8">
              <DashboardStats />
            </section>
          )}

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Main column */}
            <div className="space-y-8">
              {/* Pending users table - only for staff */}
              {isStaff && (
                <section>
                  <PendingUsersTable />
                </section>
              )}

              {/* Notifications */}
              <section>
                <NotificationsCard />
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <QuickLinks />

              {/* Student-only info card */}
              {user.role === 'student' && (
                <div className="rounded-2xl border border-[#b8d2f1] bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-green-100">
                      <svg className="size-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900">Cuenta activa</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    Tu cuenta fue aprobada y tenes acceso completo al portal del IFTS 29.
                  </p>
                </div>
              )}

              {/* Help / Contact */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Soporte</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Si necesitas ayuda con el portal o tenes problemas de acceso, contacta a la administracion.
                </p>
                <a
                  href="mailto:info@ifts29.edu.ar"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#214ca0] hover:underline"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@ifts29.edu.ar
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
