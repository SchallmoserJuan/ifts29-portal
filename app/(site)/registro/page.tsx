import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { RegisterForm } from '@/src/components/register'
import { PageShell } from '@/src/components/layout'
import { getCurrentUser } from '@/src/lib/auth'

export const metadata: Metadata = {
  title: 'Registro de alumnos',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function RegisterPage() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#214ca0]">
            Registro
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-950">
            Crear cuenta de alumno
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Completa el formulario con tus datos para registrarte en el portal del IFTS 29. Una vez
            que un administrador apruebe tu cuenta, podras acceder a todos los recursos privados del
            instituto.
          </p>
          <div className="mt-8 rounded-3xl border border-[#b8d2f1] bg-white p-6">
            <p className="font-semibold text-slate-950">Informacion importante</p>
            <p className="mt-2 text-slate-600">
              Tu cuenta quedara en estado pendiente hasta que un administrador la apruebe. Si ya
              tenes cuenta,{' '}
              <Link href="/login" className="font-semibold text-slate-950 hover:underline">
                ingresa aqui
              </Link>
              .
            </p>
          </div>
        </div>
        <RegisterForm />
      </section>
    </PageShell>
  )
}
