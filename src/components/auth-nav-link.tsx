'use client'

import Link from 'next/link'
import { useAuth } from '@/src/context/auth-context'

export function AuthNavLink() {
  const { user, isLoading, logout } = useAuth()

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
      onClick={logout}
      className="px-3 py-1 text-sm font-semibold text-white border-r border-white/20 cursor-pointer"
    >
      Salir
    </button>
  )
}