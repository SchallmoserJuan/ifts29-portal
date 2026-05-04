import type { Metadata } from 'next'

import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'

import './globals.css'

export const metadata: Metadata = {
  title: 'Portal IFTS 29',
  description: 'Portal institucional del IFTS 29 con acceso por roles, noticias, carreras y biblioteca.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-stone-50 text-slate-950 antialiased">{children}</body>
    </html>
  )
}
