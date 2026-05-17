interface RateLimitEntry {
  count: number
  resetTime: number
}

const store = new Map<string, RateLimitEntry>()

const CLEANUP_INTERVAL = 60 * 60 * 1000 // 1 hour

function cleanup() {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetTime) {
      store.delete(key)
    }
  }
}

setInterval(cleanup, CLEANUP_INTERVAL)

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetTime: number
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  return 'unknown'
}

export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry || now > entry.resetTime) {
    const resetTime = now + windowMs
    store.set(identifier, { count: 1, resetTime })
    return { success: true, limit: maxRequests, remaining: maxRequests - 1, resetTime }
  }

  if (entry.count >= maxRequests) {
    return { success: false, limit: maxRequests, remaining: 0, resetTime: entry.resetTime }
  }

  entry.count++
  return {
    success: true,
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - entry.count),
    resetTime: entry.resetTime,
  }
}

export function rateLimitByIP(
  request: Request,
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): RateLimitResult {
  const ip = getClientIP(request)
  return checkRateLimit(ip, maxRequests, windowMs)
}
