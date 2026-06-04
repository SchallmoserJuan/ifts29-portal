'use client'

import {usePathname, useSearchParams} from 'next/navigation'
import {useEffect} from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    if (typeof window.gtag !== 'function') return

    const url = pathname + (searchParams.toString() ? `?${searchParams}` : '')

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: window.location.origin + url,
    })
  }, [pathname, searchParams])

  return null
}

export function sendEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', action, params)
}
