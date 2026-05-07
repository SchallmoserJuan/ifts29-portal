import Link from 'next/link'

import { NotificationsCard } from '@/src/components/notifications-card'
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
      />

      <section className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-1">
            <article className="rounded-3xl border border-[#b8d2f1] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">Biblioteca</h2>
              <p className="mt-2 text-sm text-slate-600">Recursos, guias y documentos.</p>
              <Link href="/portal/biblioteca" className="mt-4 inline-flex text-sm font-semibold text-[#214ca0]">
                Abrir biblioteca
              </Link>
            </article>

            {(user.role === 'teacher' || user.role === 'admin') && (
              <article className="rounded-3xl border border-[#b8d2f1] bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-950">Gestion de contenido</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Panel para crear o editar noticias, carreras y documentos.
                </p>
                <Link href="/admin" className="mt-4 inline-flex text-sm font-semibold text-[#214ca0]">
                  Abrir Payload
                </Link>
              </article>
            )}

            {user.role === 'admin' && (
              <article className="rounded-3xl border border-[#b8d2f1] bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-950">Administracion</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Usuarios y configuracion del sitio.
                </p>
                <Link
                  href="/admin/collections/users"
                  className="mt-4 inline-flex text-sm font-semibold text-[#214ca0]"
                >
                  Gestionar usuarios
                </Link>
              </article>
            )}
          </div>

          <div className="md:col-span-2">
            <NotificationsCard />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
