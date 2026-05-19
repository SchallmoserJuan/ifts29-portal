import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageShell } from '@/src/components/layout'
import { getCareerBySlug } from '@/src/lib/content'

import { CareerHero } from '../_components/career-hero'
import { CareerIntro } from '../_components/career-intro'
import { CareerProfile } from '../_components/career-profile'
import { CareerStudyPlan } from '../_components/career-study-plan'
import { CareerPdfs } from '../_components/career-pdfs'
import { CareerOutcomes } from '../_components/career-outcomes'
import { CareerMethodology } from '../_components/career-methodology'
import { CareerCta } from '../_components/career-cta'
import { CareerArticulations } from '../_components/career-articulations'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const career = (await getCareerBySlug(slug)) as any

  if (!career) {
    return {
      title: 'Carrera no encontrada',
    }
  }

  return {
    title: career.name,
    description: career.summary,
    openGraph: {
      title: career.name,
      description: career.summary,
      images: career.heroImage
        ? [
            {
              url: career.heroImage.url,
              alt: career.heroImage.alt || career.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: career.name,
      description: career.summary,
      images: career.heroImage ? [career.heroImage.url] : [],
    },
  }
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const career = (await getCareerBySlug(slug)) as any

  if (!career) {
    notFound()
  }

  return (
    <PageShell>
      <CareerHero career={career} />
      <CareerIntro career={career} />
      <CareerProfile career={career} />
      <CareerStudyPlan career={career} />
      <CareerArticulations career={career} />
      <CareerPdfs career={career} />
      <CareerOutcomes career={career} />
      <CareerMethodology career={career} />
      <CareerCta career={career} />
    </PageShell>
  )
}
