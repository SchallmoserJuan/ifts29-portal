import Link from 'next/link'

import { LogoutButton } from '@/src/components/logout-button'
import { PageHero } from '@/src/components/page-hero'
import { PageShell } from '@/src/components/page-shell'
import { requireUser } from '@/src/lib/auth'

export const dynamic = 'force-dynamic'

export default async function PortalPage() {
  const user = await requireUser()

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ')
  const displayName = fullName || user.email

  return (
    <PageShell>
      <PageHero
        eyebrow="Portal"
        title={`Bienvenido, ${displayName}`}
        description="Este espacio resume tus accesos segun el rol autenticado en el portal del IFTS 29."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/portal/biblioteca"
            className="rounded-md bg-[#28c2f3] px-5 py-3 text-sm font-semibold text-[#072c57] transition hover:bg-[#52d0f7]"
          >
            Ir a biblioteca
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Cambiar cuenta
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-3xl border border-[#b8d2f1] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Biblioteca</h2>
            <p className="mt-3 text-slate-600">Recursos, guias y documentos filtrados por visibilidad.</p>
            <Link href="/portal/biblioteca" className="mt-6 inline-flex text-sm font-semibold text-[#214ca0]">
              Ir a biblioteca
            </Link>
          </article>

          {(user.role === 'teacher' || user.role === 'admin') && (
            <article className="rounded-3xl border border-[#b8d2f1] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">Gestion de contenido</h2>
              <p className="mt-3 text-slate-600">
                Acceso al panel para crear o editar noticias, carreras, documentos y media.
              </p>
              <Link href="/admin" className="mt-6 inline-flex text-sm font-semibold text-[#214ca0]">
                Abrir Payload
              </Link>
            </article>
          )}

          {user.role === 'admin' && (
            <article className="rounded-3xl border border-[#b8d2f1] bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">Administracion</h2>
              <p className="mt-3 text-slate-600">
                Usuarios, configuracion del sitio y contenidos institucionales de alto nivel.
              </p>
              <Link
                href="/admin/collections/users"
                className="mt-6 inline-flex text-sm font-semibold text-[#214ca0]"
              >
                Gestionar usuarios
              </Link>
            </article>
          )}
        </div>

        <div className="mt-8 rounded-[28px] bg-[#072c57] p-6 text-white shadow-xl shadow-slate-200/70 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-100">Sesion activa</p>
              <h2 className="mt-3 text-3xl font-semibold">{displayName}</h2>
              <p className="mt-2 text-slate-200">Rol actual: {user.role}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
