import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { LoginForm } from '@/src/components/login'
import { PageShell } from '@/src/components/layout'
import { getCurrentUser } from '@/src/lib/auth'

export const metadata: Metadata = {
  title: 'Ingresar al portal',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  const user = await getCurrentUser()

  if (user) {
    if (user.role === 'student' && user.status === 'pending') {
      redirect('/pendiente')
    }
    redirect('/portal')
  }

  return (
    <PageShell>
      <section className="mx-auto grid min-h-[70vh] w-full max-w-[1400px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#214ca0]">Acceso</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-950">
            Ingreso al portal del IFTS 29
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Alumnos, profesores y administradores acceden desde la misma web. Si todavia no tenes
            cuenta, podes registrarte como alumno.
          </p>
          <div className="mt-8 rounded-3xl border border-[#b8d2f1] bg-white p-6">
            <p className="font-semibold text-slate-950">Sos alumno y no tenes cuenta?</p>
            <p className="mt-2 text-slate-600">
              Registrate desde{' '}
              <Link href="/registro" className="font-semibold text-slate-950 hover:underline">
                /registro
              </Link>{' '}
              y espera la aprobacion de un administrador para acceder al portal.
            </p>
          </div>
        </div>
        <LoginForm />
      </section>
    </PageShell>
  )
}
