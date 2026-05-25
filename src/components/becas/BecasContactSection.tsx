'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

interface BecasContactSectionProps {
  title?: string
  text?: string
}

export function BecasContactSection({
  title = 'Consultá sobre Becas',
  text = '¿Tenés dudas sobre alguna beca o necesitás ayuda con el proceso de inscripción? Escribinos y te asesoramos.',
}: BecasContactSectionProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) throw new Error()
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1e3e8a] md:text-4xl lg:text-[42px] lg:leading-[1.15]">
              {title}
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-lg">{text}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#f8f7f4] p-8 rounded-xl border border-slate-200 space-y-5"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre completo</label>
              <input
                required
                name="nombre"
                type="text"
                className="block w-full rounded-lg border-slate-300 bg-white shadow-sm focus:border-[#072c57] focus:ring-[#072c57] py-2.5 px-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Correo Electrónico</label>
              <input
                required
                name="email"
                type="email"
                className="block w-full rounded-lg border-slate-300 bg-white shadow-sm focus:border-[#072c57] focus:ring-[#072c57] py-2.5 px-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Asunto</label>
              <input
                name="asunto"
                type="text"
                value="Becas"
                readOnly
                className="block w-full rounded-lg border-slate-300 bg-slate-100 shadow-sm py-2.5 px-3 text-sm text-slate-600 cursor-default"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Mensaje / Consulta</label>
              <textarea
                required
                name="mensaje"
                rows={4}
                className="block w-full rounded-lg border-slate-300 bg-white shadow-sm focus:border-[#072c57] focus:ring-[#072c57] py-2.5 px-3 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#072c57] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#0a3d7a] transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {status === 'loading' ? 'Procesando envío...' : 'Enviar consulta'}
            </button>

            {status === 'success' && (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 text-sm">
                ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
                No se pudo enviar el mensaje. Intentá de nuevo más tarde.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
