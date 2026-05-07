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

    const payload = await getPayloadClient()

    const contact = await payload.create({
      collection: 'contacts',
      data: {
        nombre,
        email,
        asunto,
        mensaje,
        status: 'new',
      },
    })

    const truncatedMessage = mensaje.length > 100 ? mensaje.substring(0, 100) + '...' : mensaje

    await payload.create({
      collection: 'notifications',
      data: {
        type: 'contact_received',
        title: `Nuevo contacto: ${asunto}`,
        message: truncatedMessage,
        relatedContact: contact.id,
      },
    })

    return NextResponse.json({ success: true, contactId: contact.id })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { error: 'Error al crear el contacto' },
      { status: 500 }
    )
  }
}