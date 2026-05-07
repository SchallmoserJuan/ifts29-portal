'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

interface AuthResponse {
  user?: {
    id: number | string
    email: string
    role: 'admin' | 'teacher' | 'student'
    firstName?: string | null
    lastName?: string | null
  }
}

export function AuthNavLink() {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    fetch('/api/users/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setUser(data.user || null)
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [pathname])

  async function handleLogout() {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoading) {
    return (
      <span className="inline-block h-5 w-16 animate-pulse rounded bg-white/20" />
    )
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="px-3 py-1 text-sm font-semibold text-white border-r border-white/20"
      >
        Entrar
      </Link>
    )
  }

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 text-sm font-semibold text-white border-r border-white/20 cursor-pointer"
    >
      Salir
    </button>
  )
}