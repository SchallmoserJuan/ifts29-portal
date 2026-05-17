import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

import {sendNewContactNotification, sendReplyEmail} from '@/src/lib/email'

const fetchMock = vi.fn()

beforeEach(() => {
  fetchMock.mockReset()
  fetchMock.mockResolvedValue(new Response('OK', {status: 200}))
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

const contact = {
  nombre: 'Ana García',
  email: 'ana@example.com',
  asunto: 'Consulta sobre inscripción',
  mensaje: 'Me gustaría saber más sobre el proceso.',
}

describe('sendReplyEmail', () => {
  it('calls the EmailJS API endpoint with POST', async () => {
    await sendReplyEmail('ana@example.com', contact, 'Gracias por escribirnos.')

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.emailjs.com/api/v1.0/email/send',
      expect.objectContaining({method: 'POST'}),
    )
  })

  it('returns true on a successful 200 response', async () => {
    const result = await sendReplyEmail('ana@example.com', contact, 'Gracias.')
    expect(result).toBe(true)
  })

  it('returns false when the API returns an error status', async () => {
    fetchMock.mockResolvedValueOnce(new Response('error', {status: 400}))
    const result = await sendReplyEmail('ana@example.com', contact, 'Gracias.')
    expect(result).toBe(false)
  })
})

describe('sendNewContactNotification', () => {
  it('calls the EmailJS API endpoint with POST', async () => {
    await sendNewContactNotification(contact)

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.emailjs.com/api/v1.0/email/send',
      expect.objectContaining({method: 'POST'}),
    )
  })

  it('returns true on a successful 200 response', async () => {
    const result = await sendNewContactNotification(contact)
    expect(result).toBe(true)
  })

  it('returns false when the API returns an error status', async () => {
    fetchMock.mockResolvedValueOnce(new Response('error', {status: 400}))
    const result = await sendNewContactNotification(contact)
    expect(result).toBe(false)
  })
})
