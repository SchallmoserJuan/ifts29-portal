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
  replied?: boolean
}

interface Contact {
  id: string
  nombre: string
  email: string
  asunto: string
  mensaje: string
  status: string
  createdAt: string
  reply?: string | null
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
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [contact, setContact] = useState<Contact | null>(null)
  const [isLoadingContact, setIsLoadingContact] = useState(false)
  const [reply, setReply] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  function getRelatedContactId(notification: Notification): string | null {
    if (!notification.relatedContact) return null
    if (typeof notification.relatedContact === 'string') return notification.relatedContact
    if (typeof notification.relatedContact === 'object' && notification.relatedContact !== null) {
      return (notification.relatedContact as any).id || null
    }
    return null
  }

  async function handleExpand(notification: Notification) {
    if (expandedId === notification.id) {
      setExpandedId(null)
      setContact(null)
      return
    }

    const contactId = getRelatedContactId(notification)
    if (!contactId) {
      setError('No hay contacto asociado')
      return
    }

    setExpandedId(notification.id)
    setContact(null)
    setReply('')
    setError(null)
    setIsLoadingContact(true)

    try {
      const res = await fetch(`/api/contacts/${contactId}`)
      if (res.ok) {
        const data = await res.json()
        setContact(data)
      } else {
        setError('Error cargando contacto')
      }
    } catch {
      setError('Error cargando contacto')
    } finally {
      setIsLoadingContact(false)
    }
  }

  async function handleSendReply(notification: Notification) {
    const contactId = getRelatedContactId(notification)
    if (!contactId || !reply.trim()) return

    setIsSending(true)
    setError(null)

    try {
      const res = await fetch(`/api/contacts/${contactId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error sending reply')
      }

      setNotifications(prev =>
        prev.map(n =>
          n.id === notification.id
            ? { ...n, read: true, replied: true }
            : n
        )
      )
      if (contact) {
        setContact({ ...contact, status: 'replied', reply })
      }
      setReply('')
    } catch (err: any) {
      setError(err.message || 'Error al enviar respuesta')
    } finally {
      setIsSending(false)
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function getStatusBadge(notification: Notification) {
    if (notification.replied) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Respondida
        </span>
      )
    }
    if (notification.read) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          Leída
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#28c2f3]/10 px-3 py-1.5 text-xs font-medium text-[#28c2f3]">
        <span className="h-2 w-2 rounded-full bg-[#28c2f3]" />
        Nuevo
      </span>
    )
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
        <div className="divide-y divide-slate-100">
          {notifications.map((notification) => (
            <div key={notification.id} className="transition-colors">
              {expandedId === notification.id ? (
                <div className="bg-slate-50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => { setExpandedId(null); setContact(null) }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Volver a la lista
                    </button>
                    <span className="text-sm text-slate-500">{formatDate(notification.createdAt)}</span>
                  </div>

                  {isLoadingContact ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-20 bg-slate-200 rounded-lg" />
                      <div className="h-32 bg-slate-200 rounded-lg" />
                    </div>
                  ) : contact ? (
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">De</p>
                            <p className="mt-1 font-medium text-slate-900">{contact.nombre}</p>
                            <p className="text-sm text-slate-500">{contact.email}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Asunto</p>
                            <p className="mt-1 font-medium text-slate-900">{contact.asunto}</p>
                          </div>
                        </div>
                        <div className="border-t border-slate-100 pt-4">
                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Mensaje</p>
                          <div className="bg-slate-50 rounded-lg p-4 text-slate-700 whitespace-pre-wrap">
                            {contact.mensaje}
                          </div>
                        </div>
                      </div>

                      {contact.status === 'replied' && contact.reply ? (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-semibold text-green-800">Respuesta enviada</span>
                          </div>
                          <div className="bg-white rounded-lg p-4 text-slate-700 whitespace-pre-wrap">
                            {contact.reply}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-xl p-5 shadow-sm">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Escribir respuesta
                          </label>
                          <textarea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            rows={6}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#28c2f3] focus:ring-2 focus:ring-[#28c2f3]/20 resize-none"
                            placeholder="Escribe tu respuesta aquí..."
                          />
                          {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                          )}
                          <div className="flex justify-end mt-4">
                            <button
                              onClick={() => handleSendReply(notification)}
                              disabled={isSending || !reply.trim()}
                              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#072c57] hover:bg-[#0a3a6a] rounded-xl transition disabled:opacity-50 flex items-center gap-2"
                            >
                              {isSending ? (
                                <>
                                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                  </svg>
                                  Enviando...
                                </>
                              ) : (
                                <>
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  Enviar respuesta
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-red-600">{error || 'No se pudo cargar el contacto'}</p>
                  )}
                </div>
              ) : (
                <div
                  className={`px-5 py-4 cursor-pointer transition-colors ${
                    notification.replied
                      ? 'bg-green-50/50 hover:bg-green-50'
                      : notification.read
                        ? 'bg-white hover:bg-slate-50'
                        : 'bg-[#28c2f3]/5 hover:bg-[#28c2f3]/10'
                  }`}
                  onClick={() => handleExpand(notification)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 shrink-0 rounded-full p-2 ${
                      notification.replied
                        ? 'bg-green-100'
                        : notification.read
                          ? 'bg-slate-100'
                          : 'bg-[#28c2f3]/20'
                    }`}>
                      {notification.replied && (
                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {!notification.replied && notification.read && (
                        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {!notification.replied && !notification.read && (
                        <div className="h-2 w-2 rounded-full bg-[#28c2f3]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className={`font-medium truncate ${
                            notification.replied
                              ? 'text-green-700'
                              : notification.read
                                ? 'text-slate-500'
                                : 'text-slate-900'
                          }`}>
                            {notification.title}
                          </p>
                          {notification.message && (
                            <p className="mt-1 text-sm text-slate-500 truncate">
                              {notification.message}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="shrink-0 text-xs text-slate-400 whitespace-nowrap">
                            {formatDate(notification.createdAt)}
                          </span>
                          {getStatusBadge(notification)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && expandedId === null && (
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
  )
}