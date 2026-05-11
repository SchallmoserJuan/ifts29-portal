import type { Metadata } from 'next'

import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'

import { AuthProvider } from '@/src/context/auth-context'
import { getSiteSettings } from '@/src/lib/content'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: {
      default: settings.siteTitle,
      template: '%s | IFTS 29',
    },
    description: settings.tagline,
    metadataBase: new URL('https://ifts29.edu.ar'),
    openGraph: {
      type: 'website',
      locale: 'es_AR',
      siteName: settings.siteTitle,
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
