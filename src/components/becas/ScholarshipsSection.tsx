import { ScholarshipCard } from './ScholarshipCard'
import type { ScholarshipItem } from '@/src/types/content'

interface ScholarshipsSectionProps {
  scholarships: ScholarshipItem[]
  title?: string
}

export function ScholarshipsSection({ scholarships, title = 'Programas Disponibles' }: ScholarshipsSectionProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-500 md:text-lg">
            Conocé los programas de becas nacionales y de la Ciudad de Buenos Aires disponibles para estudiantes del IFTS 29.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      </div>
    </section>
  )
}
