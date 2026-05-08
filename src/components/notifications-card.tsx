'use client'

import { useState, useEffect, useCallback } from 'react'

interface RelatedContact {
  id: string | number
}

interface Notification {
  id: string
  type: string
  title: string
  message: string | null
  relatedContact: string | RelatedContact | null
  status: 'new' | 'read' | 'replied'
  read: boolean
  createdAt: string
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
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [contact, setContact] = useState<Contact | null>(null)
  const [isLoadingContact, setIsLoadingContact] = useState(false)
  const [reply, setReply] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const unreadCount = notifications.filter(n => n.status === 'new').length
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
      return String((notification.relatedContact as RelatedContact).id)
    }
    return null
  }

  async function handleOpen(notification: Notification, index: number) {
    const contactId = getRelatedContactId(notification)
    if (!contactId) {
      setError('No hay contacto asociado')
      return
    }

    setCurrentIndex(index)
    setViewMode('detail')
    setContact(null)
    setReply('')
    setError(null)
    setIsLoadingContact(true)

    try {
      const res = await fetch(`/api/contacts/${contactId}`)
      if (!res.ok) {
        setError('Error cargando contacto')
        setIsLoadingContact(false)
        return
      }

      const data = await res.json()
      setContact(data)

      if (notification.status === 'new') {
        await fetch(`/api/notifications/${notification.id}/respond`, { method: 'POST' })
        setNotifications(prev =>
          prev.map(n =>
            n.id === notification.id ? { ...n, status: 'read' } : n
          )
        )
      }
    } catch {
      setError('Error cargando contacto')
    } finally {
      setIsLoadingContact(false)
    }
  }

  function handleClose() {
    setViewMode('list')
    setContact(null)
    setCurrentIndex(0)
  }

  function handlePrev() {
    if (currentIndex > 0) {
      handleOpen(notifications[currentIndex - 1], currentIndex - 1)
    }
  }

  function handleNext() {
    if (currentIndex < notifications.length - 1) {
      handleOpen(notifications[currentIndex + 1], currentIndex + 1)
    }
  }

  async function handleSendReply() {
    if (!contact || !reply.trim()) return

    setIsSending(true)
    setError(null)

    try {
      const res = await fetch(`/api/contacts/${contact.id}/reply`, {
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
          n.id === notifications[currentIndex].id
            ? { ...n, status: 'replied' }
            : n
        )
      )
      setContact({ ...contact, status: 'replied', reply })
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

  return (
    <div className="rounded-3xl border border-[#b8d2f1] bg-white shadow-sm overflow-hidden h-[600px] flex flex-col">
      {viewMode === 'list' ? (
        <>
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#072c57]">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Bandeja de entrada</h2>
                <p className="text-sm text-slate-500">{totalDocs} mensajes</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <span className="flex items-center gap-1.5 rounded-full bg-[#28c2f3]/10 px-3 py-1.5 text-xs font-medium text-[#28c2f3]">
                <span className="h-2 w-2 rounded-full bg-[#28c2f3]" />
                {unreadCount} sin leer
              </span>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <svg className="h-8 w-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-slate-600 font-medium">No hay mensajes</p>
                <p className="mt-1 text-sm text-slate-400">Los nuevos contactos aparecerán aquí</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`px-5 py-4 cursor-pointer transition-colors ${
                    notification.status === 'replied'
                      ? 'bg-green-50/50 hover:bg-green-50'
                      : notification.status === 'read'
                        ? 'bg-white hover:bg-slate-50'
                        : 'bg-[#28c2f3]/5 hover:bg-[#28c2f3]/10'
                  }`}
                  onClick={() => handleOpen(notification, index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-0.5 shrink-0 rounded-full p-2 ${
                      notification.status === 'replied'
                        ? 'bg-green-100'
                        : notification.status === 'read'
                          ? 'bg-slate-100'
                          : 'bg-[#28c2f3]/20'
                    }`}>
                      {notification.status === 'replied' && (
                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {notification.status === 'read' && (
                        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {notification.status === 'new' && (
                        <div className="h-2 w-2 rounded-full bg-[#28c2f3]" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className={`font-medium truncate ${
                            notification.status === 'replied'
                              ? 'text-green-700'
                              : notification.status === 'read'
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
                          {notification.status === 'replied' ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Respondida
                            </span>
                          ) : notification.status === 'read' ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                              Leída
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#28c2f3]/10 px-3 py-1.5 text-xs font-medium text-[#28c2f3]">
                              <span className="h-2 w-2 rounded-full bg-[#28c2f3]" />
                              Nuevo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-5 py-3 shrink-0">
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
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 shrink-0">
            <button
              onClick={handleClose}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a la lista
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">
                {currentIndex + 1} de {totalDocs}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="rounded-md border border-slate-200 p-1.5 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === notifications.length - 1}
                  className="rounded-md border border-slate-200 p-1.5 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {isLoadingContact ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-slate-200 rounded-lg" />
                <div className="h-32 bg-slate-200 rounded-lg" />
              </div>
            ) : contact ? (
              <div className="space-y-6 max-w-3xl">
                <div className="bg-slate-50 rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">De</p>
                      <p className="mt-1 font-semibold text-slate-900 text-lg">{contact.nombre}</p>
                      <p className="text-sm text-slate-500">{contact.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Fecha</p>
                      <p className="mt-1 text-slate-700">{formatDate(contact.createdAt)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Asunto</p>
                    <p className="mt-1 font-semibold text-slate-900 text-lg">{contact.asunto}</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Mensaje</p>
                  <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {contact.mensaje}
                  </div>
                </div>

                {contact.status === 'replied' && contact.reply ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-semibold text-green-800">Respuesta enviada</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {contact.reply}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Escribir respuesta
                    </label>
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      rows={8}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#28c2f3] focus:ring-2 focus:ring-[#28c2f3]/20 resize-none text-slate-700"
                      placeholder="Escribe tu respuesta aquí..."
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleSendReply}
                        disabled={isSending || !reply.trim()}
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-[#072c57] hover:bg-[#0a3a6a] rounded-xl transition disabled:opacity-50 flex items-center gap-2"
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
        </div>
      )}
    </div>
  )
}