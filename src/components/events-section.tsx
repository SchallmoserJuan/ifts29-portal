import { EventsCard } from '@/src/components/events-card'
import { SectionHeader } from '@/src/components/section-header'
import { StaggerContainer, StaggerItem } from '@/src/components/animated-section'
import type { EventItem } from '@/src/types/content'

export function EventsSection({ events }: { events: EventItem[] }) {
  if (events.length === 0) return null

  return (
    <section className="bg-[#dcecff] py-8">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeader
          title="Próximos eventos"
          href="/eventos"
          linkText="Ver todos los eventos"
          description="Descubrí las actividades, charlas y workshops que tenemos preparados para la comunidad tecnologica."
        />

        <StaggerContainer className="mt-12 grid gap-6 lg:grid-cols-2 items-stretch">
          {events.slice(0, 4).map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <EventsCard event={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
