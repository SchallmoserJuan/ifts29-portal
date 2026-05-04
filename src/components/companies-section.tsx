import Link from 'next/link'
import { CompaniesCard } from '@/src/components/companies-card'
import type { CompanyItem } from '@/src/types/content'

export function CompaniesSection({ companies }: { companies: CompanyItem[] }) {
  if (companies.length === 0) return null

  return (
    <section className="bg-zinc-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-[53px] leading-[64px] font-medium text-[#1e3e8a]">Convenios con empresas</h2>
          <Link
            href="/empresas"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#214ca0] transition hover:text-[#2a5fc7]"
          >
            Ver todas las empresas
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companies.slice(0, 4).map((item) => (
            <CompaniesCard key={item.id} company={item} />
          ))}
        </div>
      </div>
    </section>
  )
}