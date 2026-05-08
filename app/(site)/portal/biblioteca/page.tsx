import { PageShell } from '@/src/components/page-shell'
import { requireUser } from '@/src/lib/auth'
import { getLibraryDocuments } from '@/src/lib/content'
import type { DocumentItem } from '@/src/types/content'

export const dynamic = 'force-dynamic'

export default async function LibraryPage() {
  const user = await requireUser()
  const documents = await getLibraryDocuments(user)

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#214ca0]">Biblioteca</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-950">Documentos privados del portal</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Este modulo usa los permisos de Payload para mostrar solo los recursos que tu rol puede consultar.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {documents.length > 0 ? (
            documents.map((document: DocumentItem) => (
              <article key={document.id} className="rounded-3xl border border-[#b8d2f1] bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.18em] text-[#214ca0]">{document.category}</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">{document.title}</h2>
                <p className="mt-3 text-slate-600">{document.description}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span className="rounded-full bg-[#f3f8ff] px-3 py-1">{document.visibility}</span>
                  {document.career?.name ? (
                    <span className="rounded-full bg-[#f3f8ff] px-3 py-1">{document.career.name}</span>
                  ) : null}
                </div>
                {document.url ? (
                  <a
                    href={document.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex text-sm font-semibold text-[#214ca0]"
                  >
                    Abrir archivo
                  </a>
                ) : null}
              </article>
            ))
          ) : (
            <article className="rounded-3xl border border-dashed border-[#b8d2f1] bg-white p-8">
              <h2 className="text-2xl font-semibold text-slate-950">Todavia no hay documentos cargados</h2>
              <p className="mt-3 text-slate-600">
                El panel ya permite administrar la biblioteca. Cuando se publiquen archivos, apareceran aca segun tu
                rol.
              </p>
            </article>
          )}
        </div>
      </section>
    </PageShell>
  )
}
