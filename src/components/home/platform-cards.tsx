import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/src/components/ui'
import { ExternalLink } from 'lucide-react'

const platforms = [
  {
    title: 'Aula Virtual',
    description: 'Accedé a tus materias, contenidos y actividades del cursado.',
    href: 'https://aulasvirtuales.bue.edu.ar/',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'SIU Guaraní',
    description: 'Gestioná tu inscripción, notas oficiales y trámites académicos.',
    href: 'https://guarani-autogestionagencia.bue.edu.ar/',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Portal estudiantil',
    description: 'Consultá calendarios, mesas de examen y recursos del instituto.',
    href: '/portal',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  },
]

export function PlatformCards() {
  return (
    <section className="bg-[#072c57] py-16 text-white sm:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            Sistemas
          </p>
          <h2 className="font-heading mt-4 text-3xl font-medium text-white sm:text-4xl">
            Plataformas académicas
          </h2>
        </AnimatedSection>

        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-3" staggerDelay={0.1}>
          {platforms.map((platform) => (
            <StaggerItem key={platform.title}>
              <Link href={platform.href} className="group block">
                <div className="relative overflow-hidden rounded-lg border border-white/10 shadow-lg">
                  <div className="relative h-[340px] w-full overflow-hidden sm:h-[380px]">
                    <Image
                      src={platform.image}
                      alt={platform.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <h3 className="relative inline-block text-2xl font-semibold text-white">
                        {platform.title}
                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#2fd0ff] transition-all duration-500 group-hover:w-full" />
                      </h3>
                      <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/90">
                        {platform.description}
                      </p>
                      <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#28c2f3]">
                        <span className="navbar-underline">Acceder</span>
                        <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
