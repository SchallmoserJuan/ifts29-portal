'use client'

import {AnimatedSection} from '../ui/animated-section'

export function BannerSection() {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden md:min-h-[60vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1602114324271-08ea0e9f7a95?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      <div className="absolute inset-0 bg-[#00152b]/55" />
      <AnimatedSection className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-10">
        <blockquote className="font-heading text-3xl font-semibold italic text-white md:text-4xl lg:text-5xl">
          &ldquo;Excelencia académica con impacto global&rdquo;
        </blockquote>
        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-white/60">
          Instituto de Formación Técnica Superior N° 29
        </p>
      </AnimatedSection>
    </section>
  )
}
