import { Calendar } from 'lucide-react'
import type { TimelineItem } from '@/src/types/content'

interface TimelineSectionProps {
  items: TimelineItem[]
  title?: string
}

export function TimelineSection({ items, title = 'Fechas Importantes' }: TimelineSectionProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-500 md:text-lg">
            Fechas clave del calendario de becas. Recordá verificar los sitios oficiales para confirmar fechas actualizadas.
          </p>
        </div>

        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-[#e2e8f0] md:left-1/2 md:-ml-[1px]" />

          <div className="space-y-8">
            {items.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-6 md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Punto en la línea */}
                <div className="absolute left-[11px] top-2 z-10 md:left-1/2 md:-ml-[9px]">
                  <div className="w-5 h-5 rounded-full bg-[#28c2f3] border-4 border-white shadow-md" />
                </div>

                {/* Contenido */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#072c57]/5 text-[#072c57] text-sm font-medium mb-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1 text-slate-500 text-sm">{item.description}</p>
                  )}
                </div>

                {/* Espacio vacío para el otro lado en desktop */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
