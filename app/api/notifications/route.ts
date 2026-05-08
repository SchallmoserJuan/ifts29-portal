import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'
import { getCurrentUser } from '@/src/lib/auth'
import { isStaff } from '@/src/access'

export async function GET(req: Request) {
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
