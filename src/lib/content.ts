import { cache } from 'react'

import { defaultCareers, defaultInstitutional, defaultNews, defaultSettings } from '@/src/data/defaults'
import { getPayloadClient } from '@/src/lib/payload'
import type { CareerItem, DocumentItem, InstitutionalContentData, NewsItem, SiteSettingsData } from '@/src/types/content'
import type { AppUser } from '@/src/types/app'

export const getSiteSettings = cache(async () => {
  const payload = await getPayloadClient()

  try {
    const settings = await payload.findGlobal({
      slug: 'site-settings',
    })

    return { ...defaultSettings, ...settings } as SiteSettingsData
  } catch {
    return defaultSettings
  }
})

export const getInstitutionalContent = cache(async () => {
  const payload = await getPayloadClient()

  try {
    const content = await payload.findGlobal({
      slug: 'institutional-content',
    })

    return {
      ...defaultInstitutional,
      ...content,
      authorities:
        content?.authorities && content.authorities.length > 0
          ? content.authorities
          : defaultInstitutional.authorities,
    } as InstitutionalContentData
  } catch {
    return defaultInstitutional
  }
})

export const getCareers = cache(async () => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'careers',
    depth: 1,
    limit: 20,
    sort: 'name',
  })

  return (result.docs.length > 0 ? result.docs : defaultCareers) as CareerItem[]
})

export const getCareerBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'careers',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs[0] || defaultCareers.find((career) => career.slug === slug) || null) as CareerItem | null
})

export const getNewsList = cache(async () => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'news',
    depth: 1,
    limit: 20,
    sort: '-publishedAt',
  })

  return (result.docs.length > 0 ? result.docs : defaultNews) as NewsItem[]
})

export const getNewsBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'news',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs[0] || defaultNews.find((item) => item.slug === slug) || null) as NewsItem | null
})

export const getLibraryDocuments = cache(async (user: AppUser) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'documents',
    depth: 1,
    limit: 30,
    sort: '-updatedAt',
    user,
  })

  return result.docs as DocumentItem[]
})
