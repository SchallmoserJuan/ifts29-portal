import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'
import { getCurrentUser } from '@/src/lib/auth'
import { isStaff } from '@/src/access'
import { rateLimitByIP } from '@/src/lib/rate-limit'

interface ContactData {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

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
    const body = await req.json()
    const { reply } = body

    if (!reply || typeof reply !== 'string') {
      return NextResponse.json({ error: 'Reply text required' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    const contact = await payload.findByID({
      collection: 'contacts',
      id,
    })

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    const contactData: ContactData = {
      nombre: contact.nombre as string,
      email: contact.email as string,
      asunto: contact.asunto as string,
      mensaje: contact.mensaje as string,
    }

    const { sendReplyEmail } = await import('@/src/lib/email')
    const emailSent = await sendReplyEmail(contact.email as string, contactData, reply)

    if (!emailSent) {
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 })
    }

    await payload.update({
      collection: 'contacts',
      id,
      data: {
        status: 'replied',
        reply,
        repliedAt: new Date().toISOString(),
        repliedBy: typeof user.id === 'string' ? parseInt(user.id) : user.id,
      },
    })

    const relatedNotifications = await payload.find({
      collection: 'notifications',
      where: {
        relatedContact: {
          equals: typeof id === 'string' ? parseInt(id) : id,
        },
      },
      limit: 1,
    })

    if (relatedNotifications.docs.length > 0) {
      await payload.update({
        collection: 'notifications',
        id: relatedNotifications.docs[0].id,
        data: {
          status: 'replied',
          read: true,
          readAt: new Date().toISOString(),
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending reply:', error)
    return NextResponse.json({ error: 'Error processing reply' }, { status: 500 })
  }
}