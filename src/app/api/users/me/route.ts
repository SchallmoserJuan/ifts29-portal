import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/src/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({
      authenticated: true,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}