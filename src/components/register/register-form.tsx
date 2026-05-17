'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

interface FormErrors {
  dni?: string
  email?: string
  password?: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  general?: string
}

export function RegisterForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const [formData, setFormData] = useState({
    dni: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  })

  const validate = (): FormErrors => {
    const errs: FormErrors = {}

    if (!/^\d+$/.test(formData.dni)) {
      errs.dni = 'El DNI debe contener solo numeros'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Email invalido'
    }

    if (formData.password.length < 6) {
      errs.password = 'La contrasena debe tener al menos 6 caracteres'
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Las contrasenas no coinciden'
    }

    if (!formData.firstName.trim()) {
      errs.firstName = 'El nombre es requerido'
    }

    if (!formData.lastName.trim()) {
      errs.lastName = 'El apellido es requerido'
    }

    return errs
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccess(false)

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors(data.errors || { general: 'No se pudo completar el registro.' })
        return
      }

      setSuccess(true)
      startTransition(() => {
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      })
    } catch {
      setErrors({ general: 'Error de conexion. Intenta nuevamente.' })
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="size-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-950">Registro exitoso</h2>
          <p className="mt-2 text-slate-600">
            Tu cuenta fue creada exitosamente. Un administrador debe aprobarla antes de que puedas
            acceder al portal.
          </p>
          <p className="mt-4 text-sm text-slate-500">Seras redirigido al login en unos segundos...</p>
          <Link
            href="/login"
            className="mt-4 inline-block text-sm font-semibold text-[#214ca0] hover:underline"
          >
            Ir al login ahora
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-slate-900">
              Nombre
            </label>
            <input
              id="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            {errors.firstName ? <p className="mt-1 text-xs text-red-600">{errors.firstName}</p> : null}
          </div>
          <div>
            <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-slate-900">
              Apellido
            </label>
            <input
              id="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            {errors.lastName ? <p className="mt-1 text-xs text-red-600">{errors.lastName}</p> : null}
          </div>
        </div>

        <div>
          <label htmlFor="dni" className="mb-2 block text-sm font-medium text-slate-900">
            DNI
          </label>
          <input
            id="dni"
            type="text"
            inputMode="numeric"
            required
            value={formData.dni}
            onChange={(e) => setFormData((p) => ({ ...p, dni: e.target.value }))}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
          />
          {errors.dni ? <p className="mt-1 text-xs text-red-600">{errors.dni}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-900">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-900">
            Contrasena
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={formData.password}
            onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
          />
          {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-900">
            Confirmar contrasena
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData((p) => ({ ...p, confirmPassword: e.target.value }))}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-500"
          />
          {errors.confirmPassword ? (
            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
          ) : null}
        </div>

        {errors.general ? <p className="text-sm text-red-600">{errors.general}</p> : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
        >
          {isPending ? 'Registrando...' : 'Crear cuenta'}
        </button>

        <p className="text-center text-sm text-slate-600">
          Ya tenes cuenta?{' '}
          <Link href="/login" className="font-semibold text-slate-950 hover:underline">
            Ingresar
          </Link>
        </p>
      </div>
    </form>
  )
}
