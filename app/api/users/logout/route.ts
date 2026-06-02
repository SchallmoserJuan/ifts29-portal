import { NextResponse } from 'next/server'

import { rateLimitByIP } from '@/src/lib/rate-limit'

export async function POST(request: Request) {
  const limit = rateLimitByIP(request, 100, 15 * 60 * 1000)
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
    const isSecure = process.env.NODE_ENV === 'production'
    const response = NextResponse.json({ success: true })

    response.cookies.set('payload-token', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0),
      sameSite: 'lax',
      secure: isSecure,
    })

    response.cookies.set('csrftoken', '', {
      httpOnly: true,
      path: '/',
      expires: new Date(0),
      sameSite: 'lax',
      secure: isSecure,
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Error al cerrar sesión' }, { status: 500 })
  }
}
