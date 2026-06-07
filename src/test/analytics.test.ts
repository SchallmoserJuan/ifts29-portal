import {describe, expect, it, vi, beforeEach} from 'vitest'

const mockSendEvent = vi.hoisted(() => vi.fn())

vi.mock('@/app/(site)/GoogleAnalytics', () => ({
  sendEvent: mockSendEvent,
}))

import {
  trackCareerClick,
  trackDocumentDownload,
  trackSearch,
  trackContactFormSubmit,
} from '@/src/lib/analytics'

describe('analytics', () => {
  beforeEach(() => {
    mockSendEvent.mockClear()
  })

  it('trackCareerClick sends career_click event with career name', () => {
    trackCareerClick('Ingeniería en Sistemas')

    expect(mockSendEvent).toHaveBeenCalledTimes(1)
    expect(mockSendEvent).toHaveBeenCalledWith('career_click', {
      career_name: 'Ingeniería en Sistemas',
    })
  })

  it('trackDocumentDownload sends document_download event with document name', () => {
    trackDocumentDownload('Reglamento 2024.pdf')

    expect(mockSendEvent).toHaveBeenCalledTimes(1)
    expect(mockSendEvent).toHaveBeenCalledWith('document_download', {
      document_name: 'Reglamento 2024.pdf',
    })
  })

  it('trackSearch sends search event with search term', () => {
    trackSearch('becas')

    expect(mockSendEvent).toHaveBeenCalledTimes(1)
    expect(mockSendEvent).toHaveBeenCalledWith('search', {
      search_term: 'becas',
    })
  })

  it('trackContactFormSubmit sends contact_form_submit event without params', () => {
    trackContactFormSubmit()

    expect(mockSendEvent).toHaveBeenCalledTimes(1)
    expect(mockSendEvent).toHaveBeenCalledWith('contact_form_submit')
  })
})
