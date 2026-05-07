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

  const limit = 5

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

    if (diffMins < 1) return 'Hace un momento'
    if (diffMins < 60) return `Hace ${diffMins} minutos`
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`
    if (diffDays < 7) return `Hace ${diffDays} días`

    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
    })
  }

  function getNotificationIcon(notification: Notification) {
    if (notification.read) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
          <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )
    }

    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#28c2f3]/10">
        <svg className="h-5 w-5 text-[#28c2f3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  if (isLoading && notifications.length === 0) {
    return (
      <article className="rounded-3xl border border-[#b8d2f1] bg-white p-6 shadow-sm md:col-span-2">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-6 w-6 animate-pulse rounded-full bg-slate-200" />
          <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      </article>
    )
  }

  return (
    <article className="rounded-3xl border border-[#b8d2f1] bg-white p-6 shadow-sm md:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#072c57]">
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-950">Notificaciones de Contactos</h2>
        </div>
        {totalDocs > 0 && (
          <span className="rounded-full bg-[#28c2f3]/10 px-3 py-1 text-xs font-medium text-[#28c2f3]">
            {totalDocs} total
          </span>
        )}
      </div>

      <div className="mb-4 h-px bg-slate-100" />

      {notifications.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-8 w-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-slate-500">No hay notificaciones pendientes</p>
          <p className="mt-1 text-sm text-slate-400">Los nuevos contactos aparecerán aquí</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`group rounded-xl border p-4 transition-all ${
                  notification.read
                    ? 'border-slate-100 bg-slate-50/50'
                    : 'border-[#28c2f3]/30 bg-white shadow-sm hover:border-[#28c2f3]/50 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  {getNotificationIcon(notification)}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-medium ${notification.read ? 'text-slate-500' : 'text-slate-900'}`}>
                        {notification.title}
                      </h3>
                      <span className="whitespace-nowrap text-xs text-slate-400">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>

                    {notification.message && (
                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        {notification.message}
                      </p>
                    )}

                    <div className="mt-3 flex items-center gap-2">
                      {notification.read ? (
                        <a
                          href="/admin/collections/contacts"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
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
                          className="inline-flex items-center gap-1 rounded-full bg-[#28c2f3] px-3 py-1.5 text-xs font-semibold text-[#072c57] transition hover:bg-[#52d0f7] disabled:opacity-50"
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Marcar leído
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
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
        </>
      )}
    </article>
  )
}