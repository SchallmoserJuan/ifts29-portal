'use client'

import { useEffect, useState, useCallback } from 'react'

interface PendingUser {
  id: string | number
  firstName: string
  lastName: string
  dni: string
  email: string
  status: string
  career?: { name: string } | null
  createdAt: string
}

export function PendingUsersTable() {
  const [users, setUsers] = useState<PendingUser[]>([])
  const [loading, setLoading] = useState(true)
  const [actionId, setActionId] = useState<string | number | null>(null)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/users/pending')
      if (res.ok) {
        const data = await res.json()
        setUsers(data.docs)
      }
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  async function handleAction(userId: string | number, status: 'approved' | 'rejected') {
    setActionId(userId)
    try {
      const res = await fetch(`/api/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== userId))
        setMessage({
          text: status === 'approved' ? 'Alumno aprobado exitosamente' : 'Alumno rechazado',
          type: 'success',
        })
      } else {
        setMessage({ text: 'Error al procesar la solicitud', type: 'error' })
      }
    } catch {
      setMessage({ text: 'Error de conexion', type: 'error' })
    } finally {
      setActionId(null)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-100" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-50" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-green-100">
            <svg aria-hidden="true" className="size-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-950">Todo al dia</h3>
            <p className="text-sm text-slate-500">No hay alumnos pendientes de aprobacion</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#072c57]">
            <svg aria-hidden="true" className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-950">Alumnos pendientes</h3>
            <p className="text-sm text-slate-500">{users.length} solicitud{users.length !== 1 ? 'es' : ''} por revisar</p>
          </div>
        </div>
        {message && (
          <span className={`rounded-full px-4 py-1.5 text-xs font-medium ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500">
              <th className="px-6 py-3 font-medium">Alumno</th>
              <th className="px-6 py-3 font-medium">DNI</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Carrera</th>
              <th className="px-6 py-3 font-medium">Registro</th>
              <th className="px-6 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="transition hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-[#214ca0]/10 text-[#214ca0] font-semibold text-xs">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-mono text-xs">{user.dni}</td>
                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                <td className="px-6 py-4 text-slate-600">
                  {user.career?.name || 'Tecnicatura en Desarrollo de Software'}
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs">{formatDate(user.createdAt)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleAction(user.id, 'approved')}
                      disabled={actionId === user.id}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100 disabled:opacity-50"
                    >
                      {actionId === user.id ? (
                        <svg aria-hidden="true" className="size-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleAction(user.id, 'rejected')}
                      disabled={actionId === user.id}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Rechazar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
