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

    const result = await payload.find({
      collection: 'users',
      where: {
        and: [
          { role: { equals: 'student' } },
          { status: { equals: 'pending' } },
        ],
      },
      sort: '-createdAt',
      depth: 1,
    })

    return NextResponse.json({
      docs: result.docs.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        dni: user.dni,
        email: user.email,
        status: user.status,
        career: user.career,
        createdAt: user.createdAt,
      })),
      totalDocs: result.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching pending users:', error)
    return NextResponse.json(
      { error: 'Error al obtener alumnos pendientes' },
      { status: 500 }
    )
  }
}
