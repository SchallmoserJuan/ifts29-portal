import type { Metadata } from 'next'
import { Suspense } from 'react'

import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import '@fontsource/playfair-display/700.css'

import {AuthProvider} from '@/src/context/auth-context'
import {getSiteSettings} from '@/src/lib/content'
import {SkipToContent} from '@/src/components/ui'
import {GoogleAnalytics} from './GoogleAnalytics'
import './globals.css'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

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
      images: [
        {
          url: '/og-default.png',
          width: 1200,
          height: 630,
          alt: settings.siteTitle,
        },
      ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'IFTS N° 29',
              alternateName: 'Instituto de Formación Técnica Superior 29',
              url: 'https://ifts29.edu.ar',
              description:
                'Instituto de Formación Técnica Superior. Tecnicatura Superior en Desarrollo de Software con título oficial de validez nacional.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Buenos Aires',
                addressRegion: 'CABA',
                addressCountry: 'AR',
              },
              email: 'info@ifts29.edu.ar',
              sameAs: [
                'https://www.linkedin.com/school/instituto-de-formaci%C3%B3n-t%C3%A9cnica-superior-29/',
              ],
            }),
          }}
        />
        {GA_MEASUREMENT_ID && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
        )}
        {GA_MEASUREMENT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_location: window.location.href,
                });
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <SkipToContent />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
