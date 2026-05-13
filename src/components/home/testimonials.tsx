import { AnimatedSection, StaggerContainer, StaggerItem } from '@/src/components/ui'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      'La Tecnicatura en Desarrollo de Software del IFTS 29 me dio las herramientas concretas para entrar al mundo IT sin experiencia previa. El enfoque práctico marca la diferencia.',
    author: 'Analía R.',
    role: 'Egresada 2024',
  },
  {
    quote:
      'Los docentes son profesionales que trabajan en el sector tecnológico. Aprender de quienes viven la industria día a día es invaluable.',
    author: 'Martín L.',
    role: 'Alumno de 3er año',
  },
  {
    quote:
      'Elegí el IFTS 29 porque ofrece un título oficial con validez nacional. Hoy trabajo como desarrolladora backend en una empresa de software.',
    author: 'Carolina M.',
    role: 'Egresada 2023',
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-[#f8f7f4] py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            04 — Comunidad
          </p>
          <h2 className="font-heading mt-6 max-w-3xl text-3xl font-semibold text-[#00152b] sm:text-4xl md:text-5xl">
            Lo que dicen nuestros estudiantes
          </h2>
        </AnimatedSection>

        <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-3" staggerDelay={0.12}>
          {testimonials.map((t) => (
            <StaggerItem key={t.author}>
              <div className="relative h-full rounded-lg border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                <Quote className="h-8 w-8 text-[#28c2f3]/40" />
                <p className="mt-4 text-base leading-relaxed text-slate-700">{t.quote}</p>
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <p className="text-sm font-semibold text-[#00152b]">{t.author}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
