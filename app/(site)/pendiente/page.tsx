import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { PageShell } from '@/src/components/layout'
import { getCurrentUser } from '@/src/lib/auth'

export const metadata: Metadata = {
  title: 'Cuenta pendiente de aprobacion',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function PendingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'student' || user.status === 'approved') {
    redirect('/portal')
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ')
  const displayName = fullName || user.email

  return (
    <PageShell>
      <section className="mx-auto flex min-h-[70vh] w-full max-w-[1400px] items-center justify-center px-4 py-16 sm:px-6 lg:px-10">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-amber-100">
            <svg
              className="size-8 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Cuenta pendiente de aprobacion
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Hola, <span className="font-medium text-slate-950">{displayName}</span>. Tu cuenta fue
            creada exitosamente, pero aun no ha sido aprobada por un administrador.
          </p>
          <p className="mt-4 text-slate-600">
            Una vez que un administrador revise y apruebe tu solicitud, podras acceder a todos los
            recursos privados del portal del IFTS 29.
          </p>
          <div className="mt-8 rounded-2xl border border-[#b8d2f1] bg-white p-6">
            <p className="text-sm text-slate-600">
              Si crees que esto es un error o necesitas ayuda, contacta a la administracion del
              instituto.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
