import { Users, CalendarCheck, Globe, Ticket } from 'lucide-react'

const stats = [
  {
    icon: CalendarCheck,
    value: '30+',
    label: 'Eventos realizados',
  },
  {
    icon: Users,
    value: '1.200+',
    label: 'Participantes',
  },
  {
    icon: Globe,
    value: '100%',
    label: 'Gratuitos y abiertos',
  },
  {
    icon: Ticket,
    value: '4',
    label: 'Formatos diferentes',
  },
]

export function EventStatsSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#072c57] text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <stat.icon className="h-6 w-6 text-[#28c2f3]" />
              </div>
              <div className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
