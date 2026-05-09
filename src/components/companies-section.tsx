import { CompaniesCard } from '@/src/components/companies-card'
import { SectionHeader } from '@/src/components/section-header'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/src/components/animated-section'
import { Briefcase } from 'lucide-react'
import type { CompanyItem } from '@/src/types/content'

export function CompaniesSection({ companies }: { companies: CompanyItem[] }) {
  if (companies.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-[#dcecff] py-20 sm:py-24 lg:py-28">
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeader
          title="Convenios con empresas"
          href="/empresas"
          linkText="Ver todas las empresas"
        />

        {/* Companies grid */}
        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companies.slice(0, 8).map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <CompaniesCard company={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
