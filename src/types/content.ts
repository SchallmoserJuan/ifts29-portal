export type RequirementItem = {
  item: string
}

export type SubjectItem = {
  subject: string
}

export type OutcomeItem = {
  title: string
  description: string
}

export type AuthorityItem = {
  name: string
  role: string
}

export type CareerItem = {
  id: string | number
  name: string
  slug: string
  summary: string
  duration: string
  modality: string
  resolution?: string
  requirements?: RequirementItem[]
  studyPlan?: SubjectItem[]
  graduateProfile?: unknown
  professionalProfile?: unknown
  outcomes?: OutcomeItem[]
  methodology?: unknown
  heroImage?: {
    url: string
    alt?: string
  }
  floatingImage?: {
    url: string
    alt?: string
  }
  studyPlanImage?: {
    url: string
    alt?: string
  }
  documents?: (DocumentItem | string | number)[]
}

export type NewsItem = {
  id: string | number
  title: string
  slug: string
  summary: string
  category: string
  publishedAt: string
  content?: unknown
  featured?: boolean
  tags?: string
  heroImage?: {
    url: string
    alt?: string
  }
}

export type DocumentItem = {
  id: string | number
  title: string
  description: string
  category: string
  visibility: string
  url?: string
  career?: {
    name?: string
  } | null
}

export type SiteSettingsData = {
  siteTitle: string
  tagline: string
  contactEmail: string
  address: string
  phone: string
}

export type InstitutionalContentData = {
  mission: string
  vision: string
  history: unknown
  authorities: AuthorityItem[]
}

export type EventItem = {
  id: string | number
  title: string
  slug: string
  date: string
  description: string
  location: string
  address?: string
  link?: string
  image?: {
    url: string
    alt?: string
  }
}

export type ProjectItem = {
  id: string | number
  title: string
  slug: string
  summary: string
  category: string
  publishedAt: string
  tags?: string
  image?: {
    url: string
    alt?: string
  }
  content?: unknown
}

export type CompanyItem = {
  id: string | number
  name: string
  description: string
  practicesArea: string
  website?: string
  contactEmail?: string
  logo?: {
    url: string
    alt?: string
  }
}
