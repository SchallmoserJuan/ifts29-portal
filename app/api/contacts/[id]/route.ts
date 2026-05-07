import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'
import { getCurrentUser } from '@/src/lib/auth'
import { isStaff } from '@/src/access'

type Params = Promise<{ id: string }>

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const user = await getCurrentUser()

    if (!user || !isStaff(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const payload = await getPayloadClient()

    const contact = await payload.findByID({
      collection: 'contacts',
      id,
    })

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error fetching contact:', error)
    return NextResponse.json({ error: 'Error fetching contact' }, { status: 500 })
  }
}