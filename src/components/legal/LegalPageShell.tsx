import type { Metadata } from 'next'
import { PageShell } from '@/src/components/layout'
import { PageHero } from '@/src/components/ui'

interface LegalPageShellProps {
  title: string
  description: string
  lastUpdated?: string
  children: React.ReactNode
}

export function LegalPageShell({ title, description, lastUpdated, children }: LegalPageShellProps) {
  return (
    <PageShell>
      <PageHero
        eyebrow="Información legal"
        title={title}
        description={description}
      />

      <section className="py-16 lg:py-24 bg-[#f8f7f4]">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
          {lastUpdated && (
            <p className="text-sm text-slate-500 mb-8">
              Última actualización: {lastUpdated}
            </p>
          )}

          <article className="prose prose-slate max-w-none text-slate-700">
            {children}
          </article>
        </div>
      </section>
    </PageShell>
  )
}
