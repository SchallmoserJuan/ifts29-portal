import { cache } from 'react'

import { defaultBecasPage, defaultCareers, defaultCompanies, defaultEvents, defaultInstitutional, defaultNews, defaultProjects, defaultScholarships, defaultSettings } from '@/src/data/defaults'
import { getPayloadClient } from '@/src/lib/payload'
import type { BecasPageData, CareerItem, CompanyItem, DocumentItem, EventItem, InstitutionalContentData, NewsItem, ProjectItem, ScholarshipItem, SiteSettingsData } from '@/src/types/content'
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

  try {
    const result = await payload.find({
      collection: 'careers',
      depth: 1,
      limit: 20,
      sort: 'name',
    })

    return (result.docs.length > 0 ? result.docs : defaultCareers) as CareerItem[]
  } catch {
    return defaultCareers
  }
})

export const getCareerBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()

  try {
    const result = await payload.find({
      collection: 'careers',
      depth: 1,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return (result.docs[0] || defaultCareers.find((career) => career.slug === slug) || null) as CareerItem | null
  } catch {
    return defaultCareers.find((career) => career.slug === slug) || null
  }
})

export const getNewsList = cache(async () => {
  const payload = await getPayloadClient()

  try {
    const result = await payload.find({
      collection: 'news',
      depth: 1,
      limit: 20,
      sort: '-publishedAt',
    })

    return (result.docs.length > 0 ? result.docs : defaultNews) as NewsItem[]
  } catch {
    return defaultNews
  }
})

export const getNewsBySlug = cache(async (slug: string) => {
  const payload = await getPayloadClient()

  try {
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
  } catch {
    return defaultNews.find((item) => item.slug === slug) || null
  }
})

export const getLibraryDocuments = cache(async (user: AppUser) => {
  const payload = await getPayloadClient()

  try {
    const result = await payload.find({
      collection: 'documents',
      depth: 1,
      limit: 30,
      sort: '-updatedAt',
      user,
    })

    return result.docs as DocumentItem[]
  } catch {
    return [] as DocumentItem[]
  }
})

export const getEventsList = cache(async () => {
  const payload = await getPayloadClient()

  try {
    const result = await payload.find({
      collection: 'events',
      depth: 1,
      limit: 10,
      sort: 'date',
    })

    return (result.docs.length > 0 ? result.docs : defaultEvents) as EventItem[]
  } catch {
    return defaultEvents
  }
})

export const getProjectsList = cache(async () => {
  const payload = await getPayloadClient()

  try {
    const result = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: 10,
      sort: '-publishedAt',
    })

    return (result.docs.length > 0 ? result.docs : defaultProjects) as ProjectItem[]
  } catch {
    return defaultProjects
  }
})

export const getCompaniesList = cache(async () => {
  const payload = await getPayloadClient()

  try {
    const result = await payload.find({
      collection: 'companies',
      depth: 1,
      limit: 10,
      sort: 'name',
    })

    return (result.docs.length > 0 ? result.docs : defaultCompanies) as CompanyItem[]
  } catch {
    return defaultCompanies
  }
})

export const getScholarships = cache(async () => {
  const payload = await getPayloadClient()

  try {
    const result = await payload.find({
      collection: 'scholarships',
      depth: 0,
      limit: 20,
      sort: 'order',
      where: {
        status: {
          equals: 'published',
        },
      },
    })

    return (result.docs.length > 0 ? result.docs : defaultScholarships) as ScholarshipItem[]
  } catch {
    return defaultScholarships
  }
})

export const getBecasPage = cache(async () => {
  const payload = await getPayloadClient()

  try {
    const page = await payload.findGlobal({
      slug: 'becas-page',
    })

    return { ...defaultBecasPage, ...page } as BecasPageData
  } catch {
    return defaultBecasPage
  }
})

export const getPublicDocuments = cache(async () => {
  const payload = await getPayloadClient()

  try {
    const result = await payload.find({
      collection: 'documents',
      depth: 1,
      limit: 50,
      sort: '-updatedAt',
      where: {
        visibility: {
          equals: 'public',
        },
      },
    })

    return result.docs as DocumentItem[]
  } catch {
    return [] as DocumentItem[]
  }
})
