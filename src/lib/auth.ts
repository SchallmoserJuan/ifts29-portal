import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'

import { getPayloadClient } from '@/src/lib/payload'
import type { AppUser } from '@/src/types/app'

export const getCurrentUser = async () => {
  try {
    const payload = await getPayloadClient()
    const headers = await getHeaders()
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
