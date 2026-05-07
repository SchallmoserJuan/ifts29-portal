import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getPayloadClient } from '@/src/lib/payload'
import type { AppUser } from '@/src/types/app'

export const getCurrentUser = async (): Promise<AppUser | null> => {
  try {
    const payload = await getPayloadClient()
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.getAll()
      .map(c => `${c.name}=${c.value}`)
      .join('; ')

    const headers = new Headers()
    headers.set('cookie', cookieHeader)

    const { user } = await payload.auth({ headers })

    return (user as AppUser | null) ?? null
  } catch {
    return null
  }
}

export const requireUser = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return user
}