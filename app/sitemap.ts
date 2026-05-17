import type { MetadataRoute } from 'next'

import { getPayloadClient } from '@/src/lib/payload'

const BASE_URL = 'https://ifts29.edu.ar'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/carreras`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/noticias`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/eventos`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/institucional`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/investigacion`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contacto`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/agenda`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/inscripciones`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/becas`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${BASE_URL}/portal`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/portal/biblioteca`, changeFrequency: 'weekly', priority: 0.7 },
  ]

  let careerRoutes: MetadataRoute.Sitemap = []
  let newsRoutes: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayloadClient()

    const [careersResult, newsResult] = await Promise.all([
      payload.find({
        collection: 'careers',
        where: { status: { equals: 'published' } },
        limit: 100,
      }),
      payload.find({
        collection: 'news',
        where: { status: { equals: 'published' } },
        limit: 100,
      }),
    ])

    careerRoutes = careersResult.docs.map((career: any) => ({
      url: `${BASE_URL}/carreras/${career.slug}`,
      lastModified: career.updatedAt ? new Date(career.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    newsRoutes = newsResult.docs.map((item: any) => ({
      url: `${BASE_URL}/noticias/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch {
    // Durante el build en Vercel la DB local puede no estar disponible.
    // Retornamos solo rutas estaticas; en produccion ISR revalida cada hora.
  }

  return [...staticRoutes, ...careerRoutes, ...newsRoutes]
}
