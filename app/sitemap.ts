import type {MetadataRoute} from 'next'

import {getPayloadClient} from '@/src/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ifts29.edu.ar'

  const staticPages: MetadataRoute.Sitemap = [
    {url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1},
    {url: `${baseUrl}/institucional`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8},
    {url: `${baseUrl}/carreras`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9},
    {url: `${baseUrl}/inscripciones`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9},
    {url: `${baseUrl}/becas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8},
    {url: `${baseUrl}/noticias`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8},
    {url: `${baseUrl}/eventos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7},
    {url: `${baseUrl}/proyectos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7},
    {url: `${baseUrl}/empresas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6},
    {url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6},
    {url: `${baseUrl}/documentacion`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7},
    {url: `${baseUrl}/privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3},
    {url: `${baseUrl}/accesibilidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3},
    {url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3},
    {url: `${baseUrl}/legal`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3},
  ]

  try {
    const payload = await getPayloadClient()

    const careers = await payload.find({
      collection: 'careers',
      limit: 50,
    })
    const careerPages: MetadataRoute.Sitemap = careers.docs.map((c: Record<string, unknown>) => ({
      url: `${baseUrl}/carreras/${c.slug}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt as string) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }))

    const news = await payload.find({
      collection: 'news',
      where: {status: {equals: 'published'}},
      limit: 100,
    })
    const newsPages: MetadataRoute.Sitemap = news.docs.map((n: Record<string, unknown>) => ({
      url: `${baseUrl}/noticias/${n.slug}`,
      lastModified: n.updatedAt ? new Date(n.updatedAt as string) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...careerPages, ...newsPages]
  } catch {
    return staticPages
  }
}
