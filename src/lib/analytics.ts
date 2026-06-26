import {sendEvent} from '@/app/(site)/GoogleAnalytics'

export function trackCareerClick(careerName: string) {
  sendEvent('career_click', {
    career_name: careerName,
  })
}

export function trackSearch(searchTerm: string) {
  sendEvent('search', {
    search_term: searchTerm,
  })
}

export function trackContactFormSubmit() {
  sendEvent('contact_form_submit')
}
