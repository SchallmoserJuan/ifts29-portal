'use client'

import Link from 'next/link'
import { useAuth } from '@/src/context/auth-context'

export function PortalNavLink() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  const canAccessPortal =
    user?.role === 'admin' ||
    user?.role === 'teacher' ||
    (user?.role === 'student' && user?.status === 'approved')

  if (canAccessPortal) {
    return (
      <Link
        href="/portal"
        className="px-3 py-1 text-sm font-semibold text-white border-r border-white/20 whitespace-nowrap"
      >
        <span className="navbar-underline">Portal</span>
      </Link>
    )
  }

  return null
}