'use client'

import { ErrorBoundary } from '@/src/components/ui/error-boundary'
import type { ReactNode } from 'react'

export function PortalSection({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
}
