import {describe, expect, it} from 'vitest'

import {POST} from '@/app/api/users/logout/route'

function mockRequest(): Request {
  return new Request('http://localhost', {headers: {'x-forwarded-for': '127.0.0.1'}})
}

describe('POST /api/users/logout', () => {
  it('returns 200 with success: true', async () => {
    const response = await POST(mockRequest())
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.success).toBe(true)
  })

  it('clears the payload-token cookie', async () => {
    const response = await POST(mockRequest())

    const setCookieHeaders = response.headers.getSetCookie?.() ?? []
    const payloadCookie = setCookieHeaders.find((h: string) => h.startsWith('payload-token='))

    expect(payloadCookie).toBeDefined()
    expect(payloadCookie).toMatch(/payload-token=;/)
  })
})
