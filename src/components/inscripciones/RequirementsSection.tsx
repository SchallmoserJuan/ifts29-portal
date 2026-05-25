import { CheckCircle2, FileText, UserCheck, BookOpen } from 'lucide-react'

const requirements = [
  {
    title: 'Título secundario completo',
    description: 'Constancia de título secundario o certificado de alumno regular del último año.',
    icon: BookOpen,
  },
  {
    title: 'DNI argentino o en trámite',
    description: 'Fotocopia del documento de identidad. En caso de estar en trámite, presentar constancia.',
    icon: UserCheck,
  },
  {
    title: 'Constancia de CUIL',
    description: 'Comprobante de Clave Única de Identificación Laboral (CUIL).',
    icon: FileText,
  },
  {
    title: '18 años o más',
    description: 'Contar con 18 años cumplidos al inicio del ciclo lectivo.',
    icon: CheckCircle2,
  },
]

const documents = [
  'Fotocopia del DNI (frente y dorso)',
  'Fotocopia del título secundario legalizado',
  'Partida de nacimiento',
  'Constancia de CUIL',
  'Foto carnet 4x4',
]

export function RequirementsSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#f8f7f4]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Requisitos */}
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
              Requisitos
            </h2>
            <p className="mt-3 text-base text-slate-500 md:text-lg mb-8">
              Para inscribirte en la Tecnicatura Superior en Desarrollo de Software.
            </p>

            <div className="space-y-5">
              {requirements.map((req) => (
                <div key={req.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#072c57]/10 text-[#072c57]">
                    <req.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{req.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{req.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentación */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-[#072c57]">
              Documentación a presentar
            </h3>
            <ul className="mt-6 space-y-3">
              {documents.map((doc, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#28c2f3]" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
