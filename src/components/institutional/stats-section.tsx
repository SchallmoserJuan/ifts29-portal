'use client'

import {CountUp} from '../ui/count-up'
import {AnimatedSection} from '../ui/animated-section'

const stats = [
  {value: 5, prefix: '+', suffix: '', label: 'años de trayectoria'},
  {value: 5000, prefix: '+', suffix: '', label: 'estudiantes formados'},
  {value: 95, prefix: '', suffix: '%', label: 'inserción laboral'},
  {value: 20, prefix: '+', suffix: '', label: 'docentes especializados'},
]

export function StatsSection() {
  return (
    <section className="bg-[#f0eeea] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
        <AnimatedSection>
          <div className="flex flex-col divide-y divide-[#00152b]/10 md:flex-row md:divide-x md:divide-y-0">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-1 flex-col items-center py-10 md:px-8 md:py-0">
                <span className="font-heading text-5xl font-semibold text-[#00152b] md:text-6xl lg:text-7xl">
                  <CountUp
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </span>
                <span className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
