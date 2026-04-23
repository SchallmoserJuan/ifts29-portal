import type { ReactNode } from 'react'

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-[#072c57] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(220,236,255,0.12),transparent_35%,rgba(40,194,243,0.18)_100%)]" />
      <div className="relative mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-100">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  )
}
