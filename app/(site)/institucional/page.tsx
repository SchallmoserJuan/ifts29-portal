import type {Metadata} from 'next'

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
import {getInstitutionalContent} from '@/src/lib/content'

export const metadata: Metadata = {
  title: 'Institución',
  description:
    'Conocé la historia, misión, visión y autoridades del IFTS N° 29. Formando profesionales con excelencia académica desde la educación técnica superior.',
}

export const revalidate = 60

export default async function InstitutionalPage() {
  const content = await getInstitutionalContent()

  return (
    <PageShell>
      <InstitutionalHero />
      <HistorySection milestones={content.milestones} />
      <StatsSection />
      <BannerSection />
      <AcademicSection />
      <ValuesSection />
      <AuthoritiesSection authorities={content.authorities} />
      <CTASection />
    </PageShell>
  )
}
