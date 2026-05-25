import { ClipboardList, FileCheck, Users, BookOpen } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Preinscripción online',
    description:
      'Completá el formulario de inscripción en el sitio del GCBA durante el periodo de inscripción (marzo o julio).',
    icon: ClipboardList,
  },
  {
    number: '02',
    title: 'Presentación de documentación',
    description:
      'Acercá la documentación requerida al instituto para validar tu inscripción.',
    icon: FileCheck,
  },
  {
    number: '03',
    title: 'Exámenes de ingreso',
    description:
      'Rendí los exámenes de ingreso. Las vacantes se asignan por orden de nota.',
    icon: Users,
  },
  {
    number: '04',
    title: 'Matriculación',
    description:
      'Si obtenés vacante, completá la matriculación y comenzá tus estudios.',
    icon: BookOpen,
  },
]

export function StepsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            Pasos del proceso
          </h2>
          <p className="mt-3 text-base text-slate-500 md:text-lg">
            Seguí estos pasos para inscribirte en la Tecnicatura Superior en Desarrollo de Software.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-slate-200 bg-[#f8f7f4] p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#072c57] text-white">
                <step.icon className="h-5 w-5" />
              </div>
              <span className="absolute right-6 top-6 text-5xl font-bold text-[#072c57]/10">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
