import { Calendar, CheckCircle, Users } from 'lucide-react'

const dates = [
  {
    date: '1° de marzo',
    title: 'Apertura de inscripciones',
    description: 'Primer llamado del ciclo lectivo 2026.',
    highlight: true,
  },
  {
    date: '31 de marzo',
    title: 'Cierre de inscripciones',
    description: 'Último día para presentar documentación.',
    highlight: false,
  },
  {
    date: '15 de abril',
    title: 'Exámenes de ingreso',
    description: 'Rendición de exámenes y asignación de vacantes por nota.',
    highlight: false,
  },
  {
    date: '10 de mayo',
    title: 'Inicio de clases',
    description: 'Comienzo del primer cuatrimestre.',
    highlight: true,
  },
]

export function TimelineMini() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            Fechas importantes
          </h2>
          <p className="mt-3 text-base text-slate-500 md:text-lg">
            Calendario del proceso de inscripción para el ciclo lectivo 2026.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dates.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl border p-6 ${
                item.highlight
                  ? 'border-[#28c2f3]/40 bg-[#28c2f3]/5'
                  : 'border-slate-200 bg-[#f8f7f4]'
              }`}
            >
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#072c57]">
                <Calendar className="h-4 w-4" />
                {item.date}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[#072c57]/10 bg-[#072c57]/[0.03] p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#072c57] text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#072c57]">Segundo llamado</h3>
              <p className="mt-1 text-sm text-slate-600">
                Si no obtenés vacante en el primer llamado, podés volver a inscribirte en el
                <strong> segundo llamado de julio</strong> con la misma documentación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
