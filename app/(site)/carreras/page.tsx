import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {PageShell} from '@/src/components/layout'
import {getCareers} from '@/src/lib/content'

export const metadata: Metadata = {
  title: 'Carreras',
  description:
    'Explorá nuestra oferta académica en el IFTS N° 29. Carreras técnicas con sólida formación profesional y salida laboral garantizada.',
}

import {CareerHero} from './_components/career-hero'
import {CareerIntro} from './_components/career-intro'
import {CareerProfile} from './_components/career-profile'
import {CareerStudyPlan} from './_components/career-study-plan'
import {CareerPdfs} from './_components/career-pdfs'
import {CareerOutcomes} from './_components/career-outcomes'
import {CareerMethodology} from './_components/career-methodology'
import {CareerCta} from './_components/career-cta'
import {CareerArticulations} from './_components/career-articulations'

export const revalidate = 60

export default async function CareersPage() {
  const careers = await getCareers()

  const career =
    careers.find((c) => c.slug === 'tecnicatura-superior-en-desarrollo-de-software') || careers[0]

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
