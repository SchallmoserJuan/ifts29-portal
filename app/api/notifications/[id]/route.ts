import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'
import { getCurrentUser } from '@/src/lib/auth'
import { isStaff } from '@/src/access'
import { rateLimitByIP } from '@/src/lib/rate-limit'

type Params = Promise<{ id: string }>

function rateLimitResponse(resetTime: number) {
  return NextResponse.json(
    { error: 'Demasiadas solicitudes. Intenta de nuevo mas tarde.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
      },
    }
  )
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const limit = rateLimitByIP(req, 100, 15 * 60 * 1000)
  if (!limit.success) {
    return rateLimitResponse(limit.resetTime)
  }

  try {
    const user = await getCurrentUser()

    if (!user || !isStaff(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const payload = await getPayloadClient()

    const notification = await payload.findByID({
      collection: 'notifications',
      id,
      overrideAccess: true,
    })

    if (!notification) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 })
    }

    await payload.update({
      collection: 'notifications',
      id,
      data: {
        status: 'read',
        read: true,
        readAt: new Date().toISOString(),
      },
      overrideAccess: true,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating notification:', error)
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function GET(req: Request, { params }: { params: Params }) {
  const limit = rateLimitByIP(req, 100, 15 * 60 * 1000)
  if (!limit.success) {
    return rateLimitResponse(limit.resetTime)
  }

  try {
    const user = await getCurrentUser()

    if (!user || !isStaff(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const payload = await getPayloadClient()

    const notification = await payload.findByID({
      collection: 'notifications',
      id,
    })

    return NextResponse.json(notification)
  } catch (error) {
    console.error('Error fetching notification:', error)
    return NextResponse.json({ error: 'Error al obtener' }, { status: 500 })
  }
}
