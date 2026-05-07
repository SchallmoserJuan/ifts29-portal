import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nombre, email, asunto, mensaje } = body

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    console.log('[contact API] Creating contact:', { nombre, email, asunto })

    const payload = await getPayloadClient()

    let contact
    try {
      contact = await payload.create({
        collection: 'contacts',
        data: {
          nombre,
          email,
          asunto,
          mensaje,
          status: 'new',
        },
      })
      console.log('[contact API] Contact created:', contact.id)
    } catch (contactError) {
      console.error('[contact API] Error creating contact:', contactError)
      return NextResponse.json(
        { error: 'Error al crear el contacto', detail: String(contactError) },
        { status: 500 }
      )
    }

    const truncatedMessage = mensaje.length > 100 ? mensaje.substring(0, 100) + '...' : mensaje

    try {
      const notification = await payload.create({
        collection: 'notifications',
        data: {
          type: 'contact_received',
          title: `Nuevo contacto: ${asunto}`,
          message: truncatedMessage,
          relatedContact: contact.id,
        },
      })
      console.log('[contact API] Notification created:', notification.id)
    } catch (notifyError) {
      console.error('[contact API] Error creating notification:', notifyError)
    }

    return NextResponse.json({ success: true, contactId: contact.id })
  } catch (error) {
    console.error('[contact API] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Error al crear el contacto' },
      { status: 500 }
    )
  }
}