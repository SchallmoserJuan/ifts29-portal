import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'
import { rateLimitByIP } from '@/src/lib/rate-limit'

const CAREER_SLUG = 'tecnicatura-superior-en-desarrollo-de-software'

export async function POST(request: Request) {
  const limit = rateLimitByIP(request, 5, 15 * 60 * 1000)
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta de nuevo mas tarde.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((limit.resetTime - Date.now()) / 1000)),
        },
      }
    )
  }

  try {
    const body = await request.json()
    const { dni, email, password, confirmPassword, firstName, lastName } = body

    const errors: Record<string, string> = {}

    if (!dni || !/^\d+$/.test(dni)) {
      errors.dni = 'El DNI debe contener solo numeros'
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Email invalido'
    }

    if (!password || password.length < 6) {
      errors.password = 'La contrasena debe tener al menos 6 caracteres'
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contrasenas no coinciden'
    }

    if (!firstName?.trim()) {
      errors.firstName = 'El nombre es requerido'
    }

    if (!lastName?.trim()) {
      errors.lastName = 'El apellido es requerido'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 })
    }

    const payload = await getPayloadClient()

    const [existingEmail, existingDni] = await Promise.all([
      payload.find({
        collection: 'users',
        where: { email: { equals: email.toLowerCase() } },
        limit: 1,
      }),
      payload.find({
        collection: 'users',
        where: { dni: { equals: dni } },
        limit: 1,
      }),
    ])

    if (existingEmail.docs.length > 0) {
      return NextResponse.json(
        { errors: { email: 'Este email ya esta registrado' } },
        { status: 409 }
      )
    }

    if (existingDni.docs.length > 0) {
      return NextResponse.json(
        { errors: { dni: 'Este DNI ya esta registrado' } },
        { status: 409 }
      )
    }

    const careers = await payload.find({
      collection: 'careers',
      where: { slug: { equals: CAREER_SLUG } },
      limit: 1,
    })

    const careerId = careers.docs[0]?.id

    const user = await payload.create({
      collection: 'users',
      overrideAccess: true,
      data: {
        email: email.toLowerCase(),
        password,
        dni,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role: 'student',
        status: 'pending',
        career: careerId,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message:
          'Cuenta creada exitosamente. Tu cuenta esta pendiente de aprobacion por un administrador.',
        user: {
          id: user.id,
          email: user.email,
          dni: user.dni,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Register error:', error)
    const message = error instanceof Error ? error.message : 'Error al registrar la cuenta'
    return NextResponse.json(
      { errors: { general: message } },
      { status: 500 }
    )
  }
}
