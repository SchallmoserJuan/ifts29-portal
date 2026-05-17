'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useAuth } from '@/src/context/auth-context'

export function LoginForm() {
  const router = useRouter()
  const { setUser } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const onSubmit = async (formData: FormData) => {
    setError(null)

    const identifier = formData.get('identifier') as string
    const password = formData.get('password') as string

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        identifier,
        password,
      }),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      setError(body?.errors?.[0]?.message || 'No se pudo iniciar sesion.')
      return
    }

    const data = await response.json()

    if (data?.user) {
      setUser(data.user)
    }

    startTransition(() => {
      if (data?.user?.role === 'student') {
        router.push('/portal/biblioteca')
      } else {
        router.push('/portal')
      }
    })
  }

  return (
    <form
      action={(formData) => {
        void onSubmit(formData)
      }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="identifier" className="mb-2 block text-sm font-medium text-slate-900">
            DNI o Email
          </label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            required
            placeholder="Ingresa tu DNI o email"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-900">
            Contrasena
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
        >
          {isPending ? 'Ingresando...' : 'Ingresar'}
        </button>
        <p className="text-center text-sm text-slate-600">
          No tenes cuenta?{' '}
          <Link href="/registro" className="font-semibold text-slate-950 hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </form>
  )
}
