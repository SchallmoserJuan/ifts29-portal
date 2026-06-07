import {describe, expect, it} from 'vitest'
import {calculateReadTime, formatNewsDate, newsCategoryLabels} from '@/src/lib/news-utils'

describe('newsCategoryLabels', () => {
  it('has labels for all expected categories', () => {
    expect(newsCategoryLabels.general).toBe('General')
    expect(newsCategoryLabels.academic).toBe('Academica')
    expect(newsCategoryLabels.institutional).toBe('Institucional')
    expect(newsCategoryLabels.events).toBe('Eventos')
  })
})

describe('formatNewsDate', () => {
  it('formats a date string in es-AR locale', () => {
    const result = formatNewsDate('2026-06-07T12:00:00Z')
    expect(result).toContain('junio')
    expect(result).toContain('2026')
    expect(result).toMatch(/\d{1,2} de junio/)
  })

  it('handles ISO date strings with time', () => {
    const result = formatNewsDate('2026-01-15T10:30:00Z')
    expect(result).toContain('enero')
    expect(result).toContain('2026')
    expect(result).toMatch(/\d{1,2} de enero/)
  })
})

describe('calculateReadTime', () => {
  it('returns 5 min for null content', () => {
    expect(calculateReadTime(null)).toBe('5 min')
  })

  it('returns 5 min for undefined content', () => {
    expect(calculateReadTime(undefined)).toBe('5 min')
  })

  it('returns 5 min for non-object content', () => {
    expect(calculateReadTime('just a string')).toBe('5 min')
  })

  it('returns 1 min for very short content', () => {
    const content = {root: {children: [{text: 'Hello'}]}}
    expect(calculateReadTime(content)).toBe('1 min')
  })

  it('calculates based on word count at 200 wpm', () => {
    const words = Array.from({length: 400}, (_, i) => `word${i}`)
    const content = {text: words.join(' ')}
    const result = calculateReadTime(content)
    expect(result).toBe('2 min')
  })

  it('rounds up to at least 1 min', () => {
    const content = {text: 'a'}
    expect(calculateReadTime(content)).toBe('1 min')
  })
})
