import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'
import {checkRateLimit, getClientIP, rateLimitByIP} from '@/src/lib/rate-limit'

describe('getClientIP', () => {
  it('extracts IP from x-forwarded-for', () => {
    const req = new Request('http://localhost', {headers: {'x-forwarded-for': '203.0.113.42'}})
    expect(getClientIP(req)).toBe('203.0.113.42')
  })

  it('takes the first IP when multiple are present', () => {
    const req = new Request('http://localhost', {headers: {'x-forwarded-for': '203.0.113.1, 198.51.100.2, 10.0.0.1'}})
    expect(getClientIP(req)).toBe('203.0.113.1')
  })

  it('falls back to x-real-ip when x-forwarded-for is missing', () => {
    const req = new Request('http://localhost', {headers: {'x-real-ip': '198.51.100.99'}})
    expect(getClientIP(req)).toBe('198.51.100.99')
  })

  it('prefers x-forwarded-for over x-real-ip', () => {
    const req = new Request('http://localhost', {headers: {'x-forwarded-for': '203.0.113.1', 'x-real-ip': '10.0.0.1'}})
    expect(getClientIP(req)).toBe('203.0.113.1')
  })

  it('returns "unknown" when no IP headers are present', () => {
    const req = new Request('http://localhost')
    expect(getClientIP(req)).toBe('unknown')
  })
})

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('allows the first request from an identifier', () => {
    const result = checkRateLimit('127.0.0.1', 5, 60_000)
    expect(result.success).toBe(true)
    expect(result.limit).toBe(5)
    expect(result.remaining).toBe(4)
    expect(result.resetTime).toBeGreaterThan(Date.now())
  })

  it('decrements remaining on each request within the window', () => {
    const r1 = checkRateLimit('test-user', 3, 60_000)
    expect(r1.remaining).toBe(2)

    const r2 = checkRateLimit('test-user', 3, 60_000)
    expect(r2.remaining).toBe(1)

    const r3 = checkRateLimit('test-user', 3, 60_000)
    expect(r3.remaining).toBe(0)
  })

  it('blocks when exceeding the limit', () => {
    checkRateLimit('block-me', 2, 60_000)
    checkRateLimit('block-me', 2, 60_000)

    const result = checkRateLimit('block-me', 2, 60_000)
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('resets after the window expires', () => {
    checkRateLimit('expire-me', 1, 60_000)
    const blocked = checkRateLimit('expire-me', 1, 60_000)
    expect(blocked.success).toBe(false)

    vi.advanceTimersByTime(60_001)

    const allowed = checkRateLimit('expire-me', 1, 60_000)
    expect(allowed.success).toBe(true)
  })

  it('tracks different identifiers independently', () => {
    const r1 = checkRateLimit('user-a', 1, 60_000)
    expect(r1.success).toBe(true)

    const r2 = checkRateLimit('user-b', 1, 60_000)
    expect(r2.success).toBe(true)

    const r3 = checkRateLimit('user-a', 1, 60_000)
    expect(r3.success).toBe(false)

    const r4 = checkRateLimit('user-b', 1, 60_000)
    expect(r4.success).toBe(false)
  })

  it('handles zero or negative windowMs gracefully', () => {
    const result = checkRateLimit('no-window', 5, 0)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(4)
  })
})

describe('rateLimitByIP', () => {
  it('rate limits by client IP', () => {
    const req = new Request('http://localhost', {headers: {'x-forwarded-for': '10.0.0.5'}})
    const result = rateLimitByIP(req, 3, 60_000)
    expect(result.success).toBe(true)
  })

  it('uses default values when not specified', () => {
    const req = new Request('http://localhost', {headers: {'x-forwarded-for': '10.0.0.99'}})
    const result = rateLimitByIP(req)
    expect(result.success).toBe(true)
    expect(result.limit).toBe(100)
  })
})
