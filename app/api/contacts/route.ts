import { NextResponse } from 'next/server'

import { rateLimitByIP } from '@/src/lib/rate-limit'

export async function GET(request: Request) {
  const limit = rateLimitByIP(request, 100, 15 * 60 * 1000)
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta de nuevo mas tarde.' },
      { status: 429 }
    )
  }

  return NextResponse.json({ error: 'Use /api/contacts/[id] to access a specific contact' }, { status: 400 })
}

export async function POST(request: Request) {
  const limit = rateLimitByIP(request, 100, 15 * 60 * 1000)
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta de nuevo mas tarde.' },
      { status: 429 }
    )
  }

  return NextResponse.json({ error: 'Use /api/contacts/[id]/reply to send a reply' }, { status: 400 })
}