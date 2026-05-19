import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/login', '/registro', '/pendiente'],
    },
    sitemap: 'https://ifts29.edu.ar/sitemap.xml',
  }
}
