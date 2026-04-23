import { PageHero } from '@/src/components/page-hero'
import { PageShell } from '@/src/components/page-shell'
import { RichTextRenderer } from '@/src/components/rich-text-renderer'
import { getInstitutionalContent } from '@/src/lib/content'
import type { AuthorityItem } from '@/src/types/content'

export const dynamic = 'force-dynamic'

const hasRichTextRoot = (value: unknown): value is { root?: { children?: unknown[] } } =>
  typeof value === 'object' && value !== null && 'root' in value

export default async function InstitutionalPage() {
  const content = await getInstitutionalContent()

  return (
    <PageShell>
      <PageHero
        eyebrow="Institucional"
        title="Identidad, historia y proyeccion academica"
        description="Una presentacion sintetica del instituto, su orientacion tecnica y la estructura de informacion del portal."
      />

      <section className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_0.9fr] lg:px-10">
        <article className="rounded-3xl border border-[#b8d2f1] bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-950">Historia</h2>
          <div className="mt-6">
            {typeof content.history === 'string' ? (
              <p className="text-base leading-8 text-slate-700">{content.history}</p>
            ) : hasRichTextRoot(content.history) ? (
              <RichTextRenderer content={content.history} />
            ) : (
              <p className="text-base leading-8 text-slate-700">{String(content.history || '')}</p>
            )}
          </div>
        </article>
        <div className="space-y-6">
          <article className="rounded-3xl bg-[#072c57] p-8 text-white">
            <h2 className="text-2xl font-semibold">Mision</h2>
            <p className="mt-4 leading-8 text-slate-300">{content.mission}</p>
          </article>
          <article className="rounded-3xl border border-[#b8d2f1] bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Vision</h2>
            <p className="mt-4 leading-8 text-slate-700">{content.vision}</p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-10">
        <div className="rounded-3xl border border-[#b8d2f1] bg-white p-8">
          <h2 className="text-3xl font-semibold text-slate-950">Autoridades</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.authorities.map((authority: AuthorityItem, index: number) => (
              <article key={`${authority.name}-${index}`} className="rounded-2xl bg-[#f3f8ff] p-5">
                <h3 className="text-lg font-semibold text-slate-950">{authority.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-500">{authority.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
