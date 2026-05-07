'use client'

import { useState, useEffect, useCallback } from 'react'

interface Notification {
  id: string
  type: string
  title: string
  message: string | null
  relatedContact: string | null
  read: boolean
  createdAt: string
}

interface NotificationsResponse {
  docs: Notification[]
  totalDocs: number
  totalPages: number
  page: number
}

export function NotificationsCard() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalDocs, setTotalDocs] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const limit = 8

  const fetchNotifications = useCallback(async (page: number) => {
    try {
      const res = await fetch(`/api/notifications?page=${page}&limit=${limit}`)
      if (res.ok) {
        const data: NotificationsResponse = await res.json()
        setNotifications(data.docs)
        setTotalPages(data.totalPages)
        setTotalDocs(data.totalDocs)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }, [])

  useEffect(() => {
    fetchNotifications(currentPage)

    const interval = setInterval(() => {
      fetchNotifications(currentPage)
    }, 30000)

    return () => clearInterval(interval)
  }, [fetchNotifications, currentPage])

  async function handleMarkAsRead(notificationId: string) {
    setActionLoading(notificationId)
    try {
      const res = await fetch(`/api/notifications/${notificationId}`, {
        method: 'PATCH',
      })

      if (res.ok) {
        setNotifications(prev =>
          prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
        )
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    } finally {
      setActionLoading(null)
    }
  }

  async function handleRespond(notificationId: string) {
    setActionLoading(notificationId)
    try {
      const res = await fetch(`/api/notifications/${notificationId}/respond`, {
        method: 'POST',
      })

      if (res.ok) {
        setNotifications(prev =>
          prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
        )
      }
    } catch (error) {
      console.error('Error responding to notification:', error)
    } finally {
      setActionLoading(null)
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Ahora'
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`

    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
    })
  }

  function extractEmail(text: string | null): string {
    if (!text) return ''
    const match = text.match(/[\w.-]+@[\w.-]+\.\w+/)
    return match ? match[0] : ''
  }

  if (isLoading && notifications.length === 0) {
    return (
      <div className="rounded-3xl border border-[#b8d2f1] bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-[#b8d2f1] bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#072c57]">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Bandeja de entrada</h2>
            <p className="text-sm text-slate-500">{totalDocs} mensajes de contacto</p>
          </div>
        </div>
        {totalDocs > 0 && (
          <span className="flex items-center gap-1.5 rounded-full bg-[#28c2f3]/10 px-3 py-1.5 text-xs font-medium text-[#28c2f3]">
            <span className="h-2 w-2 rounded-full bg-[#28c2f3]" />
            {totalDocs} nuevos
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="py-16 px-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-8 w-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-slate-600 font-medium">No hay mensajes</p>
          <p className="mt-1 text-sm text-slate-400">Los nuevos contactos aparecerán aquí</p>
        </div>
      ) : (
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <tbody className="divide-y divide-slate-100">
              {notifications.map((notification) => (
                <tr
                  key={notification.id}
                  className={`group transition-colors ${
                    notification.read
                      ? 'bg-white'
                      : 'bg-[#28c2f3]/5 hover:bg-[#28c2f3]/10'
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-4">
                      <div className={`mt-0.5 shrink-0 rounded-full p-2 ${
                        notification.read
                          ? 'bg-slate-100'
                          : 'bg-[#28c2f3]/20'
                      }`}>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-[#28c2f3]" />
                        )}
                        {notification.read && (
                          <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className={`font-medium truncate ${
                              notification.read ? 'text-slate-500' : 'text-slate-900'
                            }`}>
                              {notification.title}
                            </p>
                            {notification.message && (
                              <p className="mt-1 text-sm text-slate-500 truncate">
                                {notification.message}
                              </p>
                            )}
                          </div>
                          <span className="shrink-0 text-xs text-slate-400 whitespace-nowrap">
                            {formatDate(notification.createdAt)}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          {notification.read ? (
                            <a
                              href="/admin/collections/contacts"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Ver en Payload
                            </a>
                          ) : (
                            <button
                              onClick={() => handleRespond(notification.id)}
                              disabled={actionLoading === notification.id}
                              className="inline-flex items-center gap-1.5 rounded-full bg-[#072c57] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0a3a6a] disabled:opacity-50"
                            >
                              {actionLoading === notification.id ? (
                                <>
                                  <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                  </svg>
                                  Procesando...
                                </>
                              ) : (
                                <>
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  Tomar contacto
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-5 py-3">
              <span className="text-sm text-slate-500">
                Página {currentPage} de {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}