import Link from 'next/link'

import { LoginForm } from '@/src/components/login-form'
import { PageShell } from '@/src/components/page-shell'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  return (
    <PageShell>
      <section className="mx-auto grid min-h-[70vh] w-full max-w-[1400px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#214ca0]">Acceso</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-950">
            Ingreso al portal con permisos por rol
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Alumnos, profesores y administradores acceden desde la misma web. El panel editorial completo vive en
            Payload, mientras que la biblioteca y futuras funciones privadas se consumen desde el portal.
          </p>
          <div className="mt-8 rounded-3xl border border-[#b8d2f1] bg-white p-6">
            <p className="font-semibold text-slate-950">Primer inicio</p>
            <p className="mt-2 text-slate-600">
              Si todavia no existe un usuario administrador, crealo desde{' '}
              <Link href="/admin" className="font-semibold text-slate-950">
                /admin
              </Link>
              .
            </p>
          </div>
        </div>
        <LoginForm />
      </section>
    </PageShell>
  )
}
