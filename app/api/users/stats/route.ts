import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'
import { getCurrentUser } from '@/src/lib/auth'

export async function GET() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'teacher')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    const payload = await getPayloadClient()

    const [totalResult, pendingResult, approvedResult, rejectedResult] = await Promise.all([
      payload.count({
        collection: 'users',
        where: { role: { equals: 'student' } },
      }),
      payload.count({
        collection: 'users',
        where: {
          and: [
            { role: { equals: 'student' } },
            { status: { equals: 'pending' } },
          ],
        },
      }),
      payload.count({
        collection: 'users',
        where: {
          and: [
            { role: { equals: 'student' } },
            { status: { equals: 'approved' } },
          ],
        },
      }),
      payload.count({
        collection: 'users',
        where: {
          and: [
            { role: { equals: 'student' } },
            { status: { equals: 'rejected' } },
          ],
        },
      }),
    ])

    return NextResponse.json({
      totalUsers: totalResult.totalDocs,
      pendingCount: pendingResult.totalDocs,
      approvedCount: approvedResult.totalDocs,
      rejectedCount: rejectedResult.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json(
      { error: 'Error al obtener estadisticas' },
      { status: 500 }
    )
  }
}
