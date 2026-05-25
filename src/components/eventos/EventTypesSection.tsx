import { Mic2, Wrench, DoorOpen, Presentation } from 'lucide-react'

const eventTypes = [
  {
    icon: Mic2,
    title: 'Charlas',
    description: 'Expositores de la industria y academia comparten conocimientos sobre tecnologías emergentes y tendencias del sector.',
  },
  {
    icon: Wrench,
    title: 'Workshops',
    description: 'Sesiones prácticas de aprendizaje intensivo donde los participantes desarrollan proyectos concretos de la mano de expertos.',
  },
  {
    icon: DoorOpen,
    title: 'Jornadas de puertas abiertas',
    description: 'Conocé nuestras instalaciones, hablá con docentes y estudiantes, y descubrí todo lo que ofrece el IFTS 29.',
  },
  {
    icon: Presentation,
    title: 'Conferencias',
    description: 'Eventos institucionales con múltiples paneles, debates y espacios de networking para la comunidad tecnológica.',
  },
]

export function EventTypesSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#f8f7f4]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            Tipos de actividades
          </h2>
          <p className="mt-3 text-base text-slate-500 md:text-lg">
            Diferentes formatos para acercarte al mundo de la tecnología y la formación profesional.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {eventTypes.map((type) => (
            <div
              key={type.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#28c2f3]/40 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#072c57]/10 text-[#072c57] transition group-hover:bg-[#072c57]/20">
                <type.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{type.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
