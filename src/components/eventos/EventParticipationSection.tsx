import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const features = [
  'No se requiere inscripción previa para la mayoría de los eventos',
  'Acceso gratuito para toda la comunidad',
  'Certificado de participación en workshops y conferencias',
  'Modalidades presencial, virtual e híbrida',
]

export function EventParticipationSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
              Cómo participar
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Los eventos del IFTS 29 están abiertos a estudiantes, docentes, graduados y público en
              general. No hace falta ser alumno del instituto para asistir.
            </p>
            <ul className="mt-6 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#28c2f3] mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#f8f7f4] p-8">
            <h3 className="text-xl font-semibold text-[#072c57]">
              ¿Sos ex-alumno o profesional de la industria?
            </h3>
            <p className="mt-3 text-slate-600">
              Si querés dictar una charla, workshop o colaborar con un evento, contactanos. El IFTS 29
              abre sus espacios a quienes quieran compartir conocimiento con la comunidad.
            </p>
            <div className="mt-6">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-md bg-[#072c57] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a3d7a]"
              >
                Proponer una actividad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
