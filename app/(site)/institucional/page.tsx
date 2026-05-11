import type { Metadata } from 'next'

import {PageShell} from '@/src/components/page-shell'
import {InstitutionalHero} from '@/src/components/institutional/hero'
import {HistorySection} from '@/src/components/institutional/history-section'
import {StatsSection} from '@/src/components/institutional/stats-section'
import {BannerSection} from '@/src/components/institutional/banner-section'
import {AcademicSection} from '@/src/components/institutional/academic-section'
import {ValuesSection} from '@/src/components/institutional/values-section'
import {AuthoritiesSection} from '@/src/components/institutional/authorities-section'
import {CTASection} from '@/src/components/institutional/cta-section'

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
