import type { ReactNode } from 'react'

import { HeroProvider } from './hero-context'
import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'

export async function PageShell({ children }: { children: ReactNode }) {
  return (
    <HeroProvider>
      <SiteHeader />

      <main id="main-content" className="flex-1 bg-[#f7fbff]">
        {children}
      </main>

      <SiteFooter />
    </HeroProvider>
  )
}