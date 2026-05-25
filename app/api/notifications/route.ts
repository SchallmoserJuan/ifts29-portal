import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'
import { getCurrentUser } from '@/src/lib/auth'
import { isStaff } from '@/src/access'
import { rateLimitByIP } from '@/src/lib/rate-limit'

export async function GET(req: Request) {
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
      return NextResponse.json({ docs: [], totalDocs: 0, totalPages: 0, page: 1 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '5', 10)

    const payload = await getPayloadClient()

    const notifications = await payload.find({
      collection: 'notifications',
      overrideAccess: true,
      where: {},
      sort: '-createdAt',
      page,
      limit,
    })

    return NextResponse.json({
      docs: notifications.docs,
      totalDocs: notifications.totalDocs,
      totalPages: notifications.totalPages,
      page: notifications.page,
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({ docs: [], totalDocs: 0, totalPages: 0, page: 1 })
  }
}
