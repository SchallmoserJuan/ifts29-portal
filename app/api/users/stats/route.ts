import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/src/lib/payload'
import { getCurrentUser } from '@/src/lib/auth'
import { rateLimitByIP } from '@/src/lib/rate-limit'

export async function GET(request: Request) {
  const limit = rateLimitByIP(request, 100, 15 * 60 * 1000)
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
