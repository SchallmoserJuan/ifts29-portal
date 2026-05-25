import { FileText, ExternalLink } from 'lucide-react'
import type { DocumentItem } from '@/src/types/content'

interface DocumentsSectionProps {
  documents: DocumentItem[]
}

const categoryLabels: Record<string, string> = {
  biblioteca: 'Biblioteca',
  guias: 'Guías',
  normativas: 'Normativas',
  empleo: 'Bolsa de empleo',
}

const categoryColors: Record<string, string> = {
  biblioteca: 'bg-[#214ca0]/10 text-[#214ca0]',
  guias: 'bg-green-100 text-green-700',
  normativas: 'bg-amber-100 text-amber-700',
  empleo: 'bg-rose-100 text-rose-700',
}

export function DocumentsSection({ documents }: DocumentsSectionProps) {
  if (documents.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-[#f8f7f4]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
              Documentos institucionales
            </h2>
            <p className="mt-3 text-base text-slate-500 md:text-lg">
              Material académico, normativas y recursos oficiales del IFTS 29.
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <FileText className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-4 text-slate-600">
              No hay documentos públicos disponibles en este momento.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Los documentos se publican desde el panel de administración.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const grouped = documents.reduce<Record<string, DocumentItem[]>>((acc, doc) => {
    const cat = doc.category || 'otros'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(doc)
    return acc
  }, {})

  return (
    <section className="py-16 lg:py-24 bg-[#f8f7f4]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            Documentos institucionales
          </h2>
          <p className="mt-3 text-base text-slate-500 md:text-lg">
            Material académico, normativas y recursos oficiales del IFTS 29.
          </p>
        </div>

        <div className="space-y-10">
          {Object.entries(grouped).map(([category, docs]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                {categoryLabels[category] || category}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {docs.map((doc) => (
                  <article
                    key={doc.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#28c2f3]/40 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                          categoryColors[doc.category || ''] || 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {categoryLabels[doc.category || ''] || doc.category}
                      </span>
                      {doc.career?.name ? (
                        <span className="text-xs text-slate-500 truncate max-w-[120px]">
                          {doc.career.name}
                        </span>
                      ) : null}
                    </div>
                    <h4 className="mt-4 text-lg font-semibold text-slate-900">{doc.title}</h4>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">{doc.description}</p>
                    {doc.url ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#214ca0] hover:underline"
                      >
                        Descargar
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
