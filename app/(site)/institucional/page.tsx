import type { Metadata } from 'next'

import {PageShell} from '@/src/components/layout'
import {
  InstitutionalHero,
  HistorySection,
  StatsSection,
  BannerSection,
  AcademicSection,
  ValuesSection,
  AuthoritiesSection,
  CTASection,
} from '@/src/components/institutional'

export const metadata: Metadata = {
  title: 'Institución',
  description: 'Conocé la historia, misión, visión y autoridades del IFTS N° 29. Formando profesionales con excelencia académica desde la educación técnica superior.',
}

export const revalidate = 60

export default async function InstitutionalPage() {
  return (
    <PageShell>
      <InstitutionalHero />
      <HistorySection />
      <StatsSection />
      <BannerSection />
      <AcademicSection />
      <ValuesSection />
      <AuthoritiesSection />
      <CTASection />
    </PageShell>
  )
}
