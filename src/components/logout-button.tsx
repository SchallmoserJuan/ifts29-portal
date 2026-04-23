'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export function LogoutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const onLogout = async () => {
    await fetch('/api/users/logout?allSessions=false', {
      method: 'POST',
      credentials: 'include',
    })

    startTransition(() => {
      router.push('/')
      router.refresh()
    })
  }

  return (
    <button
      type="button"
      onClick={() => void onLogout()}
      disabled={isPending}
      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
    >
      {isPending ? 'Saliendo...' : 'Cerrar sesion'}
    </button>
  )
}
