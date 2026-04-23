import type { ReactNode } from 'react'

import { SiteFooter } from '@/src/components/site-footer'
import { SiteHeader } from '@/src/components/site-header'

export async function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#f7fbff]">{children}</main>
      <SiteFooter />
    </>
  )
}
