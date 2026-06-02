import type { CompanyItem } from '@/src/types/content'
import { CompanyCard } from './CompanyCard'

interface CompaniesGridProps {
  companies: CompanyItem[]
}

export function CompaniesGrid({ companies }: CompaniesGridProps) {
  if (companies.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="rounded-2xl border border-dashed border-slate-200 bg-[#f8f7f4] p-10 text-center">
            <p className="text-slate-600">No hay convenios publicados en este momento.</p>
            <p className="mt-2 text-sm text-slate-500">
              Los convenios se publican desde el panel de administración.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </section>
  )
}
