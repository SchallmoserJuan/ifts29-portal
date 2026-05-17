import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'
import { rateLimitByIP } from '@/src/lib/rate-limit'

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
    const { identifier, password } = body

    if (!identifier || !password) {
      return NextResponse.json(
        { errors: [{ message: 'DNI/Email y contrasena son requeridos' }] },
        { status: 400 }
      )
    }

    const payload = await getPayloadClient()
    const isDni = /^\d+$/.test(identifier)

    const { docs } = await payload.find({
      collection: 'users',
      where: isDni
        ? { dni: { equals: identifier } }
        : { email: { equals: identifier.toLowerCase() } },
      limit: 1,
    })

    const user = docs[0]
    if (!user) {
      return NextResponse.json(
        { errors: [{ message: 'Credenciales invalidas' }] },
        { status: 401 }
      )
    }

    if (user.role === 'student' && user.status === 'pending') {
      return NextResponse.json(
        {
          errors: [
            {
              message:
                'Tu cuenta esta pendiente de aprobacion. Contacta a un administrador.',
            },
          ],
        },
        { status: 403 }
      )
    }

    const result = await payload.login({
      collection: 'users',
      data: { email: user.email, password },
    })

    const response = NextResponse.json(result)

    if (result.token) {
      response.cookies.set('payload-token', result.token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 8,
        sameSite: 'lax',
      })
    }

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { errors: [{ message: 'Credenciales invalidas' }] },
      { status: 401 }
    )
  }
}
