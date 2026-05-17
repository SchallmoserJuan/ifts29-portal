import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'
import { getCurrentUser } from '@/src/lib/auth'
import { isStaff } from '@/src/access'
import { rateLimitByIP } from '@/src/lib/rate-limit'

type Params = Promise<{ id: string }>

export async function POST(req: Request, { params }: { params: Params }) {
  const limit = rateLimitByIP(req, 100, 15 * 60 * 1000)
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

    if (!notification) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 })
    }

    if (!notification.relatedContact) {
      return NextResponse.json({ error: 'No related contact' }, { status: 400 })
    }

    const contactId = typeof notification.relatedContact === 'object'
      ? (notification.relatedContact as any).id
      : notification.relatedContact

    const contact = await payload.findByID({
      collection: 'contacts',
      id: contactId,
    })

    if (contact.status === 'responding' && contact.respondingBy && contact.respondingBy !== user.id) {
      return NextResponse.json(
        { error: 'Este contacto ya está siendo respondido por otro usuario' },
        { status: 409 }
      )
    }

    await payload.update({
      collection: 'contacts',
      id: contactId,
      data: {
        status: 'responding',
        respondingBy: typeof user.id === 'string' ? parseInt(user.id) : user.id,
        respondingAt: new Date().toISOString(),
      },
    })

    await payload.update({
      collection: 'notifications',
      id,
      data: {
        status: 'read',
        read: true,
        readAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({
      success: true,
      contactId,
    })
  } catch (error) {
    console.error('Error responding to notification:', error)
    return NextResponse.json({ error: 'Error al procesar' }, { status: 500 })
  }
}
