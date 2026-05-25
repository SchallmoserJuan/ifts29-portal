import type { Metadata } from 'next'

import { PageShell } from '@/src/components/layout'
import { PageHero } from '@/src/components/ui'
import { RichTextRenderer } from '@/src/components/ui'
import {
  ScholarshipsSection,
  TimelineSection,
  FaqSection,
  BecasContactSection,
} from '@/src/components/becas'
import { getBecasPage, getScholarships } from '@/src/lib/content'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getBecasPage()
  return {
    title: pageData.pageTitle,
    description: pageData.pageSubtitle || 'Información sobre becas disponibles en el IFTS N° 29.',
  }
}

export default async function BecasPage() {
  const [pageData, scholarships] = await Promise.all([getBecasPage(), getScholarships()])

  return (
    <PageShell>
      <PageHero
        eyebrow="Estudiantes"
        title={pageData.pageTitle}
        description={pageData.pageSubtitle || ''}
      />

      {pageData.introduction ? (
        <section className="py-12 lg:py-16 bg-[#f8f7f4]">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <div className="max-w-3xl">
              <RichTextRenderer content={pageData.introduction} />
            </div>
          </div>
        </section>
      ) : null}

      <ScholarshipsSection
        scholarships={scholarships}
        title={pageData.scholarshipsTitle}
      />

      <TimelineSection
        items={pageData.timelineItems || []}
        title={pageData.timelineTitle}
      />

      <FaqSection
        items={pageData.faqItems || []}
        title={pageData.faqTitle}
      />

      <BecasContactSection
        title={pageData.contactTitle}
        text={pageData.contactText}
      />
    </PageShell>
  )
}
